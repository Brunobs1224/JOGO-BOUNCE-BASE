const game = document.getElementById("game");
const canvas = game.getContext("2d");
const buttonpause = document.getElementById("buttonpause");

let positionx = 20;
let positiony = 15;
let velocidadex = 5;
let velocidadey = 5;
let g = 0;

let barraWidth = game.width/4;
let barraHeight = 10;
let barrax = 0;
let barray = game.height - barraHeight;

let score = 0;

let pausado = true;


game.addEventListener("mousemove", (e) => {
    let rect = game.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;

    barrax = mouseX

    if (mouseX >= game.width) {
        barrax = game.width
    }
        
    if ((barrax + barraWidth) >= game.width) {
        barrax = game.width - barraWidth;
    }
    });

    buttonpause.addEventListener("click", () => {
        pausado = !pausado;
    })

function loop() {

    if (pausado) {
        requestAnimationFrame(loop);
        return;
    }

    canvas.clearRect(0, 0, game.width, game.height);

    positiony = positiony + velocidadey;
    positionx = positionx + velocidadex;


    canvas.beginPath();
    canvas.arc(positionx, positiony, 10, 0, Math.PI*2);
    if (score <= 10) {canvas.fillStyle = "white"}
    else if ((score >= 11)&&(score < 51)) {canvas.fillStyle = "red"}
    else if (score >= 51) {canvas.fillStyle = "blue"}
    canvas.fill();
    /*desenhando e redesenhando a bola*/

    
    canvas.beginPath();
    canvas.fillStyle = "red";
    canvas.fillRect(barrax, barray, barraWidth, barraHeight);
    canvas.fill();
    /* desenhando e redesenhando a barra*/

    canvas.strokeStyle = "black";
    canvas.lineWidth = 5;
    canvas.strokeRect(0, 0, game.width, game.height);


    canvas.fillStyle = "blue";
    canvas.font = "70px Arial";
    canvas.fillText("Score: " + score, 50, 70);
    canvas.lineWidth = 1;
    canvas.strokeStyle = "white";
    canvas.strokeText("Score: " + score, 50, 70);
    /*desenhando o placar*/


    if  (
        ((positiony + 10) >= barray) &&
        ((positionx + 10) >= barrax) &&
        ((positionx - 10) <= barrax + barraWidth)&&
        (velocidadey > 0)) {
            velocidadey = -velocidadey - 1;
            score = score + 1;

        }
    /*bloqueio da barra*/

    if (
        (positiony - 10) <= 0) {
            velocidadey = -velocidadey
        }
    /*bloqueio do teto*/
    
    /*até aqui é posicionamentoy*/

    if ((positionx + 10) >= game.width) {
        velocidadex = -velocidadex;
    }

    if ((positionx - 10) <= 0) {
        velocidadex = -velocidadex;
    }

    if ((positiony + 10) >= game.height) {
        positiony = 10 + velocidadey;
        score = 0;
        velocidadey = 5;
        game.style.backgroundColor = "black";

    }

    if ((score > 10) && (score <= 50)) {
        game.style.backgroundColor = "white";
    }
    if (score > 50) {
        game.style.backgroundColor = "green";
    }
    

    requestAnimationFrame(loop);

}
loop();



