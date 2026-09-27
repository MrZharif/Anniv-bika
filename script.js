const revealTargets = document.querySelectorAll(
  '.bio-card, .trailer-frame, .story-lore, .section-head'
);

revealTargets.forEach((el) => el.classList.add('fx-in'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const dots = document.querySelectorAll('.thread-dot');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach((dot) => {
          dot.classList.toggle('active', dot.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((sec) => navObserver.observe(sec));

document.querySelectorAll('.thread-dot').forEach((dot) => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const staffBtn = document.getElementById('staffBtn');
const codeOverlay = document.getElementById('codeOverlay');
const codeInput = document.getElementById('codeInput');
const birthdayModal = document.getElementById('birthdayModal');
const correctCode = '0505';

function enterFullscreen(el) {
  const elem = el || document.documentElement;
  if (elem.requestFullscreen) {
    return elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    return elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    return elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    return elem.msRequestFullscreen();
  }
  return Promise.resolve();
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    return document.msExitFullscreen();
  }
  return Promise.resolve();
}

if (staffBtn) {
  staffBtn.addEventListener('click', () => {
    showBirthdayModal();
  });
}

if (codeInput) {
  codeInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length === 4) {
      if (value === correctCode) {
        showBirthdayModal();
        codeOverlay.classList.remove('active');
      } else {
        codeInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
          codeInput.style.animation = '';
          codeInput.value = '';
        }, 500);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && codeOverlay) {
      codeOverlay.classList.remove('active');
    }
  });
}

const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

let confettiStyleAdded = false;

function showBirthdayModal() {
  if (birthdayModal) {
    const titleEl = birthdayModal.querySelector('.birthday-title');
    const subtitleEl = birthdayModal.querySelector('.birthday-subtitle');
    const messageEl = birthdayModal.querySelector('.birthday-message');
    const bonusBtn = birthdayModal.querySelector('#secretGiftBtn');

    if (titleEl) titleEl.textContent = 'Happy anniversary, Bika kayda :v';
    if (subtitleEl) subtitleEl.textContent = 'Pesan Spesial Dari gwehj';
    if (messageEl) {
      messageEl.innerHTML = `
        <p>Anjay si biru jadi pituber sepuh loh yah.. gak kerasa banyak hal yang udah dilewati selama setahun ini loh yah.</p>
        <p>Semoga ke depannya Bikayda makin sukses, terus berkembang, dan selalu ngasih karya-karya dan konten yang makin kreatif!</p>
        <p><strong><sp>moga gak kena sp di tahun selanjutnya bik xixixi</sp></strong></p>
      `;
    }
    if (bonusBtn) bonusBtn.style.display = 'none';

    birthdayModal.classList.add('active');
    createConfetti();
  }
}

function closeBirthday() {
  if (birthdayModal) {
    birthdayModal.classList.remove('active');
  }
}

function createConfetti() {
  const container = document.querySelector('.confetti-container');
  if (!container) return;

  container.innerHTML = '';

  if (!confettiStyleAdded) {
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
      @keyframes fall-confetti {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(confettiStyle);
    confettiStyleAdded = true;
  }

  const confettiPieces = 50;
  const colors = ['#38bdf8', '#0284c7', '#ffffff', '#0f172a', '#bae6fd'];

  for (let i = 0; i < confettiPieces; i++) {
    const confetti = document.createElement('div');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 2 + Math.random() * 1;
    const randomLeft = Math.random() * 100;
    const randomRotate = Math.random() * 360;

    confetti.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: ${randomColor};
      left: ${randomLeft}%;
      top: -10px;
      opacity: 1;
      transform: rotate(${randomRotate}deg);
      animation: fall-confetti ${randomDuration}s ease-in ${randomDelay}s forwards;
    `;

    container.appendChild(confetti);
  }
}

document.addEventListener('click', (e) => {
  if (birthdayModal && e.target === birthdayModal) {
    closeBirthday();
  }
});