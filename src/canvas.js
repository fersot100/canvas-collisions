import Time from './time';
import Vector2 from './vectors';
import {collide} from './collider';

// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Mouse {
  constructor(){
    this.pos = new Vector2(canvas.width / 2, canvas.height / 2);
    this.animationPos = new Vector2(canvas.width / 2, canvas.height / 2);
    this.grabbing = false;
  }
  update(){
    this.vel = this.pos.subtract(this.animationPos).multiply(time.frameRate / 3);
    this.animationPos.x = this.pos.x;
    this.animationPos.y = this.pos.y;
  }
}

const mouse = new Mouse();

let time, mouseDown = false;

const colors = [
    '#bac3e0',
    '#d1e1ff',
    '#98d4ff',
    '#27a8f7'
];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.pos.x = event.clientX;
    mouse.pos.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    start()
});
canvas.addEventListener('mousedown', (e) => {
  if(e.button === 0){
    mouseDown = true;
  }
});
canvas.addEventListener('mouseup', e => {
  if(e.button === 0){
    mouseDown = false;
    mouse.grabbing = undefined;
  }
})


// Utility 
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(v1, v2) {
    const xDist = v2.x - v1.x;
    const yDist = v2.y - v1.y;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Basic Physics Object
class Rigidbody2D{
    constructor(x = canvas.width / 2, y = canvas.height / 2,
    radius = 30, color = randomColor(colors)) {


        this.pos = new Vector2(x,y);
        this.initialSpeed = 2;
        this.vel = new Vector2(
            randomIntFromRange(-this.initialSpeed, this.initialSpeed),
            randomIntFromRange(-this.initialSpeed, this.initialSpeed));

        this.mass = 1;
        this.radius = radius;
        this.initialRadius = radius;
        this.maxRadius = 60;
        this.growSpeed = 20;
        this.grabbed = false;
        this.grabbedOffset = new Vector2(0,0);
        this.color = color;
    }
    handleScreenCollision(){
        if(this.pos.x <= this.radius || this.pos.x >= innerWidth - this.radius){
            this.vel.x = -this.vel.x;
        }
        if(this.pos.y <= this.radius || this.pos.y >= innerHeight - this.radius){
            this.vel.y = -this.vel.y;
        }
    }
    checkMouse() {
        this.filled = distance(this.pos, mouse.pos) <= 200;
    }
    connect(rb){
        c.beginPath();
        c.moveTo(this.pos.x, this.pos.y);
        c.lineTo(rb.pos.x, rb.pos.y);
        c.strokeStyle = this.color;
        c.stroke()
        c.closePath();
    }
    updateCollision(rbs){
        this.checkMouse();
        this.handleScreenCollision();
        //Handle RB collisions
        for(let i = 0; i < rbs.length; i++) {
            if(this === rbs[i]) continue;
            if(distance(this.pos, rbs[i].pos) <= this.radius + rbs[i].radius){
                collide(this, rbs[i]);
            }
            if(distance(this.pos, rbs[i].pos) <= this.radius * 4){
                this.connect(rbs[i]);
            }
        }
    }
    updateDraw(rbs) {
        //Update position
        this.pos = this.pos.add(this.vel);
        this.draw();
    }
    draw (){
        c.beginPath()
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
        c.lineWidth = 5;
        c.strokeStyle = this.color;
        c.stroke()
        // if(this.filled){
        c.fillStyle = this.color;
        c.fill();
        c.closePath()
    }
}

// Implementation
let balls
function start() {
    balls = []
    for (let i = 0; i < 50; i++) {
        const rb = new Rigidbody2D();
        const x = randomIntFromRange(rb.radius, canvas.width - rb.radius);
        const y = randomIntFromRange(rb.radius, canvas.height - rb.radius);
        rb.pos = new Vector2(x,y);

        if(i != 0) {
            for(let j = 0; j < balls.length; j++){
                if(distance(rb.pos, balls[j].pos) < rb.radius + balls[j].radius) {
                    rb.pos.x = randomIntFromRange(rb.radius, canvas.width - rb.radius);
                    rb.pos.y = randomIntFromRange(rb.radius, canvas.height - rb.radius);
                    
                    j = -1;
                }
            }
        }
        balls.push(rb);
    }
}

// Animation Loop
function update(currentTime) {
    //Initialize time and mouse object and update with current timestamp
    if(!time) time = new Time(currentTime);
    time.update(currentTime);
    mouse.update();
    requestAnimationFrame(update);

    //Clear and draw
    c.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
     ball.updateCollision(balls);
    });
    balls.forEach(ball => {
        ball.updateDraw(balls);
       });
}

start();
update(0);