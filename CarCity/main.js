import Car from './Car.js'
import RC from './RC.js'
import Human from './Human.js'
import Wall from './Wall.js'

let pandaCar = new Car(220, 150, 0, "panda");
let rc = new RC();
let human = new Human();
let puntoCar = new Car(100, 320, 270, "punto");

//Mapping de la télécommande à la voiture
function map(x) {
    rc.mapAccelerate(x, '#rc-up');
    rc.mapDecelerate(x, '#rc-down');
    rc.mapTurnLeft(x, '#rc-left');
    rc.mapTurnRight(x, '#rc-right');
}

map(pandaCar);
map(puntoCar);
map(human);



let wall1 = new Wall(50, 200, 100, 100);
let wall2 = new Wall(150, 300, 100, 100);
let wall3 = new Wall(250, 50, 250, 100);
let wall4 = new Wall(0, 500, 100, 400);
let wall5 = new Wall(500, 100, 400, 100);
let wall6 = new Wall(500, 800, 100, 100);
let wall7 = new Wall(850, 100, 100, 100);
let wall8 = new Wall(700, 350, 100, 100);
let wall9 = new Wall(1200, 0, 100, 100);
let wall10 = new Wall(1100, 400, 400, 100);

document.getElementById("reload-button").addEventListener("click", function() {
    location.reload();
  });


/***********règles du jeu************/

let swap = human;
let player = human;

let swapBtn = document.querySelector('#rc-swap');
swapBtn.addEventListener('click', function() {
    player = swap;
    if(swap !== human){
        human.getInto(swap);
    }
});
document.addEventListener("keydown", function(event) {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        player = swap;
        if(swap !== human){
            human.getInto(swap);
        }
    }
})

function closeEnough(vehicule) {
    if (human.positionX < (vehicule.positionX + 50) && human.positionX > (vehicule.positionX - 50) && human.positionY < (vehicule.positionY + 50) && human.positionY > (vehicule.positionY - 50)) {
        console.log('Close enough');
        return true;
    }
    else {
        return false;
    }
}

function wallColision(vehicule, wall) {
    if (vehicule.positionX >= wall.left && vehicule.positionX <= wall.right && vehicule.positionY >= wall.top && vehicule.positionY <= wall.bottom) {
        console.log('crash');
        document.querySelector('.end-game').classList.remove('none');
        return true;
    }
    else {
        return false;
    }
}



let physicEngine = setInterval(function() {

    if (closeEnough(pandaCar)) {
        swapBtn.classList.remove('none');
        swap = pandaCar;
    }
    else if (closeEnough(puntoCar)) {
        swapBtn.classList.remove('none');
        swap = puntoCar;
    }
    else {
        swapBtn.classList.add('none');
        swap = human;
    }

    //Human.position = Car.position si human est dans uen voiture
    if(player !== human){
        human.positionX = player.positionX;
        human.positionY = player.positionY
        human.refresh();
        if(player.used === false){
            player = human;
        }
    }

    

    wallColision(player, wall1);
    wallColision(player, wall2);
    wallColision(player, wall3);
    wallColision(player, wall4);
    wallColision(player, wall5);
    wallColision(player, wall6);
    wallColision(player, wall7);
    wallColision(player, wall8);
    wallColision(player, wall9);
    wallColision(player, wall10);
}, 100)
