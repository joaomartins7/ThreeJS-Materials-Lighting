/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var cameraFactor = 4;

var change_cameraTop = false;
var change_cameraFront = false;
var change_cameraSide = false;
var change_cameraPerspective = false;

var scene, renderer;
var geometry, mesh;

var icosaedro, materialIco, geometryIcosaedro, tamanho = 10;

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

    for (var i=1; i<tamanho; i++){
      for (var j=1; j<tamanho; j++)
        addCylinder(h1,-50+j*10,-50+i*10,0);
    }

    for (var i=1; i<tamanho+1; i++){
      for (var j=1; j<tamanho+1; j++)
        addBox(h1,-55+j*10,-55+i*10,0);
    }

    addFrame(h1,0,50,0);
    addFrame(h1,0,-50,0);
    addFrameVert(h1,-50,0,0);
    addFrameVert(h1,50,0,0);

    h1.add(mesh);
    scene.add(h1);
    h1.position.x=-50;
    h1.position.y=70;
    h1.position.z=-70;
}

function createRoom(x, y, z) {
  var g1 = new THREE.Object3D();
  materialFloor = new THREE.MeshBasicMaterial({ color: 0xd2b48c});
  materialWall = new THREE.MeshBasicMaterial({ color: 0x20b2aa});

  addFloor(g1,0,-1,0);
  addWall(g1,-150,75,0);
  addWall(g1,150,75,0);
  addWallBack(g1,0,75,-75);

  g1.add(mesh);
  scene.add(g1);
  g1.position.x=0;
  g1.position.y=0;
  g1.position.z=0;
}

function createSculpture(obj,x, y, z) {
  var v1 = new THREE.Object3D();
  materialPedestal = new THREE.MeshBasicMaterial({ color: 0x808080});

  addCylinderP(v1,0,0,0);
  addCylinderP(v1,0,35,0);
  addCylinderPColumn(v1,0,17.5,0);

  v1.add(mesh);
  scene.add(v1);
  v1.position.x=75;
  v1.position.y=2.5;
  v1.position.z=-25;

}

function createIcosahedron(){

	icosaedro = new THREE.Object3D();

    materialIco = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });

    addIcosahedron(icosaedro, 55, 65, -40);
    scene.add(icosaedro);

}


function addIcosahedron(obj, x, y, z){


	/*
	'use strict';
    geometry = new THREE.CubeGeometry(largura*2.5, 0, comprimento);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x+2, y, z);
    obj.add(mesh);
    */
    var phi = ( 1 + Math.sqrt( 5 ) ) / 2;

    var size = 15;

	geometryIcosaedro = new THREE.Geometry();




    //vertices
    geometryIcosaedro.vertices.push(


    	new THREE.Vector3(-1*size, phi*size, 0),
    	new THREE.Vector3(1*size, phi*size, 0),
    	new THREE.Vector3(-1*size, -phi*size, 0),
    	new THREE.Vector3(1*size, -phi*size, 0),

        new THREE.Vector3(0, -1*size, phi*size),
        new THREE.Vector3(0, 1*size, phi*size),
    	new THREE.Vector3(0, -1*size, -phi*size),
        new THREE.Vector3(0, 1*size, -phi*size),

        new THREE.Vector3(phi*size, 0, -1*size),
        new THREE.Vector3(phi*size, 0, 1*size),
        new THREE.Vector3(-phi*size, 0, -1*size),
        new THREE.Vector3(-phi*size, 0, 1*size));



        /*
        new THREE.Vector3(0, -1*size, -phi*size),
        new THREE.Vector3(0, -1*size, phi*size),
        new THREE.Vector3(0, 1*size, -phi*size),
        new THREE.Vector3(0, 1*size, phi*size),

        new THREE.Vector3(-phi*size, 0, -1*size),
        new THREE.Vector3(phi*size, 0, -1*size),
        new THREE.Vector3(-phi*size, 0, 1*size),
        new THREE.Vector3(phi*size, 0, 1*size),

        new THREE.Vector3(-1*size, -phi*size, 0),
        new THREE.Vector3(-1*size, phi*size, 0),
        new THREE.Vector3(1*size, -phi*size, 0),
        new THREE.Vector3(1*size, phi*size, 0));
		*/







   	//faces (lados)
    geometryIcosaedro.faces.push(


    	new THREE.Face3(0, 11, 5),
	    new THREE.Face3(0, 5, 1),
	    new THREE.Face3(0, 1, 7),
	    new THREE.Face3(0, 7, 10),
	    new THREE.Face3(0, 10, 11),

		new THREE.Face3(1, 5, 9),
	    new THREE.Face3(5, 11, 4),
	    new THREE.Face3(11, 10, 2),
	    new THREE.Face3(10, 7, 6),
	    new THREE.Face3(7, 1, 8),

	    new THREE.Face3(3, 9, 4),
	    new THREE.Face3(3, 4, 2),
    	new THREE.Face3(3, 2, 6),
	    new THREE.Face3(3, 6, 8),
	    new THREE.Face3(3, 8, 9),

	    new THREE.Face3(4, 9, 5),
	    new THREE.Face3(2, 4, 11),
    	new THREE.Face3(6, 2, 10),
	    new THREE.Face3(8, 6, 7),
	    new THREE.Face3(9, 8, 1));


    	/*
	    new THREE.Face3(0, 1, 2),
	    new THREE.Face3(3, 0, 2),
	    new THREE.Face3(4, 5, 6),
	    new THREE.Face3(7, 4, 6),

	    new THREE.Face3(0, 4, 1),
	    new THREE.Face3(1, 4, 5),
	    new THREE.Face3(3, 7, 2),
	    new THREE.Face3(2, 7, 6),

	    new THREE.Face3(0, 4, 3),
	    new THREE.Face3(3, 4, 7),
	    new THREE.Face3(1, 5, 2),
	    new THREE.Face3(2, 5, 6));
		*/




    geometryIcosaedro.computeVertexNormals();
    geometryIcosaedro.computeFaceNormals();


    mesh = new THREE.Mesh(geometryIcosaedro, materialIco);
    mesh.position.set(x+20, y, z+20);
    obj.add(mesh);
}

function addCylinder(obj, x, y, z) {
  geometry = new THREE.CylinderGeometry(1.5, 1.5, 5, 15);
  mesh = new THREE.Mesh(geometry, materialCylinder);
  mesh.position.set(x, y, z);
  mesh.rotation.x = Math.PI / 2;
  obj.add(mesh);
}

function addBox(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(7.5, 7.5, 5);
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

function addFloor(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(300, 2, 150);
  mesh = new THREE.Mesh(geometry, materialFloor);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addWall(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(2, 150, 150);
  mesh = new THREE.Mesh(geometry, materialWall);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addWallBack(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(300, 150, 2);
  mesh = new THREE.Mesh(geometry, materialWall);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCylinderP(obj, x, y, z) {
  geometry = new THREE.CylinderGeometry(20, 20, 5);
  mesh = new THREE.Mesh(geometry, materialPedestal);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCylinderPColumn(obj, x, y, z) {
  geometry = new THREE.CylinderGeometry(15, 15, 30);
  mesh = new THREE.Mesh(geometry, materialPedestal);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}
// --------------- Camera's Creation ---------------

function createCameraPerspective() {
    'use strict';
    cameraPerspective = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    cameraPerspective.position.x = 170;
    cameraPerspective.position.y = 170;
    cameraPerspective.position.z = 170;
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
    createRoom(0,0,0);
    createSculpture(0,0,0);
    createIcosahedron();
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
