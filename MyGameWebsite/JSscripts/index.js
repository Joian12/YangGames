var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e6936b");
cam.position.z = 5;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function()
{
    var height = window.innerWidth;
    var width = window.innerWidth;
    
    cam.aspect = width/height;
    renderer.setSize(width, height);
    cam.updateProjectionMatrix();
});

var sphere = new THREE.SphereGeometry(1,15, 15);
var sphereMat = new THREE.MeshLambertMaterial({color: 0x87ceeb});
var shpereMesh = new THREE.Mesh(sphere, sphereMat);
shpereMesh.position.x = 2;
scene.add(shpereMesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10,0,25);
scene.add(light);

renderer.render(scene, cam);

var render = function()
{
    requestAnimationFrame(render);
    shpereMesh.position.x += 0.1;
    renderer.render(scene, cam);
}

render();