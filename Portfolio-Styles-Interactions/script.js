//  Wait until the DOM is fully loaded

document.addEventListener('DOMContentLoaded', () => {


    // THEME TOGGLING FUNCTION
    
  
    // Grab all the buttons with class "theme-toggle"
    const themeButtons = document.querySelectorAll('.theme-toggle');
  
    // Add a click listener to each theme button
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove all possible theme classes from the <body>
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
  
        // Get the theme from the button's data-theme attribute
        const themeClass = button.getAttribute('data-theme');
  
        // Add the selected theme class to <body>
        document.body.classList.add(themeClass);
      });
    });
  

    // SCROLL-TRIGGERED ANIMATIONS
  
  
    // Grab all elements that should animate on scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right');
  
    // Set up the observer to watch those elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is in view — animate it
          entry.target.classList.add('revealed');
        } else {
          // Element is out of view — reset it (optional for re-animations)
          entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: 0.15 // Start revealing when 15% of the element is in view
    });
  
    // Tell the observer to watch each animated element
    revealElements.forEach((el) => observer.observe(el));
  });
  