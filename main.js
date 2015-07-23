var selectedDrinks = [];
var ALCOHOL_CONSTANTS = ['vodka', 'gin', 'cointreau','tequila', 'white rum'];
var RECIPES = {
    0: {
        name: 'Long Island Iced Tea',
        ingredients: ['gin', 'tequila', 'vodka', 'white rum']
    },
    1: {
        name: 'Mojito',
        ingredients: ['lime', 'mint', 'soda', 'white run']
    },
    2: {
        name: 'Pina Colada',
        ingredients: ['coconut liquor', 'pineapple juice', 'white rum']
    },
    3: {
        name: 'Cosmopolitan',
        ingredients: ['cointreau', 'lime', 'vodka']
    },
    4: {
        name: 'Tequila Sunrise',
        ingredients: ['grenadine', 'orange juice', 'tequila']
    },
    5: {
        name: 'Daiquiri',
        ingredients: ['lime', 'white rum']
    },
    6: {
        name: 'Margarita',
        ingredients: ['cointreau', 'lime', 'tequila']
    },
    7: {
        name: 'Sex on the Beach',
        ingredients: ['pineapple juice', 'vodka']
    },
    8: {
        name: 'Cuba Libre',
        ingredients: ['coca-cola', 'white rum']
    },
    9: {
        name: 'Bloody Mery',
        ingredients: ['tomato juice', 'vodka']
    }
},
    index = Math.random() * 10 | 0,
    cocktail = RECIPES[index];

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    numImages = Object.keys(sources).length;

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
function selectedDrinkIsUnique(drinksArray, drink) {
    var i,
        len = drinksArray.length;
    for (i = 0; i < len; i += 1) {
        if (drinksArray[i] === drink) {
            return false;
        }
    }
    return true;
    //return drinksArray.some(function (item) {
    //    return item !== drink;
    //})
}

function initStage(images) {
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 1500,
        height: 800
    });

    var layer = new Kinetic.Layer();

    var BOTTLES_OFF_SET_POSITION = 60,
        bottleID,
        bottles                  = [];

    for (bottleID = 0; bottleID < 3; bottleID += 1) { //alcohol bottles here
        var imageObj = new Image();
        var bottle = new Kinetic.Image({
            x: 10 + bottleID * BOTTLES_OFF_SET_POSITION,
            y: 15,
            image: images[bottleID],
            width: 50,
            height: 100,
            draggable: true
        });
        bottle.startX = bottle.attrs.x;
        bottle.startY = bottle.attrs.y;
        bottle.id = ALCOHOL_CONSTANTS[bottleID];
        bottles.push(bottle);

        layer.add(bottle);
        stage.add(layer);
    }
    bottles.forEach(function (bottle) {
        bottle.addEventListener('dragstart', function () {
            //console.log(bottle.id);  // add the clicked alcohol to compare with constants
        })
    })

    bottles.forEach(function (bottle) {
        bottle.addEventListener('dragend', function () {
            var startX = bottle.startX,
                startY = bottle.startY;

            if ((selectedDrinkIsUnique(selectedDrinks, bottle.id))) {
                selectedDrinks.push(bottle.id);
            }
            console.log(selectedDrinks);
            console.log(bottle.id);
            bottle.setX(startX);
            bottle.setY(startY);

            layer.draw();
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

var myButton = document.getElementById('myButton');

myButton.addEventListener('click', function (ev) {
    selectedDrinks.sort(function (firstIngredient, secondIngredient) {
        var sortedDrinks =  firstIngredient.localeCompare(secondIngredient);
        return sortedDrinks;
    });

    var areEqual = true;

    for(var i = 0, len = selectedDrinks.length; i < len; i += 1) {
        if(selectedDrinks[i] !== cocktail.ingredients[i]) {
            areEqual = false;
        }
    }

    console.log(areEqual);
})