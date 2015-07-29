var bar = (function () {
    var bartender,
        index = Math.random() * 10 | 0,
        getRecipes,
        cocktail;

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
                    name: 'Cosmopolitan',
                    ingredients: ['cointreau', 'lime', 'vodka']
                },
                {
                    name: 'Tequila Sunrise',
                    ingredients: ['grenadine', 'orange juice', 'tequila']
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
        }
        cocktail = getRecipes()[index];
        
    return {
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
            ]
        },
        getRecipes: getRecipes(),
        getSounds: function(){
            return {
                'niki': [
                   'sounds/Niki/Niki - i sys sigurnost shte psuvate.wav',
                   'sounds/Niki/Niki - Mnogo si glupav.wav',
                   'sounds/Niki/Niki - Ne se oplakva mnogo mnogo.wav',
                   'sounds/Niki/Niki - stryaskashto.wav',
                   'sounds/Niki/Niki - Vsichko e prekrasno.wav'
                ],
                'doncho': [
                    'sounds/Doncho/Doncho - Blagodarya blagodarya vi.wav',
                    'sounds/Doncho/Doncho - Chakaite da se setya kak tochno beshe formulata.wav',
                    'sounds/Doncho/Doncho - Imame taka dobri predlozheniya.wav',
                    'sounds/Doncho/Doncho - NAZDRAVE.wav',
                    'sounds/Doncho/Doncho - ne e mnogo mydro reshenie.wav',
                    'sounds/Doncho/Doncho - v kenvasa nazdrave.wav',
                    'sounds/Doncho/Doncho- Kvo staa siga - nishtu.wav'
                ],
                'evlogi': [
                    'sounds/Evlogi/Evlogi - Moga da si pravya vsyakakvi neshta kvot mi hrumne na akyla.wav',
                    'sounds/Evlogi/Evlogi - She vidim kak shse spravim.wav',
                    'sounds/Evlogi/Evlogi - Izglezhda grozno.wav',
                    'sounds/Evlogi/Evlogi - Kvot mi hrumne na akyla.wav',
                    'sounds/Evlogi/Evlogi - Moga da si pravq kvot si iskam.wav',
                    'sounds/Evlogi/Evlogi - Ne se plashete.wav',
                    'sounds/Evlogi/Evlogi - Oshte po-grozno ot predi.wav',
                    'sounds/Evlogi/Evlogi - Uha bravo be.wav'
                ],
                'ivo': [
                    'sounds/Ivo/Ivo - Kyde sa aplodismentite.wav',
                    'sounds/Ivo/Ivo - napravo mi burka v ushite.wav',
                    'sounds/Ivo/Ivo - Nisho ne staa ot nego.wav',
                    'sounds/Ivo/Ivo - Totalen bylvoch.wav',
                    'sounds/Ivo/Ivo - Tva e edin chichka koito e prekalyaval s alkohola obache e mnogo dobyr v programiraneto.wav',
                    'sounds/Ivo/Ivo - Tva e redovna greshka taka che vse taq.wav'
                ]
            };
        },
        getConstants: function(){
            return {
                STAGE_WIDTH: 1500,
                STAGE_HEIGHT: 800,
                BOTTLE_IMAGE_HEIGHT: 130,
                BOTTLE_IMAGE_WIDTH: 130,
                NEXT_ROW_OFF_SET: 170
            }
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
            var soundFile = this.getSounds()[this.bartender][0];

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
            }
        },
        reset: function(){
            window.location.reload();
        },
        endScreen: function(){
            var SCREEN_WIDTH = this.getConstants().STAGE_WIDTH,
                SCREEN_HEIGHT = this.getConstants().STAGE_HEIGHT,
                mousePos = {
                    x: 400,
                    y: 300
                };

                // display canvas
                document.getElementById('canvas').style.display = 'block',
                context = canvas.getContext('2d'),
                particles = [],
                MAX_PARTICLES = 300;

            document.addEventListener("mousemove", function (e) {
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
                this.shrink = .97;
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
            }

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
            }

            Particle.prototype.exists = function () {
                return this.alpha >= 0.01 && this.size >= 1;
            }

            function init() {
                setInterval(loop, 1000 / 30);
                showCredits();
            }
            function showCredits(){
                document.getElementById('start-screen').style.display = 'none';
                document.getElementById('container').style.display = 'none';
                document.getElementById('cocktailName').style.display = 'none';
                document.getElementById('bartenderFace').style.display = 'none';
                document.getElementById('end-canvas-div').style.display = 'block';
                document.getElementById('endScreen').style.display = 'block';

            }
            
            init();
        }
    }
}());