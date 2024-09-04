var mainCanv;
var canvContxt;
var movCtr = 0;

var right = 0;
var up = 90;
var left = 180;
var down = 270;

var requestID;

var keyPressDirection = 'Stop';

var xplodsnd = new Audio("Sounds/Explosion.mp3");

var outputPayload = false;

var opldpos = 0;

var tankA = {
  tXc:6
  ,tYc:3
  ,tSPXc:6
  ,tSPYc:3
  ,tSPXMAXc:280
  ,tSPYMAXc:130
  ,tSPXMINc:6
  ,tSPYMINc:3
  ,trackColor:'lightgreen'
  ,turretColor:'#343434'
  ,outlineColor:'black'
  ,payloadColor:'cornsilk'
  ,trackWidth:5
  ,trackLength:15
  ,outlineWidth:1
  ,turretBaseRadius:4
  ,turretShaftWidth:2
  ,turretShaftLength:13
  ,facingDirectionDegrees:270   /*this is in a counter-clockwise direction*/
  ,get cntrX() {return this.tXc + 6;}
  ,get cntrY() {return this.tYc + 9;}
  ,get payloadTStartY() {return this.tYc + 20;}
}

window.onload = init;

function init() {
  mainCanv = document.getElementById("MainCanvas");
  canvContxt = mainCanv.getContext("2d");

  window.addEventListener("keydown", evalKeyDown, false);
  window.addEventListener("keyup", evalKeyUp, false);

  document.getElementById("UP").addEventListener("click", function() {keyPressDirection = 'Up';}, false);
  document.getElementById("LF").addEventListener("click", function() {keyPressDirection = 'Left';}, false);
  document.getElementById("RT").addEventListener("click", function() {keyPressDirection = 'Right';}, false);
  document.getElementById("DN").addEventListener("click", function() {keyPressDirection = 'Down';}, false);

  document.getElementById("ST").addEventListener("click", function() {keyPressDirection = 'Stop';}, false);
  document.getElementById("FR").addEventListener("click", 
    function() {
      keyPressDirection = 'Shoot';
      outputPayload = true;
      xplodsnd.play();
      xplodsnd.currentTime = 0;}, false);

  canvDim = document.getElementById("CanvasDimensions");
  canvDim.innerHTML = "Canvas Width = " + mainCanv.width.toString() + ", Canvas Height = " + mainCanv.height.toString();

  animateTank();
}

var drawTank = function() {
  //tracks
  canvContxt.fillStyle = tankA.trackColor;
  canvContxt.fillRect(tankA.tXc, tankA.tYc, tankA.trackWidth, tankA.trackLength);
  canvContxt.fillRect((tankA.tXc + 7), tankA.tYc, tankA.trackWidth, tankA.trackLength);

  canvContxt.lineWidth = tankA.outlineWidth;
  canvContxt.strokeStyle = tankA.outlineColor;
  canvContxt.strokeRect(tankA.tXc, tankA.tYc, tankA.trackWidth, tankA.trackLength);
  canvContxt.strokeRect((tankA.tXc + 7), tankA.tYc, tankA.trackWidth, tankA.trackLength);

  //turret base
  canvContxt.fillStyle = tankA.turretColor;
  canvContxt.beginPath();
  canvContxt.arc((tankA.tXc + 6), (tankA.tYc + 6), tankA.turretBaseRadius, 0, 2 * Math.PI);
  canvContxt.closePath();
  canvContxt.fill();

  //turret shaft
  canvContxt.fillRect((tankA.tXc + 5), (tankA.tYc + 6), tankA.turretShaftWidth, tankA.turretShaftLength);

  if (outputPayload) {

    drawPayload(opldpos);

    if (opldpos >= 280) {
      opldpos = 0;
      outputPayload = false;
      keyPressDirection = 'Stop';
    }
  }
}

function evalKeyDown(event) {
  switch(event.keyCode) {
    case 13:  /*enter key*/
      keyPressDirection = 'Shoot';
      outputPayload = true;
      xplodsnd.play();
      xplodsnd.currentTime = 0;
      break;

    case 32:  /*spacebar*/
      keyPressDirection = 'Stop';
      break;

    case 37:  /*left arrow key*/
      keyPressDirection = 'Left';
      break;

    case 38:  /*up arrow key*/
      keyPressDirection = 'Up';
      break;

    case 39:  /*right arrow key*/
      keyPressDirection = 'Right';
      break;
  
    case 40:  /*down arrow key*/
      keyPressDirection = 'Down';
      break;
  }
}

function evalKeyUp(event) {

}

function animateTank() {
  switch(keyPressDirection) {
    case 'Left':
      moveLeft();
      break;

    case 'Up':
      moveUp();
      break;

    case 'Right':
      moveRight();
      break;
  
    case 'Down':
      moveDown();
      break;

    case 'Stop':
      stopTank();
      break;

    case 'Shoot':
      movePayload();
      break;
  }

  requestID = requestAnimationFrame(animateTank);
}

function resetCanvas() {
  canvContxt.save();
  canvContxt.setTransform(1, 0, 0, 1, 0, 0);

  //canvContxt.clearRect(0, 0, mainCanv.width, mainCanv.height);

  canvContxt.fillStyle = "rgba(255, 165, 0, 0.1)";
  canvContxt.fillRect (0, 0, mainCanv.width, mainCanv.height);

  canvContxt.restore();
}

function moveTank() {
  canvContxt.translate(0, 1);
  resetCanvas();
  drawTank();
}

function rotateTank(direction) {
  canvContxt.translate(tankA.cntrX, tankA.cntrY);
  canvContxt.rotate((direction * Math.PI) / 180);
  canvContxt.translate((tankA.cntrX * -1), (tankA.cntrY * -1));
}

function moveLeft() {
  if (tankA.facingDirectionDegrees !== left) {
    rotateTank(tankA.facingDirectionDegrees - left);
    tankA.facingDirectionDegrees = left;
    resetCanvas();
    moveTank();
  }
  else if (tankA.tSPXc > tankA.tXc) {
    tankA.tSPXc--;
    resetCanvas();
    moveTank();
  }
}

function moveRight() {
  if (tankA.facingDirectionDegrees !== right) {
    rotateTank(tankA.facingDirectionDegrees - right);
    tankA.facingDirectionDegrees = right;
    resetCanvas();
    moveTank();
  }
  else if (tankA.tSPXc < tankA.tSPXMAXc) {
    tankA.tSPXc++;
    resetCanvas();
    moveTank();
  }
}

function moveUp() {
  if (tankA.facingDirectionDegrees !== up) {
    rotateTank(tankA.facingDirectionDegrees - up);
    tankA.facingDirectionDegrees = up;
    resetCanvas();
    moveTank();
  }
  else if (tankA.tSPYc > tankA.tYc) {
    tankA.tSPYc--;
    resetCanvas();
    moveTank();
  }
}

function moveDown() {
  if (tankA.facingDirectionDegrees !== down) {
    rotateTank(tankA.facingDirectionDegrees - down);
    tankA.facingDirectionDegrees = down;
    resetCanvas();
    moveTank();
  }
  else if (tankA.tSPYc < tankA.tSPYMAXc) {
    tankA.tSPYc++;
    resetCanvas();
    moveTank();
  }
}

function stopTank() {
  canvContxt.translate(0, 0);
  resetCanvas();
  drawTank();
}

function drawPayload(pos) {
  canvContxt.fillStyle = tankA.payloadColor;
  canvContxt.beginPath();
  canvContxt.arc((tankA.tXc + 6), (tankA.payloadTStartY + pos), tankA.turretShaftWidth - 1, 0, 2 * Math.PI);
  //canvContxt.closePath();
  canvContxt.fill();
}

function movePayload() {
  opldpos += 15;
  canvContxt.translate(0, 0);
  resetCanvas();
  drawTank();
}

function logMove(move) {
  movCtr++;
  vidCap = document.getElementById("vidcap");
  vidCap.innerHTML += movCtr.toString() + ".) " + move + " (X = " + tankA.tSPXc.toString() + ", Y = " + tankA.tSPYc.toString() + "), Facing = " + tankA.facingDirectionDegrees.toString() + "<br>";
  vidCap.scrollTop = vidCap.scrollHeight;
}