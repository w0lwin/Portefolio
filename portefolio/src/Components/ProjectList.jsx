import React from 'react';

const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div>No projects to display.</div>;
  }

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div key={index} className="project-item">
          <div className="project-title">{project.name}</div>
          <div className="project-details">
            <span className="project-year">{project.year} /</span>
            <span className="project-category">{project.category} /</span>
            <span className="project-subcategory">{project.subcategory}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
