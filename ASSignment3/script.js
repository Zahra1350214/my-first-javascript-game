var canvas;
var ctx;

var cw = 1000;
var ch = 700;

var sway = 0;
var wind = 0.25;

// sun
var sunPulse = 0;

// clouds
var c1 = {x: -150, y: 120};
var c2 = {x: 250, y: 90};
var c3 = {x: 650, y: 130};
var c4 = {x: -500, y: 80};

var clouds = [c1, c2, c3, c4];

// trees
var tree1 = {x: 120, y: 220};
var tree2 = {x: 795, y: 280};

// flowers
var f1 = {x: 280, y: 510, c: 200, a: 0.8};
var f2 = {x: 50, y: 490, c: 210, a: 0.8};
var f3 = {x: 395.7, y: 500, c: 53.9, a: 0.8};
var f4 = {x: 880, y: 540, c: 200, a: 0.8};
var f5 = {x: 560, y: 570, c: 190, a: 0.8};
var f6 = {x: 750, y: 540, c: 210, a: 0.8};

var d1 = {x: 620, y: 490, c: 60, a: 0.8};
var d2 = {x: 140, y: 580, c: 40, a: 0.8};
var d3 = {x: 405, y: 620, c: 60, a: 0.8};
var d4 = {x: 230, y: 520, c: 210, a: 0.8};

var t1 = {x: 680, y: 640, c: 330, a: 0.8};
var t2 = {x: 465, y: 510, c: 300, a: 0.8};
var t3 = {x: 940, y: 550.7, c: 165.5, a: 0.8};
var t4 = {x: 210, y: 600, c: 320, a: 0.8};

// arrays
var blueFlowers = [f1, f2, f3, f4, f5, f6];
var dandelions = [d1, d2, d3, d4];
var tulips = [t1, t2, t3, t4];

// butterflies
var b1 = {
    x: 100,
    y: 200,
    c: 300,
    a: 0.8
};

var butterflies = [b1];

//fall apple

var apple = {
    x: 190,
    y: 230,
    r: 8,

    change:{
        x:0,
        y:3
    }
};
var appleTimer =0;

// grasses
var grasses = [];

for(var i = 0; i < 60; i++){

    var g = {
        x: 20 + Math.random() * (cw - 40),
        y: 610 + Math.random() * 90,
        h: 4 + Math.random() * 3
    };

    grasses.push(g);
}

// mouse butterfly
var mouse = {
    x: 500,
    y: 300
};

// dandelion seeds
var seeds = [];
var seedTimer = 0;

var win = {

    x: 500,
    y: 250,

    w: 300,
    h: 160,

    title: "Congratulations!",
    text: "You are the Winner!",

    button: "Play Again"
};

setUpCanvas();
animationLoop();


// function section

function animationLoop(){

    ctx.clearRect(0, 0, cw, ch);

    garden();

    sunPulse += 0.03;
    sun();

    // clouds
    for(var i = 0; i < clouds.length; i++){

        cloud(clouds[i]);

        clouds[i].x += wind;

        if(clouds[i].x > cw + 150){
            clouds[i].x = -150;
        }
    }

    // trees
    treeShape(tree1);
    treeShape(tree2);


// apple
appleShape(apple);
appleTimer++;

// apple
appleShape(apple);
appleTimer++;

if(appleTimer > 300){

    apple.change.y += 0.15;
    apple.y += apple.change.y;

    // hit ground
    if(apple.y + apple.r >= 500){

        apple.y = 500 - apple.r;
        apple.change.y *= -0.4;

        if(Math.abs(apple.change.y) < 0.8){
            apple.change.y = 0;
        }
    }


    // stop apple
    if(Math.abs(apple.change.y) < 0.5 && apple.y + apple.r >= 500){

        apple.change.y = 0;
        apple.y = 500 - apple.r;

    }
}
    // grasses
    for(var i = 0; i < grasses.length; i++){
        grass(grasses[i]);
    }

    sway += wind;

    // tulips
    for(var i = 0; i < tulips.length; i++){
        tulip(tulips[i]);
    }

    // blue flowers
    for(var i = 0; i < blueFlowers.length; i++){
        flowerShape(blueFlowers[i]);
    }

    // dandelions
    for(var i = 0; i < dandelions.length; i++){
        dandelion(dandelions[i]);
    }

// flying dandelion seeds
seedTimer++;

if(seedTimer > 500){

    for(var i = 0; i < dandelions.length; i++){

        var s = {

            x: dandelions[i].x,
            y: dandelions[i].y - 5 + Math.random() * 10,

            r: 2,

            dx: 0.25 + Math.random() * 0.15,
            dy: (Math.random() - 0.5) * 0.2,

            active: true
        };

        seeds.push(s);
    }

    seedTimer = 0;
}


for(var i = 0; i < seeds.length; i++){

    if(seeds[i].active == true){

        drawSeed(seeds[i]);

        seeds[i].x += seeds[i].dx;
        seeds[i].y += seeds[i].dy;

        if(seeds[i].x > cw + 50){
            seeds[i].active = false;
        }
    }
}

    // butterflies
    for(var i = 0; i < butterflies.length; i++){

        butterfly(butterflies[i]);

        butterflies[i].x += 1.5;
        butterflies[i].y += Math.sin(sway * 0.1 + i) * 0.8;

        if(butterflies[i].x > cw + 50){
            butterflies[i].x = -50;
        }
    }

    // mouse butterfly
    mouseButterfly(mouse);
    //congratulations screen
    winMessage();

    requestAnimationFrame(animationLoop);
}


// garden
function garden(){

    ctx.fillStyle = "hsla(200,80%,80%,1)";
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "hsla(90,45%,55%,1)";
    ctx.fillRect(0, 500, cw, 200);
}


// sun
function sun(){

    var r = 45 + Math.sin(sunPulse) * 5;

    ctx.beginPath();
    ctx.arc(850, 100, r + 15, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(50,100%,60%,0.2)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(850, 100, r, 0, 2 * Math.PI);
    ctx.fillStyle = "gold";
    ctx.fill();
}


// tree
function treeShape(o){

    // trunk
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(o.x, o.y, 40, 290);

    // leaves
    ctx.fillStyle = "green";

    ctx.beginPath();
    ctx.arc(o.x + 25, o.y - 40, 70, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(o.x - 20, o.y + 10, 55, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(o.x + 70, o.y + 10, 75, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(o.x + 25, o.y + 40, 70, 0, 2 * Math.PI);
    ctx.fill();

    // apples
    appleShape({
        x: o.x,
        y: o.y - 10,
        r: 8
    });

    appleShape({
        x: o.x + 45,
        y: o.y - 40,
        r: 8
    });


    appleShape({
        x: o.x - 15,
        y: o.y + 30,
        r: 8
    });

 appleShape({
    x: o.x + 25,
    y: o.y + 50,
    r: 8
});

if(o != tree1){

    appleShape({
        x: o.x + 70,
        y: o.y + 10,
        r: 8
    });

}

}


// clouds
function cloud(o){

    ctx.fillStyle = "hsla(0,0%,100%,0.7)";

    ctx.beginPath();
    ctx.arc(o.x, o.y, 25, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(o.x + 25, o.y - 10, 35, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(o.x + 60, o.y, 25, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(o.x + 30, o.y + 10, 35, 0, 2 * Math.PI);
    ctx.fill();
}


// grass
function grass(o){

    var sw = Math.sin(sway * 0.05) * 1;

    ctx.beginPath();

    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x - 3 + sw, o.y - o.h);

    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x - 1 + sw, o.y - o.h - 1);

    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x + sw, o.y - o.h - 2);

    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x + 3 + sw, o.y - o.h - 1);

    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x + 5 + sw, o.y - o.h);

    ctx.strokeStyle = "darkgreen";
    ctx.lineWidth = 1.5;
    ctx.stroke();
}


// blue flower
function flowerShape(o){

    var sw = Math.sin(sway * 0.05) * 3;

    ctx.beginPath();
    ctx.moveTo(o.x, o.y+12);
    ctx.lineTo(o.x, o.y + 45);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(o.x - 5, o.y + 38, 4, 10, -0.8, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(o.x + 5 , o.y + 42, 4, 10, 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();

    for(var i = 0; i < 8; i++){

        var angle = i * (360 / 8);
        var oneDegree = 2 * Math.PI / 360;

        var petal = {
            x: o.x + sw + 12 * Math.cos(angle * oneDegree),
            y: o.y + 12 * Math.sin(angle * oneDegree),
            r: 8,
            c: o.c,
            a: o.a
        };

        circle(petal);
    }

    var center = {
        x: o.x + sw,
        y: o.y,
        r: 6,
        c: 50,
        a: 1
    };

    circle(center);
}


// dandelion
function dandelion(o){

    var sw = Math.sin(sway * 0.05) * 4;

    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x, o.y + 45);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();

    var oneDegree = 2 * Math.PI / 360;
    var numberOfLines = 60;

    for(var i = 0; i < numberOfLines; i++){

        var angle = i * (360 / numberOfLines);

        var x1 = o.x + sw;
        var y1 = o.y;

        var x2 = o.x + sw + 14 * Math.cos(angle * oneDegree);
        var y2 = o.y + 14 * Math.sin(angle * oneDegree);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        var seed = {
            x: x2,
            y: y2,
            r: 1,
            c: "white",
            a: 0.9
        };

        circle(seed);
    }

    var center = {
        x: o.x + sw,
        y: o.y,
        r: 1,
        c: "white",
        a: 1
    };

    circle(center);
}


// tulip
function tulip(o){

    var sw = Math.sin(sway * 0.05) * 4;

    ctx.beginPath();
    ctx.moveTo(o.x, o.y + 20);
    ctx.lineTo(o.x, o.y + 45);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(o.x - 8, o.y + 45, 8, 16, -0.8, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(120,100%,25%,0.8)";
    ctx.
    fill();

    ctx.beginPath();
    ctx.ellipse(o.x + 8, o.y + 55, 8, 16, 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(120,100%,30%,0.8)";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(o.x + sw, o.y, 10, 22, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(" + o.c + ",100%,55%," + o.a + ")";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(o.x - 8 + sw, o.y + 4, 8, 18, -0.5, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(" + (o.c + 20) + ",100%,50%," + o.a + ")";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(o.x + 8 + sw, o.y + 4, 8, 18, 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = "hsla(" + (o.c - 20) + ",100%,60%," + o.a + ")";
    ctx.fill();
}


// click = create butterfly
//function click(event){

   // var b = {
       // x: event.offsetX,
       // y: event.offsetY,
       // c: Math.random() * 360,
       // a: 0.8
   // };

  //  butterflies.push(b);
//}
// click = create butterfly
function click(event){

    var mx = event.offsetX;
    var my = event.offsetY;

    // Play Again Button
    if(mx > 400 && mx < 600 &&
       my > 350 && my < 410){

        window.location.href = "../Game T1/index.html";
    }

    else{

        var b = {

            x: mx,
            y: my,

            c: Math.random()*360,

            a: 0.8
        };

        butterflies.push(b);

    }
}

// move mouse
function move(event){

    mouse.x = event.offsetX;
    mouse.y = event.offsetY;

}

// regular butterfly
function butterfly(o){



    // body
    ctx.beginPath();
    ctx.ellipse(o.x, o.y, 1, 3.5, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    // left top wing
    ctx.beginPath();
    ctx.ellipse(o.x - 4, o.y - 3, 5, 8, -0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "purple";
    ctx.fill();

    // right top wing
    ctx.beginPath();
    ctx.ellipse(o.x + 4, o.y - 3, 5, 8, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();

    // left bottom wing
    ctx.beginPath();
    ctx.ellipse(o.x - 3, o.y + 3, 4, 5, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "purple";
    ctx.fill();

    // right bottom wing
    ctx.beginPath();
    ctx.ellipse(o.x + 3, o.y + 3, 4, 5, -0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();

    // antennas
    ctx.beginPath();
    ctx.moveTo(o.x, o.y - 4);
    ctx.lineTo(o.x - 3, o.y - 7);
    ctx.moveTo(o.x, o.y - 4);
    ctx.lineTo(o.x + 3, o.y - 7);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // antenna dots
    ctx.beginPath();
    ctx.arc(o.x - 3, o.y - 7, 0.7, 0, 2 * Math.PI);
    ctx.arc(o.x + 3, o.y - 7, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}


// mouse butterfly
function mouseButterfly(o){

    // body
    ctx.beginPath();
    ctx.ellipse(o.x, o.y, 1.5, 5, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    // left top wing
    ctx.beginPath();
    ctx.ellipse(o.x - 4, o.y - 3, 5, 9, -0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "dodgerblue";
    ctx.fill();

    // right top wing
    ctx.beginPath();
    ctx.ellipse(o.x + 4, o.y - 3, 5, 9, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "cyan";
    ctx.fill();

    // left bottom wing
    ctx.beginPath();
    ctx.ellipse(o.x - 3, o.y + 3, 4, 5, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "dodgerblue";
    ctx.fill();

    // right bottom wing
    ctx.beginPath();
    ctx.ellipse(o.x + 3, o.y + 3, 4, 5, -0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "cyan";
    ctx.fill();

    // antennas
    ctx.beginPath();
    ctx.moveTo(o.x, o.y - 4);
    ctx.lineTo(o.x - 3, o.y - 7);
    ctx.moveTo(o.x, o.y - 4);
    ctx.lineTo(o.x + 3, o.y - 7);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // antenna dots
    ctx.beginPath();
    ctx.arc(o.x - 3, o.y - 7, 0.7, 0, 2 * Math.PI);
    ctx.arc(o.x + 3, o.y - 7, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}



function drawSeed(o){

    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x - o.dx * 4, o.y - o.dy * 4);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);

    ctx.fillStyle = "white";
    ctx.fill();
}



function appleShape(o){

    // stem
    ctx.beginPath();
    ctx.moveTo(o.x, o.y - o.r);
    ctx.lineTo(o.x, o.y - o.r - 5);

    ctx.strokeStyle = "#3E2723";
    ctx.lineWidth = 2;
    ctx.stroke();

    // leaf
    ctx.beginPath();

    ctx.ellipse(
        o.x + 5,
        o.y - o.r - 4,
        4,
        2,
        -0.5,
        0,
        2 * Math.PI
    );

    ctx.fillStyle = "darkgreen";
    ctx.fill();

    // apple
    ctx.beginPath();
    ctx.arc(
        o.x,
        o.y,
        o.r,
        0,
        2 * Math.PI
    );

    ctx.fillStyle = "red";
    ctx.fill();
}


// circle
function circle(o){

    ctx.beginPath();

    ctx.arc(
        o.x,
        o.y,
        o.r,
        0,
        2 * Math.PI
    );

    ctx.fillStyle = "hsla(" + o.c + ",100%,50%," + o.a + ")";
    ctx.fill();
}


// rectangle
function rect(o){

    ctx.beginPath();

    ctx.rect(
        o.x,
        o.y,
        o.w,
        o.h
    );

    ctx.fillStyle = "purple";
    ctx.globalAlpha = o.a;
    ctx.fill();

    ctx.globalAlpha = 1;
}
// winer message
function winMessage(){

    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;

    ctx.fillRect(350, 170, 300, 160);
    ctx.strokeRect(350, 170, 300, 160);

    ctx.fillStyle = "purple";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Congratulations!", 500, 220);

    ctx.fillStyle = "darkblue";
    ctx.font = "22px Arial";
    ctx.fillText("You are the Winner!", 500, 260);

    ctx.fillStyle = "green";
    ctx.font = "20px Arial";
    ctx.fillText("Great Job!", 500, 295);

    ctx.fillStyle = "green";
    ctx.fillRect(400, 350, 200, 60);

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.fillText("Play Again", 500, 390);

    ctx.textAlign = "start";
}


// setup
function setUpCanvas(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = cw;
    canvas.height = ch;

    canvas.style.border = "5px solid black";

    canvas.onclick = click;
    canvas.onmousemove = move;
}



console.log("script.js");
