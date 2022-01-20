
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
cam.position.set(0,8,10);
cam.rotation.set(-0.7, 0, 0);
var robot;

window.addEventListener('resize', function(){
    cam.aspect(window.innerWidth/window.innerHeight);
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

var renderer = new THREE.WebGLRenderer({
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.GLTFLoader();

    loader.load('Robot.gltf', function ( gltf ) {
        robot = gltf.scene;
        robot.rotation.y += 0.1;
        scene.add(robot);
    } )
    
document.addEventListener('keypress', e => this._onKeyDown(e));
function move(robot)
{   
    //robot.rotation.y += 0.1;
}

function _onKeyDown(e)
{
    console.log(e);
    switch (e.key) {
        case 'w':
            robot.position.z += (0.5 * 0.5);
            break;
        case 'a':
            robot.position.x -= (0.1 * 2);
            break;
        case 's':
            robot.position.z -= (0.1 * 2);
            break;
        case 'd':
            robot.position.x += (0.1 * 2);
            break;
        default:
            break;
    }
}

function plane()
{
    var plane = new THREE.PlaneGeometry(125,125, 1,1);
    var planeMat = new THREE.MeshBasicMaterial({color: 0x87ceeb,side: THREE.DoubleSide});
    var planeMesh = new THREE.Mesh(plane, planeMat);
    planeMesh.rotation.x =  - Math.PI / 2;
    planeMesh.position.y = -2;
    scene.add(planeMesh)
}

var globalLight = new THREE.AmbientLight(0x808080, 1);
scene.add(globalLight);

function animate()
{ 
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
    if(robot)
        move(robot);
}

plane();
animate();