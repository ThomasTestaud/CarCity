const app = Vue.createApp({
    data() {
        return {

            started: false,
            positionX: 400,
            positionY: 100,
            direction: 180,
            maxSpeed: 3,
            speed: 0,
            size: 1,
            acceleration: 0.05,
            breakForce: 0.10,
            content: "",


            model: "panda",
            Xcoef: 0,
            Ycoef: -1,
            intervalId: '',
        }
    },

    methods: {

        reset() {
            this.positionX = 400;
            this.positionY = 100;
            this.direction = 180;
            this.maxSpeed = 3;
            this.size = 1;
            this.Xcoef = 0;
            this.Ycoef = -1;
        },

        steering() {
            this.Ycoef = Math.cos(this.direction * Math.PI / 180);
            this.Xcoef = Math.sin(this.direction * Math.PI / 180);
        },

        turnLeft() {
            let that = this;
            let i = 0;
            let turn = setInterval(function() {
                i++;
                that.direction -= 1;
                that.steering();
                if (i >= 30) {
                    clearInterval(turn);
                }
            }, 10)
        },

        turnRight() {
            let that = this;
            let i = 0;
            let turn = setInterval(function() {
                i++;
                that.direction += 1;
                that.steering();
                if (i >= 30) {
                    clearInterval(turn);
                }
            }, 10)

        },

        startStop() {
            if (this.started == false) {
                this.started = true;
            }
            else if (this.started == true) {
                this.started = false;
                clearInterval(run);
            }
            let that = this;
            const run = setInterval(function() {
                if (that.started) {
                    console.log('car started');
                    if (that.speed < that.maxSpeed) {
                        that.positionX += (that.speed * that.Xcoef);
                        that.positionY -= (that.speed * that.Ycoef);
                        that.speed += that.acceleration;
                        console.log(that.speed + 'speed < maxspeed');
                    }
                    else {
                        that.positionX += (that.maxSpeed * that.Xcoef);
                        that.positionY -= (that.maxSpeed * that.Ycoef);
                        console.log(that.speed + 'speed = maxspeed');
                    }
                }
                else if (!that.started) {
                    console.log('car off');
                    if (that.speed > 0) {
                        that.positionX += (that.speed * that.Xcoef);
                        that.positionY -= (that.speed * that.Ycoef);
                        that.speed -= that.breakForce;
                        console.log(that.speed + 'speed > 0');
                    }
                    else {
                        clearInterval(run);
                        console.log('speed = 0');
                    }
                }
                console.log('interval running');
            }, 30);
            return run;
        },


        faster() {
            if (this.maxSpeed >= 1) {
                this.maxSpeed += 1;
            }
            else if (this.maxSpeed < 1) {
                this.maxSpeed += 0.5;
            }
        },

        slower() {
            if (this.maxSpeed > 1) {
                this.maxSpeed -= 1;
            }
            else if (this.maxSpeed <= 1) {
                this.maxSpeed -= 0.5;
            }
        },

        bigger() {
            if (this.size >= 1) {
                this.size += 0.25;
            }
            else if (this.size < 1) {
                this.size *= 1.25;
            }
        },

        smaller() {
            if (this.size >= 1) {
                this.size -= 0.25;
            }
            else if (this.size < 1) {
                this.size /= 1.25;
            }
        },

        change() {
            if (this.model === "panda") {
                this.model = "punto";
            }
            else if (this.model === "punto") {
                this.model = "panda";
            }
        },

        next() {

        }
    },


})

app.mount('#app')
