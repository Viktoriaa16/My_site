// Загрузка и инициализация Яндекс.Карт
function loadYandexMap() {
    if (!document.getElementById('yandex-map')) return;
    var apiKey = '1ee09318-9b80-49ec-93d7-b1c2f8a004cc';
    var script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + apiKey + '&lang=ru_RU';
    script.onload = initYandexMap;
    document.head.appendChild(script);
}

function initYandexMap() {
    ymaps.ready(function() {
        // ФИКСИРОВАННЫЙ ЦЕНТР И МАСШТАБ
        var map = new ymaps.Map('yandex-map', {
            center: [55.76, 37.64],
            zoom: 3,
            behaviors: ['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch'], // Только эти поведения
            controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        });
        
        var projects = [
            {name: 'Мурманский порт', city: 'г. Мурманск', work: 'полный комплекс инженерных изысканий', coords: [68.97917, 33.09251], year: '2018'},
            {name: 'Каток в Салехарде', city: 'г. Салехард', work: 'полный комплекс инженерных изысканий', coords: [66.52977, 66.61452], year: '2019'},
            {name: 'Таганрогский порт', city: 'г. Таганрог', work: 'геология и геодезия', coords: [47.23617, 38.89688], year: '2020'}
        ];
        
        var totalSpan = document.getElementById('total-projects');
        if (totalSpan) totalSpan.textContent = projects.length;
        
        var clusterer = new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayoutWidth: 300
        });
        
        for (var i = 0; i < projects.length; i++) {
            var project = projects[i];
            var placemark = new ymaps.Placemark(project.coords, {
                balloonContentHeader: '<strong>' + project.name + '</strong>',
                balloonContentBody: '<p><strong>Местоположение:</strong> ' + project.city + '</p><p><strong>Год:</strong> ' + project.year + '</p><p><strong>Работы:</strong> ' + project.work + '</p>',
                hintContent: project.name
            });
            clusterer.add(placemark);
        }
        
        map.geoObjects.add(clusterer);
        
        // НЕ УСТАНАВЛИВАЕМ ГРАНИЦЫ, оставляем фиксированный центр и масштаб
        // map.setBounds(clusterer.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
        
        map.controls.add('searchControl');
        
        // ЗАПРЕЩАЕМ автоматическое изменение размера
        map.events.add('boundschange', function(e) {
            // Если границы меняются не из-за действий пользователя, возвращаем обратно
            if (!e.get('userAction')) {
                map.setCenter([55.76, 37.64], 3, {duration: 0});
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', loadYandexMap);