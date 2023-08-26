let jumping = false;
let jumpInterval;

score = 0;
cross = true;

audio = new Audio('music.mp3');
audio.loop = true;
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    if (e.keyCode == 38 && !jumping) {
        jumping = true;
        mario = document.querySelector('.mario');
        mario.classList.add('animateMario');
        jumpInterval = setInterval(() => {
            marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
            mario.style.left = marioX + 5 + "px";
        }, 16);
        setTimeout(() => {
            mario.classList.remove('animateMario');
            clearInterval(jumpInterval);
            jumping = false;
        }, 700);
    }
    if (e.keyCode == 39) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        if (marioX < window.innerWidth - 250) {
            mario.style.left = marioX + 40 + "px";
        }
    }
    if (e.keyCode == 37) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        if (marioX > 0) {
            mario.style.left = (marioX - 40) + "px";
        }
    }
};

setInterval(() => {
    mario = document.querySelector('.mario');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 45 && offsetY < 100) {
        clearInterval(jumpInterval);
        mario.style.display = 'none';
        const fallenmario = document.querySelector('.fallenmario');
        fallenmario.style.display = 'block';
        fallenmario.style.left = (ox - 50) + 'px'; 
        fallenmario.style.bottom = '2cm';
        const gameOverContainer = document.getElementById('gameOverContainer');
        gameOverContainer.style.display = 'block';
        gameOver.innerHTML = "";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
            updateScore(score);
        }, 3000);
    }
    
    if (offsetX < 140 && cross && offsetY >= 100) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    
    }
}, 16); 
 
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}
