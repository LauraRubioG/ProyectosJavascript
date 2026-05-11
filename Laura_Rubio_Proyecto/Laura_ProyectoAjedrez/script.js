// conectamos el JS con el HTML, buscamos tablero con la funcio 
//document.getElementById y la guardamos en una variable
const tablero = document.getElementById('tablero');

//Array con las piezas iniciales
//creamos los arrays para guardan el orden exacto de las piezas relaes
//cada elemento de la lista corresponde a una columna de la 0 a la 7
const piezasNegras = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
const piezasBlancas = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
const peonesNegros = ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'];
const peonesBlancas = ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'];

//Bucles anidados (8 filas x 8 columnas)
//el bucle i controla las filas y el bucle j las columnas
//como cada una va de 0 a 7 el codigo dentro se ejecutarla 64 veces
//ya que 8 posciones x 8 posciones =64
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        //Creamos la casilla fija, hacemos que cree un nuevo div y le ponga
        //la clase casilla. Despues en el CSS le daremos las dimenciones
        const casilla = document.createElement('div');
        casilla.classList.add('casilla');

        //usamos un if para imprimir los colores, si el resto de la suma de ambas
        //es decir si es par que sea blanca y si es impar es negra
        if((i + j) % 2 === 0){
            casilla.classList.add('blanca');
        } else{
            casilla.classList.add('negra');
        }

        //Colocamos las piezas, comprueba en que Fila estamos actualmente
        //solo ponemos la pieza dentro de la casilla que estamos creadno
        if(i === 0) casilla.innerText = piezasNegras[j];
        if(i === 1) casilla.innerText = peonesNegros[j];
        if(i === 6) casilla.innerText = peonesBlancas[j];
        if(i === 7) casilla.innerText = piezasBlancas[j];

        //Añadir la casilla al tablero HTML, volveos a crear la casilla en el div del html
        tablero.appendChild(casilla);
    }
}

