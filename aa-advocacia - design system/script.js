/**
 * A&A Advocacia - JavaScript Premium
 * Animações sofisticadas e interações elegantes
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas as funcionalidades
    initHeader();
    initMobileMenu();
    initRevealAnimations();
    initFAQ();
    initSmoothScroll();
    initFormHandling();
    initParallax();
    initCounter();
});

// ========== HEADER SCROLL EFFECT ==========
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
        const currentScroll = window.pageYOffset;

        // Mostrar header apenas quando rolar para cima ou no topo
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            header.classList.add('visible');
        } else if (currentScroll < lastScroll) {
            // Rolando para cima - mostrar header
            header.classList.remove('hidden');
            header.classList.add('visible');
        } else {
            // Rolando para baixo - esconder header
            header.classList.add('hidden');
            header.classList.remove('visible');
        }

        lastScroll = currentScroll;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuToggle || !mobileMenu) return;

    const openMenu = () => {
        menuToggle.classList.add('active');
        mobileMenu.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar menu ao pressionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ========== REVEAL ANIMATIONS PREMIUM ==========
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay escalonado para elementos em grupo
                const delay = Array.from(revealElements).indexOf(entry.target) % 6 * 100;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ========== FAQ ACCORDION ==========
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fechar todos os outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle atual
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== FORM HANDLING ==========
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Estado de loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="animate-spin">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="10"/>
      </svg>
      Enviando...
    `;

        // Coletar dados do formulário
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const interest = formData.get('interest');
        const message = formData.get('message') || 'Não informada';

        // Mapear valor do select para nome legível
        const services = {
            'transito': 'Direito de Trânsito',
            'trabalho': 'Direito do Trabalho',
            'familia': 'Direito de Família',
            'civil': 'Responsabilidade Civil',
            'criminal': 'Direito Criminal',
            'previdenciario': 'Direito Previdenciário',
            'outro': 'Outro assunto'
        };
        const selectedService = services[interest] || interest;

        // Montar mensagem para o WhatsApp
        const whatsappMsg = encodeURIComponent(
            `Olá me chamo ${name}, vim pelo site e gostaria de informações sobre ${selectedService}.\n\n` +
            `Nome: ${name}\n` +
            `Email: ${email}\n` +
            `Telefone: ${phone}\n` +
            `Serviço: ${selectedService}\n` +
            `Mensagem: ${message}`
        );

        // Número do WhatsApp (extraído do site)
        const whatsappNumber = '5521969958970';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

        // Simular delay para feedback visual de envio
        await new Promise(resolve => setTimeout(resolve, 800));

        // Sucesso - Feedback Visual
        submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Abrindo WhatsApp...
    `;
        submitBtn.style.background = '#22c55e';

        // Redirecionar para o WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');

            // Reset após o redirecionamento
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();

    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
    } else {
        field.classList.remove('error');
        field.style.borderColor = '';
    }

    return isValid;
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage || window.matchMedia('(pointer: coarse)').matches) return;

    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// ========== COUNTER ANIMATION ==========
function initCounter() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

// ========== MAGNETIC BUTTON EFFECT ==========
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ========== AREA CARDS 3D TILT ==========
document.querySelectorAll('.area-card').forEach(card => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========== SCROLL PROGRESS INDICATOR ==========
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #c9a962, #e0c078);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
}

// Inicializar barra de progresso
initScrollProgress();

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 500);
    }
});

// ========== UTILIDADES ==========

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
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
