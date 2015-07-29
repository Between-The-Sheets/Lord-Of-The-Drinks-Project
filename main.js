(function () {
    var bartenderSelected = document.getElementsByClassName('bartenderImg'),
        sound = document.getElementById('sound'),
        readyBtn = document.getElementById('ready'),
        reset = document.getElementById('reset'),
        selectedDrinks = [],
        ALCOHOL_CONSTANTS = bar.getAlcohol(),
        NONALCOHOL_CONSTANTS = bar.getNonAlcohol(),
        SUBSTANCES = bar.getSubstances(),
        CONSTANTS = bar.getConstants(),
        stage = null,
        layer = null,
        backgroundLayer = null,
        bartendersSounds = bar.getSounds(),
        bartender,
        soundIndex = 1,
        i, len;

        function selectBartender(ev){
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        document.getElementById('cocktailName').style.display = 'block';
        document.getElementById('bartenderFace').style.display = 'block';
        bar.showBartender(ev.target);

        readyBtn.style.display = 'block';
        reset.style.display = 'block';
    };
    
    for (i = 0, len = bartenderSelected.length; i < len; i++) {
        bartenderSelected[i].addEventListener('click', selectBartender);
    }

    stage = new Kinetic.Stage({
        container: 'container',
        width: CONSTANTS.STAGE_WIDTH,
        height: CONSTANTS.STAGE_HEIGHT
    });

    backgroundLayer = new Kinetic.Layer();
    layer = new Kinetic.Layer();
    //Images must be in dom to set it in kinetic object
    function loadImages(sources, callback, secondRow) {
        var images = {},
            loadedImages = 0,
            numImages = 0,
            src,
            desiredCocktail;

        numImages = Object.keys(sources).length;

        for (src in sources) {
            images[src] = new Image();
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images, numImages, secondRow);
                }
            };

            images[src].src = sources[src];
        }

        desiredCocktail = document.getElementById('cocktailName');
        desiredCocktail.innerHTML = 'Your desired cocktail: ' + bar.getCoctail();
    }

    function initStage(images, rowLength, secondRow) {
        var len = 0,
            BOTTLES_OFF_SET_POSITION = 85,
            bottleID,
            bottles = [],
            bottle,
            offsetY = 15,
            imageWidth = CONSTANTS.BOTTLE_IMAGE_WIDTH,
            imageHeight = CONSTANTS.BOTTLE_IMAGE_HEIGHT,
            background,
            img,
            nextRowConst = 0;
    
    
        //draw background
        var imageObj = new Image();
        imageObj.onload = function () {
            background = new Kinetic.Image({
                x: 0,
                y: 0,
                image: imageObj,
                width: 1500,
                height: 800
            });

            backgroundLayer.add(background);

            stage.add(backgroundLayer);
            stage.add(layer);
            stage.draw();

        };
        imageObj.src = 'images/background.png';
    

        //playing with y offset and image widht/height
        if (secondRow) {
            offsetY = secondRow;
        }

        for (bottleID = 0; bottleID < rowLength; bottleID += 1) { //alcohol bottles here
            if (bottleID === 5) {
                nextRowConst += CONSTANTS.NEXT_ROW_OFF_SET;
            }

            bottle = new Kinetic.Image({
                x: (bottleID % 5) * BOTTLES_OFF_SET_POSITION,
                y: offsetY + nextRowConst,
                image: images[bottleID],
                width: imageWidth,
                height: imageHeight,
                draggable: true
            });

            bottle.startX = bottle.attrs.x;
            bottle.startY = bottle.attrs.y;
            bottle.id = ALCOHOL_CONSTANTS[bottleID];

            if (secondRow) {
                bottle.id = NONALCOHOL_CONSTANTS[bottleID];
            }
            bottles.push(bottle);

            layer.add(bottle);
        }

        stage.add(layer);
        stage.draw();

        bottles.forEach(function (bottle) {  // TODO: fix it completely method works till it gets to the end of soundfiles, then skips one and starts working again odd behaviour
            bottle.addEventListener('dragstart', function (ev) {
                var soundOfBartender = new Audio(),
                    currentSound,
                    bartender = bar.getBartender();

                if (soundIndex >= bartendersSounds[bartender].length) {
                    soundIndex = 0;
                }

                currentSound = bartendersSounds[bartender][soundIndex];
                soundOfBartender.src = currentSound;
                soundOfBartender.play();
                soundIndex++;
            });
        });

        bottles.forEach(function (bottle) {
            bottle.addEventListener('dragend', function (ev) {
                var dragDistanceX = bottle.attrs.x,
                    dragDistanceY = bottle.attrs.y;
         
                if (SUBSTANCES.indexOf(bottle.id) < 0 &&
                    dragDistanceX >= 650 &&
                    dragDistanceY <= 500) {
                    var tween;
                    function rotateBottle() {
                        tween = new Kinetic.Tween({
                            node: bottle,
                            rotation: 135,
                            easing: Kinetic.Easings.EaseInOut,
                            duration: 1,
                            onFinish: rotateBack
                        });

                        tween.play();
                    }

                    function rotateBack() {
                        tween = new Kinetic.Tween({
                            node: bottle,
                            rotation: 0,
                            easing: Kinetic.Easings.EaseInOut,
                            duration: 1,
                            onFinish: animFrame
                        });

                        tween.play();
                    }

                    rotateBottle();
                } else {
                    animFrame();
                }

                function animFrame() {
                    var ANIMAATION_SMOOTHNESS = 20,
                        startX = bottle.startX,
                        startY = bottle.startY,
                        dragendX = bottle.attrs.x,
                        dragendY = bottle.attrs.y,
                        deltaX = (startX - dragendX) / ANIMAATION_SMOOTHNESS,
                        deltaY = (startY - dragendY) / ANIMAATION_SMOOTHNESS;


                    bottle.setX(bottle.getX() + deltaX);
                    bottle.setY(bottle.getY() + deltaY);
                    layer.draw();

                    requestAnimationFrame(animFrame);
                }

                if ((bar.selectedDrinkIsUnique(selectedDrinks, bottle.id))) {
                    selectedDrinks.push(bottle.id);
                }
                console.log(selectedDrinks);
                console.log(bottle.id);
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

    var alcoholSources = bar.generateImagePath(ALCOHOL_CONSTANTS, ''),
        nonalcoholSources = bar.generateImagePath(NONALCOHOL_CONSTANTS, 'non-');

    loadImages(alcoholSources, initStage);
    loadImages(nonalcoholSources, initStage, CONSTANTS.NEXT_ROW_OFF_SET * 2);

    readyBtn.addEventListener('click', function (ev) {
        bar.ready(selectedDrinks);
    });

    reset.addEventListener('click', function (ev) {
        bar.reset();
    });
} ());
