
var planeSize = 5;
function instantiate(){
    for (let i = 0; i < planeSize; i++) {
        for (let j = 0; j < planeSize; j++) {
            Plane(49.9*i, -3, 49.9*j);
        }
    }
}

// z -20 to 105
// x -22 to 122
function checkBoundary(){
    if(robot.position.x < -22) robot.position.x = -22;
    if(robot.position.x > 122) robot.position.x = 122;
    if(robot.position.z < -20) robot.position.z = -20;
    if(robot.position.z > 105) robot.position.z = 105; 
}

function animate(){ 
    renderer.render(scene, cam);
    requestAnimationFrame(animate);    
    if(robot){ 
        Movement();
        cam.position.lerp(robot.position, 0.7).add(offset);
        cam.lookAt(robot.position); 
       
        checkBoundary();
        CheckColliderBox(boxPosition[0][0], boxPosition[0][2]); 
        //CheckDistance(boxPosition[0][0], boxPosition[0][1], boxPosition[0][2]);
        //CheckDistance(boxPosition[1][0], boxPosition[1][1], boxPosition[1][2]);
        //CheckDistance(boxPosition[2][0], boxPosition[2][1], boxPosition[2][2]);
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
Plane(49.9*0, -3, 0); Plane(49.9*1, -3, 40.9*1); Plane(49.9*1, -3, 40.9*2);
Plane(49.9*1, -3, 0); Plane(49.9*2, -3, 40.9*1); Plane(49.9*2, -3, 40.9*2);
Plane(49.9*2, -3, 0);
Plane(0, -3, 40.9*0);
Plane(0, -3, 40.9*1);
Plane(0, -3, 40.9*2);
animate();