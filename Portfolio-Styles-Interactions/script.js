// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // THEME TOGGLING
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const introImage = document.querySelector('#intro-section .intro-image img');
  
    function toggleGameSectionForDevTheme() {
      const gameSection = document.getElementById('game-section');
      if (document.body.classList.contains('theme-dev')) {
        gameSection.classList.remove('hidden');
      } else {
        gameSection.classList.add('hidden');
      }
    }
  
    function updateDevTagLabels() {
      const tagsToLabel = ['H1', 'H2', 'H3', 'H4', 'P'];
      tagsToLabel.forEach(tag => {
        document.querySelectorAll(tag).forEach(el => {
          el.setAttribute('data-tag', tag.toLowerCase());
        });
      });
    }
  
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-colorful', 'theme-dev');
        const themeClass = button.getAttribute('data-theme');
        document.body.classList.add(themeClass);
  
        // Update headshot image
        if (themeClass === 'theme-light') {
          introImage.src = './Assignment_2_Portfolio_Interactivity_Images/headshot-image-light.png';
        } else if (themeClass === 'theme-dark') {
          introImage.src = './Assignment_2_Portfolio_Interactivity_Images/headshot-image-dark.png';
        } else if (themeClass === 'theme-colorful') {
          introImage.src = './Assignment_2_Portfolio_Interactivity_Images/headshot-image-colour.png';
        } else if (themeClass === 'theme-dev') {
            introImage.src = './Assignment_2_Portfolio_Interactivity_Images/headshot-image-dev.png';
            updateDevTagLabels();         // Add tag labels like <h1>
            toggleGameSectionForDevTheme(); // Show the game section
            startSkierGame();             // Start the skier game
          }
  
        toggleGameSectionForDevTheme();
      });
    });
  
    // SCROLL-TRIGGERED ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: 0.15
    });
  
    revealElements.forEach(el => observer.observe(el));
  
    // PORTFOLIO POPUP FUNCTIONALITY
    const popup = document.getElementById('portfolioPopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupClose = document.getElementById('popupClose');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const image = item.getAttribute('data-image');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
  
        popupImage.src = image;
        popupTitle.textContent = title;
        popupDescription.textContent = description;
  
        popup.classList.add('visible');
        popup.classList.remove('hidden');
      });
    });
  
    popupClose.addEventListener('click', () => {
      popup.classList.remove('visible');
      popup.classList.add('hidden');
    });
  
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
      }
    });
  });

  