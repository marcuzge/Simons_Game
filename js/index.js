var clickable = false;
var gameOn = false;
var strict = false;
var turns = 1;
var count = 0;
var countUp = 0;
var simonArr = [];
var userArr = [];
var display = document.getElementById('cnt');
// --- AUDIO --- //
var audG = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
var audR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
var audY = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
var audB = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
var audErr = new Audio('https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/buzz-error_G1eQPd4_.mp3');
  // --- GAMEPLAY --- //
function begin() {
  simonArr = [];
  userArr = [];
  count = 0;
  countUp = 0;
  turns = 1;
  simonAdd();
  setTimeout(simonSays, 700);
}

function simonAdd() {
  simonArr.push(Math.floor(Math.random() * 4) + 1);
  count++;
}
function simonSays() {
  display.innerHTML = count;
  output(simonArr[countUp]);
  countUp++;
  if (countUp < simonArr.length && gameOn){
    setTimeout(simonSays, 700);
  }
  userStart();
}
function userStart() {
  userArr = [];
  clickable = true;
}

function userInput() {
  console.log("User: " + userArr + " | Simon: " + simonArr);
  if (userArr[userArr.length - 1] === simonArr[userArr.length - 1]) {
    if (userArr.length == simonArr.length) {
      clickable = false;
      if (simonArr.length <= 20) {
        countUp = 0;
        simonAdd();
        setTimeout(simonSays, 1000);
      } else {
        gameWin();
      }
    }
  } else if (strict) {
    audErr.play();
    clickable = false;
    turns--;
    console.log("turns: " + turns);
    if (turns <= 0) {
      gameOver();
    } else {
      countUp = 0;
      setTimeout(simonSays, 1000);
    }
  } else {
    audErr.play();
    countUp = 0;
    setTimeout(simonSays, 1000);
  }
}

function gameOver() {
  display.innerHTML = "LOSE";
  clickable = false;
  //document.getElementById("checkbox").checked = false;
}

function gameWin() {
  display.innerHTML = "WIN";
  clickable = false;
  //document.getElementById("checkbox").checked = false;
}
// --- MECHANICS --- //
function output(num) {
  switch (num) {
    case 1:
      audG.play();
      $("#g").toggleClass('fullGreen');
      setTimeout(pauseG, 500);
      break;
    case 2:
      $("#r").toggleClass('fullRed');
      audR.play();
      setTimeout(pauseR, 500);
      break;
    case 3:
      $("#y").toggleClass('fullYellow');
      audY.play();
      setTimeout(pauseY, 500);
      break;
    case 4:
      $("#b").toggleClass('fullBlue');
      audB.play();
      setTimeout(pauseB, 500);
      break;
  }
}

function pauseG() {
  $("#g").toggleClass('fullGreen');
}

function pauseR() {
  $("#r").toggleClass('fullRed');
}

function pauseY() {
  $("#y").toggleClass('fullYellow');
}

function pauseB() {
  $("#b").toggleClass('fullBlue');
}

function pause() {}
// --- STATE CHANGES --- //
onoff.onclick = function() {
  gameOn = !gameOn;
  console.log("Status[gameOn]: " + gameOn);
  if (!gameOn) {
    var html = document.getElementById('startDisp');
    html.innerHTML = '&#10686;';
    display.innerHTML = "--";
  }
}
strt.onclick = function() {
  var html = document.getElementById('startDisp');
  if (gameOn) {
    begin();
    html.innerHTML = '&#10687;';
  } else {
    html.innerHTML = '&#10686;';
  }
}
strct.onclick = function() {
  var html = document.getElementById('strictDisp');
  if (!strict) {
    html.innerHTML = '&#10687;'
  } else {
    html.innerHTML = '&#10686;';
  }
  strict = !strict;
}
$("#g").on("mousedown", function() {
  if (clickable && gameOn) {
    $("#g").toggleClass('fullGreen');
    audG.play();
    userArr.push(1);
    userInput();
  }
}).on("mouseup", function() {
  if (gameOn) {
    $("#g").toggleClass('fullGreen');
  }
});
$("#r").on("mousedown", function() {
  if (clickable && gameOn) {
    $("#r").toggleClass('fullRed');
    audR.play();
    userArr.push(2);
    userInput();
  }
}).on("mouseup", function() {
  if (gameOn) {
    $("#r").toggleClass('fullRed');
  }
});
$("#y").on("mousedown", function() {
  if (clickable && gameOn) {
    $("#y").toggleClass('fullYellow');
    audY.play();
    userArr.push(3);
    userInput();
  }
}).on("mouseup", function() {
  if (gameOn) {
    $("#y").toggleClass('fullYellow');
  }
});
$("#b").on("mousedown", function() {
  if (clickable && gameOn) {
    $("#b").toggleClass('fullBlue');
    audB.play();
    userArr.push(4);
    userInput();
  }
}).on("mouseup", function() {
  if (gameOn) {
    $("#b").toggleClass('fullBlue');
  }
});