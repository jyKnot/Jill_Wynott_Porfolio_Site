document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const introImage = document.querySelector('#intro-section .intro-image img');
  
    const terminalizedElements = new Map(); // Stores original elements
  
    function toggleDevTerminalVisibility() {
      const devTerminal = document.getElementById('dev-terminal');
      const isDev = document.body.classList.contains('theme-dev');
      if (devTerminal) devTerminal.classList.toggle('hidden', !isDev);
    }

    function toggleDinoGameVisibility() {
      const gameBox = document.querySelector('.game-container');
      if (gameBox) {
        const isDev = document.body.classList.contains('theme-dev');
        gameBox.style.display = isDev ? 'block' : 'none';
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
  
    function wrapContentInTerminalBoxes() {
      const elements = document.querySelectorAll('h1, h2, h3, h4, p');
      elements.forEach(el => {
        // Don't touch anything inside portfolio-item (important!)
        if (el.closest('.portfolio-item') || el.closest('.inline-terminal')) return;
    
        const wrapper = document.createElement('div');
        wrapper.className = 'terminal-box inline-terminal';
        
        const cloned = el.cloneNode(true); // Deep clone
        cloned.setAttribute('contenteditable', 'true');
    
        const terminalHeader = `
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">~/content/${el.tagName.toLowerCase()}</span>
          </div>
        `;
    
        wrapper.innerHTML = terminalHeader;
        wrapper.appendChild(cloned);
    
        el.replaceWith(wrapper);
        terminalizedElements.set(wrapper, el.cloneNode(true));
      });
    }
    
  
    function unwrapTerminalBoxes() {
      terminalizedElements.forEach((originalEl, wrapper) => {
        wrapper.replaceWith(originalEl);
      });
      terminalizedElements.clear(); // reset
    }
  
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const themeClass = button.getAttribute('data-theme');
        const wasDev = document.body.classList.contains('theme-dev');
        const goingDev = themeClass === 'theme-dev';
  
        if (wasDev && !goingDev) unwrapTerminalBoxes();
  
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-colorful', 'theme-dev');
        document.body.classList.add(themeClass);
  
        if (themeClass === 'theme-light') {
          introImage.src = './assets/headshot-image-light.png';
        } else if (themeClass === 'theme-dark') {
          introImage.src = './assets/headshot-image-dark.png';
        } else if (themeClass === 'theme-colorful') {
          introImage.src = './assets/headshot-image-colour.png';
        } else if (themeClass === 'theme-dev') {
          introImage.src = './assets/headshot-image-dev.png';
          updateDevTagLabels();
          wrapContentInTerminalBoxes();
        }
  
        toggleDevTerminalVisibility();
        toggleDinoGameVisibility();
      });
    });
  
    // Reveal-on-scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));
  
    // Portfolio popup
    const popup = document.getElementById('portfolioPopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupClose = document.getElementById('popupClose');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        popupImage.src = item.getAttribute('data-image');
        popupTitle.textContent = item.getAttribute('data-title');
        popupDescription.textContent = item.getAttribute('data-description');
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

  // form submission action
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.chat-form');
    const systemBubble = document.querySelector('.chat-bubble.system');
  
    if (form) {
      form.addEventListener('submit', function (e) {
        // Show a temporary success message
        systemBubble.textContent = "✅ Thanks for your message! I'll be in touch soon.";
  
        // Clear form fields after short delay (to allow Google Form submission)
        setTimeout(() => {
          form.reset();
        }, 1000); // 1 second delay ensures form submits before resetting
      });
    }
  });
  