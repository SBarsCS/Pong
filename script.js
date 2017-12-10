const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let i = 0;

let player_count = 2;
let computer_difficulty = 1;

const one_player_button = document.getElementById('one_player');
const two_player_button = document.getElementById('two_player');
const dif_1 = document.getElementById('dif_1');
const dif_2 = document.getElementById('dif_2');
const dif_3 = document.getElementById('dif_3');

dif_1.style.visibility = 'hidden';
dif_2.style.visibility = 'hidden';
dif_3.style.visibility = 'hidden';

one_player_button.onclick = function(){
  player_count = 1;
  player1.score = 0;
  player2.score = 0;
  i = 0;
    dif_1.style.visibility = 'visible';
    dif_2.style.visibility = 'visible';
    dif_3.style.visibility = 'visible';
};

two_player_button.onclick = function(){
    player_count = 2;
    player1.score = 0;
    player2.score = 0;
    i = 0;
    dif_1.style.visibility = 'hidden';
    dif_2.style.visibility = 'hidden';
    dif_3.style.visibility = 'hidden';
};

dif_1.onclick = function(){
    player1.score = 0;
    player2.score = 0;
    i = 0;
    computer_difficulty = 1;
};

dif_2.onclick = function(){
    player1.score = 0;
    player2.score = 0;
    i = 0;
    computer_difficulty = 2;
};

dif_3.onclick = function(){
    player1.score = 0;
    player2.score = 0;
    i = 0;
    computer_difficulty = 3;
};

const players = [
  player1 = {
    x: 10,
    y: 100,
    height: 100,
    width: 20,
    up: false,
    down: false,
    score: 0
  },
    player2 = {
        x: canvas.width - 30,
        y: 100,
        height: 100,
        width: 20,
        up: false,
        down: false,
        score: 0,
        yDir: 1
    },
    ball = {
        x: 50,
        y: 100,
        height: 7,
        width: 7,
        xDir: 1,
        yDir: 1,
        speed: 5
    }
];

function drawer(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    ctx.font = '40px Arial';
    ctx.fillText(player1.score, 580, 100);
    ctx.fillText(player2.score, 820, 100);
    gic_drawer();
}

function updater(){
    if(ball.x >= canvas.width - ball.width){
        ball.xDir = -1;
    }else if(ball.x <= 0){
        ball.xDir = 1;
    }

    if(ball.y >= canvas.height - ball.height){
        ball.yDir = -1;
    }else if(ball.y <= 0){
        ball.yDir = 1;
    }

    if(player_count === 1){
        if(computer_difficulty === 1){
            if(player2.y >= canvas.height - player2.height){
                player2.yDir = -1;
            }else if(player2.y <= 0){
                player2.yDir = 1;
            }

            player2.y = player2.y + player2.yDir * 5;
        }else if(computer_difficulty === 2){
            if (player2.y >= ball.y) {
                player2.yDir = -1;
            } else if (player2.y < ball.y - player2.height) {
                player2.yDir = 1;
            }

            player2.y = player2.y + player2.yDir * ball.speed ;
        }else if(computer_difficulty === 3){
            player2.y = ball.y - 50;
        }
    }

    lost_checker();
    keyboard_movement_detector();
    collisionChecker();

    ball.x = ball.x + ball.xDir * ball.speed;
    ball.y = ball.y + ball.yDir * ball.speed;
}
function render(){
    drawer();
    updater();
    i++;
    ball_changer_speed();

    requestAnimationFrame(render);
}

render();
const upKey = 38;
const downKey = 40;
const w = 87;
const s = 83;

document.addEventListener('keydown', function(event) {
    if(player_count === 2) {
        if (event.keyCode === upKey) {
            player2.up = true;
        } else if (event.keyCode === downKey) {
            player2.down = true;
        }
    }

    if(event.keyCode === w) {
        player1.up = true;
    }else if(event.keyCode === s) {
        player1.down = true;
    }
}, false);

document.addEventListener('keyup', function(event) {
    if(player_count === 2) {
        if (event.keyCode === upKey) {
            player2.up = false;
        } else if (event.keyCode === downKey) {
            player2.down = false;
        }
    }

    if(event.keyCode === w) {
        player1.up = false;
    }else if(event.keyCode === s) {
        player1.down = false;
    }
}, false);

function collisionChecker(){
    if(ball.x <= 30 && ball.y >= player1.y && ball.y <= player1.y + player1.height){
        ball.xDir = 1;
        document.getElementById('point').play();
    }

    if(ball.x >= canvas.width - 30 && ball.y >= player2.y && ball.y <= player2.y + player2.height){
        ball.xDir = -1;
        document.getElementById('point').play();
    }
}

function keyboard_movement_detector(){
    if(player1.up === true && player1.y >= 0){
        player1.y = player1.y - 10;
    }

    if(player1.down === true && player1.y <= canvas.height - player1.height){
        player1.y = player1.y + 10;
    }

    if(player2.up === true && player2.y >= 0){
        player2.y = player2.y - 10;
    }

    if(player2.down === true && player2.y <= canvas.height - player2.height){
        player2.y = player2.y + 10;
    }
}

function lost_checker(){
    if(ball.x <= 0){
        document.getElementById('die').play();
        player2.score ++;
        restart();
    }

    if(ball.x >= canvas.width - ball.width){
        document.getElementById('die').play();
        player1.score ++;
        restart();
    }
}

function restart(){
    ball.x = 700;
    ball.y = 350;
}

function gic_drawer(){
    ctx.fillRect(700, 0, 2, canvas.height);
}

function ball_changer_speed(){
    if(i === 700){
        ball.speed ++;
        i = 0;
    }
}


