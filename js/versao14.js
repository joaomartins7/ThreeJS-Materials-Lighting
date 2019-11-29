/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var cameraFactor = 4;

var changeCameraTop = false;
var changeCameraFront = false;
var changeCameraSide = false;
var changeCameraPerspective = false;

var scene, renderer;
var geometry, mesh;


var icosaedro, materialIco, geometryIcosaedro, tamanho = 10;

var meshArray = new Array(200);
//var materialArrayBasic = new Array(50);
var materialArrayBasic = new Array(200);
var materialArrayLambert = new Array(200);
var materialArrayPhong = new Array(200);
for (var a = 0; a < 200; a++){
  materialArrayBasic[a] = 0;
  materialArrayLambert[a] = 0;
  materialArrayPhong[a] = 0;
  meshArray[a] = 0;
}


var directionalLight;
var globalLightStatus = false;
var globalLightIntensity = 1.2;

var currentMaterial = "lambert";

var materialSwitch = true;
var teclaW = true;

var addBoxCounter = 0;
var addCylinderCounter = 0;

var b, c;

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function createOpArt (x, y, z) {
    var h1 = new THREE.Object3D();
    materialCylinderBasic = new THREE.MeshBasicMaterial({ color: 0xffffff});
    materialCylinderLambert = new THREE.MeshLambertMaterial({ color: 0xffffff});
    materialCylinderPhong = new THREE.MeshPhongMaterial({ color: 0xffffff});

    materialArrayBasic[1] = materialCylinderBasic;
    materialArrayLambert[1] = materialCylinderLambert;
    materialArrayPhong[1] = materialCylinderPhong;

    //80 cilindros +1 de cima
    for (b = 20; b<101; b++){
      materialArrayBasic[b] = materialCylinderBasic;
      materialArrayLambert[b] = materialCylinderLambert;
      materialArrayPhong[b] = materialCylinderPhong;
    }


    materialBoxBasic = new THREE.MeshBasicMaterial({ color: 0x000000});
    materialBoxLambert = new THREE.MeshLambertMaterial({ color: 0x000000});
    materialBoxPhong = new THREE.MeshPhongMaterial({ color: 0x000000});

    materialArrayBasic[3] = materialBoxBasic;
    materialArrayLambert[3] = materialBoxLambert;
    materialArrayPhong[3] = materialBoxPhong;


    materialPlaneBasic = new THREE.MeshBasicMaterial({ color: 0x808080});
    materialPlaneLambert = new THREE.MeshLambertMaterial({ color: 0x808080});
    materialPlanePhong = new THREE.MeshPhongMaterial({ color: 0x808080});

    materialArrayBasic[4] = materialPlaneBasic;
    materialArrayLambert[4] = materialPlaneLambert;
    materialArrayPhong[4] = materialPlanePhong;


    materialFrameBasic = new THREE.MeshBasicMaterial({ color: 0xffd700});
    materialFrameLambert = new THREE.MeshLambertMaterial({ color: 0xffd700});
    materialFramePhong = new THREE.MeshPhongMaterial({ color: 0xffd700});

    materialArrayBasic[5] = materialFrameBasic;
    materialArrayLambert[5] = materialFrameLambert;
    materialArrayPhong[5] = materialFramePhong;

    materialArrayBasic[12] = materialFrameBasic;
    materialArrayLambert[12] = materialFrameLambert;
    materialArrayPhong[12] = materialFramePhong;

    materialArrayBasic[13] = materialFrameBasic;
    materialArrayLambert[13] = materialFrameLambert;
    materialArrayPhong[13] = materialFramePhong;

    materialArrayBasic[14] = materialFrameBasic;
    materialArrayLambert[14] = materialFrameLambert;
    materialArrayPhong[14] = materialFramePhong;




    addPlane(h1,0,0,-2.5);

    b = 20;
    for (var i=1; i<tamanho; i++){
      for (var j=1; j<tamanho; j++){
        addCylinder(h1,-50+j*10,-50+i*10,0, b);  //FIXME
        b++;
      }
    }
    console.log('contador cilindro');
    console.log(addCylinderCounter);

    for (var i=1; i<tamanho+1; i++){
      for (var j=1; j<tamanho+1; j++){
        addBox(h1,-55+j*10,-55+i*10,0);       //FIXME
      }
    }

    addFrame(h1,0,50,0, 0);
    addFrame(h1,0,-50,0, 1);
    addFrameVert(h1,-50,0,0, 0);
    addFrameVert(h1,50,0,0, 1);

    h1.add(mesh);
    scene.add(h1);
    h1.position.x=-50;
    h1.position.y=70;
    h1.position.z=-70;
}

function createRoom(x, y, z) {
  var g1 = new THREE.Object3D();
  materialFloorBasic = new THREE.MeshBasicMaterial({ color: 'cyan'});
  materialFloorLambert = new THREE.MeshLambertMaterial({ color: 'cyan'});
  materialFloorPhong = new THREE.MeshPhongMaterial({ color : 'cyan'});

  materialArrayBasic[0] = materialFloorBasic;
  materialArrayLambert[0] = materialFloorLambert;
  materialArrayPhong[0] = materialFloorPhong;


  materialWallBasic = new THREE.MeshBasicMaterial({ color: 0x20b2aa});
  materialWallLambert = new THREE.MeshLambertMaterial({ color: 0x20b2aa});
  materialWallPhong = new THREE.MeshPhongMaterial({ color : 0x20b2aa});

  materialArrayBasic[6] = materialWallBasic;
  materialArrayLambert[6] = materialWallLambert;
  materialArrayPhong[6] = materialWallPhong;

  materialArrayBasic[7] = materialWallBasic;
  materialArrayLambert[7] = materialWallLambert;
  materialArrayPhong[7] = materialWallPhong;

  materialArrayBasic[8] = materialWallBasic;
  materialArrayLambert[8] = materialWallLambert;
  materialArrayPhong[8] = materialWallPhong;
  //materialWall = new THREE.MeshBasicMaterial({ color: 0x20b2aa});


  addFloor(g1,0,-1,0);
  addWall(g1,-150,75,0, 0);
  addWall(g1,150,75,0, 1);
  addWallBack(g1,0,75,-75);

  g1.add(mesh);
  scene.add(g1);
  g1.position.x=0;
  g1.position.y=0;
  g1.position.z=0;
}

function createSculpture(obj,x, y, z) {
  var v1 = new THREE.Object3D();

  materialPedestalBasic = new THREE.MeshBasicMaterial({ color: 0x808080});
  materialPedestalLambert = new THREE.MeshLambertMaterial({ color: 0x808080});
  materialPedestalPhong = new THREE.MeshPhongMaterial({ color : 0x808080});
  //materialPedestal = new THREE.MeshBasicMaterial({ color: 0x808080});
  materialArrayBasic[9] = materialPedestalBasic;
  materialArrayLambert[9] = materialPedestalLambert;
  materialArrayPhong[9] = materialPedestalPhong;

  materialArrayBasic[10] = materialPedestalBasic;
  materialArrayLambert[10] = materialPedestalLambert;
  materialArrayPhong[10] = materialPedestalPhong;

  materialArrayBasic[11] = materialPedestalBasic;
  materialArrayLambert[11] = materialPedestalLambert;
  materialArrayPhong[11] = materialPedestalPhong;

  addCylinderP(v1,0,0,0, 0);
  addCylinderP(v1,0,35,0, 1);
  addCylinderPColumn(v1,0,17.5,0);

  v1.add(mesh);
  scene.add(v1);
  v1.position.x=75;
  v1.position.y=2.5;
  v1.position.z=-25;

}

function createIcosahedron(){

	icosaedro = new THREE.Object3D();

  //materialIco = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  materialIcosahedronBasic = new THREE.MeshBasicMaterial({ color: 0xffff00});
  materialIcosahedronLambert = new THREE.MeshLambertMaterial({ color: 0xffff00});
  materialIcosahedronPhong = new THREE.MeshPhongMaterial({ color: 0xffff00});

  materialArrayBasic[2] = materialIcosahedronBasic;
  materialArrayLambert[2] = materialIcosahedronLambert;
  materialArrayPhong[2] = materialIcosahedronPhong;

  addIcosahedron(icosaedro, 55, 65, -40);
  scene.add(icosaedro);

}

function addIcosahedron(obj, x, y, z){

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



    geometryIcosaedro.computeVertexNormals();
    geometryIcosaedro.computeFaceNormals();


    mesh = new THREE.Mesh(geometryIcosaedro, materialIcosahedronLambert);

    meshArray[2] = mesh;

    mesh.position.set(x+20, y, z+20);
    obj.add(mesh);
}

function addCylinder(obj, x, y, z, iteracao) {
  geometry = new THREE.CylinderGeometry(1.5, 1.5, 5, 15);
  mesh = new THREE.Mesh(geometry, materialCylinderLambert);   //FIXME

  if (iteracao == 20){
    meshArray[1] = mesh;
    console.log('1 addCylinder');
  }
  else{
    meshArray[iteracao] = mesh;
    console.log('iteracao cilindro');
    console.log(iteracao);
  }


  addCylinderCounter = -1;



  mesh.position.set(x, y, z);
  mesh.rotation.x = Math.PI / 2;
  obj.add(mesh);
}

function addBox(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(7.5, 7.5, 5);
  mesh = new THREE.Mesh(geometry, materialBoxLambert);

  meshArray[3] = mesh;

  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addPlane(obj, x, y, z) {
  geometry = new THREE.PlaneGeometry(97, 97);
  mesh = new THREE.Mesh(geometry, materialPlaneLambert);

  meshArray[4] = mesh;

  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addFrame(obj, x, y, z, iteracao) {
  geometry = new THREE.BoxGeometry(103, 3, 5);
  mesh = new THREE.Mesh(geometry, materialFrameLambert);

  if(iteracao==0){
    meshArray[5] = mesh;
  }
  if(iteracao==1){
    meshArray[12] = mesh;
  }

  mesh.position.set(x, y, z);   //FIXME
  obj.add(mesh);
}

function addFrameVert(obj, x, y, z, iteracao) {
  geometry = new THREE.BoxGeometry(103, 3, 5);
  mesh = new THREE.Mesh(geometry, materialFrameLambert);  //FIXME

  if(iteracao==0){
    meshArray[13] = mesh;
  }
  if(iteracao==1){
    meshArray[14] = mesh;
  }

  mesh.position.set(x, y, z);
  mesh.rotation.z = Math.PI / 2;
  obj.add(mesh);
}

function addFloor(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(300, 2, 150);
  mesh = new THREE.Mesh(geometry, materialFloorLambert);

  meshArray[0] = mesh;

  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addWall(obj, x, y, z, iteracao) {
  geometry = new THREE.BoxGeometry(2, 150, 150);
  mesh = new THREE.Mesh(geometry, materialWallLambert);

  if(iteracao==0){
    meshArray[6] = mesh;
  }
  if(iteracao==1){
    meshArray[7] = mesh;
  }

  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addWallBack(obj, x, y, z) {
  geometry = new THREE.BoxGeometry(300, 150, 2);
  mesh = new THREE.Mesh(geometry, materialWallLambert);

  meshArray[8] = mesh;

  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCylinderP(obj, x, y, z, iteracao) {
  geometry = new THREE.CylinderGeometry(20, 20, 5);
  mesh = new THREE.Mesh(geometry, materialPedestalLambert);

  if(iteracao==0){
    meshArray[9] = mesh;
  }
  if(iteracao==1){
    meshArray[10] = mesh;
  }

  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCylinderPColumn(obj, x, y, z) {
  geometry = new THREE.CylinderGeometry(15, 15, 30);
  mesh = new THREE.Mesh(geometry, materialPedestalLambert);

  meshArray[11] = mesh;

  mesh.position.set(x, y, z);
  obj.add(mesh);
}


function addGlobalLight(x, y, z){
  directionalLight = new THREE.DirectionalLight(0xffffff, globalLightIntensity); //cor e intensidade
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);
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
    if(changeCameraFront){
        camera = cameraFront;
        changeCameraFront = false;
    }
    else if(changeCameraSide){
        camera = cameraSide;
        changeCameraSide = false
    }
    else if(changeCameraTop){
        camera = cameraTop;
        changeCameraTop = false
    }
    else if(changeCameraPerspective){
        camera = cameraPerspective;
        changeCameraPerspective = false
    }
}
// -------------------------------------------------

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    addGlobalLight(100, 500, 300);

    createOpArt(0,0,0);
    createRoom(0,0,0);
    createSculpture(0,0,0);
    createIcosahedron();
}


function onResize() {
    'use strict';

    // notify the renderer of the size change
    renderer.setSize(window.innerWidth, window.innerHeight);
    // update the camera

    cameraTop.left = -window.innerWidth / cameraFactor;
    cameraTop.right = window.innerWidth / cameraFactor;
    cameraTop.top = window.innerHeight / cameraFactor;
    cameraTop.bottom = -window.innerHeight / cameraFactor;
    cameraTop.updateProjectionMatrix();

    cameraFront.left = -window.innerWidth / cameraFactor;
    cameraFront.right = window.innerWidth / cameraFactor;
    cameraFront.top = window.innerHeight / cameraFactor;
    cameraFront.bottom = -window.innerHeight / cameraFactor;
    cameraFront.updateProjectionMatrix();


    cameraPerspective.aspect = window.innerWidth / window.innerHeight;
    cameraPerspective.updateProjectionMatrix();


}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

    case 54:   // tecla 6
        changeCameraTop = true;
        break;
    case 50:   // tecla 2
        changeCameraSide = true;
        break;
    case 55:   // tecla 7
        changeCameraFront = true;
        break;
    case 53: // tecla 5
        changeCameraPerspective = true;
        break;

    case 81: // tecla Q
    case 113: //tecla q
        globalLightStatus = !globalLightStatus;
        break;

    case 87: // tecla W
    case 119: // tecla w
        teclaW = !teclaW;

        materialSwitch = true;

        console.log('tecla W');
        break;

    case 69: // tecla E
    case 101: // tecla e
        console.log('tecla E');

        materialSwitch = true;
        //console.log('tecla E');
        break;



    case 56:  // tecla 8
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }
}


function checkGlobalLight(){
  if (globalLightStatus==false){
    directionalLight.intensity = 0;
  }

  else{
    directionalLight.intensity = globalLightIntensity;
  }

}


function switchMaterial() {
  const meshLen=meshArray.length;
  if(materialSwitch){
        if(!teclaW){ //Turns off light calculus -> Basic Material
            currentMaterial = "basic";
            for (var i =  0; i < meshLen; i++) {
                meshArray[i].material=materialArrayBasic[i];
            }
        }
        else{ //Changes Gourard<->Phong (if Basic->Gourard)
            if(currentMaterial=="lambert"){
                currentMaterial = "phong";
                for (i =  0; i < meshLen; i++) {
                    meshArray[i].material=materialArrayPhong[i];
                }
            }
            else{
                currentMaterial = "lambert";
                 for (i =  0; i < meshLen; i++) {
                    meshArray[i].material=materialArrayLambert[i];
                }
            }
        }
  materialSwitch = false;
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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

}

function animate() {
    'use strict';

    checkCamera();
    checkGlobalLight();

    switchMaterial();

    render();

    requestAnimationFrame(animate);
}
