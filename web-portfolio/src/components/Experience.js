"use client";

import { portfolioData } from "../data/portfolio";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section container">
      <div className="section-header animate-fade-in-up">
        <h2>My <span className="text-gradient">Experience</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="timeline-container">
        {experience.map((exp, idx) => (
          <div key={idx} className="timeline-item animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
            <div className="timeline-dot"></div>
            <div className="timeline-content glass-panel">
              <div className="exp-header">
                <h3>{exp.title}</h3>
                <span className="date-badge">{exp.period}</span>
              </div>
              
              <div className="company-location">
                <span className="company"><i className="fas fa-building outicon"></i> {exp.company}</span>
                <span className="location"><i className="fas fa-map-marker-alt outicon"></i> {exp.location}</span>
              </div>
              
              <ul className="exp-points">
                {exp.points.map((point, pIdx) => (
                  <li key={pIdx}>
                    <i className="fas fa-caret-right point-icon"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="exp-tags">
                {exp.tags.map((tag, tIdx) => (
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

        .timeline-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          padding-left: 2rem;
        }
        
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color), transparent);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
        }
        
        .timeline-dot {
          position: absolute;
          left: -2.35rem;
          top: 1.5rem;
          width: 1rem;
          height: 1rem;
          background: var(--bg-color);
          border: 3px solid var(--primary-color);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          z-index: 10;
        }

        .timeline-content {
          padding: 2rem;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .exp-header h3 {
          font-size: 1.4rem;
          color: #fff;
          margin: 0;
        }

        .date-badge {
          background: rgba(99, 102, 241, 0.15);
          color: var(--primary-color);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .company-location {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .outicon {
          color: var(--primary-color);
          margin-right: 0.4rem;
        }

        .exp-points {
          list-style: none;
          margin-bottom: 1.5rem;
        }

        .exp-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .point-icon {
          color: var(--primary-hover);
          margin-top: 0.35rem;
          font-size: 0.9rem;
        }
        
        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tag {
          font-size: 0.8rem;
          color: #ddd;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 600px) {
          .timeline-container {
            padding-left: 1.5rem;
          }
          .timeline-dot {
            left: -1.8rem;
          }
          .exp-header {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
