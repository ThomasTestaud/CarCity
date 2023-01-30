import Car from './Car.js'
import PandaCar from './PandaCar.js'
import RC from './RC.js'
import Human from './Human.js'

let pandaCar = new PandaCar(200, 200, "panda");
let rc = new RC();
let human = new Human();
let puntoCar = new PandaCar(100, 300, "punto");

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


/***********règles du jeu************/

function closeEnough(vehicule) {
    if (human.positionX < (vehicule.positionX + 50) && human.positionX > (vehicule.positionX - 50) && human.positionY < (vehicule.positionY + 50) && human.positionY > (vehicule.positionY - 50)) {
        console.log('Close enough');
        return true;
    }
    else {
        return false;
    }
}

let swapBtn = document.querySelector('#rc-swap');





function addEventfor(vehicule) {
    swapBtn.addEventListener('click', function() {
        human.getInto(vehicule);
    });
}

function removeEventfor(vehicule) {
    swapBtn.removeEventListener('click', function() {
        vehicule.use();
    });
}




function refreshHuman(car) {
    human.positionX = car.positionX;
    human.positionY = car.positionY;
}


window.addEventListener('click', () => {
    if (closeEnough(pandaCar)) {
        swapBtn.classList.remove('none');
        addEventfor(pandaCar);
    }
    // else if (closeEnough(puntoCar)) {
    //     swapBtn.classList.remove('none');
    //     addEventfor(puntoCar);
    // }
    else {
        // removeEventfor(puntoCar);
        swapBtn.classList.add('none');
    }
});
