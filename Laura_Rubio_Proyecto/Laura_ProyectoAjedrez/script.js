// PARTE 1: TABLERO DE AJEDREZ

const tablero = document.getElementById('tablero');

//Array con las piezas iniciales
const piezasNegras = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
const piezasBlancas = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
const peonesNegros = ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'];
const peonesBlancas = ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'];

//Bucles anidados (8 filas x 8 columnas)
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        //Creamos casillas
        const casilla = document.createElement('div');
        casilla.classList.add('casilla');

        //Color: si la suma de filas y columnas es par, es blanca
        //Si es impar es negra
        if((i + j) % 2 === 0){
            casilla.classList.add('blanca');
        } else{
            casilla.classList.add('negra');
        }

        //Colocamos las piezas
        if(i === 0) casilla.innerText = piezasNegras[j];
        if(i === 1) casilla.innerText = peonesNegros[j];
        if(i === 6) casilla.innerText = peonesBlancas[j];
        if(i === 7) casilla.innerText = piezasBlancas[j];

        //Añadir la casilla al tablero HTML
        tablero.appendChild(casilla);
    }
}

