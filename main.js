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
        bottles = [];


//bottleID < 3! Слагам този коментар, за да не забравим да го сменим после, когато добавим повече бутилки!!
    for (bottleID = 0; bottleID < 3; bottleID += 1) { //alcohol bottles here
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

    if (!selectedDrinks.length) {
        areEqual = false;
    }

    for(var i = 0, len = selectedDrinks.length; i < len; i += 1) {
        if(selectedDrinks[i] !== cocktail.ingredients[i]) {
            areEqual = false;
        }
    }

    if (areEqual) {
        endScreen();
    }

    console.log(areEqual);
})

//END SCREEN
//Fireworks in case you win the game
function endScreen() {
    var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mousePos = {
        x: 400,
        y: 300
    },

    // create canvas
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    MAX_PARTICLES = 300;
    
    document.addEventListener("mousemove", function(e) {
        e.preventDefault();
        mousePos = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    function loop() {
        // update screen size
        if (SCREEN_WIDTH != window.innerWidth) {
            canvas.width = SCREEN_WIDTH = window.innerWidth;
        }
        if (SCREEN_HEIGHT != window.innerHeight) {
            canvas.height = SCREEN_HEIGHT = window.innerHeight;
        }
    
        // clear canvas
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
        makeParticle(5);
    
        var existingParticles = [];
    
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
    
            // render and save particles that can be rendered
            if (particles[i].exists()) {
                particles[i].render(context);
                existingParticles.push(particles[i]);
            }
        }
    
        // update array with existing particles - old particles should be garbage collected
        particles = existingParticles;
    
        while (particles.length > MAX_PARTICLES) {
            particles.shift();
        }
    }
    
    function makeParticle(count) {
        for (var i = 0; i < count; i++) {
            var particle = new Particle(mousePos);
            var angle = Math.random() * Math.PI * 2;
            var speed = Math.random() * 10 + 2;
    
            particle.vel.x = Math.cos(angle) * speed;
            particle.vel.y = Math.sin(angle) * speed;
    
            particle.size = 10;
    
            // particle.fade = 0.02;
            particle.gravity = 0.2;
            particle.resistance = 0.92;
            particle.shrink = 0.92;
    
            particle.flick = true;
    
            particles.push(particle);
        }
    }
    
    function Particle(pos) {
        this.pos = {
            x: pos.x,
            y: pos.y
        };
        this.vel = {
            x: 0,
            y: 0
        };
        this.shrink = .97;
        this.size = 2;
    
        this.resistance = 1;
        this.gravity = 0;
    
        this.flick = false;
    
        this.alpha = 1;
        this.fade = 0;
        this.color = Math.floor(Math.random() * 360 / 10) * 10;
    }
    
    Particle.prototype.update = function() {
        // apply resistance
        this.vel.x *= this.resistance;
        this.vel.y *= this.resistance;
    
        // gravity down
        this.vel.y += this.gravity;
    
        // update position based on speed
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    
        // shrink
        this.size *= this.shrink;
    
        // fade out
        this.alpha -= this.fade;
    }
    
    Particle.prototype.render = function(c) {
        if (!this.exists()) {
            return;
        }
    
        c.save();
    
        c.globalCompositeOperation = 'lighter';
    
        var x = this.pos.x,
            y = this.pos.y,
            r = this.size / 2;
    
        var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
        gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
        gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");
    
    
        c.fillStyle = gradient;
    
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();
    
        c.restore();
    }
    
    Particle.prototype.exists = function() {
        return this.alpha >= 0.01 && this.size >= 1;
    }
    
    function init() {
        document.body.innerHTML = '';
        document.body.appendChild(canvas);
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        setInterval(loop, 1000 / 30);
    }
    
    init();
}