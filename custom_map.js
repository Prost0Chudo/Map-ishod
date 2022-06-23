// BX.ready(function () {
    ymaps.ready(function () {

        var LAYER_NAME = 'dada#layer',
            MAP_TYPE_NAME = 'moon#customMap',
            // Директория с тайлами.
            /* Для того чтобы вычислить координаты левого нижнего и правого верхнего углов прямоугольной координатной
             * области, нам необходимо знать максимальный зум, ширину и высоту изображения в пикселях на максимальном зуме.
             */
            MAX_ZOOM = 4,
            PIC_WIDTH = 1920,
            PIC_HEIGHT = 1080;

        /**
         * Конструктор, создающий собственный слой.
         */
        var Layer = function () {
            var layer = new ymaps.Layer('map/%z/tile-%x-%y.jpg', {
            // var layer = new ymaps.Layer('https://cdn.vox-cdn.com/uploads/chorus_asset/file/13111859/D2_PC_Osiris2018_09_18_14h25m01s981.png', {
                // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
                // раскомментируйте эту строчку и укажите ссылку на изображение.
                // notFoundTile: 'url'
            });
            // Specifying the range of zoom levels available for this layer.
        layer.getZoomRange = function () {
            return ymaps.vow.resolve([1, 4]);
        };
        // Adding our own copyright info.
        layer.getCopyrights = function () {
            return ymaps.vow.resolve('©');
        };
        return layer;
    };
    // Adding our own constructor to the layer storage.
    ymaps.layer.storage.add(LAYER_NAME, Layer);

    /**
     * Creating a new type of map.
     * MAP_TYPE_NAME - The name of the new map type.
     * LAYER_NAME - The key in the layer storage or the constructor function.
     */
    var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
    // Saving the type in the types storage.
    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

    /**
     * Creating a map and specifying a new map type.
     */
     var worldSize = Math.pow(1, MAX_ZOOM) * 256,
     map = new ymaps.Map('map', {
        center: [0, 0],
        zoom: 1,
        controls: ['zoomControl'],
        type: MAP_TYPE_NAME
    }, {

        // Задаем в качестве проекции Декартову. При данном расчёте центр изображения будет лежать в координатах [0, 0].
        projection: new ymaps.projection.Cartesian([[PIC_HEIGHT / 2 - worldSize, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, worldSize - PIC_WIDTH / 2]], [false, false]),
        // Устанавливаем область просмотра карты так, чтобы пользователь не смог выйти за пределы изображения.
        restrictMapArea: [[-PIC_HEIGHT / 2, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, PIC_WIDTH / 2]]

        // При данном расчёте, в координатах [0, 0] будет находиться левый нижний угол изображения,
        // правый верхний будет находиться в координатах [PIC_HEIGHT, PIC_WIDTH].
        // projection: new ymaps.projection.Cartesian([[PIC_HEIGHT - worldSize, 0], [PIC_HEIGHT, worldSize]], [false, false]),
        // restrictMapArea: [[0, 0], [PIC_HEIGHT, PIC_WIDTH]]
    });

    // Ставим метку в центр координат. Обратите внимание, координаты метки задаются в порядке [y, x].
    var point = new ymaps.Placemark([0, 0], {
        balloonContent: 'Координаты метки: [0, 0]'
    }, {
        preset: 'islands#darkOrangeDotIcon'
    });

    map.geoObjects.add(point);
});