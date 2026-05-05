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

// Текущий год
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Функции валидации
function validateName(name) {
    return name && name.trim().length >= 2;
}

function validatePhone(phone) {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
}

function validateTopic(topic, customTopic) {
    if (!topic || topic === '') return false;
    if (topic === 'other') {
        return customTopic && customTopic.trim().length >= 2;
    }
    return true;
}

function validateMessage(message) {
    return message && message.trim().length >= 10;
}

function validateConsent(consent) {
    return consent === true;
}


function showFieldError(fieldId, hasError, wasTouched) {
    const fieldGroup = document.getElementById(fieldId);
    if (fieldGroup && wasTouched) {
        if (hasError) {
            fieldGroup.classList.add('error');
            fieldGroup.classList.remove('success');
        } else {
            fieldGroup.classList.remove('error');
            fieldGroup.classList.add('success');
        }
    } else if (fieldGroup && !wasTouched) {
        fieldGroup.classList.remove('error', 'success');
    }
}

function clearValidationStyles() {
    const fields = ['nameGroup', 'phoneGroup', 'topicGroup', 'customTopicGroup', 'messageGroup', 'consentGroup'];
    fields.forEach(fieldId => {
        const fieldGroup = document.getElementById(fieldId);
        if (fieldGroup) {
            fieldGroup.classList.remove('error', 'success');
        }
    });
}

// Хранилище состояния touched полей
const touchedFields = {
    name: false,
    phone: false,
    topic: false,
    customTopic: false,
    message: false,
    consent: false
};

function markFieldTouched(fieldName) {
    touchedFields[fieldName] = true;
}

function resetTouchedFields() {
    for (let key in touchedFields) {
        touchedFields[key] = false;
    }
}

function validateForm() {
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const topic = document.getElementById('topic')?.value || '';
    const customTopic = document.getElementById('custom_topic')?.value || '';
    const message = document.getElementById('message')?.value || '';
    const consent = document.getElementById('consent')?.checked || false;
    
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    const isTopicValid = validateTopic(topic, customTopic);
    const isMessageValid = validateMessage(message);
    const isConsentValid = validateConsent(consent);
    
    showFieldError('nameGroup', !isNameValid, touchedFields.name);
    showFieldError('phoneGroup', !isPhoneValid, touchedFields.phone);
    showFieldError('topicGroup', !isTopicValid, touchedFields.topic);
    showFieldError('messageGroup', !isMessageValid, touchedFields.message);
    showFieldError('consentGroup', !isConsentValid, touchedFields.consent);
    
    if (topic === 'other') {
        showFieldError('customTopicGroup', !(customTopic && customTopic.trim().length >= 2), touchedFields.customTopic);
    } else {
        const customGroup = document.getElementById('customTopicGroup');
        if (customGroup) {
            customGroup.classList.remove('error', 'success');
        }
    }
    
    return isNameValid && isPhoneValid && isTopicValid && isMessageValid && isConsentValid;
}

function updateSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const isValid = validateForm();
        submitBtn.disabled = !isValid;
    }
}

// Инициализация формы заявки
function initRequestForm() {
    console.log('Инициализация формы заявки...');
    
    const requestBtn = document.getElementById('requestBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnBack = document.getElementById('btnBack');
    const requestForm = document.getElementById('requestForm');
    const topicSelect = document.getElementById('topic');
    const customTopicGroup = document.getElementById('customTopicGroup');
    const customTopicInput = document.getElementById('custom_topic');
    
    if (!requestBtn) {
        console.error('Кнопка заявки не найдена!');
        return;
    }
    
    if (!modalOverlay) {
        console.error('Модальное окно не найдено!');
        return;
    }
    
    // Открытие модального окна
    requestBtn.addEventListener('click', function(e) {
        console.log('Кнопка заявки нажата');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        clearValidationStyles();
        resetTouchedFields();
        if (requestForm) requestForm.reset();
        if (customTopicGroup) customTopicGroup.style.display = 'none';
        if (topicSelect) topicSelect.value = '';
        updateSubmitButton();
    });
    
    // Закрытие модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        clearValidationStyles();
        resetTouchedFields();
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (btnBack) {
        btnBack.addEventListener('click', closeModal);
    }
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Показ и скрытие поля "Свой вариант"
    if (topicSelect) {
        topicSelect.addEventListener('change', function() {
            markFieldTouched('topic');
            if (this.value === 'other') {
                customTopicGroup.style.display = 'block';
                if (customTopicInput) customTopicInput.required = true;
            } else {
                customTopicGroup.style.display = 'none';
                if (customTopicInput) {
                    customTopicInput.required = false;
                    customTopicInput.value = '';
                }
                touchedFields.customTopic = false;
                const customGroup = document.getElementById('customTopicGroup');
                if (customGroup) {
                    customGroup.classList.remove('error', 'success');
                }
            }
            updateSubmitButton();
        });
    }
    
    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            markFieldTouched('phone');
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue = '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.slice(1, 4);
                    if (value.length > 4) {
                        formattedValue += ') ' + value.slice(4, 7);
                        if (value.length > 7) {
                            formattedValue += '-' + value.slice(7, 9);
                            if (value.length > 9) {
                                formattedValue += '-' + value.slice(9, 11);
                            }
                        }
                    }
                }
            }
            e.target.value = formattedValue;
            updateSubmitButton();
        });
        
        phoneInput.addEventListener('blur', function() {
            markFieldTouched('phone');
            updateSubmitButton();
        });
    }
    
    // Обработчики для всех полей вводимых значений
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const consentCheckbox = document.getElementById('consent');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            markFieldTouched('name');
            updateSubmitButton();
        });
        nameInput.addEventListener('blur', function() {
            markFieldTouched('name');
            updateSubmitButton();
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            markFieldTouched('message');
            updateSubmitButton();
        });
        messageInput.addEventListener('blur', function() {
            markFieldTouched('message');
            updateSubmitButton();
        });
    }
    
    if (customTopicInput) {
        customTopicInput.addEventListener('input', function() {
            markFieldTouched('customTopic');
            updateSubmitButton();
        });
        customTopicInput.addEventListener('blur', function() {
            markFieldTouched('customTopic');
            updateSubmitButton();
        });
    }
    
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', function() {
            markFieldTouched('consent');
            updateSubmitButton();
        });
    }
    
    // Отправка формы связи
    if (requestForm) {
        requestForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Форма отправляется...');
            
            for (let key in touchedFields) {
                touchedFields[key] = true;
            }
            
            if (!validateForm()) {
                alert('Пожалуйста, заполните все поля корректно и дайте согласие на обработку персональных данных.');
                return;
            }
            
            const name = document.getElementById('name')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            let topic = document.getElementById('topic')?.value || '';
            const customTopic = document.getElementById('custom_topic')?.value || '';
            const message = document.getElementById('message')?.value || '';
            const consent = document.getElementById('consent')?.checked || false;
            
            if (topic === 'other') {
                topic = customTopic;
            }
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('phone', phone);
                formData.append('topic', topic);
                formData.append('message', message);
                formData.append('consent', consent);
                formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
                
                const response = await fetch(requestForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                const result = await response.json();
                console.log('Ответ:', result);
                
                if (result.success) {
                    alert(' Спасибо! Ваша заявка принята. Наш менеджер свяжется с вами.');
                    closeModal();
                    requestForm.reset();
                    clearValidationStyles();
                    resetTouchedFields();
                    if (customTopicGroup) customTopicGroup.style.display = 'none';
                    if (topicSelect) topicSelect.value = '';
                } else {
                    alert(' ' + (result.message || 'Произошла ошибка. Попробуйте позже.'));
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert(' Ошибка сети. Пожалуйста, проверьте подключение.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                updateSubmitButton();
            }
        });
    }
    
    console.log('Инициализация завершена');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    animateNumbers();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    setCurrentYear();
    initRequestForm();
});