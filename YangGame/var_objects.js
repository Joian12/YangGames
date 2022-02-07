var box1, box2, box3, collectionBox = []; 
var raycast, direction, far;
var scene, cam, robot, renderer, loader, globalLight;///init scene
var keyW, keyA, keyS, keyD, o, p, enter;///movements;
//textures
var loaderTexture;
var robot_tileNormalMap, robot_tileHeighttMap, robot_tileRoughnessMap, robot_tileAOMap, robot_tileMetallicMap;
var plane_tileNormalMap, plane_tileHeighttMap, plane_tileRoughnessMap, plane_tileAOMap, plane_tileBaseColor;
var sign_1_tileNormalmap, sign_1_tileHeightMap, sign_1_tileRoughnessMap, sign_1_tileAOIMap, sign_1_tileBaseColor;
var sign_2_tileNormalmap, sign_2_tileHeightMap, sign_2_tileRoughnessMap, sign_2_tileAOIMap, sign_2_tileBaseColor;
var sign_3_tileNormalmap, sign_3_tileHeightMap, sign_3_tileRoughnessMap, sign_3_tileAOIMap, sign_3_tileBaseColor;
var boxPosition = [[-10, -3, -10], [110, -3, -10], [-10, -3, 95]];
var boxSize = [[20,1,20],[20,1,20],[20,1,20]];
var light1, light2, light3;
var sign1, sign2, sign3, loaderSign;


var bgTexture = new THREE.TextureLoader().load("Assets/images/5.jpeg");
var sign_1 = 'GLTFModels/Sign/SignBoard.gltf';

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

function LoadTextureOfSignBoard_1(){
    sign_1_tileNormalmap = loaderTexture.load('Materials/Marbles/Sign_1/Sign_1_Mat/Marble_Blue_004_basecolor.jpg');
    sign_1_tileHeightMap = loaderTexture.load('Materials/Marbles/Sign_1/Sign_1_Mat/Marble_Blue_004_height.png');
    sign_1_tileRoughnessMap = loaderTexture.load('Materials/Marbles/Sign_1/Sign_1_Mat/Marble_Blue_004_roughness.jpg');
    sign_1_tileAOIMap = loaderTexture.load('Materials/Marbles/Sign_1/Sign_1_Mat/Marble_Blue_004_ambientOcclusion.jpg');
    sign_1_tileBaseColor = loaderTexture.load('Materials/Marbles/Sign_1/Sign_1_Mat/Marble_Blue_004_basecolor.jpg');
}

function LoadTextureOfSignBoard_2(){
    sign_2_tileNormalmap = loaderTexture.load('Materials/Marbles/Sign_2/Sign_2_Mat/Marble_Red_004_normal.jpg');
    sign_2_tileHeightMap = loaderTexture.load('Materials/Marbles/Sign_2/Sign_2_Mat/Marble_Red_004_height.png');
    sign_2_tileRoughnessMap = loaderTexture.load('Materials/Marbles/Sign_2/Sign_2_Mat/Marble_Red_004_roughness.jpg');
    sign_2_tileAOIMap = loaderTexture.load('Materials/Marbles/Sign_2/Sign_2_Mat/Marble_Red_004_ambientOcclusion.jpg');
    sign_2_tileBaseColor = loaderTexture.load('Materials/Marbles/Sign_2/Sign_2_Mat/Marble_Red_004_basecolor.jpg');
}

function LoadTextureOfSignBoard_3(){
    sign_3_tileNormalmap = loaderTexture.load('Materials/Marbles/Sign_3/Sign_3_Mat/Marble_Tiles_001_normal.jpg');
    sign_3_tileHeightMap = loaderTexture.load('Materials/Marbles/Sign_3/Sign_3_Mat/Marble_Tiles_001_height.png');
    sign_3_tileRoughnessMap = loaderTexture.load('Materials/Marbles/Sign_3/Sign_3_Mat/Marble_Tiles_001_roughness.jpg');
    sign_3_tileAOIMap = loaderTexture.load('Materials/Marbles/Sign_3/Sign_3_Mat/Marble_Tiles_001_ambientOcclusion.jpg');
    sign_3_tileBaseColor = loaderTexture.load('Materials/Marbles/Sign_3/Sign_3_Mat/Marble_Tiles_001_basecolor.jpg');
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
    light1 = new THREE.PointLight( 0x364f78, 5, 100); light1.position.set(-10, 10, -10); scene.add(light1);
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

    loader.load('GLTFModels/Robot/Robot.gltf', function ( gltf ) {
        robot = gltf.scene;
        robot.traverse(function(node) {

            if (node instanceof THREE.Mesh) {
                node.material.normalMap = plane_tileNormalMap;
                node.material.roughness = plane_tileRoughnessMap;
            }
        });
        robot.position.set(0,0,0);
        scene.add(robot);
    } )
}


function SignGLTF(model ,scaleX, scaleY, scaleZ, posX, posY, posZ, baseColor, normalMap, roughNessMap, ambientOcclusion){
    loaderSign = new THREE.GLTFLoader();
    loaderSign.load(model, function ( gltf2 ) {
        sign1 = gltf2.scene;
        sign1.traverse(function(node) {

            if (node instanceof THREE.Mesh) {
                node.material.map = baseColor;
                node.material.normalMap = normalMap;
                node.material.roughness = roughNessMap;
                node.material.aoMap  = ambientOcclusion;
            }
        });
        sign1.position.set(posX, posY, posZ);
        sign1.scale.set(scaleX, scaleY, scaleZ);
        scene.add(sign1);
    } )
}

function SignGLTF2(model ,scaleX, scaleY, scaleZ, posX, posY, posZ, baseColor, normalMap, roughNessMap, ambientOcclusion){
    loaderSign = new THREE.GLTFLoader();
    loaderSign.load(model, function ( gltf2 ) {
        sign2 = gltf2.scene;
        sign2.traverse(function(node) {

            if (node instanceof THREE.Mesh) {
                node.material.map = baseColor;
                node.material.normalMap = normalMap;
                node.material.roughness = roughNessMap;
                node.material.aoMap  = ambientOcclusion;
            }
        });
        sign2.position.set(posX, posY, posZ);
        sign2.scale.set(scaleX, scaleY, scaleZ);
        scene.add(sign2);
    } )
}

function SignGLTF3(model ,scaleX, scaleY, scaleZ, posX, posY, posZ, baseColor, normalMap, roughNessMap, ambientOcclusion){
    loaderSign = new THREE.GLTFLoader();
    loaderSign.load(model, function ( gltf2 ) {
        sign3 = gltf2.scene;
        sign3.traverse(function(node) {

            if (node instanceof THREE.Mesh) {
                node.material.map = baseColor;
                node.material.normalMap = normalMap;
                node.material.roughness = roughNessMap;
                node.material.aoMap  = ambientOcclusion;
            }
        });
        sign3.position.set(posX, posY, posZ);
        sign3.scale.set(scaleX, scaleY, scaleZ);
        scene.add(sign3);
    } )
}