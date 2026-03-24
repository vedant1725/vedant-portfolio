"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <Link href="#hero" className="logo">
          <i className="fas fa-code"></i>
          <span className="logo-text">VP.</span>
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li><Link href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link href="#about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
          <li><Link href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</Link></li>
          <li><Link href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link></li>
          <li><Link href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</Link></li>
          <li><Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
        </ul>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition);
        }
        .navbar.scrolled {
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--card-border);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
        }
        .logo i {
          color: var(--primary-color);
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-links a {
          font-weight: 500;
          font-size: 0.95rem;
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--primary-color);
          transition: var(--transition);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 1.5rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: var(--bg-secondary);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
            box-shadow: -5px 0 20px rgba(0,0,0,0.5);
          }
          .nav-links.active {
            right: 0;
          }
          .mobile-toggle {
            display: block;
            z-index: 1001;
          }
        }
      `}</style>
    </nav>
  );
}
