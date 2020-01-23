function createScene() {
    // рисувателно поле на цял екран
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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
    scene.background = new THREE.Color(0x96c6e9);


    // светлини
    const light = new THREE.DirectionalLight('lightblue', 0.5);
    light.position.set(0, 1, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight('white'));

    // ground
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load('../assets/textures/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
    const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
    mesh.position.y = -42;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 200;
    controls.maxDistance = 400;

    loadSounds();

    initialisePlayer();
}

function initialisePlayer() {
    player = мъжествен();
    player.position.y -= 10;
    player.врат.врът(0, 0, -50);
    player.л_лакът.врът(10, 40, -30);
    player.д_лакът.врът(3, 40, 5);
    player.л_ръка.врът(12, 30, -10);
    player.д_ръка.врът(42, 30, -18);
    console.log(player);

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

    const stick = createGolfStick();
    createBall();

    player.л_китка.add(stick);

    hat = createPlayerHat();
    player.глава.add(hat);
}

function createGolfStick() {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 50, 32);
    const material = new THREE.MeshPhysicalMaterial();
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(-2, 10, 0)
    cylinder.rotation.set(0, 0, 0.3);
    scene.add(cylinder);

    const geometry1 = new THREE.SphereGeometry(1.5, 10, 5);
    const ball = new THREE.Mesh(geometry1, material);
    ball.position.set(-9, 33, 0);

    const stick = new THREE.Group();
    stick.add(cylinder);
    stick.add(ball);

    stick.position.y += 6;
    return stick;
}

function createBall() {
    const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshLambertMaterial({ color: 'white' });
    ball = new THREE.Mesh(geometry, material);
    ball.position.set(33, -40, 0);
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

function animateInitial(t) {
    player.глава.врът(0, 20 * sin(t) - 20, 0);
    hat.rotation.y = 0.2 * sin(t) - 0.1;
    player.л_ръка.врът(15 * sin(1.2 * t) + 30, 30, -30);
    player.д_ръка.врът(15 * sin(1.2 * t) + 56, 30, -30);
}

let tGolfSwing = -1;
function animateGolfStickSwinging(t) {
    if (tGolfSwing === -1) {

        ++tGolfSwing;
    } else if (tGolfSwing <= 100) {
        player.л_ръка.врът(tGolfSwing, 30, -30);
        player.д_ръка.врът(tGolfSwing + 25, 30, -30);
        tGolfSwing += 2;
    } else if (tGolfSwing <= 150) {
        player.л_ръка.врът(160 - tGolfSwing, 30, -30);
        player.д_ръка.врът(160 - tGolfSwing + 25, 30, -30);
        tGolfSwing += 5;
    } else {
        tGolfSwing = 0;
        animationState = AnimationState.BALL_HIT;
        ballHitSound.play();
    }
}

let tGolfSwingAfterHit = 150;
function animateBallHit(t) {
    if (tGolfSwingAfterHit <= 250) {
        player.л_ръка.врът(160 - tGolfSwingAfterHit, 30, -30);
        player.д_ръка.врът(160 - tGolfSwingAfterHit + 25, 30, -30);
        tGolfSwingAfterHit += 5;

        player.глава.врът(0, -60, 0);
        player.врат.врът(0, 0, 0);
    }

    if (ball.position.y <= 300) {
        ball.position.y += 0.2 * 15;
        ball.position.z += 0.3 * 15;
    } else {
        animationState = AnimationState.TURNING_AROUND;
    }
}

let turningAroundT = 0;
let turningAroundDelta = 0.05;
function animateTurningAround(t) {
    if (turningAroundT <= 1) {
        player.rotation.set(0, - turningAroundT * Math.PI / 2, 0);
        player.глава.врът(0, 0, 0);
        hat.rotation.y = 0;
        player.л_ръка.врът(30, 0, 0);
        player.д_ръка.врът(0, 0, -110);
        player.д_лакът.врът(0, 0, -110);
        player.д_китка.врът(0, -100, -80);
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
        targetPosition.y -= 50;
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
let pivot = new THREE.Group();
function animatePlayerFalling(t) {
    animateBallBouncingOf(t);

    if (fallingT === 0) {
        pivot.position.set(0, -35, 0);
        pivot.add(player);
        player.position.y += 35;
        scene.add(pivot);
        fallingT++;

        player.д_лакът.врът(0, 0, 0);
        player.д_китка.врът(0, 0, 0);
    } else if (pivot.rotation.x < Math.PI / 2) {
        pivot.rotation.x = rotationT * Math.PI / 2;
        player.л_ръка.врът(fallingT, 0, 0);
        player.д_ръка.врът(-fallingT, 0, 0);
        fallingT += fallingDelta;
        rotationT += 0.08;
    } else {
        shutDownSound.play();
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