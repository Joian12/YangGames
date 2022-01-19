
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new THREE.GLTFLoader();

loader.load('Robot.gltf', function ( gltf ) {
    var robot = gltf.scene;
	scene.add(robot);
} );