var canvas;
var ctx;

var cw = 1000;
var ch = 700;

// Wall
var wallTop = 90;
var wallLeft = 15;
var wallRight = cw - 15;
var wallBottom = ch - 15;

// Game
var backColor = 200;

var score = 0;
var time = 30;
var lives = 3;

var level = 1;
var speed = 1;
var targetNumber = 20;

var targets = [];

var isGameOver = false;

// Start Game
setUpCanvas();

setInterval(countDown, 1000);
setInterval(changeBack, 3000);
setInterval(changeTargets, 4000);

function makeTargets(){

    for(var i=0; i<targetNumber; i++){

        var point = Math.floor(Math.random()*11)-5;

        if(point == 0){
            point = 1;
        }

        targets.push({

            x: Math.random()*(wallRight-wallLeft-100)+wallLeft+50,
            y: Math.random()*(wallBottom-wallTop-100)+wallTop+50,

            w: 38,
            h: 38,

            c: Math.random()*360,
            a: 1,

            visible: true,

            shape: Math.floor(Math.random()*4),

            change:{
                x: Math.random()*14-7,
                y: Math.random()*14-7
            },

            score: point

        });
    }
}

function animationLoop(){

    ctx.clearRect(0,0,cw,ch);

    background();

    if(time == 0){

        if(level == 1 && score > 10){
            level = 2;
            speed = 2;
            targetNumber = 30;
            time = 30;
            lives = 3;
            targets = [];
            makeTargets();
        }

        else if(level == 2 && score > 20){
            level = 3;
            speed = 3;
            targetNumber = 40;
            time = 30;
            lives = 3;
            targets = [];
            makeTargets();
        }

        else if(level == 3 && score > 30){

            window.location.href = "../ASSignment3/index.html";
            return;

        }

        else{

            isGameOver = true;
            gameOver();
            return;

        }
    }

    for(var i=0; i<targets.length; i++){
        change(targets[i]);
    }

    checkTargetCollision();

    for(var i=0; i<targets.length; i++){

        if(targets[i].visible){
            targetShape(targets[i]);
        }

    }

    drawScore();

    requestAnimationFrame(animationLoop);

}

function background(){

    ctx.fillStyle = "hsla("+backColor+",80%,80%,1)";
    ctx.fillRect(0,0,cw,ch);

    ctx.strokeStyle = "#4a4949";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        wallLeft,
        wallTop,
        wallRight-wallLeft,
        wallBottom-wallTop
    );
}

function change(o){

    if(o.visible == false){
        return;
    }

    o.x += o.change.x * speed;
    o.y += o.change.y * speed;

    if(o.x > wallRight-o.w/2){
        o.x = wallRight-o.w/2;
        o.change.x *= -1;
    }

    if(o.x < wallLeft+o.w/2){
        o.x = wallLeft+o.w/2;
        o.change.x *= -1;
    }

    if(o.y > wallBottom-o.h/2){
        o.y = wallBottom-o.h/2;
        o.change.y *= -1;
    }

    if(o.y < wallTop+o.h/2){
        o.y = wallTop+o.h/2;
        o.change.y *= -1;
    }
}

function targetShape(o){

    ctx.fillStyle = "hsla(" + o.c + ",80%,50%," + o.a + ")";

    if(o.shape == 0){
        circleTarget(o);
    }
    else if(o.shape == 1){
        squareTarget(o);
    }
    else if(o.shape == 2){
        triangleTarget(o);
    }
    else{
        star(o.x, o.y, "hsla(" + o.c + ",80%,50%," + o.a + ")");
    }

    ctx.fillStyle = "black";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if(o.shape == 2){
        ctx.fillText(o.score, o.x, o.y + o.h/8);
    }
    else{
        ctx.fillText(o.score, o.x, o.y);
    }

    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
}

function circleTarget(o){

    ctx.beginPath();
    ctx.arc(o.x, o.y, o.w/2, 0, 2*Math.PI);
    ctx.fill();
}

function squareTarget(o){

    ctx.fillRect(o.x-o.w/2, o.y-o.h/2, o.w, o.h);
}

function triangleTarget(o){

    ctx.beginPath();
    ctx.moveTo(o.x, o.y-o.h/2);
    ctx.lineTo(o.x+o.w/2, o.y+o.h/2);
    ctx.lineTo(o.x-o.w/2, o.y+o.h/2);
    ctx.closePath();
    ctx.fill();
}

function star(x, y, c){
    ctx.fillStyle = c;

    ctx.beginPath();

    ctx.moveTo(x, y-25);
    ctx.lineTo(x+8, y-8);
    ctx.lineTo(x+25, y-8);
    ctx.lineTo(x+12, y+5);
    ctx.lineTo(x+16, y+25);
    ctx.lineTo(x, y+13);
    ctx.lineTo(x-16, y+25);
    ctx.lineTo(x-12, y+5);
    ctx.lineTo(x-25, y-8);
    ctx.lineTo(x-8, y-8);

    ctx.closePath();
    ctx.fill();
}

function drawScore(){

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";

    ctx.fillText("Score: " + score, 30, 50);
    ctx.fillText("Level: " + level, 280, 50);
    ctx.fillText("Time: " + time, 800, 50);

    drawLives();
}

function drawLives(){

    for(var i=0; i<3; i++){

        if(i < lives){
            star(470+i*60, 40, "gold");
        }
        else{
            star(470+i*60, 40, "black");
        }
    }
}

function gameOver(){

    ctx.fillStyle = "black";

    ctx.font = "80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    ctx.fillText("GAME OVER", cw/2, 250);

    ctx.font = "40px Arial";
    ctx.fillText("Final Score: " + score, cw/2, 330);

    ctx.font = "28px Arial";
    ctx.fillText("Click to Play Again", cw/2, 410);

    ctx.textAlign = "start";
}

function countDown(){

    if(time > 0 && isGameOver == false){
        time--;
    }
}

function changeBack(){

    if(isGameOver == false){
        backColor = Math.random()*360;
    }
}

function changeTargets(){

    if(isGameOver == false){

        for(var i=0; i<targets.length; i++){

            targets[i].c = Math.random()*360;
            targets[i].shape = Math.floor(Math.random()*4);
        }
    }
}

function checkTargetCollision(){

    for(var i=0; i<targets.length; i++){

        for(var j=i+1; j<targets.length; j++){

            if(targets[i].visible && targets[j].visible){

                var dx = targets[i].x - targets[j].x;
                var dy = targets[i].y - targets[j].y;
                var d = Math.sqrt(dx*dx + dy*dy);

                if(d < targets[i].w/2 + targets[j].w/2){

                    targets[i].x = (targets[i].x + targets[j].x)/2;
                    targets[i].y = (targets[i].y + targets[j].y)/2;

                    targets[i].score += targets[j].score;

                    targets[i].w += 5;
                    targets[i].h += 5;

                    if(targets[i].w > 70){
                        targets[i].w = 70;
                        targets[i].h = 70;
                    }

                    targets[i].c = Math.random()*360;
                    targets[i].shape = Math.floor(Math.random()*4);

                    targets[i].change.x *= -1;
                    targets[i].change.y *= -1;

                    targets[j].x = Math.random()*(wallRight-wallLeft-100)+wallLeft+50;
                    targets[j].y = Math.random()*(wallBottom-wallTop-100)+wallTop+50;

                    targets[j].w = 38;
                    targets[j].h = 38;

                    targets[j].c = Math.random()*360;
                    targets[j].shape = Math.floor(Math.random()*4);

                    targets[j].score = Math.floor(Math.random()*11)-5;

                    if(targets[j].score == 0){
                        targets[j].score = 1;
                    }

                    targets[j].change.x = Math.random()*14-7;
                    targets[j].change.y = Math.random()*14-7;

                    targets[j].visible = true;
                }
            }
        }
    }
}

function checkClick(mx, my, o){

    if(o.visible == false){
        return;
    }

    var dx = mx - o.x;
    var dy = my - o.y;

    if(Math.abs(dx) < o.w && Math.abs(dy) < o.h){

        o.visible = false;
        score += o.score;

        if(o.score < 0){
            lives--;
        }

        if(lives == 0){
            time = 0;
        }
    }
}

function setUpCanvas(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = cw;
    canvas.height = ch;

    canvas.style.border = "5px solid black";

    makeTargets();

    canvas.onclick = function(event){

        if(isGameOver){

            score = 0;
            time = 30;
            lives = 3;

            level = 1;
            speed = 1;
            targetNumber = 20;

            targets = [];
            makeTargets();

            isGameOver = false;

            animationLoop();
            return;
        }

        var mx = event.offsetX;
        var my = event.offsetY;

        for(var i=0; i<targets.length; i++){
            checkClick(mx, my, targets[i]);
        }
    };

    animationLoop();
}

console.log("t1.js");
