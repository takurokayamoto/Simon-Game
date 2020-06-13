var randomColor = ["pink", "blue", "green", "yellow"];
var imgs = document.querySelectorAll("img");
var i;
var randomColorPattern = [];
var userClickPattern = [];
var level = 0;

function click(key) {
    switch (key) {
        case "blue":
            swichPlay(key);
            break;
        case "pink":
            swichPlay(key);
            break;
        case "green":
            swichPlay(key);
            break;
        case "yellow":
            swichPlay(key);
            break;

        default:
    }
}

function swichPlay(key) {
    document.getElementById(key).src = "img/" + key + "Highlight.svg";
    var color = new Audio("sounds/" + key + ".mp3");
    color.play();
}

function clickOut(key) {
    switch (key) {
        case "blue":
            document.getElementById("blue").src = "img/blueDark.svg";
            break;
        case "pink":
            document.getElementById("pink").src = "img/pinkDark.svg";
            break;
        case "green":
            document.getElementById("green").src = "img/greenDark.svg";
            break;
        case "yellow":
            document.getElementById("yellow").src = "img/yellowDark.svg";
            break;

        default:
    }
}

// ==============================================================================
// ==============================================================================

//Key Event (Game Start)
var started = false;

document.addEventListener("keydown", function (event) {
    if (!started) {
        gamePlayKey(event.key);
        started == true;
    }
});

function gamePlayKey(key) {
    switch (key) {
        case "a":
            document.querySelector("#level-title").innerHTML = "Level " + level;
            gamePlay();
            break;
        default:
    }
}

function gamePlay() {
    // Random button change
    var randomColor = colorPicker();

    setTimeout(function () {
        click(randomColor);
        setTimeout(function () {
            clickOut(randomColor);
        }, 100);
    }, 600);
}

// Random number
function colorPicker() {
    var randomNumber = Math.round(Math.random() * 3);
    var imgID = randomColor[randomNumber];
    randomColorPattern.push(imgID);
    console.log(randomColorPattern);
    return imgID;
}

// User click data

$(".btn").click(function (e) {

    setTimeout(() => {
        document.querySelector("#level-title").innerHTML = "Level " + level;
    }, 500);

    var targetId = e.currentTarget.id;

    click(targetId);
    setTimeout(function () {
        clickOut(targetId);
    }, 100);

    userClickPattern.push(targetId);
    console.log("user "+userClickPattern);
    checkAns(userClickPattern.length - 1);
});

//Check Answer
function checkAns(currentLevel) {
    if (randomColorPattern[currentLevel] === userClickPattern[currentLevel]) {

        if (userClickPattern.length === randomColorPattern.length) {
            userClickPattern = [];
            var randomColor = colorPicker();
            setTimeout(function () {
                click(randomColor);
                setTimeout(function () {
                    clickOut(randomColor);
                }, 100);
            }, 1500);
            level++;
        }
    } else {

        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();  
        
          $("body").addClass("game-over");
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 100);


        
        $("#level-title").text("Game Over. Try Again");
        
        setTimeout(() => {
            location.reload();
        }, 500);
        
    }
}


function startOver(){
    randomColorPattern = [];
    userClickPattern = [];
    level = 0;
    started = false;
}
