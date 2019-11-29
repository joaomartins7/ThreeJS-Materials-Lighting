/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var cameraFactor = 4;

var changeCameraTop = false;
var changeCameraFront = false;
var changeCameraSide = false;
var changeCameraPerspective = false;
var spotlightIntensity = 7;

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
var globalLightIntensity = 1.4;

var spotlight1, spotlight2, spotlight3, spotlight4;
var spotlight1_switch = false;
var spotlight2_switch = false;
var spotlight3_switch = false;
var spotlight4_switch = false;

var currentMaterial = "lambert";

var materialSwitch = true;
var teclaW = true;

var addBoxCounter = 0;
var addCylinderCounter = 0;

var b, c;

var switchAxisVisibility = false;

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
  var deformacao = 1.2;
	geometryIcosaedro = new THREE.Geometry();

    //vertices
    geometryIcosaedro.vertices.push(


    	new THREE.Vector3(-1*size, phi*size*deformacao, 0),
    	new THREE.Vector3(1*size, phi*size, 0),
    	new THREE.Vector3(-1*size, -phi*size, 0),
    	new THREE.Vector3(1*size*deformacao, -phi*size, 0),

      new THREE.Vector3(0, -1*size*deformacao, phi*size),
      new THREE.Vector3(0, 1*size, phi*size),
    	new THREE.Vector3(0, -1*size, -phi*size),
      new THREE.Vector3(0, 1*size, -phi*size),

      new THREE.Vector3(phi*size, 0, -1*size),
      new THREE.Vector3(phi*size, 0, 1*size),
      new THREE.Vector3(-phi*size*deformacao, 0, -1*size),
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

  }
  else{
    meshArray[iteracao] = mesh;

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

  //mesh.position.set(x, y, z);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}


function addGlobalLight(x, y, z){
  directionalLight = new THREE.DirectionalLight(0xffffff, globalLightIntensity); //cor e intensidade
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);
}

function create_spotlights(){
  var distanceLight = 100;
  var penumbra = 0;
	spotlight1 = new THREE.SpotLight(0xffffff, 5, 200, (Math.PI/2), penumbra, 1);
	spotlight1.position.set(-distanceLight, 20, -50);

	spotlight2 = new THREE.SpotLight(0xffffff, 5, 200, (Math.PI/2), penumbra, 1);
	spotlight2.position.set(-distanceLight, 20, 50);

	spotlight3 = new THREE.SpotLight(0xffffff, 5, 200, (Math.PI/2), penumbra, 1);
	spotlight3.position.set(distanceLight, 20, -50);

	spotlight4 = new THREE.SpotLight(0xffffff, 5, 200, (Math.PI/2), penumbra, 1);
	spotlight4.position.set(distanceLight, 20, 50);

	scene.add(spotlight1);
	scene.add(spotlight2);
	scene.add(spotlight3);
	scene.add(spotlight4);
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

    addGlobalLight(300, 500, 300);
    create_spotlights();

    createOpArt(0,0,0);
    createRoom(0,0,0);
    createSculpture(0,0,0);
    createIcosahedron();

    createHolofotes();
}


function createHolofotes(){
    var altura = 15;
    createHolofote1(altura);  //baixo atras esquerda
    createHolofote2(altura);  //baixo frente esquerda
    createHolofote3(altura);  //baixo atras direita
    createHolofote4(altura);  //baixo frente direita

}


function createHolofote1(altura){
    holofote1 = new THREE.Object3D();
    cone1 = new THREE.Object3D();
    esfera1 = new THREE.Object3D();

    materialCone1Basic = new THREE.MeshBasicMaterial( { color: 'red'} );
    addCone1(cone1, -130, altura, 70);

    materialEsfera1Basic = new THREE.MeshBasicMaterial( { color: 'white'} );
    addEsfera(esfera1, -130, altura, 50);

    holofote1.add(cone1);
    holofote1.add(esfera1);

    scene.add(holofote1);
    //scene.add(cone1);
    //scene.add(esfera1);
}

function createHolofote2(altura){
    holofote2 = new THREE.Object3D();
    cone2 = new THREE.Object3D();
    esfera2 = new THREE.Object3D();

    materialCone2Basic = new THREE.MeshBasicMaterial( { color: 'red'} );
    addCone2(cone2, -130, altura, 70);

    materialEsfera2Basic = new THREE.MeshBasicMaterial( { color: 'white'} );
    addEsfera(esfera2, -130, altura, 50);

    holofote2.add(cone2);
    holofote2.add(esfera2);

    holofote2.position.z -= 100;

    scene.add(holofote2);

}

function createHolofote3(altura){
    holofote3 = new THREE.Object3D();
    cone3 = new THREE.Object3D();
    esfera3 = new THREE.Object3D();

    materialCone3Basic = new THREE.MeshBasicMaterial( { color: 'red'} );
    addCone3(cone3, -130, altura, 70);

    materialEsfera3Basic = new THREE.MeshBasicMaterial( { color: 'white'} );
    addEsfera(esfera3, -150, altura, 50);

    holofote3.add(cone3);
    holofote3.add(esfera3);

    holofote3.position.x += 260;

    scene.add(holofote3);

}

function createHolofote4(altura){
    holofote4 = new THREE.Object3D();
    cone4 = new THREE.Object3D();
    esfera4 = new THREE.Object3D();

    materialCone4Basic = new THREE.MeshBasicMaterial( { color: 'red'} );
    addCone4(cone4, -130, altura, 70);

    materialEsfera4Basic = new THREE.MeshBasicMaterial( { color: 'white'} );
    addEsfera(esfera4, -150, altura, 50);

    holofote4.add(cone4);
    holofote4.add(esfera4);

    holofote4.position.x += 260;
    holofote4.position.z -= 100;

    scene.add(holofote4);

}

function addCone1(obj, x, y, z){

  geometry = new THREE.ConeGeometry(15, 20, 10, 10);
  mesh = new THREE.Mesh(geometry, materialCone1Basic);

  mesh.position.set(x, y, z);
  mesh.rotation.x = Math.PI / 2;
  mesh.rotation.z = Math.PI / 4;

  obj.add(mesh);
}

function addCone2(obj, x, y, z){

  geometry = new THREE.ConeGeometry(15, 20, 10, 10);
  mesh = new THREE.Mesh(geometry, materialCone1Basic);

  mesh.position.set(x, y, z-20);
  mesh.rotation.x = Math.PI / 2;
  mesh.rotation.z = Math.PI / 1.25;

  obj.add(mesh);
}

function addCone3(obj, x, y, z){

  geometry = new THREE.ConeGeometry(15, 20, 10, 10);
  mesh = new THREE.Mesh(geometry, materialCone1Basic);

  mesh.position.set(x, y, z);
  mesh.rotation.x = Math.PI / 2;
  mesh.rotation.z = -Math.PI / 4;

  obj.add(mesh);
}

function addCone4(obj, x, y, z){

  geometry = new THREE.ConeGeometry(15, 20, 10, 10);
  mesh = new THREE.Mesh(geometry, materialCone1Basic);

  mesh.position.set(x, y, z-20);
  mesh.rotation.x = Math.PI / 2;
  mesh.rotation.z = -Math.PI / 1.25;

  obj.add(mesh);
}

function addEsfera(obj, x, y, z){

  geometry = new THREE.SphereGeometry(8, 16, 16);
  mesh = new THREE.Mesh(geometry, materialEsfera1Basic);

  mesh.position.set(x+10, y, z+10);
  obj.add(mesh);

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

    case 49:   // tecla 1
    	spotlight1_switch = !spotlight1_switch;
    	break;
    case 50:   // tecla 2
    	spotlight2_switch = !spotlight2_switch;
    	break;
    case 51:   // tecla 3
    	spotlight3_switch = !spotlight3_switch;
    	break;
    case 52:   // tecla 4
    	spotlight4_switch = !spotlight4_switch;
    	break;
    case 53:   // tecla 5
        changeCameraPerspective = true;
        break;
    case 55:   // tecla 7
        changeCameraTop = true;
        break;
    case 54:   // tecla 6
        changeCameraFront = true;
        break;
    case 57:   // tecla 9
        changeCameraSide = true;
        break;

    case 81: // tecla Q
    case 113: //tecla q
        globalLightStatus = !globalLightStatus;
        break;

    case 87: // tecla W
    case 119: // tecla w
        teclaW = !teclaW;

        materialSwitch = true;


        break;

    case 69: // tecla E
    case 101: // tecla e


        materialSwitch = true;

        break;


    case 56:  // tecla 8
        switchAxisVisibility = true;
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

function check_spotlight1(){
	if(spotlight1_switch == true)
		spotlight1.intensity = spotlightIntensity;
	else
		spotlight1.intensity = 0;
}

function check_spotlight2(){
	if(spotlight2_switch == true)
		spotlight2.intensity = spotlightIntensity;
	else
		spotlight2.intensity = 0;
}

function check_spotlight3(){
	if(spotlight3_switch == true)
		spotlight3.intensity = spotlightIntensity;
	else
		spotlight3.intensity = 0;
}

function check_spotlight4(){
	if(spotlight4_switch == true)
		spotlight4.intensity = spotlightIntensity;
	else
		spotlight4.intensity = 0;
}

function check_spotlights(){
	check_spotlight1();
	check_spotlight2();
	check_spotlight3();
	check_spotlight4();
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



function checkAxisVisibility(){
    if (switchAxisVisibility){

        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });

    switchAxisVisibility = false;
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

    checkAxisVisibility();
    checkCamera();

    checkGlobalLight();
    check_spotlights()

    switchMaterial();

    render();
    requestAnimationFrame(animate);
}
