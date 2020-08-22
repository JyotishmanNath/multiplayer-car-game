var ball;
var position, database;


function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var nodeLoc = database.ref('ball/position');
    nodeLoc.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(+3,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+3);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y 
    }) 
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("error in reading value");
}
