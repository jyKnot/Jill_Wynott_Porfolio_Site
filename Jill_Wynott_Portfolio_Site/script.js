    // THEMES 

document.addEventListener('DOMContentLoaded', () => {  // ensures the script runs after HTML is loaded
    const themeButtons = document.querySelectorAll('.theme-toggle'); // selects all elements on the page with the .theme-toggle class
    const introImage = document.querySelector('#intro-section .intro-image img'); // selects my headshot in the intro section
  
    const terminalizedElements = new Map(); // Stores original elements when switching themes
  
    function toggleDevTerminalVisibility() { // controls visibiliyt of the dev theme terminal
      const devTerminal = document.getElementById('dev-terminal'); // gets the html element with id dev-terminal
      const isDev = document.body.classList.contains('theme-dev'); // checks if the body has class theme-dev
      if (devTerminal) devTerminal.classList.toggle('hidden', !isDev); // hides the terminal unless dev theme is activated
    }

    function toggleDinoGameVisibility() { //controls if the Dino game is visible on the page based on what theme is activated
      const gameBox = document.querySelector('.game-container'); //selects html elements with a class of .game-container
      if (gameBox) { //checks game container
        const isDev = document.body.classList.contains('theme-dev'); // checks if the dev theme is activated by the class theme-dev
        gameBox.style.display = isDev ? 'block' : 'none'; // if dev-theme is active, the dino game is displayed
      }
    }
  
    function updateDevTagLabels() { //adds a custom attribute to html elements so thier tag can be easily identified
      const tagsToLabel = ['H1', 'H2', 'H3', 'H4', 'P']; // html tags to label
      tagsToLabel.forEach(tag => { // for each tag, perform the following
        document.querySelectorAll(tag).forEach(el => { //select all elements with that tag
          el.setAttribute('data-tag', tag.toLowerCase()); // adds a data tag to each element
        });
      });
    }
  
    function wrapContentInTerminalBoxes() {  // function will find elements and wrap them in the stylized terminal 
      const elements = document.querySelectorAll('h1, h2, h3, h4, p'); // elements to turn into the terminal
      elements.forEach(el => { //starts a loop for each mathcing element, the following code will run
        // Don't touch anything inside portfolio-item (important!)
          if (
            el.closest('.portfolio-item') || 
            el.closest('.inline-terminal') || 
            el.closest('.portfolio-popup')
          ) return;
        // if this item has already been turned into a stylized terminal, then skip it
        // || = if either of these conditions are true
    
        const wrapper = document.createElement('div'); // makes a new html div element in a variable named wrapper - does not exist on the page yet
        wrapper.className = 'terminal-box inline-terminal'; // terminal-box - makes the div look like a terminal. inline-terminal - styling that keep ths terminal block inline
        // - take this box, and put these two labels into it
        
        
        
        const cloned = el.cloneNode(true);
        cloned.setAttribute('contenteditable', 'true');
        cloned.classList.add('dev-editable-content');

        cloned.addEventListener('focus', () => {
          const cursor = wrapper.querySelector('.blinking-cursor-overlay');
          if (cursor) cursor.style.display = 'block';
        });

        cloned.addEventListener('blur', () => {
          const cursor = wrapper.querySelector('.blinking-cursor-overlay');
          if (cursor) cursor.style.display = 'none';
        });


        const cursor = document.createElement('div');
        cursor.className = 'blinking-cursor-overlay';
        wrapper.appendChild(cursor);





        // this block creates the terminal look, adding the terminal header, red, yellow and green dots and the path 
        const terminalHeader = ` 
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">~/content/${el.tagName.toLowerCase()}</span>
          </div>
        `;

        wrapper.innerHTML = terminalHeader; // this puts the title bar and buttons into the first box - the header of the terminal
        wrapper.appendChild(cloned); // adds the copied content inside
    
        el.replaceWith(wrapper); // replaces the content with the stylized terminal screen in the same spot
        terminalizedElements.set(wrapper, el.cloneNode(true)); // files away the original for when you call it back - restores the original element later if/when needed
      });
    }
    
  
    function unwrapTerminalBoxes() { //function to reverse the termianl box wrapper and restore the original content
      terminalizedElements.forEach((originalEl, wrapper) => { // starts to loop through every entry in the terminalized element
        wrapper.replaceWith(originalEl); // replaces the original content with the original html - undoing the terminal transformation
      });
      terminalizedElements.clear(); // resets so the wrapping can happen again if needed
    }
  

    themeButtons.forEach(button => { // loops through each theme button
      button.addEventListener('click', () => { // listens for clicks on each button so something happens on each click
        const themeClass = button.getAttribute('data-theme'); // grabs the data-theme when clicked (theme-light, theme-dark, theme-colour, theme-dev
        const wasDev = document.body.classList.contains('theme-dev'); // checks if the page is in dev mode before making any changes
        const goingDev = themeClass === 'theme-dev'; // checks if the theme the user selected is dev theme
  
        if (wasDev && !goingDev) unwrapTerminalBoxes(); // if the user was in dev mode and picks a new theme that is not dev mode, remove terminal wrappers and restore the original content
  
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-colorful', 'theme-dev'); //ensures only one theme is active at a time
        document.body.classList.add(themeClass); // theme class is pulled from the clicked button
  
        if (themeClass === 'theme-light') { // if the selected theme is theme-light, update the intro image to headshot-image-light 
          introImage.src = './assets/headshot-image-light.png';
        } else if (themeClass === 'theme-dark') { // if the selected theme is theme-dark, update the intro image to headshot-image-dark 
          introImage.src = './assets/headshot-image-dark.png';
        } else if (themeClass === 'theme-colorful') { // if the selected theme is theme-colourful, update the intro image to headshot-image-colourful
          introImage.src = './assets/headshot-image-colour.png';
        } else if (themeClass === 'theme-dev') { // if the selected theme is theme-dev, update the intro image to headshot-image-dev
          introImage.src = './assets/headshot-image-dev.png';
          updateDevTagLabels(); // calls function to add data-tag attribute to all headings and paragraphs
          wrapContentInTerminalBoxes(); // calls function to activate terminal styling
  
          // Terminal boot animation
          const bootTerminal = document.getElementById('boot-terminal');// find the part of the page that looks like a terminal window
          const bootLines = document.getElementById('boot-lines'); // find the area inside the terminal window where messages will appear
          bootTerminal.classList.remove('hidden'); // make the terminal window appear by changing its CSS classes
          bootTerminal.classList.add('visible');

          // this is a list of pretend "boot-up" messages, like what you'd see on a computer starting up
        const messages = [
              "[OK] Booting Developer Theme...",  
              "[OK] Checking system integrity...",
              "[OK] Loading terminal interface...",
              "[OK] Applying dark shell styling...",
              "[OK] Injecting creativity...",
              "[OK] Initializing portfolio modules...",
              "[OK] Connecting to GitHub...",
              "[OK] Verifying projects...",
              "[OK] Compiling UI assets...",
              "[OK] Launch successful 🚀",
              "Welcome, @yKnot"
            ];

          let idx = 0;  // keeps track of which message we’re showing
          function typeBootLine() {
            if (idx < messages.length) {  // add the current message to the terminal
              bootLines.textContent += messages[idx] + "\n";
              idx++;
              setTimeout(typeBootLine, 800);    // wait 800 milliseconds, then show the next message
            } else {     // after all messages are shown, wait 3 seconds, then hide the terminal
              setTimeout(() => {
                bootTerminal.classList.remove('visible');
                bootTerminal.classList.add('hidden');
              }, 3000); // fade out after full message
            }
          }
          typeBootLine(); // start typing the boot messages when the page runs this script


                  }
            
                  toggleDevTerminalVisibility(); // checks if theme dev is active, and if so shows the dev terminal
                  toggleDinoGameVisibility(); // checks if theem dev is active, and if so displays the dino game
                });
              });
            



    

    // SCROLLYTELLING 


    const revealElements = Array.from(document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right'))
  .filter(el => !el.closest('#portfolio-section'));

    const observer = new IntersectionObserver((entries) => { // observer (motion sensor) that watches elements on the page and triggers actions when they enter or exit the viewport
      entries.forEach(entry => { // loop that checks if each element is visible in the viewport
        if (entry.isIntersecting) { // boolean that becomes true when the element crosses the threshold of visibility (set to 0.15, or 15% visable)
          entry.target.classList.add('revealed'); // class revealed triggers the CSS animation - 'the object is starting to come into view - time to make it move!'
        } else { //
          entry.target.classList.remove('revealed'); // removes the revealed class which hodes the animation
        }
      }); 
    }, { threshold: 0.15 }); // threshold set to action when 15% of the element is visable on the viewport
    revealElements.forEach(el => observer.observe(el)); // assigns a 'motion sensor' to each element on the page with a reveal related class
  

    // TURN OFF SCROLLYTELLING ON MOBILE 


const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (!isMobile) {
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
} else {
  // Instantly reveal all elements without animation on mobile
  document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right')
    .forEach(el => el.classList.add('revealed'));
}






// PORTFOLIO POPUP 


const popup = document.getElementById('portfolioPopup');
const popupImage = document.getElementById('popupImage');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const popupClose = document.getElementById('popupClose');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Check that everything exists before binding events
if (popup && popupImage && popupTitle && popupDescription && popupClose) {
  portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const image = item.getAttribute('data-image') || '';
      const title = item.getAttribute('data-title') || 'Untitled Project';
      const descEl = item.querySelector('.portfolio-description-content');
      const desc = descEl ? descEl.textContent.trim() : (item.getAttribute('data-description') || 'No description available.');


      popupImage.src = image;
      popupTitle.textContent = title;
      popupDescription.textContent = desc;

      popup.classList.remove('hidden');
      popup.classList.add('visible');
    });
  });

  popupClose.addEventListener('click', () => {
    closePopup();
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  function closePopup() {
    popup.classList.remove('visible');
    popup.classList.add('hidden');
    popupImage.src = '';
    popupTitle.textContent = '';
    popupDescription.textContent = '';
  }
} else {
  console.warn('Popup elements not found — popup functionality disabled.');
}




  
    popupClose.addEventListener('click', () => { // sets event listener to the popups close button
      popup.classList.remove('visible'); // hides the popup by removing any styling
      popup.classList.add('hidden'); // applies CSS class hidden
      popupImage.src = '';
      popupTitle.textContent = '';
      popupDescription.textContent = '';
          
    });
  
    popup.addEventListener('click', (e) => { // sets event listener to the entire popup background
      if (e.target === popup) { // checks if the click was on the background, and not inside the inner content
        popup.classList.remove('visible'); // hides the popup by removing any styling
        popup.classList.add('hidden'); // applies the hidden class
      }
    });
  });






  // FORM SUBMISSION
  
  document.addEventListener('DOMContentLoaded', () => { // ensures the code runs after the HTML document has fully loaded
    const form = document.querySelector('.chat-form'); // grabs the HTML class .chat-form and stores it in the form variable
    const systemBubble = document.querySelector('.chat-bubble.system'); // grabs the HTML class .chat-bubble.system and stores it in the systemBubble variable
  
    if (form) { // checks the form was successfully found
      form.addEventListener('submit', function (e) { // adds an event listener for the submit button is selected
        systemBubble.textContent = "✅ Thanks for your message! I'll be in touch soon."; // shows a temporary success message
        setTimeout(() => { // clears form fields after short delay (to allow time for Google Form submission)
          form.reset(); // clears all fields in form and resets to default (empty)
        }, 1000); // 1 second delay ensures form submits before resetting
      });
    }
  });
  

