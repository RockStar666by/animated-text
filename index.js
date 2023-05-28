'use strict';

const text =
  'Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit,<br>sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.';

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
  const video = document.getElementById('video');
  let isPlaying = true;

  video.onplaying = (event) => {
    isPlaying = true;
    console.log('playing');
  };

  video.onpause = (event) => {
    isPlaying = false;
    console.log('paused');
  };

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

video.oncanplay = (event) => {
  setTimeout(() => {
    typeText('str');
  }, 3000);
};
