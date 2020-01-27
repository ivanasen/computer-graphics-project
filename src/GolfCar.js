function createGolfCar() {
    const carGroup = new THREE.Group();

    const tires = createTires();
    carGroup.add(tires);

    const bottom = createBottom();
    carGroup.add(bottom);

    const front = createFront();
    carGroup.add(front);

    const back = createBack();
    carGroup.add(back);

    const frame = createFrame();
    carGroup.add(frame);

    const roof = createRoof();
    carGroup.add(roof);

    const trailer = createTrailer();
    carGroup.add(trailer);

    carGroup.add(createLittleThinghy());

    carGroup.traverse(child => {
        child.castShadow = true;
        child.reflectivity = 0.8;
        child.metalness = 0.5;
    });

    const driver = initialiseDriver();
    carGroup.add(driver);

    return carGroup;
}

function createTrailer() {
    const group = new THREE.Group();

    const geometry = new THREE.BoxGeometry(35, 12, 40);
    const material = new THREE.MeshPhysicalMaterial({ color: 0xfff8f8 });
    material.side = THREE.DoubleSide;
    const trailer = new THREE.Mesh(geometry, material);

    trailer.position.z -= 44;
    trailer.position.y += 15;

    trailer.geometry.faces.splice(4, 2);

    group.add(trailer);

    const cylinderM = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
    const cylinderG = new THREE.CylinderGeometry(0.5, 0.5, 5);
    const cylinder1 = new THREE.Mesh(cylinderG, cylinderM);
    cylinder1.position.z -= 38;
    cylinder1.position.y += 7;
    cylinder1.position.x += 15;

    const cylinder2 = new THREE.Mesh(cylinderG, cylinderM);
    cylinder2.position.z -= 38;
    cylinder2.position.y += 7;
    cylinder2.position.x -= 15;

    group.add(cylinder1);
    group.add(cylinder2);

    return group;
}

function createRoof() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(40, 0);
    shape.lineTo(40, 0.1);
    shape.lineTo(0, 0.1);

    const extrudeSettings = {
        steps: 2,
        amount: 32,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 10
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshPhysicalMaterial({ color: 0xfff8f8 });
    const roof = new THREE.Mesh(geometry, material);
    roof.rotation.y += Math.PI / 2;
    roof.position.y += 35;
    roof.position.x -= 16;
    roof.position.z += 17;

    return roof;
}

function createFrame() {
    const group = new THREE.Group();

    const cylinderM = new THREE.MeshPhysicalMaterial({ color: 0x000000 });

    const cylinderG1 = new THREE.CylinderGeometry(0.5, 0.5, 40);
    const cylinder1 = new THREE.Mesh(cylinderG1, cylinderM);
    cylinder1.rotation.z += Math.PI / 2;
    cylinder1.position.z += 21;
    cylinder1.position.y += 11.5;

    const cylinderG2 = new THREE.CylinderGeometry(0.5, 0.5, 30);
    const cylinder2 = new THREE.Mesh(cylinderG2, cylinderM);
    cylinder2.rotation.x -= Math.PI / 14;
    cylinder2.position.z += 19;
    cylinder2.position.x += 20;
    cylinder2.position.y += 20;

    const cylinder3 = new THREE.Mesh(cylinderG2, cylinderM);
    cylinder3.rotation.x -= Math.PI / 14;
    cylinder3.position.z += 19;
    cylinder3.position.x -= 20;
    cylinder3.position.y += 20;

    const cylinder4 = new THREE.Mesh(cylinderG1, cylinderM);
    cylinder4.rotation.z += Math.PI / 2;
    cylinder4.position.z += 16;
    cylinder4.position.y += 34;

    const cylinderG3 = new THREE.CylinderGeometry(0.5, 0.5, 10);
    const cylinder5 = new THREE.Mesh(cylinderG3, cylinderM);
    cylinder5.position.z -= 20;
    cylinder5.position.y += 10;
    cylinder5.position.x += 15;

    const cylinder6 = new THREE.Mesh(cylinderG3, cylinderM);
    cylinder6.position.z -= 20;
    cylinder6.position.y += 10;
    cylinder6.position.x -= 15;

    const cylinderG4 = new THREE.CylinderGeometry(0.5, 0.5, 4);
    const cylinder7 = new THREE.Mesh(cylinderG4, cylinderM);
    cylinder7.position.z -= 20.8;
    cylinder7.position.y += 16;
    cylinder7.position.x += 15;
    cylinder7.rotation.x -= Math.PI / 6;

    const cylinder8 = new THREE.Mesh(cylinderG4, cylinderM);
    cylinder8.position.z -= 20.8;
    cylinder8.position.y += 16;
    cylinder8.position.x -= 15;
    cylinder8.rotation.x -= Math.PI / 6;

    const cylinderG5 = new THREE.CylinderGeometry(0.5, 0.5, 17);
    const cylinder9 = new THREE.Mesh(cylinderG5, cylinderM);
    cylinder9.position.z -= 21.9;
    cylinder9.position.y += 26.1;
    cylinder9.position.x += 15;

    const cylinder10 = new THREE.Mesh(cylinderG5, cylinderM);
    cylinder10.position.z -= 21.9;
    cylinder10.position.y += 26.1;
    cylinder10.position.x -= 15;

    group.add(cylinder1);
    group.add(cylinder2);
    group.add(cylinder3);
    group.add(cylinder4);
    group.add(cylinder5);
    group.add(cylinder6);
    group.add(cylinder7);
    group.add(cylinder8);
    group.add(cylinder9);
    group.add(cylinder10);

    return group;
}

function createTires() {
    const tiresGroup = new THREE.Group();

    const tire1 = createTire();
    tire1.position.x += 20;
    tire1.position.z += 27;
    tire1.position.y -= 5;
    const tire2 = createTire();
    tire2.position.x -= 20;
    tire2.position.z += 27;
    tire2.position.y -= 5;
    const tire3 = createTire();
    tire3.position.x += 20;
    tire3.position.z -= 27;
    tire3.position.y -= 5;
    const tire4 = createTire();
    tire4.position.x -= 20;
    tire4.position.z -= 27;
    tire4.position.y -= 5;

    tiresGroup.add(tire1);
    tiresGroup.add(tire2);
    tiresGroup.add(tire3);
    tiresGroup.add(tire4);

    return tiresGroup;
}

function createInner() {
    const innerGroup = new THREE.Group();

    const innerGeometry = new THREE.BoxGeometry(30, 10, 15);
    const innerMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    innerGroup.add(inner);
    inner.position.z -= 8;

    return innerGroup;
}

function createSeats() {
    const seatsGroup = new THREE.Group();

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(15, 0);
    shape.lineTo(15, 1);
    shape.lineTo(0, 1);

    const extrudeSettings = {
        steps: 2,
        amount: 30,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 10
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshPhongMaterial({ color: 0xdfccbb });
    const seats = new THREE.Mesh(geometry, material);

    seats.rotation.y += Math.PI / 2;
    seats.position.x -= 15;
    seats.position.z -= 1;
    seats.position.y += 8;

    seatsGroup.add(seats);

    const seatBack1 = createSeatBack();
    const seatBack2 = createSeatBack();
    seatBack2.position.x -= 20;

    seatsGroup.add(seatBack1);
    seatsGroup.add(seatBack2);

    return seatsGroup;
}

function createSeatBack() {
    const group = new THREE.Group();

    const cylinderMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
    const cylinderG = new THREE.CylinderGeometry(0.5, 0.5, 10);

    const cylinder1 = new THREE.Mesh(cylinderG, cylinderMaterial);
    const cylinder2 = new THREE.Mesh(cylinderG, cylinderMaterial);

    group.add(cylinder1);
    group.add(cylinder2);

    cylinder1.rotation.x += Math.PI;
    cylinder2.rotation.x += Math.PI;
    cylinder2.position.x += 5;
    group.position.y += 12;
    group.position.z -= 17;
    group.position.x += 8;

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 5);
    shape.lineTo(1, 5);
    shape.lineTo(1, 0);

    const extrudeSettings = {
        steps: 2,
        amount: 3,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 10
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshPhongMaterial({ color: 0xdfccbb });
    const seatBack = new THREE.Mesh(geometry, material);

    seatBack.rotation.y += Math.PI / 2;
    seatBack.position.y += 4;
    seatBack.position.z += 1;

    group.add(seatBack);

    return group;
}

function createSidePart() {
    const group = new THREE.Group();

    const cylinderMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
    const cylinderG = new THREE.CylinderGeometry(0.5, 0.5, 5);
    const cylinderDG = new THREE.CylinderGeometry(0.5, 0.5, 4.3);
    const cylinderHG = new THREE.CylinderGeometry(0.5, 0.5, 10);
    const cylinder1 = new THREE.Mesh(cylinderG, cylinderMaterial);
    const cylinder2 = new THREE.Mesh(cylinderG, cylinderMaterial);
    const cylinderH = new THREE.Mesh(cylinderHG, cylinderMaterial);
    const cylinderD1 = new THREE.Mesh(cylinderDG, cylinderMaterial);
    const cylinderD2 = new THREE.Mesh(cylinderDG, cylinderMaterial);

    group.add(cylinder1);
    group.add(cylinder2);
    group.add(cylinderH);
    group.add(cylinderD1);
    group.add(cylinderD2);

    cylinder1.rotation.x += Math.PI;
    cylinder2.rotation.x += Math.PI;

    cylinder1.position.y += 8;
    cylinder1.position.z -= 17;

    cylinder2.position.y += 8;
    cylinder2.position.z -= 2;

    cylinderH.position.y += 13;
    cylinderH.position.z -= 9.5;
    cylinderH.rotation.x += Math.PI / 2;

    cylinderD1.position.y += 11.7;
    cylinderD1.position.z -= 15.5;
    cylinderD1.rotation.x += Math.PI / 4;

    cylinderD2.position.y += 11.7;
    cylinderD2.position.z -= 3.4;
    cylinderD2.rotation.x -= Math.PI / 4;

    return group;
}

function createBack() {
    const backGroup = new THREE.Group();

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(13, 0);
    shape.bezierCurveTo(19, 12, 31, 12, 35, 0);
    shape.quadraticCurveTo(40, 5, 35, 10);
    shape.lineTo(0, 10);
    // shape.quadraticCurveTo(-12, 10, -12, 4);
    // shape.quadraticCurveTo(-1.5, 5, 0, 0);

    const extrudeSettings = {
        steps: 2,
        amount: 40,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 2
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    const back = new THREE.Mesh(geometry, material);

    back.position.x -= 20;
    back.position.z -= 2;
    back.position.y -= 4;

    back.rotation.y += Math.PI / 2;

    backGroup.add(back);

    backGroup.add(createSeats());

    const sidePartLeft = createSidePart();
    const sidePartRight = createSidePart();
    sidePartLeft.position.x += 20;
    sidePartRight.position.x -= 20;

    backGroup.add(sidePartLeft);
    backGroup.add(sidePartRight);


    return backGroup;
}

function createSteeringWheel() {
    const steeringWheelGroup = new THREE.Group();
    const steeringWheelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000000 });

    const wheelGeometry = new THREE.TorusGeometry(4, 0.5, 16, 100);
    const wheel = new THREE.Mesh(wheelGeometry, steeringWheelMaterial);
    steeringWheelGroup.add(wheel);

    wheel.position.z += 8;
    wheel.position.y += 15;
    wheel.rotation.x += Math.PI / 6;

    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 15, 10);
    const cylinder = new THREE.Mesh(cylinderGeometry, steeringWheelMaterial);
    steeringWheelGroup.add(cylinder);

    cylinder.position.z += 15;
    cylinder.position.y += 11;
    cylinder.rotation.x -= Math.PI / 3;

    const wheelCylinder1G = new THREE.CylinderGeometry(0.5, 0.5, 8, 10);
    const wheelCylinder1 = new THREE.Mesh(wheelCylinder1G, steeringWheelMaterial);
    steeringWheelGroup.add(wheelCylinder1);

    wheelCylinder1.position.z += 8;
    wheelCylinder1.position.y += 15;
    wheelCylinder1.rotation.x += Math.PI / 6;

    const wheelCylinder2G = new THREE.CylinderGeometry(0.5, 0.5, 8, 10);
    const wheelCylinder2 = new THREE.Mesh(wheelCylinder1G, steeringWheelMaterial);
    steeringWheelGroup.add(wheelCylinder2);

    wheelCylinder2.position.z += 8;
    wheelCylinder2.position.y += 15;
    wheelCylinder2.rotation.x += Math.PI / 6;
    wheelCylinder2.rotation.z += Math.PI / 2;

    const boxGeometry = new THREE.BoxGeometry(3.5, 3.5, 0.2);
    const box = new THREE.Mesh(boxGeometry, steeringWheelMaterial);
    steeringWheelGroup.add(box);

    box.position.z += 8;
    box.position.y += 15;
    box.rotation.x += Math.PI / 6;


    return steeringWheelGroup;
}

function createFront() {
    const frontGroup = new THREE.Group();

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-2, 10);
    shape.lineTo(-5, 10);
    shape.quadraticCurveTo(-12, 10, -12, 4);
    shape.quadraticCurveTo(-1.5, 5, 0, 0);

    const extrudeSettings = {
        steps: 2,
        amount: 40,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 2
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    const front = new THREE.Mesh(geometry, material);

    front.position.x -= 20;
    front.position.z += 19;

    front.rotation.y += Math.PI / 2;

    frontGroup.add(front);

    const steeringWheel = createSteeringWheel();
    frontGroup.add(steeringWheel);

    return frontGroup;
}

function createBottom() {
    const bottomGroup = new THREE.Group();

    const bottomGeometry = new THREE.BoxGeometry(45, 1, 35);
    const bottomMaterial = new THREE.MeshPhysicalMaterial({ color: 0x121212 });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y -= 5;
    bottom.position.z += 1;

    bottomGroup.add(bottom);

    return bottomGroup;
}

function createTire() {
    const tireGroup = new THREE.Group();

    const geometry = new THREE.CylinderGeometry(7, 7, 5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x101010 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.x += Math.PI / 2;
    cylinder.rotation.z -= Math.PI / 2;
    tireGroup.add(cylinder);

    const innerGeometry = new THREE.CylinderGeometry(4, 4, 5.1, 32);
    const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const innerCylinder = new THREE.Mesh(innerGeometry, innerMaterial);
    innerCylinder.rotation.x += Math.PI / 2;
    innerCylinder.rotation.z -= Math.PI / 2;
    tireGroup.add(innerCylinder);

    const innerGeometry1 = new THREE.CylinderGeometry(1, 1, 5.2, 32);
    const innerMaterial1 = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
    const innerCylinder1 = new THREE.Mesh(innerGeometry1, innerMaterial1);
    innerCylinder1.rotation.x += Math.PI / 2;
    innerCylinder1.rotation.z -= Math.PI / 2;
    tireGroup.add(innerCylinder1);

    return tireGroup;
}

function createLittleThinghy() {
    const group = new THREE.Group();

    const geometry = new THREE.BoxGeometry(8, 5, 1);
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhysicalMaterial({ color: 0x121212 });
    const thingy = new THREE.Mesh(geometry, material);
    const thingy1 = new THREE.Mesh(geometry1, material);

    thingy.position.x += 10;
    thingy.position.y += 1;
    thingy.position.z -= 1;

    thingy1.position.x += 3.5;
    thingy1.position.y += 1;
    thingy1.position.z -= 1;

    group.add(thingy);
    group.add(thingy1);

    return group;
}

function initialiseDriver() {
    const driver = мъжествен();
    console.log(driver);
    driver.position.y += 12;
    driver.position.z -= 6;
    driver.rotation.y -= Math.PI / 2;

    driver.тяло.врът(0, 0, -60);

    driver.врат.врът(0, 0, 30);

    driver.л_ръка.врът(30, 10, -30);
    driver.л_лакът.врът(0, 0, -125);
    driver.д_лакът.врът(0, 0, -125);
    driver.л_китка.врът(0, 0, -50);
    driver.д_китка.врът(0, 0, -50);
    driver.д_ръка.врът(-30, -10, -30);

    driver.л_крак.врът(-10, -20, -90);
    driver.д_крак.врът(10, 20, -90);
    driver.л_коляно.врът(20, 0, 110);
    driver.д_коляно.врът(20, 0, 110);
    driver.д_глезен.врът(0, 0, -20);
    driver.л_глезен.врът(0, 0, -20);

    const antennas = createAntennas();
    driver.глава.add(antennas);

    driver.traverse(child => {
        if (child.type === 'Mesh') {
            child.material.color.set(0x25b71b);
        }
    });

    return driver;
}

function createAntennas() {
    const group = new THREE.Group();

    const antennaG = new THREE.CylinderGeometry(0.2, 0.4, 5);
    const antennaM = new THREE.MeshPhongMaterial({ color: 0x25b71b });
    const antenna1 = new THREE.Mesh(antennaG, antennaM);
    const antenna2 = new THREE.Mesh(antennaG, antennaM);

    antenna1.rotation.x -= Math.PI / 2.2;
    antenna1.position.y += 5;
    antenna1.position.z -= 5;

    antenna2.rotation.x += Math.PI / 0.4;
    antenna2.position.y += 5;
    antenna2.position.z += 5;

    const endG = new THREE.SphereGeometry(0.6);
    const end1 = new THREE.Mesh(endG, antennaM);
    const end2 = new THREE.Mesh(endG, antennaM);

    end1.position.y += 5.2;
    end1.position.z -= 6.8;

    end2.position.y += 5.2;
    end2.position.z += 6.8;

    group.add(antenna1);
    group.add(antenna2);
    group.add(end1);
    group.add(end2);

    return group;
}