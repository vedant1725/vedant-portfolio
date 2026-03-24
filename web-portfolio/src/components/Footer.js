"use client";

import { portfolioData } from "../data/portfolio";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="footer glass-panel">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>{personal.name}</h2>
            <p>{personal.role}</p>
          </div>
          
          <div className="footer-social">
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          margin-top: 4rem;
          border-bottom: none;
          border-left: none;
          border-right: none;
          border-radius: 0;
          background: rgba(10, 10, 12, 0.8);
          padding: 4rem 0 2rem;
        }
        
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .footer-brand p {
          color: var(--text-secondary);
        }

        .footer-social {
          display: flex;
          gap: 1.5rem;
        }

        .footer-social a {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: var(--text-secondary);
          transition: var(--transition);
          border: 1px solid var(--card-border);
        }

        .footer-social a:hover {
          background: var(--primary-color);
          color: #fff;
          border-color: var(--primary-color);
          transform: translateY(-3px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--card-border);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .footer-top {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
