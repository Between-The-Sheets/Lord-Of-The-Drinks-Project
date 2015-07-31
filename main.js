(function () {
    var bartenderSelected = document.getElementsByClassName('bartenderImg'),
        music = document.getElementById('music'),
        selectedDrinks = [],
        substances = bar.getSubstances(),
        CONSTANTS = bar.getConstants(),
        stage = null,
        layer = new Kinetic.Layer(),
        backgroundLayer = new Kinetic.Layer(),
        bartendersSounds = bar.getSounds(),
        soundIndex = 1,
        i,
        len,
        desiredCocktail = document.getElementById('cocktailName'),
        ingredientField = document.getElementById('cocktailIngredients');
        desiredCocktail.innerHTML = '<span class="cocktail-label">Your desired cocktail: <br/></span>' + bar.getCocktail();
        ingredientField.innerHTML = '<span class="cocktail-label">Your ingredients so far: <br/></span>';

    music.volume = 0.5;

    for (i = 0, len = bartenderSelected.length; i < len; i++) {
        bartenderSelected[i].addEventListener('click', bar.selectBartender);
    }

    stage = new Kinetic.Stage({
        container: 'container',
        width: CONSTANTS.STAGE_WIDTH,
        height: CONSTANTS.STAGE_HEIGHT
    });

    //Images must be in dom to set it in kinetic object
    function loadImages(sources, callback, secondRow) {
        var images = {},
            loadedImages = 0,
            numImages = 0,
            src;

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
            bottle.id = bar.getAlcohol()[bottleID];

            if (secondRow) {
                bottle.id = bar.getNonAlcohol()[bottleID];
            }
            bottles.push(bottle);

            layer.add(bottle);
        }

        stage.add(layer);
        stage.draw();

        function musicFadeIn(music,currentSoundLen){ //TODO does not work without magic because currentSound.duration returns NAN
            return setTimeout(function () {
                music.volume = 0.5;
            },currentSoundLen);
        }

        bottles.forEach(function (bottle) {
            bottle.addEventListener('dragstart', function (ev) {
                var soundOfBartender = new Audio(),
                    currentSound;

                if (soundIndex >= bartendersSounds[bar.getBartender()].length) {
                    soundIndex = 0;
                }

                currentSound = bartendersSounds[bar.getBartender()][soundIndex];
                soundOfBartender.src = currentSound;
                music.volume = 0.15;
                soundOfBartender.play();
                musicFadeIn(music,2800);

                soundIndex++;
            });
        });

        bottles.forEach(function (bottle) {
            bottle.addEventListener('dragend', function (ev) {
                var dragDistanceX = bottle.attrs.x,
                    dragDistanceY = bottle.attrs.y,
                    isAtShaker,
                    shakerLeftCorner = 730,
                    shakerRightCorner = 880;

                if (substances.indexOf(bottle.id) < 0 &&
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

                isAtShaker = ev.clientX > shakerLeftCorner && ev.clientX < shakerRightCorner;

                if ((bar.selectedDrinkIsUnique(selectedDrinks, bottle.id)) && isAtShaker) {
                    selectedDrinks.push(bottle.id);

                    ingredientField.innerHTML += bottle.id + '<br/>';
                }
            })
        });

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

    var alcoholSources = bar.generateImagePath(bar.getAlcohol(), ''),
        nonalcoholSources = bar.generateImagePath(bar.getNonAlcohol(), 'non-');

    loadImages(alcoholSources, initStage);
    loadImages(nonalcoholSources, initStage, CONSTANTS.NEXT_ROW_OFF_SET * 2);

    bar.readyBtn.addEventListener('click', function (ev) {
        bar.ready(selectedDrinks);
    });
} ());