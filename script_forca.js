var saida = document.getElementById("acertos");
var canvas = document.getElementById("canvas");
var brush = canvas.getContext("2d");
var caractereErrados = document.getElementById("erros");
brush.strokeStyle = "#0A3871";
brush.lineWidth = 2;

var palavras = ["java", "php","css", "react"];
var posicao = sorteiaPalavra();
var tentativas = 0;
var acertos = 0;

var impressao = [];
var erros = [];

function escondeElementos(el) {
    var esconder = document.getElementById(el).style.display;
    if(esconder == "none"){
        document.getElementById(el).style.display = 'block';
        }
    else{
        document.getElementById(el).style.display = 'none';
        console.log(esconder);
        imprimeTracos();
    }
}

function imprimeTracos(){
    for(i=0;i<palavras[posicao].length;i++){
        impressao.push("_ ");
    }
    saida.innerHTML = impressao.join("");
}

function sorteiaPalavra(){
    var posicao = Math.floor(Math.random() * palavras.length);
    console.log(palavras[posicao]);
    return posicao;
}

document.body.addEventListener('keypress', function (event) {
    var x = event.keyCode;         
    var y = String.fromCharCode(x);
    y.toLowerCase();    
    console.log(x,y);
    verificaPosicao(y);
})

function verificaPosicao(caractere){
    var acerto = false;
    var indice = palavras[posicao].indexOf(caractere);
    while(indice != -1){
        imprimeNaTela(caractere,indice);
        indice = palavras[posicao].indexOf(caractere, indice+1);
        acerto = true;
        acertos++;
    }if(!acerto){
        desenhaForca(tentativas);
        erros.push(caractere);
        caractereErrados.innerHTML = erros;
        tentativas++;
     }
     verificaFimdeJogo();
    }


function verificaFimdeJogo(){
    if(acertos == palavras[posicao].length){
        var fim = document.getElementById("fim");
        fim.innerHTML = "Voce Ganhou !!!";
        //document.location.reload(true);
    }
    if(tentativas == 7){
        var fim = document.getElementById("fim");
        fim.innerHTML = "Voce Perdeu !!!";
        //document.location.reload(true);
    }
}

function imprimeNaTela(letraAEscrever,pos){
    impressao[pos] = letraAEscrever;
    saida.innerHTML = impressao.join("").toUpperCase();
   }

function clearCanvas() {
    brush.clearRect(0, 0, 600, 300);
}
function drawGallows() {
    clearCanvas();

    brush.beginPath();
    brush.moveTo(200, 250);
    brush.lineTo(400, 250);
    brush.stroke();

    brush.beginPath();
    brush.moveTo(250, 250);
    brush.lineTo(250, 70);
    brush.lineTo(380, 70);
    brush.lineTo(380, 100);
    brush.stroke();
}

function drawHead() {
    brush.beginPath();
    brush.arc(380, 120, 20, 0, Math.PI * 2);
    brush.stroke();
}

function drawLine(xStar, yStart, xFinal, yFinal) {
    brush.beginPath();
    brush.moveTo(xStar, yStart);
    brush.lineTo(xFinal, yFinal);
    brush.stroke();
}

function desenhaForca(tentativas) {
    switch (tentativas) {
        case 0:
            drawGallows();
            break;
        case 1:
            drawHead();
            break;
        case 2:
            drawLine(380, 140, 380, 210);
            break;
        case 3:
            drawLine(380, 140, 350, 160);
            break;
        case 4:
            drawLine(380, 140, 410, 160);
            break;
        case 5:
            drawLine(380, 210, 350, 230);
            break;
        case 6:
            drawLine(380, 210, 410, 230);
            break;
    }}