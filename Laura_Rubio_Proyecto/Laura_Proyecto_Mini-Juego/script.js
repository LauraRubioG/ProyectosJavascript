//Este archivo es el cerebro de nuestro juego. Aqui es donde se le da movimiento
//y se programa todos los movimientos

//Aquí preparemos nuestro terreno, capturando los elementos visuales y creando
//asi variables para controlar el juego
//usamos el document.getElementById para buscar las lineas en nuestro HTML los elemetos
//que vamos a usar para programarlo, const es una variable constante
const abeja = document.getElementById('abeja');
const flor = document.getElementById('flor');
const puntuacionTexto = document.getElementById('puntuacion');
const contenedorMensaje = document.getElementById('contenedor-mensaje');
const btnReiniciar = document.getElementById('btn-reiniciar');
// Estas son las variables de control
//puntacion y juegoActivo llevan el control de los puntos y de si el juego está activo
//es decir jugandose o si se ha perdido
let puntuacion = 0;
let juegoActivo = true;
//Esta variable la usamos para que guarde el "reloj" internos y así detenerlo mas tarde
let intervaloColision;
//Esta variable la usamos digamos como "contador", ya que si pasamos la flor le sumaremos
//un uno a la puntuacion
let florSuperada = false; // Nueva variable para controlar si ya puntuamos la flor actual

// Función para iniciar/reiniciar la lógica del juego
//Funcion para inicar el juego, aqui preparamos todo para empezar la partida
function iniciarJuego() {
    //ponemos los puntos a 0
    puntuacion = 0;
    //iniciamos el juego
    juegoActivo = true;
    //reseteamos las flores superadas cuadno se inicia
    florSuperada = false;
    //aqui a nuestra variable de la puntuacion le estamos diciendo que se reinicie y se ponga 
    //en 0. innerText es una funcion que permite leer o modificar un texto visible
    //y al igualarlo a 0 le decimos que borre cualquier texto y lo cambie por 0
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