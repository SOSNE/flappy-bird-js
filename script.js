let topPozHelp = 50;
let separation = 20;
let towersLeftMargine = 110;
var towerArray = [];
let birdPosition = 30
function getRandomNumMax(min, max) {
    return Math.random() * (max - min) + min;
    }
  
function Test(){
    topPozHelp = getRandomNumMax(20,500);
    separation = getRandomNumMax(350,450);
    let parentDiv = document.createElement('div');
    parentDiv.className="parentBox";

    for(i =1; i<3; i++){
        const box = document.createElement("div");
        box.className="box";

        if(i == 1){
            box.style.paddingTop = topPozHelp+"px";
            box.style.marginBottom = separation+"px";
        }
        if(i == 2){
            box.style.paddingBottom = 2000*i +"px";
        }
        parentDiv.appendChild(box);
    }
    document.body.appendChild(parentDiv);
    parentDiv.setAttribute("left", towersLeftMargine);

    towerArray.push(parentDiv);
}
setInterval(Test, 2000)

function TowersLogic(){
    
    towerArray.forEach(tower => {
        let currentLeft = parseInt(tower.getAttribute("left"), 10);
        tower.style.left = currentLeft + "%";
        tower.setAttribute("left", currentLeft - 1);
        if(currentLeft < 0){
            tower.remove();
        }
   })
   
}
setInterval(TowersLogic, 50);

const bird = document.getElementById("birdBox");

function birdPhysics(){
    bird.style.top = birdPosition + "%";
    birdPosition += 0.3;
}
setInterval(birdPhysics, 10);

window.addEventListener('keydown', function (event) {
    let boxPositionMove = document.getElementById("box1");
    if(event.keyCode == 87) {
        //W
        birdPosition -= 13 ;
    }
    if(event.keyCode == 32) {
        //SPACE
        birdPosition -= 13 ;
    }
});


let colision = true;
function collisionDetection() {
    var birdPoz = document.getElementById('birdBox').getBoundingClientRect();
    towerArray.forEach(tower => {
        for (let child of tower.children) {
            let towerPoz = child.getBoundingClientRect();
            // console.log(towerPoz.bottom)
            if (birdPoz.top <= towerPoz.bottom && birdPoz.right >= towerPoz.left && birdPoz.bottom >= towerPoz.top && birdPoz.left <= towerPoz.right && colision){
                birdDies();
            }
        }
   })
}
setInterval(collisionDetection, );
function points(){
    let pointsAmount =0;
    var birdPoz = document.getElementById('birdBox').getBoundingClientRect();
    towerArray.forEach(tower => {
        for (let child of tower.children) {
            let towerPoz = child.getBoundingClientRect();
            
            if (birdPoz.right >= towerPoz.left){
                pointsAmount += 0.5;
                document.getElementById("label").innerHTML = pointsAmount;
            }
        }
   })
}
setInterval(points, );
function birdDies() {
    colision = false;
    let dieScreen = document.createElement('div');
    dieScreen.id = "dieScreen";
    const respawnButton = document.createElement("button");
    respawnButton.id = "restartButton";
    dieScreen.appendChild(respawnButton);
    document.body.appendChild(dieScreen);
    respawnButton.addEventListener('click', function() {
        location.reload();
    });
}

// function collisionDetection() {
//     for (let c = 0; c < brickColumnCount; c++) {
//       for (let r = 0; r < brickRowCount; r++) {
//         const b = bricks[c][r];
//         if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
//           dy = -dy;
//         }
//       }
//     }
//   }
// const box = document.createElement("div");
// 
// document.body.appendChild(box);
// console.log("nigees")