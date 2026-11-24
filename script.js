/**
 * PORTFOLIO CLIENT APPLICATION — WARM CREAM EDITORIAL SPEC
 * Dynamic GitHub Repository Fetcher & Interactive Modules
 * Adbhut Pandey (@Adbhut1234)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAshSnap();
  initSnapEasterEgg();
  init3DCharacter();
  initGitHubProjects();
  initEmailCopy();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Dynamic GitHub Repository Fetcher & Filter
   ========================================================================== */

// Curated verified data from Adbhut1234's GitHub account (used as instant fallback if API is rate-limited)
const verifiedReposFallback = [
  {
    name: 'Codeverse',
    description: 'Cloud-based collaborative IDE with Monaco Editor, Next.js App Router, Prisma ORM, and PostgreSQL workspaces.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Adbhut1234/Codeverse'
  },
  {
    name: 'Zenith',
    description: 'Autonomous multimodal desktop agent powered by LiveKit WebRTC, Gemini Live API, and on-device SQLite vector memory.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Adbhut1234/Zenith'
  },
  {
    name: 'SIH-2026',
    description: 'Intelligent land record digitization and validation system built for Smart India Hackathon (Ministry of Rural Development).',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Adbhut1234/SIH-2026'
  },
  {
    name: 'Smart-Attendance-System',
    description: 'Biometric attendance system with real-time face detection, 128-d vector embeddings, and Appwrite cloud sync.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Adbhut1234/Smart-Attendance-System'
  },
  {
    name: 'Hackathon-Hack2skill',
    description: 'Full-stack hackathon project codebase developed for the Hack2skill engineering competition.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Adbhut1234/Hackathon-Hack2skill'
  },
  {
    name: 'register',
    description: "Domain registration automation utility for developer subdomains.",
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Adbhut1234/register'
  }
];

let allLoadedRepos = [];

async function initGitHubProjects() {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  try {
    const res = await fetch('https://api.github.com/users/Adbhut1234/repos?sort=updated&per_page=12');
    if (!res.ok) throw new Error('API request failed');

    const data = await res.json();
    
    // Filter out profile readme repository
    const filtered = data.filter(r => r.name !== 'Adbhut1234' && !r.fork);
    
    // Map with curated descriptions if GitHub description is blank
    allLoadedRepos = filtered.map(r => {
      const match = verifiedReposFallback.find(v => v.name.toLowerCase() === r.name.toLowerCase());
      return {
        name: r.name,
        description: r.description || (match ? match.description : 'Open source project by Adbhut Pandey.'),
        language: r.language || (match ? match.language : 'Code'),
        stargazers_count: r.stargazers_count || 0,
        forks_count: r.forks_count || 0,
        html_url: r.html_url
      };
    });

    if (allLoadedRepos.length === 0) {
      allLoadedRepos = verifiedReposFallback;
    }
  } catch (err) {
    // Graceful fallback to verified repositories
    console.info('Using verified local GitHub repositories cache:', err.message);
    allLoadedRepos = verifiedReposFallback;
  }

  // Ensure Codeverse and Zenith appear at the top
  allLoadedRepos.sort((a, b) => {
    if (a.name === 'Codeverse' || a.name === 'Zenith') return -1;
    if (b.name === 'Codeverse' || b.name === 'Zenith') return 1;
    return 0;
  });

  renderRepos(allLoadedRepos);
  setupFilterTabs();
}

function renderRepos(repos) {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  if (repos.length === 0) {
    container.innerHTML = `<div class="mono" style="color: var(--text-muted); padding: 2rem 0;">No repositories found for this filter.</div>`;
    return;
  }

  container.innerHTML = repos.map(repo => `
    <article class="project-repo-card snap-target">
      <div>
        <div class="repo-card-top">
          <span class="repo-lang-tag">${repo.language || 'Code'}</span>
          <span class="mono" style="font-size: 0.75rem; color: var(--text-dim);">GitHub</span>
        </div>
        <h3 class="repo-card-title">${repo.name}</h3>
        <p class="repo-card-desc">${repo.description || 'Open source software project.'}</p>
      </div>

      <div class="repo-card-footer">
        <div class="repo-stats">
          <span>★ ${repo.stargazers_count || 0}</span>
          <span>⑂ ${repo.forks_count || 0}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link-btn">
          <span>View Repo</span> ↗
        </a>
      </div>
    </article>
  `).join('');

  // Attach Reverse Thanos Snap to freshly rendered cards
  if (typeof observeSnapTargets === 'function') {
    observeSnapTargets(container.querySelectorAll('.snap-target'));
  }
}

function setupFilterTabs() {
  const tabs = document.querySelectorAll('.gh-filter-btn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const lang = tab.getAttribute('data-lang');

      if (lang === 'all') {
        renderRepos(allLoadedRepos);
      } else {
        const filtered = allLoadedRepos.filter(r => r.language && r.language.toLowerCase() === lang.toLowerCase());
        renderRepos(filtered);
      }
    });
  });
}

/* ==========================================================================
   2. Clipboard Copy & Toast Notification
   ========================================================================== */
function initEmailCopy() {
  const email = 'adbhutpandey93@gmail.com';
  const heroBtn = document.getElementById('hero-copy-email-btn');
  const contactBtn = document.getElementById('copy-contact-btn');

  function copy(e) {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ adbhutpandey93@gmail.com copied to clipboard');
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  }

  if (heroBtn) heroBtn.addEventListener('click', copy);
  if (contactBtn) contactBtn.addEventListener('click', copy);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   3. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInp = document.getElementById('form-name');
  const emailInp = document.getElementById('form-email');
  const msgInp = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Name
    const nameVal = nameInp.value.trim();
    const errName = document.getElementById('err-name');
    if (!nameVal || nameVal.length < 2) {
      errName.textContent = 'Please enter your name.';
      valid = false;
    } else {
      errName.textContent = '';
    }

    // Email
    const emailVal = emailInp.value.trim();
    const errEmail = document.getElementById('err-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      errEmail.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      errEmail.textContent = '';
    }

    // Message
    const msgVal = msgInp.value.trim();
    const errMsg = document.getElementById('err-msg');
    if (!msgVal || msgVal.length < 10) {
      errMsg.textContent = 'Please provide a message (minimum 10 characters).';
      valid = false;
    } else {
      errMsg.textContent = '';
    }

    if (!valid) return;

    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Message...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      form.reset();
      showToast(`Thank you ${nameVal}! Your message has been prepared.`);
    }, 850);
  });
}

/* ==========================================================================
   4. Smooth Scroll to Top
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   5. ASH PARTICLE DISPERSION & REASSEMBLY ENGINE (OPTIMIZED FOR 60FPS SMOOTH SCROLL)
   ========================================================================== */

let snapObserver = null;
let snapBatchIndex = 0;
let snapBatchTimer = null;

function initAshSnap() {
  if (!window.IntersectionObserver) {
    document.querySelectorAll('.snap-target').forEach(el => el.classList.add('snap-assembled'));
    return;
  }

  snapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;

      if (entry.isIntersecting) {
        // Entering viewport: Re-assemble once from ashes
        if (card.dataset.snapState !== 'assembled' && card.dataset.snapState !== 'assembling') {
          clearTimeout(snapBatchTimer);
          const currentDelay = snapBatchIndex * 60;
          snapBatchIndex++;
          snapBatchTimer = setTimeout(() => { snapBatchIndex = 0; }, 180);

          assembleWithAshes(card, currentDelay);
          snapObserver.unobserve(card); // Clean unobserve prevents repeated scroll thrashing
        }
      }
    });
  }, {
    root: null,
    rootMargin: '60px 0px 60px 0px',
    threshold: 0.1
  });

  observeSnapTargets(document.querySelectorAll('.snap-target'));
}

function observeSnapTargets(targets) {
  if (!targets || !snapObserver) return;
  targets.forEach(target => {
    snapObserver.observe(target);
  });
}

function cleanCardAnimation(card) {
  if (card._animId) {
    cancelAnimationFrame(card._animId);
    card._animId = null;
  }
  if (card._timeoutId) {
    clearTimeout(card._timeoutId);
    card._timeoutId = null;
  }
  const existingCanvas = card.querySelector('.ash-snap-canvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }
}

/**
 * REVERSE THANOS SNAP:
 * High-performance ash particles swirl inward and assemble the card.
 */
function assembleWithAshes(card, delayMs = 0) {
  if (!card) return;
  cleanCardAnimation(card);
  card.dataset.snapState = 'assembling';

  card._timeoutId = setTimeout(() => {
    const rect = card.getBoundingClientRect();
    const width = Math.max(rect.width, 140);
    const height = Math.max(rect.height, 100);
    const padding = 35;

    const canvas = document.createElement('canvas');
    canvas.className = 'ash-snap-canvas';
    canvas.width = width + padding * 2;
    canvas.height = height + padding * 2;
    canvas.style.width = `${width + padding * 2}px`;
    canvas.style.height = `${height + padding * 2}px`;
    canvas.style.top = `-${padding}px`;
    canvas.style.left = `-${padding}px`;

    card.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });

    const particleCount = Math.min(22, Math.max(12, Math.floor((width * height) / 9500)));
    const particles = [];
    const ashColors = [
      'rgba(17, 17, 17, ',
      'rgba(35, 35, 35, ',
      'rgba(60, 60, 60, ',
      'rgba(95, 95, 95, ',
      'rgba(140, 135, 125, '
    ];

    for (let i = 0; i < particleCount; i++) {
      const targetX = padding + Math.random() * width;
      const targetY = padding + Math.random() * height;
      const windAngle = -Math.PI * 0.28 + (Math.random() - 0.5) * 1.5;
      const distance = 60 + Math.random() * 100;
      const originX = targetX + Math.cos(windAngle) * distance;
      const originY = targetY + Math.sin(windAngle) * distance;

      particles.push({
        originX, originY,
        targetX, targetY,
        x: originX, y: originY,
        size: Math.random() * 3.5 + 1.6,
        colorBase: ashColors[i % ashColors.length],
        maxAlpha: Math.random() * 0.65 + 0.35,
        isFlake: i % 2 === 0,
        curlFreq: Math.random() * 2.0 + 1.0,
        curlAmp: (Math.random() - 0.5) * 20,
        stagger: Math.random() * 0.22
      });
    }

    card.classList.remove('snap-disintegrating');
    setTimeout(() => {
      card.classList.add('snap-assembling');
    }, 100);

    const animDuration = 650;
    let startTimestamp = null;

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function renderAssembleFrame(now) {
      if (!startTimestamp) startTimestamp = now;
      const elapsed = now - startTimestamp;
      const overallProgress = Math.min(1, elapsed / animDuration);

      ctx.clearRect(0, 0, width + padding * 2, height + padding * 2);
      let anyParticleActive = false;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (overallProgress < p.stagger) {
          anyParticleActive = true;
          continue;
        }

        const pProgress = Math.min(1, (overallProgress - p.stagger) / (1 - p.stagger));
        if (pProgress < 1) anyParticleActive = true;

        const ease = easeInOutQuad(pProgress);
        const dx = p.targetX - p.originX;
        const dy = p.targetY - p.originY;
        const curl = Math.sin(pProgress * Math.PI * p.curlFreq) * p.curlAmp * (1 - ease);

        p.x = p.originX + dx * ease;
        p.y = p.originY + dy * ease + curl;

        let alpha = p.maxAlpha;
        if (pProgress < 0.2) {
          alpha = (pProgress / 0.2) * p.maxAlpha;
        } else if (pProgress > 0.8) {
          alpha = ((1 - pProgress) / 0.2) * p.maxAlpha;
        }

        if (alpha > 0.02) {
          ctx.fillStyle = `${p.colorBase}${alpha})`;
          if (p.isFlake) {
            ctx.fillRect(p.x, p.y, p.size * 1.3, p.size * 0.7);
          } else {
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }
      }

      if (overallProgress < 1 || anyParticleActive) {
        card._animId = requestAnimationFrame(renderAssembleFrame);
      } else {
        card.classList.remove('snap-assembling');
        card.classList.add('snap-assembled');
        card.dataset.snapState = 'assembled';
        canvas.remove();
      }
    }

    card._animId = requestAnimationFrame(renderAssembleFrame);
  }, delayMs);
}

/**
 * FORWARD THANOS SNAP:
 * Card dissolves into ash particles that get torn away by the wind.
 */
function disintegrateWithAshes(card, delayMs = 0) {
  if (!card) return;
  cleanCardAnimation(card);
  card.dataset.snapState = 'disintegrating';

  card._timeoutId = setTimeout(() => {
    const rect = card.getBoundingClientRect();
    const width = Math.max(rect.width, 140);
    const height = Math.max(rect.height, 100);
    const padding = 35;

    const canvas = document.createElement('canvas');
    canvas.className = 'ash-snap-canvas';
    canvas.width = width + padding * 2;
    canvas.height = height + padding * 2;
    canvas.style.width = `${width + padding * 2}px`;
    canvas.style.height = `${height + padding * 2}px`;
    canvas.style.top = `-${padding}px`;
    canvas.style.left = `-${padding}px`;

    card.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });

    const particleCount = Math.min(22, Math.max(12, Math.floor((width * height) / 9500)));
    const particles = [];
    const ashColors = [
      'rgba(17, 17, 17, ',
      'rgba(30, 30, 30, ',
      'rgba(50, 50, 50, ',
      'rgba(80, 80, 80, ',
      'rgba(120, 115, 105, '
    ];

    for (let i = 0; i < particleCount; i++) {
      const originX = padding + Math.random() * width;
      const originY = padding + Math.random() * height;
      const windAngle = -Math.PI * 0.28 + (Math.random() - 0.5) * 1.3;
      const distance = 70 + Math.random() * 110;
      const targetX = originX + Math.cos(windAngle) * distance;
      const targetY = originY + Math.sin(windAngle) * distance;

      particles.push({
        originX, originY,
        targetX, targetY,
        x: originX, y: originY,
        size: Math.random() * 3.5 + 1.6,
        colorBase: ashColors[i % ashColors.length],
        maxAlpha: Math.random() * 0.75 + 0.25,
        isFlake: i % 2 === 0,
        curlFreq: Math.random() * 2.0 + 1.0,
        curlAmp: (Math.random() - 0.5) * 22,
        stagger: Math.random() * 0.24
      });
    }

    card.classList.remove('snap-assembled', 'snap-assembling');
    card.classList.add('snap-disintegrating');

    const animDuration = 650;
    let startTimestamp = null;

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function renderDisintegrateFrame(now) {
      if (!startTimestamp) startTimestamp = now;
      const elapsed = now - startTimestamp;
      const overallProgress = Math.min(1, elapsed / animDuration);

      ctx.clearRect(0, 0, width + padding * 2, height + padding * 2);
      let anyParticleActive = false;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (overallProgress < p.stagger) {
          anyParticleActive = true;
          continue;
        }

        const pProgress = Math.min(1, (overallProgress - p.stagger) / (1 - p.stagger));
        if (pProgress < 1) anyParticleActive = true;

        const ease = easeOutQuad(pProgress);
        const dx = p.targetX - p.originX;
        const dy = p.targetY - p.originY;
        const curl = Math.sin(pProgress * Math.PI * p.curlFreq) * p.curlAmp * ease;

        p.x = p.originX + dx * ease;
        p.y = p.originY + dy * ease + curl;

        const alpha = Math.max(0, (1 - pProgress) * p.maxAlpha);

        if (alpha > 0.02) {
          ctx.fillStyle = `${p.colorBase}${alpha})`;
          if (p.isFlake) {
            ctx.fillRect(p.x, p.y, p.size * 1.3, p.size * 0.7);
          } else {
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }
      }

      if (overallProgress < 1 || anyParticleActive) {
        card._animId = requestAnimationFrame(renderDisintegrateFrame);
      } else {
        card.classList.remove('snap-disintegrating');
        card.dataset.snapState = 'disintegrated';
        canvas.remove();
      }
    }

    card._animId = requestAnimationFrame(renderDisintegrateFrame);
  }, delayMs);
}

/**
 * Interactive Snap Easter Egg:
 * Button allows user to trigger the dual snap on all visible project cards.
 */
function initSnapEasterEgg() {
  const btn = document.getElementById('snap-trigger-btn');
  if (!btn) return;

  let isDisintegrated = false;
  btn.addEventListener('click', () => {
    const cards = document.querySelectorAll('#github-repos-container .snap-target');
    if (!cards || cards.length === 0) return;

    if (!isDisintegrated) {
      isDisintegrated = true;
      btn.innerHTML = `<span>✦ Reverse Snap</span>`;
      cards.forEach((card, idx) => {
        disintegrateWithAshes(card, idx * 85);
      });
    } else {
      isDisintegrated = false;
      btn.innerHTML = `<span>✦ Ash Dispersion</span>`;
      cards.forEach((card, idx) => {
        assembleWithAshes(card, idx * 100);
      });
    }
  });
}

/* ==========================================================================
   6. INTERACTIVE 3D HOLOGRAPHIC CHARACTER STAGE (PROPER 3D DEPTH & AMBIENT AURA)
   ========================================================================== */

function init3DCharacter() {
  const stage = document.getElementById('character-3d-stage');
  const body = document.getElementById('character-3d-body');
  const specular = document.getElementById('character-specular');
  const aura = document.getElementById('hero-aura');
  const bgCanvas = document.getElementById('hero-particles-bg');
  const fgCanvas = document.getElementById('hero-particles-fg');
  const heroStage = document.getElementById('hero-3d-stage');

  if (!stage || !body) return;

  // 3D Motion Physics & State
  let targetRotX = 0, targetRotY = 0;
  let targetTransX = 0, targetTransY = 0;
  let currentRotX = 0, currentRotY = 0;
  let currentTransX = 0, currentTransY = 0;
  let animId = null;
  let isHeroVisible = true;

  // Window mouse movement tracking
  window.addEventListener('mousemove', (e) => {
    if (!isHeroVisible) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const normX = (e.clientX - centerX) / centerX; // -1 to 1
    const normY = (e.clientY - centerY) / centerY; // -1 to 1

    targetRotY = normX * 22;     // up to 22 deg yaw
    targetRotX = -normY * 16;    // up to 16 deg pitch
    targetTransX = normX * 18;   // horizontal shift
    targetTransY = normY * 12;   // vertical shift

    if (specular) {
      const lightX = 50 + normX * 35;
      const lightY = 40 + normY * 35;
      specular.style.background = `radial-gradient(circle 320px at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.3) 0%, rgba(225, 29, 72, 0.14) 45%, transparent 75%)`;
    }
  }, { passive: true });

  // Reset to neutral forward-facing pose when cursor leaves window
  document.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    targetTransX = 0;
    targetTransY = 0;
    if (specular) {
      specular.style.background = 'radial-gradient(circle 300px at 50% 40%, rgba(255, 255, 255, 0.22) 0%, rgba(225, 29, 72, 0.1) 45%, transparent 75%)';
    }
  });

  // Color-Mixing Particle Systems (Background & Foreground depth layers)
  const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
  const fgCtx = fgCanvas ? fgCanvas.getContext('2d') : null;

  function resizeCanvases() {
    const rect = stage.getBoundingClientRect();
    const w = Math.round(rect.width) + 40;
    const h = Math.round(rect.height) + 40;
    if (bgCanvas) {
      bgCanvas.width = w;
      bgCanvas.height = h;
    }
    if (fgCanvas) {
      fgCanvas.width = w;
      fgCanvas.height = h;
    }
  }

  resizeCanvases();
  window.addEventListener('resize', resizeCanvases, { passive: true });

  // Create red, amber, and ruby mixing particles
  function createParticle(isForeground, w, h) {
    const palette = [
      'rgba(225, 29, 72, ',   // Crimson
      'rgba(244, 63, 94, ',   // Rose
      'rgba(245, 158, 11, ',  // Amber
      'rgba(239, 68, 68, ',   // Red
      'rgba(251, 146, 60, '   // Orange gold
    ];

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      radius: isForeground ? (Math.random() * 2.8 + 1.4) : (Math.random() * 2.2 + 1.0),
      color: palette[Math.floor(Math.random() * palette.length)],
      baseAlpha: isForeground ? (Math.random() * 0.5 + 0.35) : (Math.random() * 0.35 + 0.18),
      speedY: isForeground ? -(Math.random() * 0.7 + 0.35) : -(Math.random() * 0.45 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      oscillationAmp: Math.random() * 1.6 + 0.6,
      oscillationSpeed: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2
    };
  }

  const bgParticles = [];
  const fgParticles = [];
  const bgCount = 16;
  const fgCount = 12;

  const initW = stage.clientWidth || 480;
  const initH = stage.clientHeight || 520;

  for (let i = 0; i < bgCount; i++) bgParticles.push(createParticle(false, initW, initH));
  for (let i = 0; i < fgCount; i++) fgParticles.push(createParticle(true, initW, initH));

  function updateAndDrawParticles(ctx, particles, w, h, parallaxFactor) {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const shiftX = currentTransX * parallaxFactor;
    const shiftY = currentTransY * parallaxFactor;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.phase += p.oscillationSpeed;
      p.x += Math.sin(p.phase) * p.oscillationAmp * 0.4 + p.speedX;

      // Wrap around bounds
      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const alphaPulse = p.baseAlpha * (0.8 + 0.2 * Math.sin(p.phase));
      ctx.fillStyle = `${p.color}${alphaPulse.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x + shiftX, p.y + shiftY, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Smooth 60-120fps Render Loop with Physics Easing
  function renderFrame() {
    if (!isHeroVisible) return;

    // Smooth Lerp (Linear Interpolation)
    const lerpSpeed = 0.085;
    currentRotX += (targetRotX - currentRotX) * lerpSpeed;
    currentRotY += (targetRotY - currentRotY) * lerpSpeed;
    currentTransX += (targetTransX - currentTransX) * lerpSpeed;
    currentTransY += (targetTransY - currentTransY) * lerpSpeed;

    // Apply 3D Transform to Character Body
    body.style.transform = `translate3d(${currentTransX.toFixed(2)}px, ${currentTransY.toFixed(2)}px, 20px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    // Counter-parallax on background ambient red aura
    if (aura) {
      const auraShiftX = -currentTransX * 0.55;
      const auraShiftY = -currentTransY * 0.45;
      aura.style.transform = `translate3d(calc(-50% + ${auraShiftX.toFixed(2)}px), calc(-50% + ${auraShiftY.toFixed(2)}px), 0) scale(1.05)`;
    }

    // Render particles
    if (bgCanvas && bgCtx) {
      updateAndDrawParticles(bgCtx, bgParticles, bgCanvas.width, bgCanvas.height, -0.4);
    }
    if (fgCanvas && fgCtx) {
      updateAndDrawParticles(fgCtx, fgParticles, fgCanvas.width, fgCanvas.height, 0.7);
    }

    animId = requestAnimationFrame(renderFrame);
  }

  // Offscreen Pause: 0% CPU/GPU overhead when scrolled away from Hero
  if (heroStage && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible) {
          if (!animId) animId = requestAnimationFrame(renderFrame);
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroStage);
  } else {
    animId = requestAnimationFrame(renderFrame);
  }
}
