var gthub = "github.html"; 
var gameproj = "gameproject.html";
var modelPage = "ModelPage.html";

var planeSize = 5;
function instantiate(){
    for (let i = 0; i < planeSize; i++) {
        for (let j = 0; j < planeSize; j++) {
            Plane(49.9*i, -3, 49.9*j);
        }
    }
}

function goToPage(x,y,z, name){
    if(CheckDistance(x,y,z) < 240 && enter == true && name == "github.html") {setTimeout(function() {window.location.href = "github.html";}, 2000); speed = 0; rotationSpeed = 0}
    if(CheckDistance(x,y,z) < 240 && enter == true && name == "gameproject.html") {setTimeout(function() {window.location.href = "gameproject.html";}, 2000); speed = 0; rotationSpeed = 0}
    if(CheckDistance(x,y,z) < 240 && enter == true && name == "ModelPage.html") {setTimeout(function() {window.location.href = "ModelPage.html";}, 2000); speed = 0; rotationSpeed = 0}
}

function checkBoundary(){
    if(robot.position.x < -22) robot.position.x = -22;
    if(robot.position.x > 122) robot.position.x = 122;
    if(robot.position.z < -20) robot.position.z = -20;
    if(robot.position.z > 105) robot.position.z = 105; 
}

var offset = new THREE.Vector3(2,2,2);
var newPosLerp;
function animate(){ 
    renderer.render(scene, cam);
    requestAnimationFrame(animate);    
    if(robot){ 
        Movement();
        cam.position.lerp(robot.position, 0.1).add(offset);
        cam.lookAt(robot.position); 
        checkBoundary();
        goToPage(boxPosition[0][0],boxPosition[0][1],boxPosition[0][2], gthub);
        goToPage(boxPosition[1][0],boxPosition[1][1],boxPosition[1][2], gameproj);
        goToPage(boxPosition[2][0],boxPosition[2][1],boxPosition[2][2], modelPage);
        
    }

    console.log(sign1);
    if(sign1){
        sign1.rotation.y += 0.1;
    }
    if(sign2){
        sign2.rotation.y += 0.1;
    }

    if(sign3){
        sign3.rotation.y += 0.1;
    }
}

init();
if(loaderTexture){ LoadTextureOfGround(); LoadTextureOfRobot(); LoadTextureOfSignBoard_1(); LoadTextureOfSignBoard_2(); LoadTextureOfSignBoard_3();}
windowsEvents();
LoadGLTF();
SignGLTF(sign_1, 5, 5, 5, -6, 5,-8, sign_1_tileBaseColor, sign_1_tileNormalmap, sign_1_tileRoughnessMap);
SignGLTF2(sign_1, 5, 5, 5, 110, 5,-8, sign_2_tileBaseColor, sign_2_tileNormalmap, sign_2_tileRoughnessMap);
SignGLTF3(sign_1, 5, 5, 5, -10, 5, 95, sign_3_tileBaseColor, sign_3_tileNormalmap, sign_3_tileRoughnessMap);
Plane(0, -3, 0); 
box1 = CreateBox(boxPosition[0][0], boxPosition[0][1], boxPosition[0][2], boxSize[0][0], boxSize[0][1], boxSize[0][2], 0xeb4034); collectionBox.push(box1);
box2 = CreateBox(boxPosition[1][0], boxPosition[1][1], boxPosition[1][2], boxSize[1][0], boxSize[1][1], boxSize[1][2], 0x80b543 ); collectionBox.push(box2);
box3 = CreateBox(boxPosition[2][0], boxPosition[2][1], boxPosition[2][2], boxSize[2][0], boxSize[2][1], boxSize[2][2], 0x7b3e9e ); collectionBox.push(box3);
Plane(49.9*0, -3, 0); Plane(49.9*1, -3, 40.9*1); Plane(49.9*1, -3, 40.9*2);
Plane(49.9*1, -3, 0); Plane(49.9*2, -3, 40.9*1); Plane(49.9*2, -3, 40.9*2);
Plane(49.9*2, -3, 0);
Plane(0, -3, 40.9*0);
Plane(0, -3, 40.9*1);
Plane(0, -3, 40.9*2);
animate();