function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    for (var src in sources) {
        numImages++;
    }

    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };

        images[src].src = sources[src];
    }
}

function initStage(images) {
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 1500,
        height: 800
    });

    var layer = new Kinetic.Layer();
    var ALCOHOL_CONSTANTS = {
        0: 'vodka',
        1: 'gin',
        2: 'cointreau',
        3: 'tequila',
        4: 'white rum'
    };
    var BOTTLES_OFF_SET_POSITION = 60,
        bottleID,
        bottles = [];

    for (bottleID = 0; bottleID < 3; bottleID += 1) { //alcohol bottles here
        var imageObj = new Image();
        var bottle = new Kinetic.Image({
            x: 10 + bottleID * BOTTLES_OFF_SET_POSITION,
            y: 15,
            image: images[bottleID],
            width: 50,
            height: 100,
            draggable: true,
        });
        bottle.id = ALCOHOL_CONSTANTS[bottleID];
        bottles.push(bottle);

        layer.add(bottle);
        stage.add(layer);
    }
    bottles.forEach(function (bottle) {
        bottle.addEventListener('dragstart', function () {
            console.log(bottle.id);  // add the clicked alcohol to compare with constants
        })
    })

    layer.on('mouseover', function (evt) {
        var shape = evt.shape;
        document.body.style.cursor = 'pointer';
        layer.draw();
    });

    layer.on('mouseout', function (evt) {
        var shape = evt.shape;
        document.body.style.cursor = 'default';
        layer.draw();
    });
}

var sources = {
    0: 'images/absolutVodka_250x500.jpg',
    1: 'images/gordon_gin.png',
    2: 'images/coin.png'
};

loadImages(sources, initStage);