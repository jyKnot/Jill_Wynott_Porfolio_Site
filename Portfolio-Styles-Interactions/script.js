document.addEventListener('DOMContentLoaded', () => {
    // Theme switching

    const themeButtons = document.querySelectorAll('.theme-toggle');
  
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
        const themeClass = button.getAttribute('data-theme');
        document.body.classList.add(themeClass);
      });
    });
  
    // Reveal on scroll (scrollytelling)
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        threshold: 0.15 // Trigger when 15% of the element is visible
      }
    );
  
    revealElements.forEach(el => observer.observe(el));
  });
  