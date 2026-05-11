# 🚀 Proyectos de JavaScript: Ajedrez Automático y Minijuego

**Autora:** Laura Rubio
**Tecnologías utilizadas:** HTML5, CSS3 (Grid/Flexbox y Animaciones) y Vanilla JavaScript.

Este repositorio contiene dos proyectos prácticos desarrollados para poner a prueba los conocimientos de lógica de programación, manipulación del DOM y manejo de eventos en JavaScript.

---

## ♟️ Proyecto 1: Tablero de Ajedrez Automático

Un tablero de ajedrez funcional de 8x8 generado de forma completamente dinámica mediante código, evitando la escritura manual de las casillas en el HTML.

### ✨ Características:
*   **Generación Dinámica:** Utiliza bucles anidados (`for`) en JavaScript para crear las 64 casillas.
*   **Lógica de Colores:** Alternancia de casillas blancas y negras (o colores personalizados) calculada matemáticamente mediante la condición `(i + j) % 2 === 0`.
*   **Diseño Moderno:** Estructurado con CSS Grid para mantener proporciones perfectas y Flexbox para el centrado de las piezas.
*   **BONUS - Piezas Iniciales:** Las piezas y peones (blancos y negros) se colocan automáticamente en sus posiciones iniciales correspondientes mediante Arrays y símbolos Unicode.

---

## 🐝 Proyecto 2: Minijuego "Abeja y Flor"

Un divertido juego arcade de scroll lateral (tipo *Endless Runner*) donde el jugador debe demostrar sus reflejos saltando obstáculos.

### ✨ Características:
*   **Motor de Animación:** Uso de `@keyframes` en CSS para el movimiento constante del obstáculo (la flor) y el salto del personaje (la abeja).
*   **Eventos de Teclado:** El personaje salta al detectar la pulsación de la tecla `Espacio`.
*   **Sistema de Colisiones (BONUS):** Un bucle interno (`setInterval`) verifica en tiempo real las coordenadas de ambos elementos utilizando `window.getComputedStyle`. Si coinciden, el juego se detiene.
*   **Puntuación y Game Over (BONUS):** 
    *   El jugador suma 1 punto cada vez que esquiva un obstáculo con éxito.
    *   Al chocar, las animaciones se congelan en el punto exacto del impacto y aparece un menú modal interactivo con un botón para reiniciar la partida.
