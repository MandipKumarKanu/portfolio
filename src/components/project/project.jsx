import { useState, useEffect } from "react";
import { Code, Link as LinkIcon } from "lucide-react";
import { getProjects } from "../../firebase/projectService";
import "./project.css";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      if (newWidth < 1024 && previewProject) {
        setPreviewProject(null);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && previewProject) {
        closePreview();
      }
    };

    const handleClickOutside = (event) => {
      if (previewProject) {
        const iframe = document.querySelector('.project-preview-iframe');
        const activeCard = document.querySelector('.project-card.active');
        
        if (iframe && !iframe.contains(event.target) && 
            activeCard && !activeCard.contains(event.target)) {
          closePreview();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [previewProject]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeTab === "All"
      ? projects.slice(0, windowWidth < 768 ? 4 : 8)
      : projects.filter((project) => project.category === activeTab);

  const handleMouseEnter = (project, index, event) => {
    setActiveProject(index);
    if (project.link && project.isLive && window.innerWidth >= 1024) {
      const rect = event.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const iframeWidth = 600;
      const iframeHeight = 450;
      
      let x = rect.right + 20;
      let y = rect.top;
      
      if (x + iframeWidth > viewportWidth) {
        x = rect.left - iframeWidth - 20;
      }
      
      if (y + iframeHeight > viewportHeight) {
        y = viewportHeight - iframeHeight - 20;
      }
      
      x = Math.max(20, x);
      y = Math.max(20, y);
      
      setPreviewPosition({ x, y });
      
      setTimeout(() => {
        setPreviewProject(project);
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (!previewProject) {
      setActiveProject(null);
    }
  };

  const closePreview = () => {
    setPreviewProject(null);
    setActiveProject(null);
  };

  if (loading) {
    return (
      <section id="project" className="project-section">
        <div className="project-header">
          <h2 className="project-title">My Projects</h2>
          <p className="project-subtitle">
            Innovative solutions and creative digital experiences crafted with
            passion
          </p>
        </div>
        <div className="project-loading">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="project" className="project-section">
        <div className="project-header">
          <h2 className="project-title">My Projects</h2>
          <p className="project-subtitle">
            Innovative solutions and creative digital experiences crafted with
            passion
          </p>
        </div>
        <div className="project-error">
          <p>Error loading projects: {error}</p>
          <button onClick={loadProjects} className="retry-button">
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="project" className="project-section">
      <div className="project-header">
        <h2 className="project-title">My Projects</h2>
        <p className="project-subtitle">
          Innovative solutions and creative digital experiences crafted with
          passion
        </p>
      </div>

      <div className="project-tabs">
        {["All", "Personal", "Professional"].map((tab) => (
          <button
            key={tab}
            className={`project-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${
              activeProject === index || (previewProject && previewProject === project) ? "active" : ""
            }`}
            onMouseEnter={(e) => handleMouseEnter(project, index, e)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="project-image-container">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
              <div className="project-overlay">
                <h3 className="project-overlay-title">{project.title}</h3>
                <p className="project-overlay-description">
                  {project.description}
                </p>
                {project.note && <p className="project-note">{project.note}</p>}
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <LinkIcon size={20} />
                      Live
                    </a>
                  )}
                  {project.gitLink && (
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Code size={20} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewProject && windowWidth >= 1024 && (
        <>
          <div 
            className="project-preview-iframe active"
            style={{
              left: `${previewPosition.x}px`,
              top: `${previewPosition.y}px`
            }}
          >
            <div className="iframe-container">
              <div className="iframe-header">
                <div className="iframe-controls">
                  <span 
                    className="iframe-control close-btn"
                    onClick={closePreview}
                    style={{ cursor: 'pointer' }}
                  ></span>
                  <span className="iframe-control minimize-btn"></span>
                  <span className="iframe-control maximize-btn"></span>
                </div>
                <span className="iframe-url">{previewProject.link}</span>
                <button 
                  className="iframe-close-text"
                  onClick={closePreview}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginLeft: 'auto',
                    padding: '5px'
                  }}
                >
                  ✕
                </button>
              </div>
              <iframe
                src={previewProject.link}
                title={`Preview of ${previewProject.title}`}
                className="iframe-content"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
                loading="lazy"
              />
            </div>
          </div>
        </>
      )}

      {((projects.length > 4 && windowWidth < 768) ||
        (projects.length > 8 && windowWidth >= 768)) && (
        <div className="view-all-container">
          <a
            href="https://github.com/MandipKumarKanu"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-button"
          >
            View All Projects
          </a>
        </div>
      )}
    </section>
  );
};

export default Project;
