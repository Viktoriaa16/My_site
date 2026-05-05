const techData = {
    geodesy: {
        title: "Инженерно-геодезические изыскания",
        content: `
            <h2>Инженерно-геодезические изыскания</h2>
            <p><strong>12 инженерно-геодезических бригад</strong></p>
            <h3>Электронные тахеометры</h3>
            <ul><li>Trimble (4 шт.)</li><li>Sokkia (9 шт.)</li></ul>
            <h3>Спутниковые GNSS приемники</h3>
            <ul><li>Trimble R8 (12 шт.)</li><li>Trimble R7 (11 шт.)</li><li>Приемник PrinCE i50 (1 шт.)</li><li>PrinCE i90 (1 шт.)</li><li>Spectra SP80 (1 шт.)</li></ul>
            <p><strong>Комплект трассопоискового оборудования Radiodetection (12 шт.)</strong></p>
            <p><strong>Нивелир оптический Sokkia (1 шт.)</strong></p>
        `
    },
    drilling: {
        title: "Буровые установки",
        content: `<h2>Буровые установки</h2><ul><li>ПБУ-2 на базе КАМАЗ (13 шт.), на базе Урал (2 шт.), на базе ЗИЛ (1 шт.), на базе ГТТ (3 шт.)</li><li>УРБ 2А2 на базе КАМАЗ (1 шт.)</li><li>УГБ-1ВС на трелёвочном тракторе (1 шт.), на базе ГАЗ-66 (1 шт.)</li><li>МГБУ на базе Газели (2 шт.)</li><li>МОЗБТ М4 на гусеничном шасси (2 шт.)</li><li>УГБ-Л-15 «Журавль» (2 шт.)</li><li>Понтон модульный с буровой установкой ПБУ-2 для бурения скважин на воде (2 шт.)</li><li>Понтон модульный с буровой установкой УРБ2А2 для бурения скважин на воде (1 шт.)</li></ul>`
    },
    geology: {
        title: "Инженерно-геологические изыскания",
        content: `<h2>Инженерно-геологические изыскания</h2><p><strong>20 полевых буровых бригад</strong></p><p><strong>Камеральная группа (20 чел.)</strong></p><p><strong>Аккредитованная грунтоведческая лаборатория (8 чел.)</strong></p><h3>Приборы для полевых испытаний грунтов</h3><ul><li>Статическое зондирование грунтов - ПИКА-19, ТЕСТ-12</li><li>Прессиометр</li><li>Оборудование автоматизированное для проведения штампоопытов 600-5000 см²</li></ul><h3>Геофизическое оборудование</h3><ul><li>Лакколит 24М</li><li>Менделеевец</li><li>Георадар ОКО</li><li>ЭНИКС-1</li></ul>`
    },
    auxiliary: {
        title: "Вспомогательная техника",
        content: `<h2>Вспомогательная техника</h2><div class="tech-grid"><div class="tech-item"><strong>Манипулятор</strong> 390206 (1 шт.)</div><div class="tech-item"><strong>Прицеп тракторный</strong> 89963-09 (вагон-дом) (1 шт.)</div><div class="tech-item"><strong>КАМАЗ</strong> вахтовка (1 шт.)</div><div class="tech-item"><strong>Транспортер ГТТ</strong> (1 шт.)</div><div class="tech-item"><strong>Бульдозер ПМЗ-10М</strong> (1 шт.)</div><div class="tech-item"><strong>Трактор Т10-МЧ.02-1Е</strong> (1 шт.)</div><div class="tech-item"><strong>ГАЗ 27527 (Соболь)</strong> (1 шт.)</div><div class="tech-item"><strong>Лада 213100 LADA 4х4</strong> (2 шт.)</div><div class="tech-item"><strong>Лада Ларгус</strong> (3 шт.)</div><div class="tech-item"><strong>Citroen Berlingo</strong> (1 шт.)</div><div class="tech-item"><strong>Снегоболотоход ТРЭКОЛ</strong> (2 шт.)</div><div class="tech-item"><strong>УАЗ Патриот</strong> (4 шт.)</div><div class="tech-item"><strong>УАЗ Пикап</strong> (5 шт.)</div><div class="tech-item"><strong>NISSAN NP300 PICK-UP</strong> (3 шт.)</div></div>`
    },
    remote: {
        title: "Дистанционное зондирование",
        content: `<h2>Дистанционное зондирование</h2><ul><li>Мобильная сканирующая система Phoenix Lidar Systems Scout-16 (1 шт.)</li><li>Мобильная сканирующая система Л-СКАН Премиум (1 шт.)</li><li>Сканирующая система Trimble CX (1 шт.)</li><li>Геоскан 101 (2 шт.), Геоскан 201 (2 шт.)</li><li>DJI Phantom 4 Pro (4 шт.)</li><li>DJI Matrice 600 Pro (2 шт.)</li><li>DJI Matrice 300 RTK (1 шт.)</li></ul>`
    },
    monitoring: {
        title: "Геотехнический мониторинг",
        content: `<h2>Геотехнический мониторинг</h2><ul><li>Электронные тахометры (5 шт.)</li><li>Нивелиры (4 шт.)</li><li>Спутниковые GNSS приемники (3 шт.)</li><li>Скважинные инклинометры (1 шт.)</li><li>Термокосы (2 шт.)</li><li>Телевизоры (1 шт.)</li><li>Прибор вертикального проектирования (PZL) (1 шт.)</li></ul>`
    },
    ecology: {
        title: "Инженерно-экологические и гидрологические изыскания",
        content: `<h2>Инженерно-экологические и гидрологические изыскания</h2><p><strong>7 экологических и гидрометеорологических бригад</strong></p><ul><li>Шумомеры-виброметры «ЭКОФИЗИКА-110А» (2 шт.)</li><li>Микрофонные предусилители Р200 (2 шт.)</li><li>Антенные измерительные магнитные П6-70 (1 шт.), П6-71 (1 шт.)</li><li>Калибраторы аккустические АК-1000 (1 шт.)</li><li>Эхолоты промерные ПЭ-15, Sonarmite DFX (1 шт.)</li><li>Измерители напряженности полей П3-80 (1 шт.)</li><li>Калибраторы акустические CAL200 (1 шт.)</li><li>Измерительные комплексы «Альфарад плюс РП» (2 шт.)</li><li>Дозиметры гамма-излучения ДКГ-07Д «ДРОЗД» (1 шт.)</li><li>Дозиметры-радиометры ДКС-96 (1 шт.)</li><li>Дозиметры-радиометры МКГ-01-10/10 (1 шт.)</li></ul>`
    }
};

const techBtns = document.querySelectorAll('.tech-btn');
const techContent = document.getElementById('techContent');

techBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tech = this.getAttribute('data-tech');
        
        techBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        techContent.innerHTML = techData[tech].content;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    techContent.innerHTML = techData.geodesy.content;
});