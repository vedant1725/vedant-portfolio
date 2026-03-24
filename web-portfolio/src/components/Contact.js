"use client";

import { portfolioData } from "../data/portfolio";

export default function Contact() {
  const { personal } = portfolioData;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example only
    alert("Message sent! (Mock response)");
  };

  return (
    <section id="contact" className="section container">
      <div className="section-header animate-fade-in-up">
        <h2>Contact <span className="text-gradient">Me</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info animate-fade-in-up delay-100">
          <h3>Get In Touch</h3>
          <p className="contact-desc">
            Whether you're interested in working together or just want to say hello, 
            I'd love to hear from you!
          </p>
          
          <div className="contact-cards">
            <a href={`mailto:${personal.email}`} className="contact-card glass-panel">
              <div className="icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="details">
                <h4>Email</h4>
                <p>{personal.email}</p>
              </div>
            </a>
            
            <a href={`tel:${personal.phone.replace(/\\s+/g, '')}`} className="contact-card glass-panel">
              <div className="icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="details">
                <h4>Phone</h4>
                <p>{personal.phone}</p>
              </div>
            </a>
            
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card glass-panel">
              <div className="icon">
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="details">
                <h4>LinkedIn</h4>
                <p>vedant-panchal-9b3786244</p>
              </div>
            </a>
            
            <div className="contact-card glass-panel">
              <div className="icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="details">
                <h4>Location</h4>
                <p>{personal.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container animate-fade-in-up delay-200">
          <form className="contact-form glass-panel" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
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
        
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: flex-start;
        }
        
        .contact-info h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        
        .contact-desc {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .contact-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          transition: var(--transition);
        }
        
        a.contact-card:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-2px);
        }

        .icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          clip-path: circle();
        }
        
        .icon i {
          color: var(--primary-color);
        }

        .details h4 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }
        
        .details p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        
        .contact-form {
          padding: 2.5rem;
        }
        
        .contact-form h3 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        
        input, textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          color: #fff;
          font-family: inherit;
          transition: var(--transition);
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        
        .w-full {
          width: 100%;
        }

        @media (max-width: 992px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
          .contact-cards {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
