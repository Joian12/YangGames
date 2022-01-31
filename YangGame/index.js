var box1, box2, box3, collectionBox = []; 
var raycast, direction, far;
var scene, cam, robot, renderer, loader, globalLight;///init scene
var keyW, keyA, keyS, keyD, o, p;;///movements;
//textures
var loaderTexture;
var robot_tileNormalMap, robot_tileHeighttMap, robot_tileRoughnessMap, robot_tileAOMap, robot_tileMetallicMap;
var plane_tileNormalMap, plane_tileHeighttMap, plane_tileRoughnessMap, plane_tileAOMap, plane_tileBaseColor;
var boxPosition = [[-10, -3, -10], [110, -3, -10], [-10, -3, 95]];
var boxSize = [[20,1,20],[20,1,20],[20,1,20]];
var light1, light2, light3;

var bgTexture = new THREE.TextureLoader().load("Assets/images/5.jpeg");


function LoadTextureOfRobot(){
    robot_tileNormalMap = loaderTexture.load('Materials/robot_mat/Metal_Damaged_001_SD/Metal_Damaged_001_normal.jpg'); 
    robot_tileHeighttMap = loaderTexture.load('Materials/robot_mat/Metal_Damaged_001_SD/Metal_Damaged_001_height.png');
    robot_tileRoughnessMap = loaderTexture.load('Materials/robot_mat/Metal_Damaged_001_SD/Metal_Damaged_001_roughness.jpg');
    robot_tileAOMap = loaderTexture.load('Materials/robot_mat/Metal_Damaged_001_SD/Metal_Damaged_001_ambientOcclusion.jpg');
    robot_tileMetallicMap = loaderTexture.load('Materials/robot_mat/Metal_Damaged_001_SD/Metal_Damaged_001_metallic.jpg');
}

function LoadTextureOfGround(){
    plane_tileNormalMap = loaderTexture.load('Materials/plane_mat/Stylized_Stone_Floor_003_SD/Stylized_Stone_Floor_003_normal.jpg');
    plane_tileHeighttMap = loaderTexture.load('Materials/plane_mat/Stylized_Stone_Floor_003_SD/Stylized_Stone_Floor_003_height.png');
    plane_tileRoughnessMap = loaderTexture.load('Materials/plane_mat/Stylized_Stone_Floor_003_SD/Stylized_Stone_Floor_003_roughness.jpg');
    plane_tileAOMap = loaderTexture.load('Materials/plane_mat/Stylized_Stone_Floor_003_SD/Stylized_Stone_Floor_003_ambientOcclusion.jpg');
    plane_tileBaseColor = loaderTexture.load('Materials/plane_mat/Stylized_Stone_Floor_003_SD/Stylized_Stone_Floor_003_basecolor.jpg'); 
}

function init(){
    direction = new THREE.Vector3();
    far = new THREE.Vector3();
    scene = new THREE.Scene();
    raycast = new THREE.Raycaster();
    cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000);
    cam.position.set(5,10,15);
    cam.rotation.set(-1, 0, 0);
    loaderTexture = new THREE.TextureLoader();
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor( 0x3d3736, 1);
    globalLight = new THREE.AmbientLight(0xb8aead, 1);
    light1 = new THREE.PointLight( 0x364f78, 5, 100 ); light1.position.set(-10, 10, -10); scene.add(light1);
    light2 = new THREE.PointLight( 0x364f78, 5, 100 ); light2.position.set(110, 10, -10); scene.add(light2);
    light3 = new THREE.PointLight( 0x364f78, 5, 100 ); light3.position.set(-10, 10, 95); scene.add(light3);
    bgTexture.minFilter = THREE.NearestFilter;
    scene.background = bgTexture;
    scene.add(globalLight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
}

function windowsEvents(){
    window.addEventListener('resize', function(){
        cam.aspect(window.innerWidth/window.innerHeight);
        cam.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}

function LoadGLTF(){
    loader = new THREE.GLTFLoader();

    loader.load('Robot.gltf', function ( gltf ) {
        robot = gltf.scene;
        robot.position.set(0,0,0)
        scene.add(robot);
    } )
}

function CheckDistance(x,y,z){
    var distance;
    if(robot) distance = Math.pow((x-robot.position.x), 2) + Math.pow((y-robot.position.y), 2) + Math.pow((z-robot.position.z), 2);
    return distance;
}

function CreateBox(xPos, yPos, zPos, xSize, ySize, zSize, hex){
    var box = new THREE.BoxGeometry();
    var boxMat = new THREE.MeshBasicMaterial();
    var boxMesh = new THREE.Mesh(box, boxMat);
 
    boxMesh.scale.set(xSize, ySize, zSize);
    boxMesh.position.set(xPos, yPos, zPos);
    boxMesh.material.color.setHex(hex);
    scene.add(boxMesh);
    return boxMesh;
}

function Plane(x,y,z){
    var plane = new THREE.PlaneGeometry(1 ,1, 20 ,20);
    var planeMat = new THREE.MeshStandardMaterial({map: plane_tileBaseColor, normalMap: plane_tileNormalMap, displacementMap: plane_tileHeighttMap});//THREE.MeshBasicMaterial({color: 0x87ceeb,side: THREE.DoubleSide});
    var planeMesh = new THREE.Mesh(plane, planeMat);
    plane.receiveShadow = true;
    planeMesh.scale.set(50,50,1);
    planeMesh.rotation.x =  - Math.PI / 2;
    planeMesh.position.set(x,y,z);
    scene.add(planeMesh)
}
    
document.addEventListener('keydown', e => _onKeyDown(e));
document.addEventListener('keyup',e => _onKeyUp(e));


function _onKeyDown(e){   
    switch (e.key) {
        case 'w': keyW = true; break;
        case 's': keyS = true; break;
        case 'd': o = true; break;
        case 'a': p = true; break;               
        default: break;
    }
}

function _onKeyUp(e){
    switch (e.key) {
        case 'w': keyW = false; break;
        case 's': keyS = false; break;
        case 'd': o = false; break;
        case 'a': p = false; break;
        default: break;
    }
}

var speed = 0.4, rotationSpeed = 0.15;
var rot = 0;
function Movement(){
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    rot = robot.rotation.y
    if(keyW) {robot.translateZ(speed);} 
    if(keyS) {robot.translateZ(-speed);}
    if(o){
        {robot.rotation.y -= rotationSpeed};
        if(rot <= -6.3)
            robot.rotation.y = 0;
    }
    
    if(p){
        {robot.rotation.y += rotationSpeed};
        if(rot >= 0)
            robot.rotation.y = -6.3;
    }

}

function CheckColliderBox(x, z){   

}

function checkRot() {
    return (robot.rotation.y < -3 && robot.rotation.y > -6.3);;
}

var offset = new THREE.Vector3(5,15,15);
var newPosLerp;



