// Данные для слайдов
const slidesData = [
    {
        title: "ДОНГИС",
        description: "Воплощаем уникальные проекты, развивая будущее страны",
        hasList: false,
        alignCenter: true,
        bgImage: "bgsl1.png"
    },
    {
        title: "Кадастровые работы",
        description: "Виды работ:",
        workList: [
            "Геодезическая съемка",
            "Определяем точные границы участка",
            "Обработка данных",
            "Подготовка межевого плана",
            "Кадастровый учет",
            "Помощь в постановке на кадастровый учет"
        ],
        hasList: true,
        alignCenter: false,
        bgImage: "cadastral_bg.png"
    },
    {
        title: "Инженерные изыскания",
        description: "Виды работ:",
        workList: [
            "Инженерно-геологические изыскания",
            "Инженерно-геодезические изыскания",
            "Инженерно-геофизические изыскания",
            "Инженерно-гидрометеорологические изыскания",
            "Инженерно-археологические изыскания",
            "Инженерно-экологические изыскания"
        ],
        hasList: true,
        alignCenter: false,
        bgImage: "engineering_bg.png"
    },
    {
        title: "Проектирование",
        description: "Виды работ:",
        workList: [
            "Разработка проекта",
            "Прохождение экспертизы проектной документации",
            "Помощь в получении разрешения на строительство",
            "Расчет стоимости строительства, предложение по снижению издержек"
        ],
        hasList: true,
        alignCenter: false,
        bgImage: "projection_bg.png"
    },
    {
        title: "Строительство",
        description: "Виды работ:",
        workList: [
            "Проектирование прохождение экспертизы",
            "Получение разрешения на строительство",
            "Составление сметы",
            "Выполнение работ"
        ],
        hasList: true,
        alignCenter: false,
        bgImage: "buling_bg.png"
    },
    {
        title: "Геотехнический мониторинг",
        description: "Виды работ:",
        workList: [
            "Наблюдение за деформациями зданий и сооружений",
            "Контроль за смещением массива грунта и уровнем грунтовых вод",
            "Обследование и оценка технического состояния строительных конструкций",
            "Создание опорных геодезических сетей",
            "Вынос и закрепление на местности проектируемых объектов",
            "Геодезическое сопровождение строительства"
        ],
        hasList: true,
        alignCenter: false,
        bgImage: "GEOmon_bg.png"
    }
];

let currentSlide = 0;
let autoSlideInterval;
const slideDuration = 4000; 

const sliderBg = document.getElementById('mainSliderBg');
const sliderCard = document.getElementById('sliderCard');
const sliderTitle = document.getElementById('sliderTitle');
const sliderDescription = document.getElementById('sliderDescription');
const sliderList = document.getElementById('sliderList');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dots = document.querySelectorAll('.slider-dot');

function updateSlide(index) {
    const data = slidesData[index];
    if (!data) return;
    
    sliderBg.style.backgroundImage = "url('/static/mainapp/images/" + data.bgImage + "')";
    sliderTitle.textContent = data.title;
    sliderDescription.textContent = data.description;
    
    if (data.alignCenter) {
        sliderCard.classList.add('align-center');
        sliderTitle.style.textAlign = 'center';
        sliderTitle.style.borderLeft = 'none';
        sliderTitle.style.paddingLeft = '0';
        sliderDescription.style.textAlign = 'center';
    } else {
        sliderCard.classList.remove('align-center');
        sliderTitle.style.textAlign = 'left';
        sliderTitle.style.borderLeft = '4px solid #134b2e';
        sliderTitle.style.paddingLeft = '15px';
        sliderDescription.style.textAlign = 'left';
    }
    
    if (data.hasList && data.workList) {
        let listHtml = '';
        for (var i = 0; i < data.workList.length; i++) {
            listHtml += '<li>' + data.workList[i] + '</li>';
        }
        sliderList.innerHTML = listHtml;
        sliderList.style.display = 'block';
    } else {
        sliderList.style.display = 'none';
    }
    
    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    if (dots[index]) dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slidesData.length;
    updateSlide(currentSlide);
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
    updateSlide(currentSlide);
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide(currentSlide);
    resetAutoSlide();
}

function resetAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(function() {
        nextSlide();
    }, slideDuration);
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', (function(index) {
        return function() {
            goToSlide(index);
        };
    })(i));
}

updateSlide(0);
resetAutoSlide();