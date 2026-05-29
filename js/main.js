// ==================== MENÚ HAMBURGUESA ====================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar ícono (opcional)
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ==================== CARRUSEL DE IMÁGENES ====================
    const imagenes = [
        'https://images.pexels.com/photos/3998407/pexels-photo-3998407.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3681587/pexels-photo-3681587.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3993382/pexels-photo-3993382.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];

    let currentIndex = 0;
    const carouselSlide = document.getElementById('carouselSlide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    function buildCarousel() {
        if (!carouselSlide) return;
        // Limpiar
        carouselSlide.innerHTML = '';
        imagenes.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = 'Servicio de belleza';
            carouselSlide.appendChild(img);
        });
        updateCarousel();
        createDots();
    }

    function updateCarousel() {
        const width = carouselSlide.clientWidth;
        carouselSlide.style.transform = `translateX(-${currentIndex * width}px)`;
        highlightActiveDot();
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        imagenes.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = idx;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function highlightActiveDot() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % imagenes.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
        updateCarousel();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        window.addEventListener('resize', () => updateCarousel());
        buildCarousel();
    }

    // ==================== CONTADOR ANIMADO ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateNumbers() {
        if (animated) return;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 80; // suave
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
        animated = true;
    }

    // Intersection Observer para contadores
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // ==================== FORMULARIO DE CONTACTO ====================
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !mensaje) {
                formMessage.textContent = 'Por favor, completa todos los campos.';
                formMessage.style.color = 'red';
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                formMessage.textContent = 'Ingresa un correo electrónico válido.';
                formMessage.style.color = 'red';
                return;
            }

            // Simulación de envío (sin backend)
            formMessage.textContent = `¡Gracias ${nombre}! Nos pondremos en contacto contigo pronto.`;
            formMessage.style.color = 'var(--dorado)';
            form.reset();

            // Opcional: limpiar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    // Cerrar menú si se hace clic fuera (opcional)
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});