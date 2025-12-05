// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced smooth scrolling with easing
    function smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Easing function for smooth animation
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = this.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Enhanced scroll-triggered background animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollProgress = scrolled / (documentHeight - windowHeight);
        
        // Parallax effect for shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yOffset = scrolled * speed;
            const rotation = scrolled * 0.1 + (index * 30);
            shape.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        });
        
        // Parallax effect for particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.3 + (index * 0.05);
            const yOffset = scrolled * speed;
            particle.style.transform = `translateY(${yOffset}px)`;
        });
        
        // Parallax effect for orbs
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = 0.2 + (index * 0.1);
            const yOffset = scrolled * speed;
            const scale = 1 + (scrollProgress * 0.2);
            orb.style.transform = `translateY(${yOffset}px) scale(${scale})`;
        });
        
        // Parallax effect for math symbols
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach((symbol, index) => {
            const speed = 0.4 + (index * 0.08);
            const yOffset = scrolled * speed;
            const rotation = scrolled * 0.05 + (index * 45);
            symbol.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        });
        
        // Enhanced 3D mascot animation based on scroll
        const mascot = document.querySelector('.mascot');
        if (mascot && window.innerWidth > 768) {
            const mascotRect = mascot.getBoundingClientRect();
            const mascotCenterY = mascotRect.top + mascotRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = (mascotCenterY - viewportCenter) / viewportCenter;
            
            // 3D rotation based on scroll position
            const rotateX = distanceFromCenter * 15; // Tilt forward/backward
            const rotateY = scrollProgress * 20; // Rotate based on scroll progress
            const rotateZ = scrolled * 0.02; // Continuous rotation
            
            // Scale and translate for depth effect
            const scale = 1 + (Math.abs(distanceFromCenter) * 0.1);
            const translateZ = distanceFromCenter * 50;
            
            // Apply 3D transforms
            mascot.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                rotateZ(${rotateZ}deg)
                scale(${scale})
                translateZ(${translateZ}px)
            `;
            
            // Add subtle shadow effect
            const shadowIntensity = Math.abs(distanceFromCenter) * 0.3;
            mascot.style.filter = `drop-shadow(0 ${shadowIntensity * 10}px ${shadowIntensity * 20}px rgba(0,0,0,0.3))`;
        }
        
        // Background color shift based on scroll
        const hueShift = scrollProgress * 30; // Shift hue by 30 degrees
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${240 + hueShift}, 70%, 60%) 0%, 
            hsl(${280 + hueShift}, 70%, 50%) 100%)`;
    });

    // Enhanced mouse movement effects
    const mascot = document.querySelector('.mascot');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Enhanced 3D mascot movement with mouse
        if (mascot && window.innerWidth > 768) {
            const moveX = (mouseX - 0.5) * 30;
            const moveY = (mouseY - 0.5) * 30;
            
            // Get current scroll-based transforms
            const scrolled = window.pageYOffset;
            const scrollProgress = scrolled / (document.documentElement.scrollHeight - window.innerHeight);
            const mascotRect = mascot.getBoundingClientRect();
            const mascotCenterY = mascotRect.top + mascotRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = (mascotCenterY - viewportCenter) / viewportCenter;
            
            // Combine scroll and mouse effects
            const rotateX = distanceFromCenter * 15 + (mouseY - 0.5) * 10;
            const rotateY = scrollProgress * 20 + (mouseX - 0.5) * 15;
            const rotateZ = scrolled * 0.02;
            
            const scale = 1 + (Math.abs(distanceFromCenter) * 0.1) + (Math.abs(mouseX - 0.5) * 0.05);
            const translateZ = distanceFromCenter * 50 + (mouseY - 0.5) * 20;
            
            mascot.style.transform = `
                perspective(1000px)
                translate(${moveX}px, ${moveY}px)
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                rotateZ(${rotateZ}deg)
                scale(${scale})
                translateZ(${translateZ}px)
            `;
            
            // Dynamic shadow based on mouse position
            const shadowIntensity = Math.abs(distanceFromCenter) * 0.3 + Math.abs(mouseX - 0.5) * 0.2;
            const shadowX = (mouseX - 0.5) * 20;
            const shadowY = Math.abs(distanceFromCenter) * 10;
            mascot.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowIntensity * 20}px rgba(0,0,0,0.3))`;
        }
        
        // Background elements follow mouse
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.02);
            const moveX = (mouseX - 0.5) * 30 * speed;
            const moveY = (mouseY - 0.5) * 30 * speed;
            const currentTransform = shape.style.transform;
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/, '');
            shape.style.transform = `translate(${moveX}px, ${moveY}px) ${baseTransform}`;
        });
        
        // Particles follow mouse
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.05 + (index * 0.01);
            const moveX = (mouseX - 0.5) * 20 * speed;
            const moveY = (mouseY - 0.5) * 20 * speed;
            const currentTransform = particle.style.transform;
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/, '');
            particle.style.transform = `translate(${moveX}px, ${moveY}px) ${baseTransform}`;
        });
        
        // Orbs follow mouse
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = 0.08 + (index * 0.03);
            const moveX = (mouseX - 0.5) * 40 * speed;
            const moveY = (mouseY - 0.5) * 40 * speed;
            const currentTransform = orb.style.transform;
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/, '');
            orb.style.transform = `translate(${moveX}px, ${moveY}px) ${baseTransform}`;
        });
    });

    // CTA button click handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show coming soon message
            showComingSoonMessage();
        });
    }

    // Platform hover effects
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Interactive background element effects
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
            this.style.transform = 'scale(1.3) rotate(180deg)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    const symbols = document.querySelectorAll('.symbol');
    symbols.forEach(symbol => {
        symbol.addEventListener('click', function() {
            this.style.color = 'rgba(255, 255, 255, 1)';
            this.style.transform = 'scale(2) rotate(720deg)';
            setTimeout(() => {
                this.style.color = 'rgba(255, 255, 255, 0.4)';
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 1000);
        });
    });

    // Enhanced intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .feature-card, .step, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Subscribe button functionality
    const subscribeButton = document.querySelector('.subscribe-button');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeButton && emailInput) {
        subscribeButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                showNotification('Thank you! We\'ll notify you when EagleLearn launches! 🎉', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
        
        function removeNotification(notification) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }

    // Show coming soon message
    function showComingSoonMessage() {
        const message = document.createElement('div');
        message.className = 'coming-soon-popup';
        message.innerHTML = `
            <div class="popup-content">
                <h3>🎉 Download the Game Now!</h3>
                <p>EagleLearn is complete — get the game now on Android or play instantly in your browser.</p>
                <div class="popup-actions">
                    <!-- Direct APK download: place the APK at /EagleLearn.apk in the project for this to work -->
                    <a class="popup-button popup-android" href="https://eaglearn.github.io/Eaglearn.Play/EagLearn Division-1_0_10.apk" download="EagLearn Division-1_0_10.apk" rel="noopener" title="Download EagleLearn APK">📱 Download APK (Android)</a>
                    <a class="popup-button popup-browser" href="https://gd.games/bloooh1/eaglearn" target="_blank" rel="noopener">💻 Play in Browser</a>
                </div>
                <div class="popup-features">

                </div>
                <button class="popup-close">Close</button>
            </div>
        `;

        
        // Add styles
        message.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const popupContent = message.querySelector('.popup-content');
        popupContent.style.cssText = `
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            text-align: center;
            max-width: 450px;
            margin: 1rem;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        const popupFeatures = message.querySelector('.popup-features');
        popupFeatures.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin: 1.5rem 0;
        `;

        // Style action buttons (Android / Browser)
        const actionButtons = message.querySelectorAll('.popup-button');
        actionButtons.forEach(btn => {
            btn.style.cssText = `
                display: inline-block;
                text-decoration: none;
                margin: 0.4rem 0.4rem 0.4rem 0;
                padding: 0.7rem 1.1rem;
                border-radius: 12px;
                font-weight: 700;
                color: white;
                background: linear-gradient(45deg, #3b82f6, #06b6d4);
                box-shadow: 0 8px 24px rgba(10, 10, 50, 0.12);
            `;
        });
        
        const featureElements = message.querySelectorAll('.popup-feature');
        featureElements.forEach(feature => {
            feature.style.cssText = `
                background: #f8f9fa;
                padding: 0.5rem 1rem;
                border-radius: 10px;
                font-weight: 500;
                color: #333;
            `;
        });
        
        const closeButton = message.querySelector('.popup-close');
        closeButton.style.cssText = `
            background: linear-gradient(45deg, #ff6b6b, #ffa500);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
            transition: transform 0.2s ease;
        `;
        
        document.body.appendChild(message);
        
        // Animate in
        setTimeout(() => {
            message.style.opacity = '1';
            popupContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close functionality
        function closePopup() {
            message.style.opacity = '0';
            popupContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }
        
        closeButton.addEventListener('click', closePopup);
        message.addEventListener('click', function(e) {
            if (e.target === message) {
                closePopup();
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement === ctaButton) {
            ctaButton.click();
        }
        
        // Escape key to close popups
        if (e.key === 'Escape') {
            const popup = document.querySelector('.coming-soon-popup');
            if (popup) {
                popup.remove();
            }
        }
    });

    // Performance optimization: Reduce animations on mobile
    if (window.innerWidth <= 768) {
        const reducedAnimations = document.querySelectorAll('.shape, .math-element');
        reducedAnimations.forEach(element => {
            element.style.animationDuration = '8s';
        });
    }

    // Add touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger CTA
                console.log('Swipe up detected');
            } else {
                // Swipe down
                console.log('Swipe down detected');
            }
        }
    }

    // Add accessibility improvements
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #ff6b6b';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff6b6b, #ffa500);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        smoothScrollTo('#home', 800);
    });

    // Special hero section mascot effect
    function updateHeroMascotEffect() {
        const mascot = document.querySelector('.mascot');
        const heroSection = document.querySelector('.hero-section');
        
        if (mascot && heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            const isInHero = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
            
            if (isInHero) {
                // Add special glow effect when in hero section
                mascot.style.filter = `
                    drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))
                    drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))
                `;
                
                // Add subtle breathing effect
                const time = Date.now() * 0.001;
                const breathScale = 1 + Math.sin(time * 2) * 0.02;
                const currentTransform = mascot.style.transform;
                const baseTransform = currentTransform.replace(/scale\([^)]*\)/g, '');
                mascot.style.transform = `${baseTransform} scale(${breathScale})`;
            }
        }
    }
    
    // Update hero effect on scroll
    window.addEventListener('scroll', updateHeroMascotEffect);
    
    // Initial call
    updateHeroMascotEffect();

    // Floating Companion Bird functionality
    const floatingCompanion = document.getElementById('floatingCompanion');
    const companionBird = floatingCompanion?.querySelector('.companion-bird');
    
    function updateFloatingCompanion() {
        if (!floatingCompanion || !companionBird) return;
        
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Show companion after scrolling past hero section
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (scrolled > heroBottom - windowHeight * 0.5) {
                floatingCompanion.classList.add('visible');
            } else {
                floatingCompanion.classList.remove('visible');
            }
        } else {
            // If no hero section, show after scrolling 200px
            if (scrolled > 200) {
                floatingCompanion.classList.add('visible');
            } else {
                floatingCompanion.classList.remove('visible');
            }
        }
        
        // Make companion follow scroll with smooth movement
        if (floatingCompanion.classList.contains('visible')) {
            const scrollProgress = scrolled / (document.documentElement.scrollHeight - windowHeight);
            const maxMoveY = 100; // Maximum vertical movement
            const moveY = scrollProgress * maxMoveY;
            
            // Add subtle horizontal movement based on scroll
            const moveX = Math.sin(scrollProgress * Math.PI * 2) * 10;
            
            // Apply 3D transforms for depth
            const rotateY = scrollProgress * 15;
            const rotateZ = scrolled * 0.01;
            const scale = 1 + Math.sin(scrollProgress * Math.PI * 4) * 0.05;
            
            companionBird.style.transform = `
                translate(${moveX}px, ${moveY}px)
                rotateY(${rotateY}deg)
                rotateZ(${rotateZ}deg)
                scale(${scale})
            `;
            
            // Dynamic shadow based on scroll position
            const shadowIntensity = 0.2 + (scrollProgress * 0.3);
            const shadowY = 5 + (scrollProgress * 10);
            companionBird.style.filter = `drop-shadow(0 ${shadowY}px ${shadowIntensity * 20}px rgba(0, 0, 0, 0.3))`;
        }
    }
    
    // Update companion on scroll
    window.addEventListener('scroll', updateFloatingCompanion);
    
    // Add mouse interaction for companion
    if (floatingCompanion && companionBird) {
        floatingCompanion.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                companionBird.style.transform += ' scale(1.1)';
                companionBird.style.filter += ' brightness(1.2)';
            }
        });
        
        floatingCompanion.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                // Reset to normal state
                updateFloatingCompanion();
            }
        });
        
        // Make companion clickable on mobile
        floatingCompanion.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // Add a fun bounce effect
                companionBird.style.transform += ' scale(1.2)';
                setTimeout(() => {
                    updateFloatingCompanion();
                }, 200);
            }
        });
    }
    
    // Initial call
    updateFloatingCompanion();

    console.log('EagleLearn Hero Section loaded successfully! 🦅');
});
