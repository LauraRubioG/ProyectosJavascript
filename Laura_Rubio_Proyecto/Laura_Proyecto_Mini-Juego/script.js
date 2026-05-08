const abeja = document.getElementById('abeja');
const flor = document.getElementById('flor');
const puntuacionTexto = document.getElementById('puntuacion');
const contenedorMensaje = document.getElementById('contenedor-mensaje');
const btnReiniciar = document.getElementById('btn-reiniciar');

let puntuacion = 0;
let juegoActivo = true;
let intervaloColision;
let florSuperada = false; // Nueva variable para controlar si ya puntuamos la flor actual

// Función para iniciar/reiniciar la lógica del juego
function iniciarJuego() {
    puntuacion = 0;
    juegoActivo = true;
    florSuperada = false; // Reseteamos la bandera al iniciar
    puntuacionTexto.innerText = "0";
    contenedorMensaje.style.display = 'none';
    
    // Resetear posición y animación de la flor
    flor.style.animation = 'moverObstaculo 2s infinite linear';
    flor.style.right = '0';

    // Iniciar el bucle del juego
    lanzarIntervalos();
}

function lanzarIntervalos() {
    // Detección de colisión y puntuación (se comprueba cada 10ms)
    intervaloColision = setInterval(() => {
        if (!juegoActivo) return;

        let abejaBottom = parseInt(window.getComputedStyle(abeja).getPropertyValue('bottom'));
        let florRight = parseInt(window.getComputedStyle(flor).getPropertyValue('right'));

        // 1. Lógica de choque
        if (florRight > 510 && florRight < 550 && abejaBottom <= 40) {
            gameOver();
        }

        // 2. Lógica de puntuación
        // Si la flor pasa de largo la posición 550, significa que la hemos saltado con éxito
        if (florRight >= 550 && !florSuperada) {
            puntuacion++;
            puntuacionTexto.innerText = puntuacion;
            florSuperada = true; // Marcamos que esta flor ya nos dio un punto
        }

        // 3. Reiniciar la bandera de puntuación
        // Cuando la animación se reinicia, la flor vuelve a la derecha (valor bajo de 'right').
        // Si el valor vuelve a ser menor de 100, preparamos la variable para el siguiente salto.
        if (florRight < 100 && florSuperada) {
            florSuperada = false;
        }

    }, 10);
}

function gameOver() {
    juegoActivo = false;
    clearInterval(intervaloColision);
    
    // Detener animación
    let florPosicion = window.getComputedStyle(flor).getPropertyValue('right');
    flor.style.animation = 'none';
    flor.style.right = florPosicion;
    
    // Mostrar mensaje y botón
    contenedorMensaje.style.display = 'block';
}

function saltar() {
    if (juegoActivo && !abeja.classList.contains('salto')) {
        abeja.classList.add('salto');
        setTimeout(() => {
            abeja.classList.remove('salto');
        }, 500);
    }
}

// Eventos
document.addEventListener('keydown', (evento) => {
    if (evento.code === 'Space') saltar();
});

btnReiniciar.addEventListener('click', iniciarJuego);

// Carga inicial
iniciarJuego();