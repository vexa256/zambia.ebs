var css = `
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
}

.spinner {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  animation: rotation 2s infinite linear;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3498db;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1.0s;
}

.spinner::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    border: 6px solid;
    border-top-color: #9c27b0;    /* Purple */
    border-right-color: #e91e63;  /* Pink */
    border-bottom-color: #00bcd4; /* Cyan */
    border-left-color: #ff9800;   /* Orange */
    top: -10%;
    left: -10%;
    animation: rotation 2s infinite linear;
  }
  

@keyframes sk-bounce {
  0%, 100% { transform: scale(0.0); }
  50% { transform: scale(1.0); }
}

@keyframes rotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`;

var style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

// Create and inject overlay div and its children
var overlay = document.createElement('div');
overlay.id = 'overlay';

var spinner = document.createElement('div');
spinner.className = 'spinner';

var bounce1 = document.createElement('div');
bounce1.className = 'double-bounce1';
spinner.appendChild(bounce1);

var bounce2 = document.createElement('div');
bounce2.className = 'double-bounce2';
spinner.appendChild(bounce2);

overlay.appendChild(spinner);
document.body.appendChild(overlay);

// Remove loader once page has loaded
window.addEventListener('load', function() {
  overlay.style.display = 'none';
});

