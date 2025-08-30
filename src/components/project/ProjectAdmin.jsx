import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../../firebase/projectService';
import { isFirebaseConfigured } from '../../firebase/config';
import ProjectForm from './ProjectForm';
import { Edit, Trash2, Plus, Eye, Github, AlertTriangle } from 'lucide-react';
import './ProjectAdmin.css';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter(p => p.id !== projectId));
      } catch (err) {
        setError('Failed to delete project');
        console.error(err);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    loadProjects();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="project-admin">
      <div className="admin-header">
        <h2>Project Management</h2>
        <button className="add-project-btn" onClick={handleAddProject}>
          <Plus size={20} />
          Add New Project
        </button>
      </div>

      {!isFirebaseConfigured && (
        <div className="config-warning">
          <AlertTriangle size={20} />
          <div>
            <h3>Firebase Not Configured</h3>
            <p>
              Please set up your Firebase environment variables to enable full project management.
              Currently showing fallback data. See PROJECT_MANAGEMENT_README.md for setup instructions.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-admin-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              {project.isLive && <span className="live-badge">Live</span>}
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="project-category">{project.category}</p>
              {project.description && (
                <p className="project-description">
                  {project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description}
                </p>
              )}
              
              <div className="project-tags">
                {project.tags?.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <Eye size={16} />
                  </a>
                )}
                {project.gitLink && (
                  <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="project-actions">
              <button 
                className="edit-btn" 
                onClick={() => handleEditProject(project)}
                title="Edit Project"
              >
                <Edit size={16} />
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteProject(project.id)}
                title="Delete Project"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="no-projects">
            <p>No projects found. Add your first project!</p>
          </div>
        )}
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default ProjectAdmin;
