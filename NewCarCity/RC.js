class RC {

    mapAccelerate(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function() {
            x.accelerate();
        })
    }

    mapDecelerate(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function() {
            x.decelerate();
        })
    }

    mapTurnLeft(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function() {
            x.turnLeft();
        })
    }

    mapTurnRight(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function() {
            x.turnRight();
        })
    }


}

export default RC
