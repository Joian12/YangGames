function CheckDistance(x,y,z){
    var distance;
    if(robot) distance = Math.pow((x-robot.position.x), 2) + Math.pow((y-robot.position.y), 2) + Math.pow((z-robot.position.z), 2);
    return distance;
}

function CreateBox(xPos, yPos, zPos, xSize, ySize, zSize, hex){
    var box = new THREE.BoxBufferGeometry();
    var boxMat = new THREE.MeshBasicMaterial();
    var boxMesh = new THREE.Mesh(box, boxMat);
    boxMesh.material.color.setHex(hex);
    boxMesh.scale.set(xSize, ySize, zSize);
    boxMesh.position.set(xPos, yPos, zPos);
    scene.add(boxMesh);
    return boxMesh;
}

function Plane(x,y,z){
    var plane = new THREE.PlaneGeometry(1 ,1, 1 ,1);
    var planeMat = new THREE.MeshStandardMaterial({map: plane_tileBaseColor, normalMap: plane_tileNormalMap, displacementMap: plane_tileHeighttMap});//THREE.MeshBasicMaterial({color: 0x87ceeb,side: THREE.DoubleSide});
    var planeMesh = new THREE.Mesh(plane, planeMat);
    plane.receiveShadow = true;
    planeMesh.scale.set(50,50,1);
    planeMesh.rotation.x =  - Math.PI / 2;
    planeMesh.position.set(x,y,z);
    scene.add(planeMesh)
}

function PlaneWall(x,y,z, rotX, rotY, rotZ){
    var plane = new THREE.PlaneGeometry(1 ,1, 20 ,20);
    var planeMat = new THREE.MeshStandardMaterial({map: plane_tileBaseColor, normalMap: plane_tileNormalMap, displacementMap: plane_tileHeighttMap});//THREE.MeshBasicMaterial({color: 0x87ceeb,side: THREE.DoubleSide});
    var planeMesh = new THREE.Mesh(plane, planeMat);
    plane.receiveShadow = true;
    planeMesh.scale.set(50,50,1);
    planeMesh.position.set(x,y,z);
    planeMesh.rotation.set(rotX, rotY, rotZ);
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
        case 'Enter': enter = true; break;            
        default: break;
    }
}

function _onKeyUp(e){
    switch (e.key) {
        case 'w': keyW = false; break;
        case 's': keyS = false; break;
        case 'd': o = false; break;
        case 'a': p = false; break;
        case 'Enter': enter = false; break;
        default: break;
    }
}

var speed = 0.4, rotationSpeed = 0.15;
var rot = 0;
function Movement(){
    
    rot = robot.rotation.y
    if(keyW) {robot.translateZ(speed);} 
    if(keyS) {robot.translateZ(-speed);}
    if(o){
        {robot.rotation.y -= rotationSpeed};
        if(rot <= -6.3)
            robot.rotation.y = 0;
    }
    
    if(p){
        {robot.rotation.y += rotationSpeed};
        if(rot >= 0)
            robot.rotation.y = -6.3;
    }
}
