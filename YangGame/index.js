var box1, box2, box3, collectionBox = []; 
var raycast, direction, far;
var scene, cam, robot, renderer, loader, globalLight;///init scene
var keyW, keyA, keyS, keyD, o, p;;///movements;
//textures
var loaderTexture;
var robot_tileNormalMap, robot_tileHeighttMap, robot_tileRoughnessMap, robot_tileAOMap, robot_tileMetallicMap;
var plane_tileNormalMap, plane_tileHeighttMap, plane_tileRoughnessMap, plane_tileAOMap, plane_tileBaseColor;
var boxPosition = [[0, 0, 0], [40, 0, 0], [80, 0, 0]];
var boxSize = [[10,10,10],[10,10,10],[10,10,10]];

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
    
    globalLight = new THREE.AmbientLight(0xFFFFFF, 1);
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
        robot.position.set(40,0,10)
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

var speed = 0.4 ,rotationSpeed = 0.15;
function Movement(){
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    if(keyW) {robot.translateZ(speed);} 
    if(keyS) {robot.translateZ(-speed);}
    if(o){robot.rotation.y -= rotationSpeed};
    if(p){robot.rotation.y += rotationSpeed};

}

function CheckColliderBox(box, dis){   
    if(CheckDistance(boxPosition[box][0], boxPosition[box][1], boxPosition[box][2]) < dis) 
        robot.position.set(robot.position.x+0.5, boxPosition[box][1], robot.position.z+0.5); 
}

var offset = new THREE.Vector3(5,15,15);
var newPosLerp;
function animate(){ 
    renderer.render(scene, cam);
    requestAnimationFrame(animate);    
    if(robot){ 
        Movement();
        cam.position.lerp(robot.position, 0.7).add(offset);
        cam.lookAt(robot.position); 
        console.log(robot.position);
        CheckColliderBox(0, 40); CheckColliderBox(1, 40); CheckColliderBox(2,40);
        //CheckDistance(boxPosition[0][0], boxPosition[0][1], boxPosition[0][2]);
        //CheckDistance(boxPosition[1][0], boxPosition[1][1], boxPosition[1][2]);
        //CheckDistance(boxPosition[2][0], boxPosition[2][1], boxPosition[2][2]);
       // console.log(CheckDistance(boxPosition[1][0], boxPosition[1][1], boxPosition[1][2]));
    }
    
}

init();
if(loaderTexture){ LoadTextureOfGround(); LoadTextureOfRobot();}
windowsEvents();
LoadGLTF();
Plane(0, -3, 0); 
box1 = CreateBox(boxPosition[0][0], boxPosition[0][1], boxPosition[0][2], boxSize[0][0], boxSize[0][1], boxSize[0][2], 0xeb4034); collectionBox.push(box1);
box2 = CreateBox(boxPosition[1][0], boxPosition[1][1], boxPosition[1][2], boxSize[1][0], boxSize[1][1], boxSize[1][2], 0x80b543 ); collectionBox.push(box2);
box3 = CreateBox(boxPosition[2][0], boxPosition[2][1], boxPosition[2][2], boxSize[2][0], boxSize[2][1], boxSize[2][2], 0x7b3e9e ); collectionBox.push(box3);

Plane(49.9,-3, 0);
Plane(0,-3, 49.9);
Plane(-49.9,-3, 49.9);
Plane(-98.9,-3, 49.9);
Plane(98.8,-3, 0);
animate();