import React, { useState } from 'react';
import { addProject, updateProject } from '../../firebase/projectService';
import { uploadImageToCloudinary } from '../../services/cloudinaryService';
import './ProjectForm.css';

const ProjectForm = ({ project = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    note: project?.note || '',
    link: project?.link || '',
    gitLink: project?.gitLink || '',
    techStack: project?.tags?.join(', ') || '',
    category: project?.category || 'Personal',
    image: project?.image || '',
    isLive: project?.isLive !== undefined ? project.isLive : true
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        imageUrl = uploadResult.url;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        note: formData.note,
        link: formData.link,
        gitLink: formData.gitLink,
        tags: formData.techStack.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: formData.category,
        image: imageUrl,
        isLive: formData.isLive
      };

      if (project) {
        await updateProject(project.id, projectData);
      } else {
        await addProject(projectData);
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred while saving the project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form-overlay">
      <div className="project-form-container">
        <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Note</label>
            <input
              type="text"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="e.g., Demo credentials"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="link">Live Website URL</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gitLink">GitHub Repository URL</label>
              <input
                type="url"
                id="gitLink"
                name="gitLink"
                value={formData.gitLink}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="techStack">Tech Stack (comma-separated)</label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="React, Firebase, Node.js"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Personal">Personal</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Project Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isLive"
                checked={formData.isLive}
                onChange={handleInputChange}
              />
              Project is live/accessible
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Add Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
