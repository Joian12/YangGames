
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
cam.position.set(0,0.5,10);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor('0xFFFFFF');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new THREE.GLTFLoader();

loader.load('Robot.gltf', function ( gltf ) {
    var robot = gltf.scene;
	scene.add(robot);
} );

var globalLight = new THREE.AmbientLight(0x808080, 1)
scene.add(globalLight);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, cam);
}

animate();