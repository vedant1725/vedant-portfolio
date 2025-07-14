// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const themeToggles = document.querySelectorAll('.theme-toggle');
const skillBars = document.querySelectorAll('.skill-progress-bar');
const contactForm = document.getElementById('contactForm');
const currentYearEl = document.getElementById('current-year');

// Initialize the year in the footer
currentYearEl.textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Mobile menu links - close menu when clicked
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Theme toggle functionality
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update all theme toggle icons
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
  });
});

// Load theme preference
const loadThemePreference = () => {
  const isDarkMode = localStorage.getItem('dark-mode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    });
  }
};

// Animate skill bars when scrolled into view
const animateSkillBars = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
};

// Handle contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create a loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission (would be replaced with actual API call)
    setTimeout(() => {
      // Show success message
      showToast('Message sent successfully!', 'Thanks for reaching out. I\'ll get back to you soon.');
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }, 1500);
  });
}

// Toast notification function
function showToast(title, message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast animate-slide-in-right';
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">×</button>
  `;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Add styles if they don't exist yet
  if (!document.querySelector('.toast-styles')) {
    const style = document.createElement('style');
    style.className = 'toast-styles';
    style.textContent = `
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        max-width: 350px;
        background-color: var(--card);
        color: var(--card-foreground);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: var(--radius);
        padding: 1rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        z-index: 1000;
      }
      .toast-content {
        flex: 1;
      }
      .toast-title {
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .toast-message {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .toast-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: var(--muted-foreground);
        padding: 0;
        margin-left: 1rem;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add close functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  });
  
  // Auto-close after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadThemePreference();
  animateSkillBars();
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,  // Offset for navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add 1D animations with scroll reveal
  const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-slide-in-bottom');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a style attribute with animation-play-state: running
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Set initial state to paused for all animations
  animateElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});