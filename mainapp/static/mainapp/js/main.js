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

// Функции валидации
function validatePhone(phone) {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
}

function validateSubject(subject) {
    return subject && subject.trim() !== '';
}

function showFieldError(fieldId, hasError) {
    const fieldGroup = document.getElementById(fieldId);
    if (fieldGroup) {
        if (hasError) {
            fieldGroup.classList.add('error');
            fieldGroup.classList.remove('success');
        } else {
            fieldGroup.classList.remove('error');
            fieldGroup.classList.add('success');
        }
    }
}

function clearValidationStyles() {
    const phoneGroup = document.getElementById('phoneGroup');
    const subjectGroup = document.getElementById('subjectGroup');
    
    if (phoneGroup) phoneGroup.classList.remove('error', 'success');
    if (subjectGroup) subjectGroup.classList.remove('error', 'success');
}

// Обработка формы заявки
function initRequestForm() {
    const requestBtn = document.getElementById('requestBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnBack = document.getElementById('btnBack');
    const requestForm = document.getElementById('requestForm');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    
    if (!requestBtn || !modalOverlay) return;
    
    // Открытие модального окна
    requestBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        clearValidationStyles();
        if (requestForm) requestForm.reset();
    });
    
    // Закрытие модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        clearValidationStyles();
    }
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (btnBack) btnBack.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Маска для телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            let formattedValue = '';
            
            if (!x[2]) {
                formattedValue = x[1];
            } else {
                formattedValue = '+7 (' + x[2];
                if (x[3]) formattedValue += ') ' + x[3];
                if (x[4]) formattedValue += '-' + x[4];
                if (x[5]) formattedValue += '-' + x[5];
            }
            
            e.target.value = formattedValue;
            
            const phoneGroup = document.getElementById('phoneGroup');
            if (phoneGroup) phoneGroup.classList.remove('error');
        });
    }
    
    // Валидация темы обращения в реальном времени
    if (subjectInput) {
        subjectInput.addEventListener('input', function() {
            const subjectGroup = document.getElementById('subjectGroup');
            if (subjectGroup) {
                if (this.value.trim() !== '') {
                    subjectGroup.classList.remove('error');
                    subjectGroup.classList.add('success');
                } else {
                    subjectGroup.classList.remove('success');
                    subjectGroup.classList.add('error');
                }
            }
        });
    }
    
    // Отправка формы
    if (requestForm) {
        requestForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            
            const isPhoneValid = validatePhone(phone);
            const isSubjectValid = validateSubject(subject);
            
            showFieldError('phoneGroup', !isPhoneValid);
            showFieldError('subjectGroup', !isSubjectValid);
            
            // Одно сообщение об ошибке
            if (!isPhoneValid || !isSubjectValid) {
                let errorMessage = '';
                if (!isPhoneValid && !isSubjectValid) {
                    errorMessage = 'Пожалуйста, заполните все поля корректно:\n- Номер телефона должен быть в формате +7 (XXX) XXX-XX-XX\n- Введите тему обращения';
                } else if (!isPhoneValid) {
                    errorMessage = 'Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX';
                } else if (!isSubjectValid) {
                    errorMessage = 'Пожалуйста, введите тему обращения';
                }
                alert(errorMessage);
                return;
            }
            
            // Отключаем кнопку
            const submitBtn = requestForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            try {
                const formData = new FormData(requestForm);
                const response = await fetch(requestForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert(' Спасибо! Ваша заявка принята. Наш менеджер свяжется с вами.');
                    closeModal();
                    requestForm.reset();
                    clearValidationStyles();
                } else {
                    // Одно сообщение об ошибке
                    alert(' ' + (result.message || 'Произошла ошибка. Попробуйте позже.'));
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert(' Ошибка сети. Попробуйте позже.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
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