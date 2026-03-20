// Анимация чисел на главной странице
function animateNumbers() {
    const numberElements = document.querySelectorAll('.number');
    if (numberElements.length === 0) return;
    
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.includes('.html')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Динамическое изменение шапки
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Установка текущего года
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Обработка формы заявки
function initRequestForm() {
    const requestBtn = document.getElementById('requestBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnBack = document.getElementById('btnBack');
    const phoneInput = document.getElementById('phone');
    
    if (requestBtn && modalOverlay) {
        // Открытие модального окна
        requestBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Закрытие модального окна
        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (btnBack) btnBack.addEventListener('click', closeModal);
        
        // Закрытие по клику на фон
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Маска  для телефона
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            });
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    setCurrentYear();
    initRequestForm();
});