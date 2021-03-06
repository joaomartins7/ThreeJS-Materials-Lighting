/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var cameraFactor = 10;

var change_cameraTop = false;
var change_cameraFront = false;
var change_cameraSide = false;
var change_cameraPerspective = false;

var scene, renderer;
var geometry, material, mesh;

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function createOpArt (x, y, z) {
    var h1 = new THREE.Object3D();
    materialCylinder = new THREE.MeshBasicMaterial({ color: 0xffffff});
    materialBox = new THREE.MeshBasicMaterial({ color: 0x000000});
    materialPlane = new THREE.MeshBasicMaterial({ color: 0x808080});
    materialFrame = new THREE.MeshBasicMaterial({ color: 0xffd700});

    addPlane(h1,0,0,-2.5);

    addCylinder(h1,-10,-10,0);
    addCylinder(h1,10,-10,0);
    addCylinder(h1,-10,10,0);
    addCylinder(h1,10,10,0);
    addCylinder(h1,-30,-30,0);
    addCylinder(h1,30,-30,0);
    addCylinder(h1,-30,30,0);
    addCylinder(h1,30,30,0);
    addCylinder(h1,-30,10,0);
    addCylinder(h1,-30,-10,0);
    addCylinder(h1,30,10,0);
    addCylinder(h1,30,-10,0);
    addCylinder(h1,10,30,0);
    addCylinder(h1,10,-30,0);
    addCylinder(h1,-10,30,0);
    addCylinder(h1,-10,-30,0);


    addBox(h1,0,0,0);
    addBox(h1,0,20,0);
    addBox(h1,0,-20,0);
    addBox(h1,-20,0,0);
    addBox(h1,20,0,0);
    addBox(h1,-20,-20,0);
    addBox(h1,-20,20,0);
    addBox(h1,20,-20,0);
    addBox(h1,20,20,0);

    addBox(h1,40,20,0);
    addBox(h1,40,-20,0);
    addBox(h1,-40,20,0);
    addBox(h1,-40,-20,0);
    addBox(h1,-20,40,0);
    addBox(h1,-20,-40,0);
    addBox(h1,20,40,0);
    addBox(h1,20,-40,0);

    addBox(h1,0,-40,0);
    addBox(h1,0,40,0);
    addBox(h1,40,0,0);
    addBox(h1,-40,0,0);
    addBox(h1,-40,-40,0);
    addBox(h1,-40,40,0);
    addBox(h1,40,-40,0);
    addBox(h1,40,40,0);


    addFrame(h1,0,50,0);
    addFrame(h1,0,-50,0);
    addFrameVert(h1,-50,0,0);
    addFrameVert(h1,50,0,0);

    h1.add(mesh);
    scene.add(h1);
    h1.position.x=0;
    h1.position.y=0;
    h1.position.z=0;

}

function addCylinder(obj, x, y, z) {
  geometry = new THREE.CylinderGeometry(3, 3, 5, 15);
  mesh = new THREE.Mesh(geometry, materialCylinder);
  mesh.position.set(x, y, z);
  mesh.rotation.x = Math.PI / 2;
  obj.add(mesh);
}

function addBox(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(15, 15, 5);
  mesh = new THREE.Mesh(geometry, materialBox);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addPlane(obj, x, y, z) {
  geometry = new THREE.PlaneGeometry(97, 97);
  mesh = new THREE.Mesh(geometry, materialPlane);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addFrame(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(103, 3, 5);
  mesh = new THREE.Mesh(geometry, materialFrame);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addFrameVert(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(103, 3, 5);
  mesh = new THREE.Mesh(geometry, materialFrame);
  mesh.position.set(x, y, z);
  mesh.rotation.z = Math.PI / 2;
  obj.add(mesh);
}

// --------------- Camera's Creation ---------------

function createCameraPerspective() {
    'use strict';
    cameraPerspective = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    cameraPerspective.position.x = 70;
    cameraPerspective.position.y = 70;
    cameraPerspective.position.z = 70;
    cameraPerspective.lookAt(scene.position);
}

function createCameraTop() {
    'use strict';
    cameraTop = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraTop.position.x = 0;
    cameraTop.position.y = 100;
    cameraTop.position.z = 0;
    cameraTop.lookAt(scene.position);
}

function createCameraSide() {
    'use strict';
    cameraSide = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraSide.position.x = 100;
    cameraSide.position.y = 0;
    cameraSide.position.z = 0;
    cameraSide.lookAt(scene.position);
}

function createCameraFront() {
    'use strict';
    cameraFront = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraFront.position.x = 0;
    cameraFront.position.y = 0;
    cameraFront.position.z = 100;
    cameraFront.lookAt(scene.position);
}

// --------------- Flags Checking ---------------

function checkCamera(){
    if(change_cameraFront){
        camera = cameraFront;
        change_cameraFront = false;
    }
    else if(change_cameraSide){
        camera = cameraSide;
        change_cameraSide = false
    }
    else if(change_cameraTop){
        camera = cameraTop;
        change_cameraTop = false
    }
    else if(change_cameraPerspective){
        camera = cameraPerspective;
        change_cameraPerspective = false
    }
}
// -------------------------------------------------

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createOpArt(0,0,0);
}


function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyPress(e) {
    'use strict';

    switch (e.keyCode) {

    case 54:   // tecla 6
        change_cameraTop = true;
        break;
    case 50:   // tecla 2
        change_cameraSide = true;
        break;
    case 51:   // tecla 3
        change_cameraFront = true;
        break;
    case 53: // tecla 5
        change_cameraPerspective = true;
        break;
    case 55:  // tecla 7
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }
}


function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCameraPerspective();         //perspetiva

    createCameraTop();      //ortográfica topo
    createCameraSide();     //ortográfica lateral
    createCameraFront();    //ortográfica frente

    camera = cameraFront;

    render();

    window.addEventListener("keypress", onKeyPress);
    window.addEventListener("resize", onResize);

}

function animate() {
    'use strict';

    checkCamera();
    render();

    requestAnimationFrame(animate);
}
