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
    const light = new THREE.DirectionalLight("lightblue", 0.5);
    light.position.set(0, 1, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight("white"));

    // човече
    манекен = мъжествен();
    манекен.position.y -= 10;
    манекен.врат.врът(0, 0, -50);
    манекен.л_лакът.врът(10, 40, -30);
    манекен.д_лакът.врът(3, 40, 5);
    манекен.л_ръка.врът(12, 30, -10);
    манекен.д_ръка.врът(42, 30, -18);
    console.log(манекен);

    const tShirtColor = 0x024c85;
    const skinColor = 0x59372e;
    const pantsColor = 0x192027;
    setColor(манекен.таз, pantsColor);
    setColor(манекен.тяло, tShirtColor);
    setColor(манекен.л_лакът, skinColor);
    setColor(манекен.д_лакът, skinColor);
    setColor(манекен.глава, skinColor);
    setColor(манекен.д_глезен, 0xbbbbbb);
    setColor(манекен.л_глезен, 0xbbbbbb);
    // setColor(манекен.л_китка, 0xffffff);

    // земя
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load('../textures/grasslight-big.jpg');
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

    // тук се описват статичните елементи на позата
    const stick = createGolfStick();
    createBall();

    манекен.л_китка.add(stick);

    // const hat = createPlayerHat();
    // манекен.глава.add(hat);
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
    const material = new THREE.MeshLambertMaterial({ color: "white" });
    ball = new THREE.Mesh(geometry, material);
    ball.position.set(33, -40, 0);
    scene.add(ball);
}

// function createPlayerHat() {
//     const hat = new THREE.Group();

//     const sphere = new THREE.SphereGeometry(3.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
//     const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });

//     hat.add(new THREE.Mesh(sphere, material));
//     hat.rotation.z += 0.5;
//     hat.position.y += 4;

//     return hat;
// }

// функция за анимиране на сцената
let t = 0; // време
function drawFrame() {
    requestAnimationFrame(drawFrame);
    if (animate) animate(t++);
    renderer.render(scene, camera);
}

let ballShouldFly = false;
let shouldFallOnHead = false;
// анимация на човечето
animate = function (t) {
    // тук се описват динамичните елементи на позата
    // като променливата t е номер на кадър, като се
    // очаква 1 секунда да е приблизително 60 кадъра
    // манекен.врат.врът(5 * sin(15 * t) - 2, 13 * sin(10 * t) - 15, 10 * sin(10 * t) - 5);
    манекен.глава.врът(0, 20 * sin(t) - 20, 0);

    // манекен.rotation.y = 8;

    манекен.л_ръка.врът(15 * sin(1.2 * t) + 30, 30, -30);
    манекен.д_ръка.врът(15 * sin(1.2 * t) + 55, 30, -30);

    if (ballShouldFly) {
        if (ball.position.y <= 500) {
            ball.position.y += 0.2 * 15;
            ball.position.z += 0.3 * 15;
        } else {
            ball.position.y = -40;
            ball.position.z = 0;
            ballShouldFly = false;
        }

    }

};

function setColor(obj, color) {
    obj.traverse((child) => {
        if (child.type === 'Mesh') {
            child.material.color.set(color);
        }
    });
}

window.addEventListener("keypress", event => {
    if (event.keyCode === 32) {
        ballShouldFly = true;
    }
})

createScene();
drawFrame();