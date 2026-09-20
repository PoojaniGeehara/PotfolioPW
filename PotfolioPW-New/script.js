/**
 * POOJANI WIJENAYAKE | PROFESSIONAL PORTFOLIO SCRIPT
 * Interactive Canvas, Theme Switcher, Typed.js, Animations & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Theme Toggle (Dark / Light Mode)
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('pw_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default dark

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.className = 'bx bx-sun';
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.className = 'bx bx-moon';
      }
    }
    localStorage.setItem('pw_theme', theme);
  };

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'info', 2000);
    });
  }

  // =========================================================================
  // 2. Interactive Ambient Canvas (Constellation & Particles)
  // =========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = (dx / dist) * force * 3;
            const dirY = (dy / dist) * force * 3;
            this.x -= dirX;
            this.y -= dirY;
          }
        }
      }

      draw() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLight ? 'rgba(5, 150, 105, 0.5)' : 'rgba(0, 245, 160, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const maxDistance = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.25;
            ctx.strokeStyle = isLight
              ? `rgba(5, 150, 105, ${opacity})`
              : `rgba(0, 245, 160, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Pause canvas when user switches tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });
  }

  // =========================================================================
  // 3. Dynamic Typewriter (Typed.js)
  // =========================================================================
  const typedOutput = document.getElementById('typed-output');
  if (typedOutput && typeof Typed !== 'undefined') {
    new Typed('#typed-output', {
      strings: [
        'Software Quality Assurance (SQA) Intern',
        'Manual Testing & Test Case Specialist',
        'Computing & Information Systems Undergrad',
        'Frontend Developer (React / Next.js)',
        'API & Automation Testing Enthusiast'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      startDelay: 400,
      loop: true,
      smartBackspace: true
    });
  } else if (typedOutput) {
    typedOutput.textContent = 'Information Systems Undergraduate & Web Developer';
  }

  // =========================================================================
  // 4. Header Scroll Effect & Scrollspy
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY;

    // Header sticky shadow
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy active state
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // =========================================================================
  // 5. Mobile Navigation Drawer
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  const openDrawer = () => {
    if (mobileNav && mobileOverlay) {
      mobileNav.classList.add('open');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
  };

  const closeDrawer = () => {
    if (mobileNav && mobileOverlay) {
      mobileNav.classList.remove('open');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // =========================================================================
  // 6. Quick Stats Counter Animation
  // =========================================================================
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  const runCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target') || 0;
      const duration = 1800;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        counter.innerText = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if (counters.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            runCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // =========================================================================
  // 7. Skills Tab Filtering & Progress Bars
  // =========================================================================
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');
  const progressBars = document.querySelectorAll('.progress-bar');

  // Filter skills
  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Animate progress bars when in viewport
  if (progressBars.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width') || '75%';
            bar.style.width = targetWidth;
          }
        });
      },
      { threshold: 0.2 }
    );

    progressBars.forEach((bar) => skillsObserver.observe(bar));
  }

  // =========================================================================
  // 8. Projects Filter Tabs
  // =========================================================================
  const projectFilterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // =========================================================================
  // 9. Modals (Resume / CV & Project Details)
  // =========================================================================
  const allModals = document.querySelectorAll('.modal');
  const resumeModal = document.getElementById('resume-modal');

  const openModal = (modalElement) => {
    if (!modalElement) return;
    modalElement.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modalElement) => {
    if (!modalElement) return;
    modalElement.classList.remove('active');
    // Check if any other modal is still active
    const activeModals = document.querySelectorAll('.modal.active');
    if (activeModals.length === 0) {
      document.body.style.overflow = '';
    }
  };

  // Resume Modal Triggers
  const resumeTriggers = [
    document.getElementById('open-resume-modal'),
    document.getElementById('mobile-resume-btn'),
    document.getElementById('hero-resume-trigger'),
    document.getElementById('about-resume-trigger')
  ];

  resumeTriggers.forEach((trigger) => {
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal(resumeModal);
      });
    }
  });

  // Project Detail & Quick View Modals
  const projectModalTriggers = document.querySelectorAll('[data-modal]');
  projectModalTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });

  // Close handlers on all modals
  allModals.forEach((modal) => {
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
    if (overlay) {
      overlay.addEventListener('click', () => closeModal(modal));
    }
  });

  // Global Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      allModals.forEach((modal) => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // =========================================================================
  // 10. Copy Email to Clipboard
  // =========================================================================
  const emailToCopy = 'poojaniwijenayake@gmail.com';
  const copyButtons = [
    document.getElementById('copy-email-btn'),
    document.getElementById('copy-email-chip')
  ];

  copyButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(emailToCopy);
          showToast(`Email copied: ${emailToCopy}`, 'success');

          // Temporary visual change
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<i class='bx bx-check'></i> <span>Copied!</span>`;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          // Fallback for older browsers
          const tempInput = document.createElement('input');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Email copied: ${emailToCopy}`, 'success');
        }
      });
    }
  });

  // =========================================================================
  // 11. Interactive Contact Form with Validation
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const clearErrors = () => {
    [nameInput, emailInput, messageInput].forEach((inp) => {
      if (inp) inp.classList.remove('input-error');
    });
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('input-error');
        if (nameError) nameError.textContent = 'Please enter your full name (minimum 2 characters).';
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('input-error');
        if (messageError) messageError.textContent = 'Please write a message with at least 10 characters.';
        isValid = false;
      }

      if (!isValid) {
        showToast('Please correct the highlighted fields.', 'error');
        return;
      }

      // Submit Animation
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Sending...</span>`;
      }

      // Simulate asynchronous sending
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.innerHTML = `<i class='bx bx-check'></i> <span>Message Sent!</span>`;
        }

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. I will get back to you shortly.`;
        }

        showToast('Message sent successfully! Poojani will reply soon.', 'success', 5000);
        contactForm.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = `<i class='bx bx-paper-plane'></i> <span>Send Message</span>`;
          }
          if (formFeedback) {
            formFeedback.style.display = 'none';
          }
        }, 6000);
      }, 1200);
    });
  }

  // =========================================================================
  // 12. Floating Back-To-Top Button with Circular Progress Ring
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-ring__circle');
  const circumference = 2 * Math.PI * 21; // r = 21

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
  }

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) : 0;

    if (progressCircle) {
      const offset = circumference - scrollPercentage * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 13. 3D Tilt Micro-Interaction on Hero Image
  // =========================================================================
  const visualCard = document.querySelector('.visual-card-wrapper');
  if (visualCard && window.innerWidth > 992) {
    visualCard.addEventListener('mousemove', (e) => {
      const rect = visualCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = -(y / (rect.height / 2)) * 8;
      const tiltY = (x / (rect.width / 2)) * 8;

      visualCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    visualCard.addEventListener('mouseleave', () => {
      visualCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // =========================================================================
  // 14. Toast Notification Utility
  // =========================================================================
  function showToast(message, type = 'info', duration = 3500) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : 'toast-info'}`;

    let iconClass = 'bx bx-info-circle';
    if (type === 'success') iconClass = 'bx bx-check-circle';
    if (type === 'error') iconClass = 'bx bx-error-circle';

    toast.innerHTML = `
      <i class='${iconClass}'></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
});
