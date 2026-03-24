"use client";

import { portfolioData } from "../data/portfolio";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section container">
      <div className="section-header animate-fade-in-up">
        <h2>Featured <span className="text-gradient">Projects</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card glass-panel animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="project-image-container">
              <img 
                src={project.image}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
              <div className="project-overlay">
                <div className="project-links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      <i className="fas fa-external-link-alt"></i> Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-header {
          margin-bottom: 4rem;
          text-align: center;
        }
        h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .header-line {
          width: 60px;
          height: 4px;
          background: var(--primary-color);
          margin: 0 auto;
          border-radius: var(--radius-full);
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
        }
        
        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
        }
        
        .project-image-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }
        
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(4px);
        }
        
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }
        
        .project-card:hover .project-links {
          transform: translateY(0);
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
        
        .project-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .project-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: #fff;
        }
        
        .project-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tag {
          font-size: 0.75rem;
          color: var(--primary-color);
          background: rgba(99, 102, 241, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
      `}</style>
    </section>
  );
}
