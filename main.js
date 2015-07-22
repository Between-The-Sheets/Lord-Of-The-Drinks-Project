//add constants with number/alcohol pairs
var ALCOHOL_CONSTANTS = {
    0: 'vodka',
    1:'dark rum',
    2: 'gin',
    3: 'tequila' ,
    4: 'white rum'
    },
    SOFTDRINK_CONSTANTS = {
        0: 'orange juice',
        1: 'tomato juice',
        2: 'sprite',
        3: 'coke',
        4: 'cranberry juice'
    };

var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 500
});
var layer = new Kinetic.Layer();
//var bgLayer = new Kinetic.Layer();
stage.add(layer);

function startAddBottles() {
    var bottles = [],
        numberOfAlcoholBottles = 5,
        bottlesOffsetPosition = 60,
        bottleID;

    for (bottleID = 0; bottleID < numberOfAlcoholBottles; bottleID += 1) { //alcohol bottles here
        var bottle = new Kinetic.Rect({
            x: 10 + bottleID * bottlesOffsetPosition,
            y: 15,
            width: 50,
            height: 100,
            fill: 'lightblue',
            stroke: 'blue'
        });
        bottle.id = ALCOHOL_CONSTANTS[bottleID];
        bottles.push(bottle);
        layer.add(bottle);
   }

    bottles.forEach(function (bottle) {
        bottle.addEventListener('click', function () {
             console.log(bottle.id);  // add the clicked alcohol to compare with constants
        })
    })

    var softDrinks = [],
        numberOfSoftDrinks = 5;

    for (bottleID = 0; bottleID < numberOfSoftDrinks; bottleID +=1) {
        var softDrink = new Kinetic.Rect({
            x: 10 + bottleID * bottlesOffsetPosition,
            y: 150,
            width: 50,
            height: 100,
            fill: 'lightblue',
            stroke: 'blue'
        });
        softDrink.id = SOFTDRINK_CONSTANTS[bottleID];
        softDrinks.push(softDrink);
        layer.add(softDrink);
    }

    softDrinks.forEach(function (softDrink) {
        softDrink.addEventListener('click', function () {
            console.log(softDrink.id);  // add the clicked soft drinks to compare with constants
        })
    })

    layer.draw();
}

startAddBottles();