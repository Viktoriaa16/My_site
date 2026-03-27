// ИНТЕРАКТИВНЫЙ СЛАЙДЕР С ЛЕВЫМ МЕНЮ
document.addEventListener('DOMContentLoaded', function() {
    // Данные для 5 услуг
    const servicesData = {
        1: {
            title: "Кадастровые работы",
            description: "Виды работ:",
            workList: [
                "Геодезическая съемка",
                "Определяем точные границы участка",
                "Обработка данных",
                "Подготовка межевого плана",
                "Кадастровый учет",
                "Помощь в постановке на кадастровый учет"
            ]
        },
        2: {
            title: "Инженерные изыскания",
            description: "Виды работ:",
            workList: [
                "Инженерно-геологические изыскания",
                "Инженерно-геодезические изыскания",
                "Инженерно-геофизические изыскания",
                "Инженерно-гидрометеорологические изыскания",
                "Инженерно-археологические изыскания",
                "Инженерно-экологические изыскания"
            ]
        },
        3: {
            title: "Проектирование",
            description: "Виды работ:",
            workList: [
                "Разработка проекта",
                "Прохождение экспертизы проектной документации",
                "Помощь в получении разрешения на строительство",
                "Расчет стоимости строительства, предложение по снижению издержек"
            ]
        },
        4: {
            title: "Строительство",
            description: "Виды работ:",
            workList: [
                "Проектирование прохождение экспертизы",
                "Получение разрешения на строительство",
                "Составление сметы",
                "Выполнение работ"
            ]
        },
        5: {
            title: "Геотехнический мониторинг",
            description: "Виды работ:",
            workList: [
                "Наблюдение за деформациями зданий и сооружений",
                "Контроль за смещением массива грунта и уровнем грунтовых вод",
                "Обследование и оценка технического состояния строительных конструкций",
                "Создание опорных геодезических сетей, геодезической разбивочной основы для строительства (ГРО)",
                "Вынос и закрепление на местности проектируемых линейных и площадных объектов",
                "Геодезическое сопровождение строительства"
            ]
        }
    };
    
    const sliderBg = document.getElementById('serviceSliderBg');
    const menuItems = document.querySelectorAll('.service-menu-item');
    const serviceInfo = document.getElementById('serviceInfo');
    
    if (!sliderBg) return;
    
    function updateServiceInfo(serviceId, bgImage) {
        const data = servicesData[serviceId];
        if (!data) return;
        
        if (bgImage) {
            sliderBg.style.backgroundImage = "url('/static/mainapp/images/" + bgImage + "')";
        }
        
        let workListHtml = '<ul class="service-list">';
        for (var i = 0; i < data.workList.length; i++) {
            workListHtml += '<li>' + data.workList[i] + '</li>';
        }
        workListHtml += '</ul>';
        
        serviceInfo.innerHTML = '<h2>' + data.title + '</h2><p>' + data.description + '</p>' + workListHtml;
    }
    
    // Функция для отображения информации о компании (первый блок)
    function showCompanyInfo() {
        // Сбрасываем активный класс у всех кнопок
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active');
        }
        
        // Отображаем информацию о компании
        serviceInfo.innerHTML = `
            <h2>ДОНГИС</h2>
            <p>Воплощаем уникальные проекты, развивая будущее страны</p>
        `;
        
        // Фон по умолчанию
        sliderBg.style.backgroundImage = "url('/static/mainapp/images/bgsl1.png')";
    }
    
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function() {
            for (var j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            this.classList.add('active');
            updateServiceInfo(this.getAttribute('data-service'), this.getAttribute('data-bg'));
        });
    }
    
    // Показываем информацию о компании при загрузке
    showCompanyInfo();
});