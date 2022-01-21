var scene, cam, robot, renderer, loader, globalLight;///init scene
var keyW, keyA, keyS, keyD, o, p;;///movements;
var robotRot;
//textures
var loaderTexture;
var robot_tileNormalMap, robot_tileHeighttMap, robot_tileRoughnessMap, robot_tileAOMap, robot_tileMetallicMap;
var plane_tileNormalMap, plane_tileHeighttMap, plane_tileRoughnessMap, plane_tileAOMap, plane_tileBaseColor;

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
    scene = new THREE.Scene();
    raycast = new THREE.Raycaster();
    cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000);
    cam.position.set(5,10,15);
    cam.rotation.set(-1, 0, 0);
    loaderTexture = new THREE.TextureLoader();
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    
    globalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2, 180);
    globalLight.position.set( 1, 1, 1 ); 
    globalLight.castShadow = false; 
    scene.add(globalLight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.renderReverseSided = true; 
    renderer.shadowMap.enabled = true;
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
        robot.rotation.y += 0.1;
        scene.add(robot);
    } )
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
    console.log(e);
    switch (e.key) {
        case 'w': keyW = true; break;
        case 's': keyS = true; break;
        case 'o': o = true; break;
        case 'p': p = true; break;               
        default: break;
    }
}

function _onKeyUp(e){
    switch (e.key) {
        case 'w': keyW = false; break;
        case 's': keyS = false; break;
        case 'o': o = false; break;
        case 'p': p = false; break;
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
var offset = new THREE.Vector3(5,15,15);
function animate(){ 
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
    if(robot){ Movement(); cam.lookAt(robot.position); cam.position.copy(robot.position).add(offset);}
}

init();
if(loaderTexture){ LoadTextureOfGround(); LoadTextureOfRobot();}
windowsEvents();
LoadGLTF();
Plane(0, -3, 0);
Plane(49.9,-3, 0);
Plane(0,-3, 49.9);
Plane(-49.9,-3, 49.9);
Plane(-98.9,-3, 49.9);
Plane(98.8,-3, 0);
animate();