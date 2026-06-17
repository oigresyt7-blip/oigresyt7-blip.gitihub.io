document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section:not(#hero)');
  const navIcons = document.querySelectorAll('.nav-icon');
  const hiddenNav = document.querySelector('.hidden-nav');
  const easterEgg = document.querySelector('.easter-egg');
  const accessModal = document.querySelector('.access-modal');
  const accessBtn = document.querySelector('.access-btn');
  const exploreBtn = document.querySelector('.explore-btn');
  const body = document.querySelector('body');
  const particlesContainer = document.getElementById('particles');
  const passwordSection = document.getElementById('password-section');
  const submitPasswordBtn = document.getElementById('submit-password');
  const closePasswordBtn = document.getElementById('close-password');
  const passwordInput = document.querySelector('.password-input');
  const transmitBtn = document.getElementById('transmit-btn');
  const transmissionOverlay = document.getElementById('transmission-overlay');
  const progressBar = document.getElementById('progress-bar');
  const transmissionText = document.getElementById('transmission-text');
  const secretCloseBtn = document.getElementById('secret-close');
  const secretCodeReveal = document.getElementById('secret-code-reveal');
  const celebrationContainer = document.getElementById('celebration');
  const timelineDots = document.querySelectorAll('.timeline-dot');
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  const skillBars = document.querySelectorAll('.skill-progress');

  let currentTestimonial = 0;
  let accessGranted = false;

  // Create floating particles
  function createParticles() {
    const count = 50;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  // Initially hide all sections except hero
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  // Testimonials slider functionality
  function showTestimonial(index) {
    testimonialItems.forEach((item) => (item.style.display = 'none'));
    testimonialItems[index].style.display = 'block';
  }

  prevButton.addEventListener('click', () => {
    currentTestimonial =
      (currentTestimonial - 1 + testimonialItems.length) %
      testimonialItems.length;
    showTestimonial(currentTestimonial);
  });

  nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
  });

  // Initialize testimonials
  showTestimonial(0);

  function grantAccess() {
    accessGranted = true;
    exploreBtn.textContent = 'Access Granted';
    exploreBtn.classList.add('granted');

    // Show hidden sections with animation
    setTimeout(() => {
      sections.forEach((section) => {
        section.style.display = 'flex';
        setTimeout(() => {
          section.classList.add('visible');
        }, 100);
      });

      // Show navigation and easter egg
      hiddenNav.classList.add('visible');
      setTimeout(() => {
        easterEgg.classList.add('visible');
      }, 1000);

      // Scroll to about section
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  // Explore button functionality
  exploreBtn.addEventListener('click', () => {
    grantAccess();
  });

  // Navigation functionality
  navIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      if (!accessGranted) {
        showAccessDenied();
        return;
      }

      const sections = document.querySelectorAll('section');
      sections[index].scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Show access denied modal
  function showAccessDenied() {
    accessModal.classList.add('active');
  }

  // Close access denied modal
  accessBtn.addEventListener('click', () => {
    accessModal.classList.remove('active');
  });

  // Add click effect to dots
  timelineDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '40px';
      ripple.style.height = '40px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(138, 43, 226, 0.3)';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'ripple 0.6s linear';

      dot.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Animate skill bars when they come into view
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width;
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillsObserver.observe(bar);
  });

  // Easter egg functionality
  const egg = document.querySelector('.easter-egg');
  const modal = document.querySelector('.secret-modal');
  const closeModal = document.querySelectorAll('.close-modal');

  egg.addEventListener('click', () => {
    if (!accessGranted) {
      showAccessDenied();
      return;
    }
    passwordSection.classList.add('active');
  });

  // Close modals
  closeModal.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target
        .closest('.secret-modal, .project-modal')
        .classList.remove('active');
    });
  });

  // Close secret modal with button
  secretCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Password section functionality
  submitPasswordBtn.addEventListener('click', () => {
    if (passwordInput.value === 'BERGE-2026') {
      passwordSection.classList.remove('active');
      createCelebration();
      modal.classList.add('active');
      document.querySelectorAll('.project-card').forEach((card) => {
        card.classList.add('unlocked');
      });
    } else {
      passwordInput.style.borderColor = 'var(--neon-pink)';
      passwordInput.style.boxShadow = '0 0 10px var(--neon-pink)';
      setTimeout(() => {
        passwordInput.style.borderColor = 'var(--accent)';
        passwordInput.style.boxShadow = 'none';
      }, 1000);
    }
  });

  closePasswordBtn.addEventListener('click', () => {
    passwordSection.classList.remove('active');
  });

  // Create celebration effect
  function createCelebration() {
    celebrationContainer.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
      confetti.style.animation = `confetti-fall ${
        Math.random() * 3 + 2
      }s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + 's';
      celebrationContainer.appendChild(confetti);
    }

    setTimeout(() => {
      celebrationContainer.innerHTML = '';
    }, 5000);
  }

  // Project card modals
  const DetailBtns = document.querySelectorAll('.detail-btn');
  const projectModals = document.querySelectorAll('.project-modal');
  const CloseBtns = document.querySelectorAll('.close-btn');

  DetailBtns.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!accessGranted) {
        showAccessDenied();
        return;
      }

      const modalId = card.getAttribute('data-modal');
      document.getElementById(modalId).classList.add('active');
    });
  });

  CloseBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.target.closest('.project-modal').classList.remove('active');
    });
  });

  // Transmission animation
  transmitBtn.addEventListener('click', () => {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      // Highlight empty fields
      const inputs = document.querySelectorAll('.terminal-input');
      inputs.forEach((input) => {
        if (!input.value) {
          input.style.borderColor = 'var(--neon-pink)';
          input.style.boxShadow = '0 0 10px var(--neon-pink)';
          setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
          }, 2000);
        }
      });
      return;
    }

    // Show transmission overlay
    transmissionOverlay.classList.add('active');

    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = progress + '%';

      if (progress === 20)
        transmissionText.textContent = 'Establishing quantum encryption...';
      if (progress === 40)
        transmissionText.textContent = 'Routing through secure channels...';
      if (progress === 60)
        transmissionText.textContent = 'Transmitting data packets...';
      if (progress === 80)
        transmissionText.textContent = 'Finalizing transmission...';

      if (progress >= 100) {
        clearInterval(interval);

        // Small delay so bar hits 100% first, then show complete message
        setTimeout(() => {
          transmissionText.textContent =
            'Transmission complete! Message received.';
            const textoWhatsApp =
`Olá Sérgio!

Nome: ${name}
Email: ${email}

Mensagem:
${message}`;

const numeroWhatsApp = '55989874009468'; // coloque seu número

window.open(
  `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`,
  '_blank'
);
          secretCodeReveal.style.display = 'block';

          setTimeout(() => {
            transmissionOverlay.classList.remove('active');
            progressBar.style.width = '0%';
            transmissionText.textContent = 'Initializing secure connection...';
            secretCodeReveal.style.display = 'none';

            // Reset form
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-email').value = '';
            document.getElementById('contact-message').value = '';
          }, 5000);
        }, 3000); 
      }
    }, 30);
  });

  // Scroll animation for elements
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && accessGranted) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Terminal input focus
  const terminalInputs = document.querySelectorAll('.terminal-input');
  terminalInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // Prevent scrolling if access not granted
  window.addEventListener('scroll', (e) => {
    if (!accessGranted && window.scrollY > window.innerHeight * 0.5) {
      window.scrollTo(0, 0);
      showAccessDenied();
    }
  });

  // Add interactive background effect on mouse move
  document.addEventListener('mousemove', (e) => {
    if (!accessGranted) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.body.style.background = `
          radial-gradient(circle at ${x * 100}% ${
      y * 100
    }%, rgba(40, 0, 80, 0.1), transparent 25%),
          radial-gradient(circle at ${100 - x * 100}% ${
      100 - y * 100
    }%, rgba(100, 0, 150, 0.1), transparent 25%),
          var(--darker-bg)
      `;
  });
});