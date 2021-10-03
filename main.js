const canvas = document.querySelector('canvas')

canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x : "undefined",
    y : "undefined"
}

var colorArray = [

    "#FFA07A",
    "#FF1493",
    "#FF4500",
    "#FF6347",
    "#FFD700",
    "#BDB76B",
    "#6A5ACD",
    "#32CD32",
    "#20B2AA",
    "#00CED1"
]

var maxRadius = 40;


window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y  = event.y;
   
})

window.addEventListener("resize",function(){

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

class Circle {
    constructor(x, y, dx, dy, radius) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;

        this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        };

        this.update = function () {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

            if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50) {

                if(this.radius < maxRadius){

                    this.radius += 1;
                }

            } else if(this.radius > this.minRadius){
                this.radius -= 1;
            }
            this.draw();
        };

    }
}

var circleArray =[];

for (let i = 0; i < 1000; i++) {
    radius = Math.random()*3 + 1;
    var x = Math.random()*(innerWidth-radius*2) +  radius;
    var y = Math.random()*(innerHeight- radius*2) + radius;
    var dx = (Math.random() - 0.5)*2;
    var dy =  (Math.random() - 0.5)*2;
    circleArray[i] = new Circle(x,y,dx,dy,radius);
}


function init() {
    circleArray =[];
    for (let i = 0; i < 500; i++) {
        radius = Math.random()*3 + 1;
        var x = Math.random()*(innerWidth-radius*2) +  radius;
        var y = Math.random()*(innerHeight- radius*2) + radius;
        var dx = (Math.random() - 0.5)*2;
        var dy =  (Math.random() - 0.5)*2;
        circleArray[i] = new Circle(x,y,dx,dy,radius);
    }
    
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
   
    for(var i = 0 ; i < circleArray.length ;i++){
        circleArray[i].update();
    }
}

animate();

// a=1;

// function check() {
// 	requestAnimationFrame(check);
// 	for (let i = 0; i < 10; i++) {
//         console.log(i);    
//     }
// }

// check();

