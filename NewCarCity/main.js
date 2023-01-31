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

/***********règles du jeu************/

let swap = human;
let player = human;

let swapBtn = document.querySelector('#rc-swap');
swapBtn.addEventListener('click', function() {
    player = swap;
    human.getInto(swap);
});

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
        document.write('Vous vous êtes pris un mur...');
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
    }


    wallColision(player, wall1);
    wallColision(player, wall2);
    wallColision(player, wall3);
    wallColision(player, wall4);
    wallColision(player, wall5);
}, 100)
