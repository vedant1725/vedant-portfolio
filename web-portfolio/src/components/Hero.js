"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "../data/portfolio";

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <p className="greeting">Welcome, I'm</p>
          <h1 className="name">
            <span className="text-gradient">{personal.name}</span>
          </h1>
          <h2 className="role">{personal.role}</h2>
          <p className="tagline delay-100">{personal.tagline}</p>
          
          <div className="hero-buttons delay-200">
            <Link href="#projects" className="btn btn-primary">
              <i className="fas fa-rocket"></i> View Projects
            </Link>
            <Link href="#contact" className="btn btn-outline">
              <i className="fas fa-envelope"></i> Contact Me
            </Link>
          </div>
          
          <div className="social-links delay-300">
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
        
        <div className="hero-image-wrapper animate-fade-in-up delay-200">
          <Image 
            src={personal.profileImage}
            alt={personal.name}
            width={400}
            height={500}
            className="hero-image"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          position: relative;
        }
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
        }
        .hero-content {
          flex: 1;
        }
        .greeting {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }
        .name {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .role {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        .tagline {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 500px;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        .social-links a {
          color: var(--text-secondary);
          font-size: 1.5rem;
          transition: var(--transition);
        }
        .social-links a:hover {
          color: var(--primary-color);
          transform: translateY(-3px);
        }
        
        .hero-image-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
        }
        .hero-image {
          position: relative;
          z-index: 2;
          border-radius: var(--radius-lg);
          object-fit: cover;
          border: 1px solid var(--card-border);
        }
        
        @media (max-width: 992px) {
          .hero-container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 3rem;
          }
          .name {
            font-size: 3rem;
          }
          .tagline {
            margin: 0 auto 2.5rem;
          }
          .hero-buttons {
            justify-content: center;
          }
          .social-links {
            justify-content: center;
          }
          .hero-image-wrapper {
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
