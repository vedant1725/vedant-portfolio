"use client";

import { portfolioData } from "../data/portfolio";

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="section container">
      <div className="section-header animate-fade-in-up">
        <h2>About <span className="text-gradient">Me</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="about-grid">
        <div className="glass-panel p-space animate-fade-in-up delay-100">
          <div className="icon-wrapper">
            <i className="fas fa-user"></i>
          </div>
          <h3>Professional Summary</h3>
          <p className="summary-text">{about.summary}</p>
        </div>

        <div className="glass-panel p-space animate-fade-in-up delay-200">
          <div className="icon-wrapper">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h3>Education</h3>
          <ul className="education-list">
            {about.education.map((edu, idx) => (
              <li key={idx} className="edu-item">
                <div className="edu-year">{edu.year}</div>
                <div className="edu-details">
                  <h4>{edu.degree}</h4>
                  {edu.specialty && <p className="specialty">{edu.specialty}</p>}
                  <p className="school">{edu.school}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-space animate-fade-in-up delay-300">
          <div className="icon-wrapper">
            <i className="fas fa-certificate"></i>
          </div>
          <h3>Certifications</h3>
          <ul className="cert-list">
            {about.certifications.map((cert, idx) => (
              <li key={idx}>
                <i className="fas fa-check-circle text-gradient"></i>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
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
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        .p-space {
          padding: 2.5rem;
          height: 100%;
        }
        .icon-wrapper {
          width: 50px;
          height: 50px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .summary-text {
          color: var(--text-secondary);
          line-height: 1.8;
        }
        
        /* Education List */
        .education-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .edu-item {
          display: flex;
          gap: 1rem;
        }
        .edu-year {
          font-weight: 600;
          color: var(--primary-color);
          font-size: 0.9rem;
          min-width: 100px;
        }
        .edu-details h4 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }
        .specialty {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }
        .school {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        /* Certifications List */
        .cert-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cert-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
