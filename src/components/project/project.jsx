import { useState, useEffect } from "react";
import { Code, Link as LinkIcon } from "lucide-react";
import "./project.css";

const projects = [
  {
    image: "https://i.ibb.co/ZMqR4VJ/image.png",
    title: "Radio Neptune",
    description:
      "Stream your favorite Nepali radio stations online, anytime, anywhere!",
    link: "https://nep-tune.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/radio-station",
    tags: ["React", "Firebase", "Streaming"],
    category: "Personal",
  },
  {
    image: "https://i.ibb.co/bXknhxR/image.png",
    title: "Library Management System",
    description: null,
    note: "Demo credentials: test@gmail.com / test123",
    link: "https://library-management-system-tan.vercel.app/login",
    gitLink: "https://github.com/MandipKumarKanu/library-management-system",
    tags: ["React", "Firebase", "Auth"],
    category: "Personal",
  },
  {
    image: "https://i.ibb.co/T46J8jz/image.png",
    title: "Ur Weather",
    description:
      "A sleek and minimalist app delivering real-time weather updates effortlessly.",
    link: "https://ur-weather.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/ur-weather",
    tags: ["React", "Weather API", "React Query"],
    category: "Personal",
  },
  {
    image: "https://i.ibb.co/511K9cW/image.png",
    title: "Remote Mouse Controller",
    description: "Turn your phone into a wireless trackpad for your computer",
    gitLink: "https://github.com/MandipKumarKanu/remote-mouse-controller",
    tags: ["Node.js", "Socket.io", "Mobile"],
    category: "Personal",
  },
  {
    image: "https://i.ibb.co/rMrqwSs/image.png",
    title: "Kitab Kunj",
    description:
      "KitabKunj is a platform where you can buy, sell, rent, or donate books",
    link: "https://kitab-kunj.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/kitab-kunj-firebase",
    tags: ["React", "E-commerce", "Payment"],
    category: "Personal",
  },
  {
    image: "https://i.ibb.co/ZTJKfPd/image.png",
    title: "Corporate Website",
    description: "Lennobyte Solutions",
    link: "https://lennobyte.com/",
    gitLink: null,
    tags: ["React"],
    category: "Professional",
  },
  {
    image: "https://i.ibb.co/x8w2jMx/image.png",
    title: "LennoLabs+",
    description: "Interactive UI for lab operations",
    link: "https://labsplus.lennobyte.com/",
    gitLink: null,
    tags: ["React", "Tailwind CSS"],
    category: "Professional",
  },
  {
    image: "https://i.ibb.co/qJtKpVJ/image.png",
    title: "Operation Record Book",
    description: "Interactive UI for hospital's operations record book",
    link: "https://operationrecord.lennobyte.com/",
    gitLink: null,
    tags: ["React", "Tailwind CSS"],
    category: "Professional",
  },
  {
    image: "https://i.ibb.co/BcZj8hb/image.png",
    title: "School Management System",
    description: "Interactive UI for School CRM",
    link: "https://mypathshala.lennobyte.com/",
    gitLink: null,
    tags: ["React", "Tailwind CSS"],
    category: "Professional",
  },
];

const Project = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? projects.slice(0, windowWidth < 768 ? 4 : 8)
      : projects.filter((project) => project.category === activeTab);

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
              activeProject === index ? "active" : ""
            }`}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
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
