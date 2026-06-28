// =====================================================
// CONFIGURACION INICIAL Y ELEMENTOS
// =====================================================

//Buscamos y guardamos los elementos de nuestro HTML en variab
//Usamos 'const' (constante) porque estos elementos siempre serán los mismo
//document.getElementById busca el elemento que tenga ese ID específico en tu archivo HTML
const abeja = document.getElementById('abeja');
const flor = document.getElementById('flor');
const puntuacionTexto = document.getElementById('puntuacion');
const contenedorMensaje = document.getElementById('contenedor-mensaje');
const btnReiniciar = document.getElementById('btn-reiniciar');

//=================================================================
// VARIABLES DE CONTROL 
//=================================================================
//Usamos 'let' porque estos valores sí van a cambiar mientras jugamos

//Guarda cuantas flores hemos saltado
let puntuacion = 0;
//Funciona como un interruptor: 'true' su estamos jugando y 'false', si perdimos
let juegoActivo = true;
//Guardará el motor del juego para poder apagarlo cuando perdamos
let intervaloColision;
//Ns ayudaa saber si ya sumamos el punto de la flor que acaba de pasar
let florSuperada = false; 

// =============================================================================
// FUNCIONES PRINCIPALES
//===================================================================================

 //Prepara todo el escenario para empezar una partida nueva desde cero
function iniciarJuego() {
    //Reiniciamos los valores a su estado original
    //puntuacion 0, juegoActivo true porque hay que activarlo, reseteamos falso la flor
    puntuacion = 0;
    juegoActivo = true;
    florSuperada = false;

    //Actualizamos los textos y menus en la pantall
    //innerText cambia el tecto
    puntuacionTexto.innerText = "0";
    //aqui ocultamos el contenerdor que muetra que has perdido.
    //el -style le dice a JavaScript que quiere manipular el diseño del CSS
    //display es lo que vamos a combiar en el CSS y controla si se mustra o no el elemento
    contenedorMensaje.style.display = 'none';
    
    // aqui le dice al motor como actuar, impulsa la flor hacia la abeja,
    //style.animation modifica la propiedad del CSS de la flot
    //moverObtaculo indica que movimiento tiene que hacer, 2s en cuenta tiempo hace el recorrido
    //infinite que sea bucle y linear a valocidad constante
    flor.style.animation = 'moverObstaculo 2s infinite linear';
    //controla a que distancia esta elelemento del borde
    flor.style.right = '0';

    // LLamamos a la funcion lanzarIntervalos para inicar el juego cuando ya está todo preparado
    lanzarIntervalos();
}

//funcion para ejecutar el juego
function lanzarIntervalos() {
    // setInterval ordena a ejecutar todo el codigo que haya entre corchetes cada 10 milisegundos
    //intervaloColision guarda ese temporizador en una variable, asi cuando piertda se podrá borrar el motor
    intervaloColision = setInterval(() => {
        //aqui decimos que si el juego ya ha terminado hace que se detenga y que no se lea el resto de linea
        if (!juegoActivo) return;
        //esta variables se crean para saner en que posicion se encunetran nuestras animaciones
        //con la funcion window... le pide el pixel exacto de donde esten y el parseInt lo convierte en px
        let abejaBottom = parseInt(window.getComputedStyle(abeja).getPropertyValue('bottom'));
        let florRight = parseInt(window.getComputedStyle(flor).getPropertyValue('right'));

        //Aqui es donde indicamos que han chocado usando los pixeles, le decimos que si están en la misma posicion
        //que es choque y ejecuta la funcion de gameOver y se detiene
        if (florRight > 510 && florRight < 550 && abejaBottom <= 40) {
            gameOver();
        }

        // Puntuacion
        // Aqui le demismo que si la flor ha pasado de la posicon de los pixeles y que no ha sido puntuada
        //que sume a puntuacion, actualzando con el innerText la posicion y cambiando a true la florSuperada
        if (florRight >= 550 && !florSuperada) {
            puntuacion++;
            puntuacionTexto.innerText = puntuacion;
            florSuperada = true; // Marcamos que esta flor ya nos dio un punto
        }

        // Reiniciar la bandera de puntuación
        // Aqui como es bucle le demos que si detecta que la flor a vuelto a la linea de salida
        // y comprueba si todavia teniamos bloqueada la puntuacion anterior
        // ponemos la flor superada inidcandole que saque una nueva flor
        if (florRight < 100 && florSuperada) {
            florSuperada = false;
        }

    }, 10);
}

//funcion para cuando chocan
function gameOver() {
    // cambia el juego a false
    juegoActivo = false;
    //Aqui apaga por complero el intervalo de colicion
    clearInterval(intervaloColision);
    
    // Detener animación
    //aqui le decimos que justo en el momento del choque, coja la posicion exacta de la flor y la guarde
    let florPosicion = window.getComputedStyle(flor).getPropertyValue('right');
    //borra la animacion del CSS de la flor
    flor.style.animation = 'none';
    //Pero para que no vuelva a su posicion inicial le decimos que se queda en la que está usando la variable anterior
    flor.style.right = florPosicion;
    
    // Aqui mostramos el vensaje de perdido y muestra el boton. Y ponemos el estado visual del texto en block para 
    //que me mantenga en pantalla
    contenedorMensaje.style.display = 'block';
}
//funcion para que salte
function saltar() {
    //indica que si el juego esta en activo, que la abeja no este saltando, comprueba que no tenga puesta la clase de 
    //del CSS del salto. Evitando que se quede arriba
    if (juegoActivo && !abeja.classList.contains('salto')) {
        // hace que se ejecute la animacion del salto de la abaje, haciendo que suba y baje
        abeja.classList.add('salto');
        //temposizador, indica que despues del ejecuatar el tiempo
        setTimeout(() => {
            //que quite la clase del salto
            abeja.classList.remove('salto');
        }, 500);
    }
}

// aqui indicamos al navegador que esté siempre atento a cuando se pulse la tecla keydown
document.addEventListener('keydown', (evento) => {
    //si se pulsa la tecla que ejecute la funcion del salto
    if (evento.code === 'Space') saltar();
});
//aqui le decimso que si se pulsa el boton de reinicia que active de nuevo el juego
btnReiniciar.addEventListener('click', iniciarJuego);

// Carga inicial automaticamente 
iniciarJuego();