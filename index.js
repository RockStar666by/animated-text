'use strict';

const text = 'Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit';
const video = document.getElementById('video');
let isPlaying = true;

function typeText(id) {
  const letters = text.replaceAll('<br>', '*').split('');
  const el = document.getElementById(id);

  (function addLetter() {
    if (letters.length > 0) {
      const letter = letters.shift();

      if (letter === '*') {
        el.innerHTML += '<br>';
      } else {
        el.innerHTML += `<span class="letter">${letter}</span>`;
      }

      addLetter();
    }
  })();

  const children = [...el.children];
  children[0].classList.add('animated');
  el.classList.add('animated-wrapper');

  (function addAnimation(child) {
    child.addEventListener('animationend', () => {
      if (child.nextSibling && !isPlaying) {
        const checkState = () => {
          const timer = setTimeout(checkState, 100);
          if (isPlaying) {
            clearTimeout(timer);
            child.nextSibling.classList.add('animated');
            addAnimation(child.nextSibling);
          }
        };
        checkState();
      }
      if (child.nextSibling && isPlaying) {
        child.nextSibling.classList.add('animated');
        addAnimation(child.nextSibling);
      }
    });
  })(children[0]);
}

video.onplaying = (event) => {
  isPlaying = true;
  console.log('playing2');
  setTimeout(() => {
    typeText('str');
    setTimeout(() => {
      const el = document.getElementById('str');
      el.classList.remove('animated-wrapper');
      el.innerHTML = '';
    }, 3000);
  }, 800);
};

video.onpause = (event) => {
  isPlaying = false;
  console.log('paused');
};
