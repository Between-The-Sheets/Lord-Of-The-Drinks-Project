var bar = (function () {
    var bartender,
        index = Math.random() * 10 | 0,
        getRecipes,
        cocktail,
        readyBtn = document.getElementById('ready'),
        reset = document.getElementById('reset');

        reset.addEventListener('click', function (ev) {
            bar.reset();
        });

        getRecipes = function(){
            return [
                {
                    name: 'Long Island Iced Tea',
                    ingredients: ['gin', 'tequila', 'vodka', 'white-rum']
                },
                {
                    name: 'Mojito',
                    ingredients: ['lime', 'mint', 'soda', 'white-rum']
                },
                {
                    name: 'Pina Colada',
                    ingredients: ['coconut-liquor', 'pineapple-juice', 'white-rum']
                },
                {
                    name: 'Between the Sheets',
                    ingredients: ['cointreau', 'dark-rum', 'grenadine']
                },
                {
                    name: 'Tequila Sunrise',
                    ingredients: ['grenadine', 'orange-juice', 'tequila']
                },
                {
                    name: 'Daiquiri',
                    ingredients: ['lime', 'white-rum']
                },
                {
                    name: 'Margarita',
                    ingredients: ['cointreau', 'lime', 'tequila']
                },
                {
                    name: 'Sex on the Beach',
                    ingredients: ['pineapple-juice', 'vodka']
                },
                {
                    name: 'Cuba Libre',
                    ingredients: ['coca-cola', 'white-rum']
                },
                {
                    name: 'Bloody Mery',
                    ingredients: ['tomato-juice', 'vodka']
                }
            ];
        };
        cocktail = getRecipes()[index];
        
    return {
        readyBtn: readyBtn,
        selectBartender : function(ev){
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('container').style.display = 'block';
            document.getElementById('cocktailName').style.display = 'block';
            document.getElementById('bartenderFace').style.display = 'block';
            document.getElementById('cocktailIngredients').style.display = 'block';
            bar.showBartender(ev.target);

            bar.readyBtn.style.display = 'block';
            reset.style.display = 'block';
        },
        getAlcohol: function(){
            return [
                'vodka',
                'gin',
                'cointreau',
                'dark-rum',
                'white-rum',
                'coconut-liquor',
                'grenadine',
                'tequila',
                'whiskey',
                'baileys'
            ];
        },
        getNonAlcohol: function(){
            return [
                'coca-cola',
                'soda',
                'orange-juice',
                'tomato-juice',
                'pineapple-juice',
                'red-bull',
                'sprite',
                'tonic',
                'lime',
                'mint'
            ];
        },
        getSubstances: function(){
            return [
                'lime',
                'mint'
            ];
        },
        getRecipes: getRecipes(),
        getConstants: function(){
            return {
                STAGE_WIDTH: 1500,
                STAGE_HEIGHT: 800,
                BOTTLE_IMAGE_HEIGHT: 130,
                BOTTLE_IMAGE_WIDTH: 130,
                NEXT_ROW_OFF_SET: 170
            };
        },
        generateImagePath: function(items, prefix){
            var sources = {};
            for (var i = 0; i < items.length; i++) {
                sources[i] = './images/' + prefix + 'alcohol/' + items[i] + '.png';
            }

            return sources;
        },
        showBartender: function(target){
            this.bartender = target.getAttribute('id');
            var soundFile = sounds.getSounds()[this.bartender][0];

            document.getElementById('bartenderFace').src = 'images/bartenders/' + target.id + '.png';

            sound.src = soundFile;
            sound.play();
        },
        getBartender: function(){
            return this.bartender;
        },
        selectedDrinkIsUnique: function(drinksArray, drink) {
            var i,
                len = drinksArray.length;

            for (i = 0; i < len; i += 1) {
                if (drinksArray[i] === drink) {
                    return false;
                }
            }

            return true;
        },
        getCocktail: function(){
            return cocktail.name;
        },
        ready: function(selectedDrinks){
            selectedDrinks.sort(function (firstIngredient, secondIngredient) {
            var sortedDrinks = firstIngredient.localeCompare(secondIngredient);
                return sortedDrinks;
            });

            var areEqual = true;

            if (!selectedDrinks.length) {
                areEqual = false;
            }

            for (var i = 0, len = selectedDrinks.length; i < len; i += 1) {
                if (selectedDrinks[i] !== cocktail.ingredients[i]) {
                    areEqual = false;
                }
            }

            if (areEqual) {
                bar.endScreen();
                bar.successShake();
            }
            else{
                bar.endScreen();
                bar.wrongShake();
            }

        },
        reset: function(){
            window.location.reload();
        },
        successShake: function(){
            var SCREEN_WIDTH = bar.getConstants().STAGE_WIDTH,
                SCREEN_HEIGHT = bar.getConstants().STAGE_HEIGHT,
                SHAKER_X = SCREEN_WIDTH * 10 / 100,
                SHAKER_Y = SCREEN_WIDTH * 15 / 100;
            var paper = new Raphael(0, 0,SCREEN_WIDTH , SCREEN_HEIGHT);
            var shaker = paper.image("images/cocktail-shaker-22.png",SHAKER_X,SHAKER_Y,200,300);
            var anim = Raphael.animation({transform: "r0T 0,-100"}, 1000).repeat(Infinity);
            shaker.animate(anim);
            var t = paper.text(250, 550, "");
            t.attr('text',"Perfect Cocktail!");
            t.attr({fill: '#fff', 'font-size': 25});
        },
        wrongShake:function(){
            var SCREEN_WIDTH = bar.getConstants().STAGE_WIDTH,
                SCREEN_HEIGHT = bar.getConstants().STAGE_HEIGHT,
                SHAKER_X = SCREEN_WIDTH * 10 / 100,
                SHAKER_Y = SCREEN_WIDTH * 15 / 100;
            var paper = new Raphael(0, 0,SCREEN_WIDTH , SCREEN_HEIGHT);
            var shaker = paper.image("images/cocktail-shaker-22.png",SHAKER_X,SHAKER_Y,200,300);
            var anim = Raphael.animation({transform: "r90"}, 1000).repeat(1);
            shaker.animate(anim);
            var t = paper.text(250, 550, "");
            t.attr('text',"Cocktail failed! \n Hangover possible!");
            t.attr({fill: '#fff', 'font-size': 25});
        },
        endScreen: function(){
            var SCREEN_WIDTH = this.getConstants().STAGE_WIDTH,
                SCREEN_HEIGHT = this.getConstants().STAGE_HEIGHT,
                mousePos = {
                    x: 250,
                    y: 60
                };

                // display canvas
                document.getElementById('canvas').style.display = 'block';
                var context = canvas.getContext('2d'),
                particles = [],
                x = 100,
                y = 35,
                MAX_PARTICLES = 300;

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
                var particle,
                    angle,
                    speed;

                for (var i = 0; i < count; i++) {
                    particle = new Particle(mousePos);
                    angle = Math.random() * Math.PI * 2;
                    speed = Math.random() * 10 + 2;

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
                this.shrink = 0.97;
                this.size = 2;

                this.resistance = 1;
                this.gravity = 0;

                this.flick = false;

                this.alpha = 1;
                this.fade = 0;
                this.color = Math.floor(Math.random() * 360 / 10) * 10;
            }

            Particle.prototype.update = function () {
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
            };

            Particle.prototype.render = function (c) {
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
            };

            Particle.prototype.exists = function () {
                return this.alpha >= 0.01 && this.size >= 1;
            };

            function init() {
                setInterval(loop, 1000 / 30);
                hideBar();
                addResetButtonToEndScreen();
                showCredits();
            }

            function showCredits(){
                document.getElementById('end-canvas-div').style.display = 'block';
                document.getElementById('endScreen').style.display = 'block';
            }

            function hideBar(){
                document.getElementById('start-screen').style.display = 'none';
                document.getElementById('container').style.display = 'none';
                document.getElementById('cocktailName').style.display = 'none';
                document.getElementById('cocktailIngredients').style.display = 'none';
                document.getElementById('bartenderFace').style.display = 'none';
            }

            function addResetButtonToEndScreen(){
                var newParent = document.getElementById('end-canvas-div'),
                    reset = document.getElementById('reset');

                newParent.appendChild(reset);
            }
            init();
        }
    };
}());