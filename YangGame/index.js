var scene, cam, robot, renderer, loader, globalLight;
///movements;
var keyW, keyA, keyS, keyD;
var o, p;
var robotRot;
var raycast;


function init()
{
    scene = new THREE.Scene();
    raycast = new THREE.Raycaster();
    cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
    cam.position.set(0,8,10);
    cam.rotation.set(-0.7, 0, 0);
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function windowsEvents()
{
    window.addEventListener('resize', function(){
        cam.aspect(window.innerWidth/window.innerHeight);
        cam.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}

function Light()
{
    globalLight = new THREE.AmbientLight(0x808080, 1);
    scene.add(globalLight);
}


function LoadGLTF()
{
    loader = new THREE.GLTFLoader();

    loader.load('Robot.gltf', function ( gltf ) {
        robot = gltf.scene;
        robot.rotation.y += 0.1;
        scene.add(robot);
    } )
}

function Plane()
{
    var plane = new THREE.PlaneGeometry(125,125, 1,1);
    var planeMat = new THREE.MeshBasicMaterial({color: 0x87ceeb,side: THREE.DoubleSide});
    var planeMesh = new THREE.Mesh(plane, planeMat);
    planeMesh.rotation.x =  - Math.PI / 2;
    planeMesh.position.y = -2;
    scene.add(planeMesh)
}
    
document.addEventListener('keydown', e => _onKeyDown(e));
document.addEventListener('keyup',e => _onKeyUp(e));


function _onKeyDown(e)
{   
    console.log(e);
    switch (e.key) {
        case 'w':
            keyW = true;
            break;
        case 's':
            keyS = true
            break;
        case 'o':
            o = true;
            break;
        case 'p':
            p = true;
            break;               
        default:
            break;
    }
}

function _onKeyUp(e)
{
    switch (e.key) {
        case 'w':
            keyW = false;
            break;
        case 's':
            keyS = false
            break;
        case 'o':
            o = false
            break;
        case 'p':
            p = false;
            break;
        default:
            break;
    }
}

function Rotation()
{
    console.log(e);
}

function Movement()
{
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    if(keyW) {robot.translateZ(0.1);} 
    if(keyS) {robot.translateZ(-0.1);}
    if(o){robot.rotation.y -= 0.1};
    if(p){robot.rotation.y += 0.1};

}

function _rotation(e)
{

}

function animate()
{ 
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
    if(robot)
    {
        Movement();
    }
        
}

init();
windowsEvents();
LoadGLTF();
Light();
Plane();
animate();