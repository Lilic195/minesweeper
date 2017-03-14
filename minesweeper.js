/**
 * Created by Aleksa on 28-Dec-16.
 */
var arr = [];
var arrx =10;
var arry =20;
var bombs = 20;
var game = true;
var clicks = 1;
var interval;
var score = 0;


function loadButtons() {
    document.getElementById('smile').innerHTML = "<img src='img/smile.png' width='45' height='45' />";
    for(let i = 0 ;i < arrx; i++){
        for(let j = 0; j < arry; j++) {
            let x = document.createElement('BUTTON');
            let id = i.toString() + j.toString();
            x.setAttribute('id',id);
            x.setAttribute('onClick','klikNadugme(' + i + ',' + j + ')');
            x.setAttribute('oncontextmenu', 'flag("' + id + '"); return false;');
            x.setAttribute('flag','false');
            x.disabled = true;
            document.getElementById('box').appendChild(x);
        }
    }
}
loadButtons();

function timer() {
    interval = setInterval(myTimer, 1000);
    function myTimer() {
        score++;
        document.getElementById('timer').innerHTML = "Timer : " + score;
    }
}

function stopTimer() {
    clearInterval(interval);
    score = 0;
}

function startGame() {
    document.getElementById('start').innerHTML = "Restart";
    document.getElementById('smile').innerHTML = "<img src='img/smile.png' width='45' height='45' />";

    stopTimer();
    timer();

    clicks = 1;
    game = true;
    for(let i = 0 ;i < arrx; i++){
        arr[i] = [];
        for(let j = 0; j < arry; j++) {
            arr[i][j] = 0;
            let id = i.toString() + j.toString();
            document.getElementById(id).disabled = false;
            document.getElementById(id).setAttribute('flag', 'false');
            document.getElementById(id).innerHTML = "";
            document.getElementById(id).style.backgroundColor = 'buttonface';
        }
    }
}

function loadBombs(x, y) {
    let counter = 0;
    while(counter < bombs){
        let xrand = parseInt( Math.random()*arrx);
        let yrand = parseInt( Math.random()*arry);

        if(arr[xrand][yrand] == 0 && ( x !== xrand || y !== yrand)) {
            placeBomb(xrand, yrand);
            counter++
        }
    }
}

function flag(id) {
    let dugme = document.getElementById(id);
    if (dugme.getAttribute('flag') === 'false') {
        dugme.innerHTML = "<img src='img/flag.png' width='40' height='40' />";
        dugme.setAttribute('flag','true');
    } else {
        dugme.innerHTML = "";
        dugme.setAttribute('flag','false');
    }
}

function placeBomb(x, y) {
    arr[x][y] = 'X';
    for(let i = x-1 ; i <= x+1; i++){
        for(let j = y-1 ; j <= y+1; j++){
            if((i >= 0 && i < arrx) && (j >= 0 && j < arry)){
                if((arr[i][j] !== 'X')) {
                    arr[i][j] = parseInt(arr[i][j]) + 1;
                }
            }
        }
    }
}

function klikNadugme(x, y) {
    if(clicks === 1){
        loadBombs(x, y);
        clicks = 2;
    }
    let id = x.toString() + y.toString();
    if (document.getElementById(id).getAttribute('flag') === 'false') {
        klik(x, y);
        if (game) {
            pobeda();
        }
    }
}

function klik(x, y) {
    let id = x.toString() + y.toString();
    document.getElementById(id).disabled = true;

    if(arr[x][y] === 'X'){
        document.getElementById('smile').innerHTML = "<img src='img/fail.png' width='45' height='45' />";
        razotkriSve();
        stopTimer();
        game = false;
    }else if(arr[x][y] === 0){
        document.getElementById(id).style.backgroundColor = "white";
        document.getElementById(id).innerHTML = "";
        arr[x][y] = -2;
        razotkri(x,y);
    }else if(arr[x][y] !== -2){
        let dugme = document.getElementById(id);
        if(arr[x][y] === 1){
            dugme.style.color = '#3399ff';
        }else if(arr[x][y] === 2){
            dugme.style.color = '#00ff99';
        }else if(arr[x][y] === 3){
            dugme.style.color = '#ff3333';
        }else if(arr[x][y] === 4){
            dugme.style.color = '#ff66ff';
        }
        document.getElementById(id).style.backgroundColor = "white";
        document.getElementById(id).innerHTML = arr[x][y];
    }

}

function razotkri(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if ((i >= 0 && i < arrx) && (j >= 0 && j < arry)) {
                if ((arr[i][j] !== 'X') && ((arr[i][j] !== -2))) {
                    klik(i, j);
                }
            }
        }
    }

}

function pobeda() {
    for (let i = 0; i < arrx; i++) {
        for (let j = 0; j < arry; j++) {
            let id = i.toString() + j.toString();
            let dugme =  document.getElementById(id);
            if(!dugme.disabled && arr[i][j] !== 'X'){
                return false;
            }
        }
    }
    razotkriSve();
    alert("Your score is: " + score);
    stopTimer();
}

function razotkriSve() {
    document.getElementById('start').innerHTML = "Start";
    for (let i = 0; i < arrx; i++) {
        for (let j = 0; j < arry; j++) {
            let id = i.toString() + j.toString();
            let dugme =  document.getElementById(id);
            dugme.disabled = true;


            if(arr[i][j] === 'X' && dugme.getAttribute('flag') === 'false') {
                let img = document.createElement('IMG');
                img.setAttribute('src', 'img/bomb.png');
                img.setAttribute('width', '50');
                img.setAttribute('height', '50');
                dugme.innerHTML = "<img src='img/bomb.png' width='40' height='40' />";
            }
            if (arr[i][j] !== 0 && arr[i][j] !== -2 && arr[i][j] !== 'X' ) {

                if(arr[i][j] === 1){
                    dugme.style.color = '#3399ff';
                }else if(arr[i][j] === 2){
                    dugme.style.color = '#00ff99';
                }else if(arr[i][j] === 3){
                    dugme.style.color = '#ff3333';
                }else if(arr[i][j] === 4){
                    dugme.style.color = '#ff66ff';
                }

                dugme.innerHTML = arr[i][j];
            }
        }
    }
}
