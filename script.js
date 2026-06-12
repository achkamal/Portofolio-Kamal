// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById("navbar");

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const typedElement = document.getElementById("typed-text");

    if (typedElement && typeof Typed !== "undefined") {
        new Typed("#typed-text", {
            strings: [
                "Computer Science Student",
                "Frontend Developer",
                "Cyber Security",
                "DevOps"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: "|",
            autoInsertCss: true,
        });
    }
}

// Scroll Reveal Animations
function initScrollReveal() {
    if (typeof ScrollReveal !== "undefined") {
        const sr = ScrollReveal({
            origin: "bottom",
            distance: "60px",
            duration: 1000,
            delay: 200,
            easing: "ease-out",
            reset: false,
        });

        // Reveal animations for different sections
        sr.reveal(".section-title", { delay: 300 });
        sr.reveal(".about-image", { origin: "left", delay: 400 });
        sr.reveal(".about-text", { origin: "right", delay: 500 });
        sr.reveal(".timeline-item", { interval: 200 });
        // JANGAN reveal .project-card-3d dan .certificate-card-3d
        // karena berada di dalam hscroll-track. ScrollReveal menyembunyikan
        // mereka (opacity:0 + transform) dan tidak pernah memunculkannya
        // kembali karena posisi horizontal di luar viewport.
        sr.reveal(".contact-item-3d", { interval: 100 });

        // Hero section animations
        sr.reveal(".hero-title", { origin: "top", delay: 500 });
        sr.reveal(".hero-subtitle", { delay: 700 });
        sr.reveal(".hero-description", { delay: 900 });
        sr.reveal(".hero-buttons", { delay: 1100 });
        sr.reveal(".social-links", { delay: 1300 });
        sr.reveal(".hero-photo-container", { origin: "right", delay: 1200 });
    }
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
}

// Download CV Functionality
function initDownloadCV() {
    const downloadBtn = document.getElementById("download-cv");

    if (!downloadBtn) return;

    downloadBtn.addEventListener("click", (e) => {
        e.preventDefault();

        showNotification("CV download akan segera dimulai!", "success");

        setTimeout(() => {
            const link = document.createElement("a");
            link.href = "assets/CVAchmadKamal.pdf";
            link.download = "CVAchmadKamal.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showNotification("Silakan periksa folder Downloads Anda.", "info");
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

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
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
        closeNotification(notification);
    });

    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Hero Visual Animations
function initHeroVisuals() {
    // Parallax movement on scroll
    window.addEventListener(
        "scroll",
        throttle(() => {
            const scrolled = window.pageYOffset;
            const photoContainer = document.querySelector(".photo-frame-3d");
            
            if (photoContainer) {
                const yPos = -(scrolled * 0.05);
                photoContainer.style.transform = `translateY(${yPos}px)`;
            }
        }, 16)
    );
}

// Advanced Photo Effects
function initAdvancedPhotoEffects() {
    const heroPhoto = document.getElementById("hero-photo");
    const photoWrapper = document.querySelector(".photo-wrapper-circular");

    if (!heroPhoto || !photoWrapper) return;

    // Hanya aktifkan efek interaktif di desktop
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    if (!isMobile) {
        // 3D Tilt Effect on Mouse Move (desktop only)
        photoWrapper.addEventListener("mousemove", (e) => {
            const rect = photoWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = (mouseY / rect.height) * -20;
            const rotateY = (mouseX / rect.width) * 20;

            photoWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        // Reset transform on mouse leave
        photoWrapper.addEventListener("mouseleave", () => {
            photoWrapper.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        });

        // Photo Click Effect (desktop only)
        photoWrapper.addEventListener("click", () => {
            photoWrapper.classList.add("photo-clicked");

            const overlay = document.createElement("div");
            overlay.className = "photo-overlay-fullscreen";
            overlay.innerHTML = `
                <div class="photo-fullscreen-container">
                    <img src="${heroPhoto.src}" alt="Profile Photo" class="photo-fullscreen">
                    <div class="photo-fullscreen-info">
                        <h3>Computer Engineering Student</h3>
                        <p>Taekwondo Athlete & Tech Enthusiast</p>
                        <button class="close-fullscreen">&times;</button>
                    </div>
                </div>
            `;

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
            `;

            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.style.opacity = "1";
            }, 10);

            const closeBtn = overlay.querySelector(".close-fullscreen");
            const closeOverlay = () => {
                overlay.style.opacity = "0";
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                    photoWrapper.classList.remove("photo-clicked");
                }, 300);
            };

            closeBtn.addEventListener("click", closeOverlay);
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    closeOverlay();
                }
            });

            const handleEsc = (e) => {
                if (e.key === "Escape") {
                    closeOverlay();
                    document.removeEventListener("keydown", handleEsc);
                }
            };
            document.addEventListener("keydown", handleEsc);
        });
    }

    // Photo Loading Effect
    heroPhoto.addEventListener("load", () => {
        heroPhoto.style.opacity = "0";
        heroPhoto.style.transform = "scale(0.8)";

        setTimeout(() => {
            heroPhoto.style.transition = "all 0.8s ease";
            heroPhoto.style.opacity = "1";
            heroPhoto.style.transform = "scale(1)";
        }, 100);
    });
}

// Certificates Effects
function initCertificatesEffects() {
    // Add hover effects to certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card-3d');
    
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}

// Adjust Hero Height for Mobile
function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    const navbar = document.getElementById('navbar');
    
    if (!hero || !navbar) return;
    
    const navbarHeight = navbar.offsetHeight;
    
    if (window.innerWidth <= 768) {
        hero.style.paddingTop = `${navbarHeight}px`;
        hero.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    } else {
        hero.style.paddingTop = '0';
        hero.style.minHeight = '100vh';
    }
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize additional effects when page is fully loaded
window.addEventListener("load", () => {
    initIntersectionObserver();
    
    // Add loaded class to body for additional styling
    document.body.classList.add("loaded");
    
    // Adjust hero height on load
    adjustHeroHeight();
});

// Intersection Observer for additional animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, observerOptions);

    // Hanya observe elemen yang BUKAN di dalam hscroll-track
    // Cards di dalam carousel tidak perlu IntersectionObserver karena
    // posisi horizontalnya membuat observer tidak bisa mendeteksi dengan benar
    const animateElements = document.querySelectorAll(".timeline-item, .contact-item-3d");
    animateElements.forEach((el) => observer.observe(el));
}

// Window resize listener for responsive adjustments
window.addEventListener('resize', () => {
    adjustHeroHeight();
});

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
🎨 Design: Elegant Professional Theme
⚡ Features: Typing Effect, Scroll Animations, Interactive Hero Visuals
🎵 Music Player: Background music with controls
📱 Mobile Friendly: Yes
🔧 Built with: HTML5, CSS3, JavaScript, Typed.js, ScrollReveal.js

Made with dedication and modern web technologies
`);

// Simple Certificate Modal Functionality
function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const viewButtons = document.querySelectorAll('.view-certificate-btn');
    const certificateImages = document.querySelectorAll('.certificate-img');
    
    let currentImageIndex = 0;
    const certificateImagesArray = Array.from(certificateImages);
    
    // Open modal function
    function openModal(imageIndex) {
        if (imageIndex < 0 || imageIndex >= certificateImagesArray.length) return;
        
        currentImageIndex = imageIndex;
        const img = certificateImagesArray[imageIndex];
        
        // Set modal image
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Disable scroll for background
        disableScroll();
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        
        // Enable scroll
        enableScroll();
    }
    
    // Navigate to next image
    function showNextImage() {
        if (currentImageIndex < certificateImagesArray.length - 1) {
            currentImageIndex++;
            const img = certificateImagesArray[currentImageIndex];
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            updateNavigationButtons();
        }
    }
    
    // Navigate to previous image
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const img = certificateImagesArray[currentImageIndex];
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            updateNavigationButtons();
        }
    }
    
    // Update navigation buttons state
    function updateNavigationButtons() {
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === certificateImagesArray.length - 1;
    }
    
    // Disable scroll
    function disableScroll() {
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });
    }
    
    // Enable scroll
    function enableScroll() {
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
    }
    
    // Prevent scroll when modal is open
    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    // Event Listeners
    
    // View certificate buttons
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(index);
        });
    });
    
    // Certificate image click
    certificateImages.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(index);
        });
    });
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Navigation events
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Prevent modal close when clicking on image
    modalImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Update navigation on window resize
    window.addEventListener('resize', updateNavigationButtons);
}

// Update DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all functionality
    initNavigation();
    initTypingEffect();
    initScrollReveal();
    initScrollSpy();
    initSmoothScrolling();
    initMobileMenu();
    initDownloadCV();
    initHeroVisuals();
    initAdvancedPhotoEffects();
    initMusicPlayer();
    initCertificatesEffects();
    initCertificateModal(); // Tambahkan ini
    initThemeToggle();       // Night mode toggle
    initHorizontalScroll();  // Horizontal auto-scroll carousels
    adjustHeroHeight();

    // Add loading animation
    document.body.classList.add("loading");
});

// Perbaikan Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]:not(.certificate-link-3d)');
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 70;

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            
            if (targetId === '#' || !targetId) {
                return;
            }
            
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });

                // Close mobile menu if open
                const navMenu = document.getElementById("nav-menu");
                const hamburger = document.getElementById("hamburger");
                if (navMenu && hamburger) {
                    navMenu.classList.remove("active");
                    hamburger.classList.remove("active");
                }
            }
        });
    });
}

// Perbaikan Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", (e) => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    // Close menu when window is resized
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

// Update Music Player untuk sembunyikan saat modal terbuka
function initMusicPlayer() {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const playIcon = document.getElementById('play-icon');
    const volumeIcon = document.getElementById('volume-icon');
    const musicPlayer = document.getElementById('music-player');

    if (!audio || !playPauseBtn) return;

    // Set initial volume to 50%
    audio.volume = 0.5;
    if (volumeSlider) volumeSlider.value = 50;

    // Helper: sync play icon state
    function syncIcon() {
        if (audio.paused) {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        } else {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }
    }

    // === AUTOPLAY ===
    // Browsers require muted autoplay. We try to play muted, then unmute.
    function attemptAutoplay() {
        audio.muted = true;
        audio.volume = 0.5;
        const promise = audio.play();
        if (promise !== undefined) {
            promise.then(() => {
                // Autoplay allowed – unmute immediately
                audio.muted = false;
                syncIcon();
            }).catch(() => {
                // Autoplay blocked – wait for first user interaction
                audio.muted = false;
                syncIcon();
                const unlockAudio = () => {
                    audio.play().then(() => {
                        syncIcon();
                    }).catch(() => {});
                    ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'].forEach(evt => {
                        document.removeEventListener(evt, unlockAudio);
                    });
                };
                ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'].forEach(evt => {
                    document.addEventListener(evt, unlockAudio, { once: true });
                });
            });
        }
    }

    attemptAutoplay();


    // Play/Pause functionality
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.muted = false;
            audio.play().then(() => syncIcon()).catch(() => syncIcon());
        } else {
            audio.pause();
            syncIcon();
        }
    });

    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            e.stopPropagation();
            audio.volume = e.target.value / 100;
            
            if (volumeIcon) {
                if (e.target.value == 0) {
                    volumeIcon.classList.remove('fa-volume-up');
                    volumeIcon.classList.add('fa-volume-mute');
                } else if (e.target.value < 50) {
                    volumeIcon.classList.remove('fa-volume-up', 'fa-volume-mute');
                    volumeIcon.classList.add('fa-volume-down');
                } else {
                    volumeIcon.classList.remove('fa-volume-down', 'fa-volume-mute');
                    volumeIcon.classList.add('fa-volume-up');
                }
            }
        });
    }

    // Mute/Unmute functionality
    if (volumeBtn && volumeIcon) {
        volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.muted) {
                audio.muted = false;
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
                if (volumeSlider) volumeSlider.value = audio.volume * 100;
            } else {
                audio.muted = true;
                volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down');
                volumeIcon.classList.add('fa-volume-mute');
            }
        });
    }

    // Sembunyikan music player saat modal terbuka
    const modal = document.getElementById('certificate-modal');
    if (modal && musicPlayer) {
        const observer = new MutationObserver(() => {
            if (modal.classList.contains('active')) {
                musicPlayer.style.opacity = '0';
                musicPlayer.style.pointerEvents = 'none';
            } else {
                musicPlayer.style.opacity = '1';
                musicPlayer.style.pointerEvents = 'auto';
            }
        });
        
        observer.observe(modal, { attributes: true });
    }
}

// Console log untuk debugging
console.log('Certificate modal system loaded successfully!');

/* ============================================
   NIGHT MODE TOGGLE
   ============================================ */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!toggleBtn || !themeIcon) return;

    // Load saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

/* ============================================
   HORIZONTAL SCROLL CAROUSELS (auto-scroll + manual)
   ============================================ */
function initHorizontalScroll() {
    const configs = [
        { trackId: 'experience-track',    dotsId: 'experience-dots' },
        { trackId: 'projects-track',      dotsId: 'projects-dots' },
        { trackId: 'certificates-track',  dotsId: 'certificates-dots' },
    ];

    configs.forEach(({ trackId, dotsId }) => {
        const track = document.getElementById(trackId);
        const dotsContainer = document.getElementById(dotsId);
        if (!track) return;

        // --- Arrow buttons ---
        const btnLeft  = track.parentElement.querySelector('.hscroll-btn-left');
        const btnRight = track.parentElement.querySelector('.hscroll-btn-right');

        // --- Build dots ---
        const cards = track.querySelectorAll('.hscroll-card');
        const cardCount = cards.length;

        if (dotsContainer && cardCount > 0) {
            for (let i = 0; i < cardCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'hscroll-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to item ${i + 1}`);
                dot.addEventListener('click', () => {
                    cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                });
                dotsContainer.appendChild(dot);
            }
        }

        function getCardWidth() {
            if (cards.length === 0) return 340;
            return cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 32);
        }

        function updateDots() {
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.hscroll-dot') : [];
            if (dots.length === 0) return;
            const cw = getCardWidth();
            const idx = Math.round(track.scrollLeft / cw);
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }

        function updateArrows() {
            if (btnLeft)  btnLeft.disabled  = track.scrollLeft <= 2;
            if (btnRight) btnRight.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
        }

        function scrollBy(dir) {
            track.scrollBy({ left: dir * getCardWidth(), behavior: 'smooth' });
        }

        if (btnLeft)  btnLeft.addEventListener('click',  () => scrollBy(-1));
        if (btnRight) btnRight.addEventListener('click', () => scrollBy(1));

        track.addEventListener('scroll', () => { updateDots(); updateArrows(); }, { passive: true });

        updateArrows();
        updateDots();

        // --- Drag-to-scroll (mouse) ---
        let isDown = false, startX = 0, scrollStart = 0;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollStart = track.scrollLeft;
            track.classList.add('dragging');
        });

        track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
        track.addEventListener('mouseup',    () => { isDown = false; track.classList.remove('dragging'); });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            track.scrollLeft = scrollStart - (x - startX);
        });

        // --- Touch swipe ---
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) scrollBy(diff > 0 ? 1 : -1);
        }, { passive: true });

        // --- Auto-scroll ---
        let autoTimer = null;
        let paused = false;
        const INTERVAL = 3500;

        function autoNext() {
            if (paused) return;
            const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
            if (atEnd) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollBy(1);
            }
        }

        function startAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(autoNext, INTERVAL);
        }

        function stopAuto() {
            clearInterval(autoTimer);
        }

        track.addEventListener('mouseenter', () => { paused = true;  stopAuto(); });
        track.addEventListener('mouseleave', () => { paused = false; startAuto(); });
        track.addEventListener('touchstart', () => { paused = true;  stopAuto(); }, { passive: true });
        track.addEventListener('touchend',   () => {
            paused = false;
            setTimeout(startAuto, 2000);
        }, { passive: true });

        // Start auto-scroll after a short delay
        setTimeout(startAuto, 1500);
    });
}
