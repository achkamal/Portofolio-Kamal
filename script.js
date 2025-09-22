// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initNavigation()
  initTypingEffect()
  initScrollReveal()
  initScrollSpy()
  initSmoothScrolling()
  initMobileMenu()
  initDownloadCV()
  initHeroVisuals()
  initStatsCounter()
  initAdvancedPhotoEffects() // Added advanced photo functionality

  // Add loading animation
  document.body.classList.add("loading")
})

// Navigation Functionality
function initNavigation() {
  const navbar = document.getElementById("navbar")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Typing Effect for Hero Section
function initTypingEffect() {
  const typedElement = document.getElementById("typed-text")

  // Declare Typed variable here if necessary
  const Typed = window.Typed

  if (typedElement && typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: [
        "Computer Science Students",
        "Frontend Developer",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    })
  }
}

// Scroll Reveal Animations
function initScrollReveal() {
  // Declare ScrollReveal variable here if necessary
  const ScrollReveal = window.ScrollReveal

  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 1000,
      delay: 200,
      easing: "ease-out",
      reset: false,
    })

    // Reveal animations for different sections
    sr.reveal(".section-title", { delay: 300 })
    sr.reveal(".about-image", { origin: "left", delay: 400 })
    sr.reveal(".about-text", { origin: "right", delay: 500 })
    sr.reveal(".timeline-item", { interval: 200 })
    sr.reveal(".project-card", { interval: 200 })
    sr.reveal(".contact-item", { interval: 100 })
    sr.reveal(".contact-cta", { delay: 400 })

    // Hero section animations
    sr.reveal(".hero-title", { origin: "top", delay: 500 })
    sr.reveal(".hero-subtitle", { delay: 700 })
    sr.reveal(".hero-description", { delay: 900 })
    sr.reveal(".hero-buttons", { delay: 1100 })
    sr.reveal(".social-links", { delay: 1300 })
    sr.reveal(".floating-card", { interval: 200, delay: 1500 })
    sr.reveal(".stats-display", { delay: 1700 })
    sr.reveal(".hero-photo-container", { origin: "right", delay: 1200 }) // Added photo reveal animation
  }
}

// Scroll Spy for Navigation
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  function updateActiveLink() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", updateActiveLink)
  updateActiveLink() // Initial call
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navMenu = document.getElementById("nav-menu")
        const hamburger = document.getElementById("hamburger")
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })
}

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })

  // Close menu when window is resized
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

// Download CV Functionality
function initDownloadCV() {
  const downloadBtn = document.getElementById("download-cv")

  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault()

    showNotification("CV download akan segera dimulai!", "success")

    setTimeout(() => {
      // Buat elemen <a> sementara untuk download
      const link = document.createElement("a")
      link.href = "assets/CVAchmadKamal.pdf"
      link.download = "CVAchmadKamal.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showNotification("Silakan periksa folder Downloads Anda.", "info")
    }, 2000)
  })
}


// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-bg);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--accent-cyan);
        z-index: 10000;
        transform: translateX(400px);
        transition: var(--transition-normal);
        max-width: 300px;
    `

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    closeNotification(notification)
  })

  // Auto close after 5 seconds
  setTimeout(() => {
    closeNotification(notification)
  }, 5000)
}

function closeNotification(notification) {
  notification.style.transform = "translateX(400px)"
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

// Intersection Observer for additional animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".project-card, .timeline-item, .contact-item")
  animateElements.forEach((el) => observer.observe(el))
}

// Parallax Effect for Hero Background
function initParallaxEffect() {
  const heroBackground = document.querySelector(".hero-bg-animation")

  if (heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroBackground.style.transform = `translateY(${rate}px)`
    })
  }
}

// Initialize additional effects when page is fully loaded
window.addEventListener("load", () => {
  initIntersectionObserver()
  initParallaxEffect()

  // Add loaded class to body for additional styling
  document.body.classList.add("loaded")
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll-heavy functions
const throttledScrollSpy = throttle(initScrollSpy, 100)
const throttledParallax = throttle(initParallaxEffect, 16)

// Error handling for external libraries
window.addEventListener("error", (e) => {
  console.warn("Script error detected:", e.message)
  // Graceful degradation - continue without the failed feature
})

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
🎨 Design: Elegant Professional Theme
⚡ Features: Typing Effect, Scroll Animations, Interactive Hero Visuals, Advanced Photo Effects
📱 Mobile Friendly: Yes
🔧 Built with: HTML5, CSS3, JavaScript, Typed.js, ScrollReveal.js

Made with ❤️ and modern web technologies
`)

// Hero Visual Animations Functionality
function initHeroVisuals() {
  // Floating cards parallax effect
  const floatingCards = document.querySelectorAll(".floating-card")

  floatingCards.forEach((card, index) => {
    // Add hover effects
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.05)"
      card.style.boxShadow = "var(--shadow-glow)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
      card.style.boxShadow = "var(--shadow-md)"
    })

    // Parallax movement on scroll
    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.pageYOffset
        const speed = card.dataset.speed || 1
        const yPos = -(scrolled * speed * 0.1)
        card.style.transform = `translateY(${yPos}px)`
      }, 16),
    )
  })

  // Geometric shapes rotation
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape) => {
    let rotation = 0
    setInterval(() => {
      rotation += 0.5
      shape.style.transform = `rotate(${rotation}deg)`
    }, 50)
  })
}

// Animated Stats Counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")
  let hasAnimated = false

  const animateStats = () => {
    if (hasAnimated) return

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.dataset.target)
      let current = 0
      const increment = target / 50

      const updateCounter = () => {
        if (current < target) {
          current += increment
          stat.textContent = Math.ceil(current)
          requestAnimationFrame(updateCounter)
        } else {
          stat.textContent = target
        }
      }

      updateCounter()
    })

    hasAnimated = true
  }

  // Trigger animation when stats come into view
  const statsDisplay = document.querySelector(".stats-display")
  if (statsDisplay) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateStats, 500)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(statsDisplay)
  }
}

function initAdvancedPhotoEffects() {
  const heroPhoto = document.getElementById("hero-photo")
  const photoWrapper = document.querySelector(".photo-wrapper")
  const photoFrame = document.querySelector(".photo-frame")
  const particles = document.querySelectorAll(".particle")

  if (!heroPhoto || !photoWrapper || !photoFrame) return

  // 3D Tilt Effect on Mouse Move
  photoWrapper.addEventListener("mousemove", (e) => {
    const rect = photoWrapper.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (mouseY / rect.height) * -20
    const rotateY = (mouseX / rect.width) * 20

    photoWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  })

  // Reset transform on mouse leave
  photoWrapper.addEventListener("mouseleave", () => {
    photoWrapper.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
  })

  // Parallax Photo Movement on Scroll
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset
      const rate = scrolled * 0.05

      if (photoFrame) {
        photoFrame.style.transform = `translateY(${rate}px)`
      }
    }, 16),
  )

  // Interactive Particle System
  const particleAnimations = []

  const animateParticles = () => {
    particles.forEach((particle, index) => {
      if (particleAnimations[index]) {
        clearInterval(particleAnimations[index])
      }

      particleAnimations[index] = setInterval(
        () => {
          const randomX = Math.random() * 100
          const randomY = Math.random() * 100
          const randomScale = 0.5 + Math.random() * 0.5
          const randomOpacity = 0.3 + Math.random() * 0.7

          particle.style.left = `${randomX}%`
          particle.style.top = `${randomY}%`
          particle.style.transform = `scale(${randomScale})`
          particle.style.opacity = randomOpacity
        },
        2000 + index * 500,
      )
    })
  }

  // Start particle animation on hover
  photoWrapper.addEventListener("mouseenter", animateParticles)

  // Stop particle animation on leave
  photoWrapper.addEventListener("mouseleave", () => {
    particleAnimations.forEach((animation) => clearInterval(animation))
    particles.forEach((particle) => {
      particle.style.opacity = "0"
    })
  })

  // Photo Click Effect - Zoom and Focus
  photoWrapper.addEventListener("click", () => {
    photoWrapper.classList.add("photo-clicked")

    // Create overlay for focused view
    const overlay = document.createElement("div")
    overlay.className = "photo-overlay-fullscreen"
    overlay.innerHTML = `
      <div class="photo-fullscreen-container">
        <img src="${heroPhoto.src}" alt="Profile Photo" class="photo-fullscreen">
        <div class="photo-fullscreen-info">
          <h3>Computer Engineering Student</h3>
          <p>Taekwondo Athlete & Tech Enthusiast</p>
          <button class="close-fullscreen">&times;</button>
        </div>
      </div>
    `

    // Add overlay styles
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `

    document.body.appendChild(overlay)

    // Animate in
    setTimeout(() => {
      overlay.style.opacity = "1"
    }, 10)

    // Close functionality
    const closeBtn = overlay.querySelector(".close-fullscreen")
    const closeOverlay = () => {
      overlay.style.opacity = "0"
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay)
        }
        photoWrapper.classList.remove("photo-clicked")
      }, 300)
    }

    closeBtn.addEventListener("click", closeOverlay)
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeOverlay()
      }
    })

    // ESC key to close
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeOverlay()
        document.removeEventListener("keydown", handleEsc)
      }
    }
    document.addEventListener("keydown", handleEsc)
  })

  // Dynamic Border Color Change
  const borderAnimation = document.querySelector(".photo-border-animation")
  if (borderAnimation) {
    let hue = 0
    setInterval(() => {
      hue = (hue + 1) % 360
      const color1 = `hsl(${hue}, 70%, 50%)`
      const color2 = `hsl(${(hue + 60) % 360}, 70%, 50%)`
      const color3 = `hsl(${(hue + 120) % 360}, 70%, 50%)`

      borderAnimation.style.background = `linear-gradient(45deg, ${color1}, ${color2}, ${color3}) border-box`
    }, 100)
  }

  // Photo Loading Effect
  heroPhoto.addEventListener("load", () => {
    heroPhoto.style.opacity = "0"
    heroPhoto.style.transform = "scale(0.8)"

    setTimeout(() => {
      heroPhoto.style.transition = "all 0.8s ease"
      heroPhoto.style.opacity = "1"
      heroPhoto.style.transform = "scale(1)"
    }, 100)
  })

  // Intersection Observer for Photo Entrance Animation
  const photoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          photoFrame.classList.add("photo-entrance")

          // Stagger particle animations
          particles.forEach((particle, index) => {
            setTimeout(() => {
              particle.style.animation = `particleFloat 6s ease-in-out infinite`
              particle.style.animationDelay = `${index * 0.3}s`
            }, index * 200)
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  photoObserver.observe(photoFrame)
}
