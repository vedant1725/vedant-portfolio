"use client";

import { portfolioData } from "../data/portfolio";

export default function Skills() {
  const { skills } = portfolioData;

  const renderSkillChips = (skillArray) => {
    return skillArray.map((skill, idx) => (
      <div key={idx} className="skill-chip">
        {skill}
      </div>
    ));
  };

  return (
    <section id="skills" className="section container">
      <div className="section-header animate-fade-in-up">
        <h2>My <span className="text-gradient">Skills</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="skills-container animate-fade-in-up delay-100">
        <div className="skills-category glass-panel">
          <h3><i className="fas fa-code"></i> Programming</h3>
          <div className="chips-container">
            {renderSkillChips(skills.programming)}
          </div>
        </div>

        <div className="skills-category glass-panel">
          <h3><i className="fas fa-database"></i> Data & Logic</h3>
          <div className="chips-container">
            {renderSkillChips(skills.data)}
          </div>
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
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .skills-category {
          padding: 3rem;
          text-align: center;
        }
        .skills-category h3 {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 1.5rem;
        }
        .skills-category i {
          color: var(--primary-color);
        }
        .chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        .skill-chip {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          font-weight: 500;
          transition: var(--transition);
          cursor: default;
        }
        .skill-chip:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: var(--primary-color);
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
          color: #fff;
        }
      `}</style>
    </section>
  );
}
