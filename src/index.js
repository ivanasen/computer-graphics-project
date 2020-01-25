function createScene() {
    // рисувателно поле на цял екран
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // сцена и камера
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.set(200, 0, 0);
    camera.lookAt(0, 0, 0);


    // светлини
    addLights();

    // ground
    const groundTexture = loader.load('../assets/textures/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
    const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
    ground.position.y = -42;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 100;
    controls.maxDistance = 400;

    loadSounds();

    initialisePlayer();

    const car = createGolfCar();
    car.position.y -= 30;
    car.position.z -= 60;
    scene.add(car);
}

function addLights() {
    const light = new THREE.DirectionalLight('lightblue', 0.5);
    light.position.set(0, 100, 100);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.AmbientLight('white'));

    // const pointLight = new THREE.PointLight(0xffffff);
    // pointLight.castShadow = true;
    // pointLight.position.set(0, 200, 200);

    // pointLight.shadow.mapSize.width = 1024;
    // pointLight.shadow.mapSize.height = 1024;

    // pointLight.shadow.camera.near = 0.5;
    // pointLight.shadow.camera.far = 500;
    // pointLight.shadow.camera.fov = 30;

    // scene.add(pointLight);
}

function initialisePlayer() {
    player = мъжествен();
    player.position.y -= 12;
    player.врат.врът(0, 0, -30);
    player.таз.врът(0, 0, -20);
    player.л_лакът.врът(10, 40, -30);
    player.д_лакът.врът(3, 40, 5);
    player.л_ръка.врът(12, 30, -10);
    player.д_ръка.врът(42, 30, -18);
    player.л_крак.врът(10, 0, -40);
    player.д_крак.врът(-10, 0, -40);
    player.л_коляно.врът(0, -10, 20);
    player.д_коляно.врът(0, 10, 20);
    player.д_глезен.врът(0, 10, 0);
    player.л_глезен.врът(0, -10, 0);

    const tShirtColor = 0x024c85;
    const skinColor = 0x59372e;
    const pantsColor = 0x192027;
    setColor(player.таз, pantsColor);
    setColor(player.тяло, tShirtColor);
    setColor(player.л_лакът, skinColor);
    setColor(player.д_лакът, skinColor);
    setColor(player.глава, skinColor);
    setColor(player.д_глезен, 0xbbbbbb);
    setColor(player.л_глезен, 0xbbbbbb);

    player.castShadow = true;

    const stick = createGolfStick();
    createBall();

    player.л_китка.add(stick);

    hat = createPlayerHat();
    player.глава.add(hat);

    console.log(player);
}

function createGolfStick() {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 41, 32);
    const material = new THREE.MeshPhysicalMaterial();
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 4, 0)
    cylinder.rotation.set(0, 0, 0.3);
    scene.add(cylinder);

    const endGeometry = new THREE.BoxGeometry(1, 2, 4);
    const end = new THREE.Mesh(endGeometry, material);
    end.position.set(-6, 22.5, 2);
    end.rotation.z += 0.3;

    const stick = new THREE.Group();
    stick.add(cylinder);
    stick.add(end);

    stick.position.y += 6;
    return stick;
}

function createBall() {
    const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshLambertMaterial({ color: 'white' });
    ball = new THREE.Mesh(geometry, material);
    ball.position.set(20, -41, 0);
    ball.castShadow = true;
    scene.add(ball);
}

function createPlayerHat() {
    const hat = new THREE.Group();

    const sphere = new THREE.SphereGeometry(3.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });

    const peakGeometry = new THREE.PlaneGeometry(5, 6, 2, 2);
    const peak = new THREE.Mesh(peakGeometry, material);
    peak.material.side = THREE.DoubleSide;
    peak.position.x += 3;
    peak.rotation.x -= Math.PI / 2;

    hat.add(new THREE.Mesh(sphere, material));
    hat.add(peak);
    hat.rotation.z += 0.5;
    hat.position.y += 4;
    hat.position.x -= 0.3;

    return hat;
}

// функция за анимиране на сцената
let t = 0; // време
function drawFrame() {
    requestAnimationFrame(drawFrame);
    animate(t++);
    renderer.render(scene, camera);
}

const AnimationState = {
    INITIAL: {
        animate: animateInitial
    },
    GOLF_STICK_SWINGING: {
        animate: animateGolfStickSwinging
    },
    BALL_HIT: {
        animate: animateBallHit
    },
    TURNING_AROUND: {
        animate: animateTurningAround
    },
    BALL_FALLING: {
        animate: animateBallFalling
    },
    PLAYER_FALLING: {
        animate: animatePlayerFalling
    },
    FINISHED: {
        animate: animateFinished
    }
}
let animationState = AnimationState.INITIAL;

function animate(t) {
    animationState.animate(t);
};

let tDelta = 0.02;
let currentLeftArmRotation = { x: 0, y: 30, z: -30 };
let currentRightArmRotation = { x: 0, y: 30, z: -30 };
function animateInitial(t) {
    player.глава.врът(0, 20 * Math.sin(tDelta * t) - 20, 0);
    hat.rotation.y = 0.2 * Math.sin(tDelta * t) - 0.1;
    player.л_ръка.врът(15 * Math.sin(tDelta * 1.2 * t) + 30, 30, -30);
    player.д_ръка.врът(15 * Math.sin(tDelta * 1.2 * t) + 55, 30, -30);
    currentLeftArmRotation.x = 15 * Math.sin(tDelta * 1.2 * t) + 30;
}

let tGolfSwing = -1;
function animateGolfStickSwinging(t) {
    if (tGolfSwing === -1) {
        tGolfSwing = currentLeftArmRotation.x;
    } else if (tGolfSwing <= 100) {
        player.л_ръка.врът(tGolfSwing, 30, -30);
        player.д_ръка.врът(tGolfSwing + 25, 30, -30);
        tGolfSwing += 2;
    } else if (tGolfSwing <= 150) {
        player.л_ръка.врът(160 - tGolfSwing, 30, -30);
        player.д_ръка.врът(160 - tGolfSwing + 25, 30, -30);
        tGolfSwing += 5;
    } else {
        animationState = AnimationState.BALL_HIT;
        ballHitSound.play();
    }
}

let tGolfSwingAfterHit = 150;
let tHead = 0;
function animateBallHit(t) {
    if (tGolfSwingAfterHit <= 250) {
        player.л_ръка.врът(160 - tGolfSwingAfterHit, 30, -30);
        player.д_ръка.врът(160 - tGolfSwingAfterHit + 25, 30, -30);
        tGolfSwingAfterHit += 5;
    }

    if (ball.position.y <= 300) {
        ball.position.y += 0.2 * 15;
        ball.position.z += 0.3 * 15;

        player.глава.врът(0, tHead * -60, 0);
        player.врат.врът(0, 0, (1 - tHead) * -30);
        if (tHead < 1) {
            tHead += 0.1;
        }

    } else {
        animationState = AnimationState.TURNING_AROUND;
    }
}

let turningAroundT = 0;
let turningAroundDelta = 0.05;
function animateTurningAround(t) {
    if (turningAroundT <= 1) {
        player.rotation.set(0, - turningAroundT * Math.PI / 2, 0);
        player.глава.врът(0, (1 - turningAroundT) * -60, 0);
        player.л_ръка.врът(turningAroundT * 30, (1 - turningAroundT) * 30, (1 - turningAroundT) * -30);
        player.д_ръка.врът(0, (1 - turningAroundT) * 30, turningAroundT * -110 + (1 - turningAroundT) * -30);
        player.д_лакът.врът(0, 0, turningAroundT * -110);
        player.д_китка.врът(0, turningAroundT * -100, turningAroundT * -80);
        turningAroundT += turningAroundDelta;
    } else {
        animationState = AnimationState.BALL_FALLING;
    }

}

let ballFallingT = -120;
function animateBallFalling(t) {
    if (ballFallingT < 0) {
        ++ballFallingT;
    } else if (ballFallingT === 0) {
        ball.position.y = 65;
        ball.position.z = -300;
        ++ballFallingT;
    } else if (ballFallingT <= 49) {
        ball.position.y -= 1;
        ball.position.z += 6;
        ++ballFallingT;
    } else {
        animationState = AnimationState.PLAYER_FALLING;
        headHitSound.play();
    }
}

let ballInitialPosition;
let targetPosition;
let ballBouncingT = 0;
let ballBouncingDelta = 0.01;
function animateBallBouncingOf(t) {
    if (ballBouncingT === 0) {
        ballInitialPosition = ball.position.clone();

        controlPointPosition = ball.position.clone();
        controlPointPosition.y += 20;
        controlPointPosition.z -= 20;

        targetPosition = ball.position.clone();
        targetPosition.y -= 58;
        targetPosition.z -= 40;
    } else if (ballBouncingT <= 1) {
        ball.position.z = Math.pow(1 - ballBouncingT, 2) * ballInitialPosition.z
            + 2 * ballBouncingT * (1 - ballBouncingT) * controlPointPosition.z
            + Math.pow(ballBouncingT, 2) * targetPosition.z;

        ball.position.y = Math.pow(1 - ballBouncingT, 2) * ballInitialPosition.y
            + 2 * ballBouncingT * (1 - ballBouncingT) * controlPointPosition.y
            + Math.pow(ballBouncingT, 2) * targetPosition.y;
    } else {
        animationState = AnimationState.FINISHED;
    }

    ballBouncingT += ballBouncingDelta;
    ballBouncingDelta += 0.001;
}

let fallingT = 0;
let fallingDelta = 3;
let rotationT = 0;
let bodyT = 0;
let bodyDelta = 0.1;
let pivot = new THREE.Group();
function animatePlayerFalling(t) {
    animateBallBouncingOf(t);

    if (fallingT === 0) {
        pivot.position.set(0, -40, 0);
        pivot.add(player);
        player.position.y += 42;
        scene.add(pivot);

        fallingT++;

        player.д_лакът.врът(0, 0, 0);
        player.д_китка.врът(0, 0, 0);
    } else if (pivot.rotation.x < Math.PI / 2.1) {
        pivot.rotation.x = rotationT * Math.PI / 2;
        player.л_ръка.врът(fallingT * 1.5, 0, 0);
        player.д_ръка.врът(-fallingT * 1.5, 0, 0);
        fallingT += fallingDelta;

        player.таз.врът(0, 0, 0);
        player.л_крак.врът(bodyT * 40, bodyT * 50, 0);
        player.д_крак.врът(0, 0, 0);
        player.л_коляно.врът(0, bodyT * -150, bodyT * 50);
        player.д_коляно.врът(0, 0, 0);
        player.д_глезен.врът(bodyT * -10, 0, bodyT * 40);
        player.л_глезен.врът(bodyT * 10, 0, bodyT * 10);

        rotationT += 0.08;
        if (bodyT < 1) {
            bodyT += bodyDelta;
        }

    } else {
        if (!shutDownSound.isPlaying) {
            shutDownSound.play();
        }
    }

}

function animateFinished(t) {
}

function setColor(obj, color) {
    obj.traverse((child) => {
        if (child.type === 'Mesh') {
            child.material.color.set(color);
        }
    });
}

const HIT_BALL_KEYCODE = 32;
window.addEventListener('keypress', event => {
    if (event.keyCode === HIT_BALL_KEYCODE) {
        if (!(animationState === AnimationState.FINISHED)) {
            animationState = AnimationState.GOLF_STICK_SWINGING;
        }
    }
})

function loadSounds() {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const backgroundSound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('../assets/sounds/outdoors.wav', function (buffer) {
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(true);
        backgroundSound.setVolume(0.5);
        backgroundSound.play();
    });

    shutDownSound = new THREE.Audio(listener);
    audioLoader.load('../assets/sounds/shutdown.wav', buffer =>
        shutDownSound.setBuffer(buffer));

    ballHitSound = new THREE.Audio(listener);
    audioLoader.load('../assets/sounds/ball-hit.wav', buffer =>
        ballHitSound.setBuffer(buffer));

    headHitSound = new THREE.Audio(listener);
    audioLoader.load('../assets/sounds/head-hit.wav', buffer =>
        headHitSound.setBuffer(buffer));
}

createScene();
drawFrame();