const playerCar = document.getElementById("player-car");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameInterval;
let obstacleSpeed = 5;
let starSpeed = 2; // Velocidad inicial de las estrellitas
let playerPosition = 170;

// Crear contenedor de estrellitas
const starContainer = document.createElement("div");
starContainer.id = "star-container";
document.body.appendChild(starContainer);

// Generar estrellitas constantes durante el juego
function generateStars() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 2 + starSpeed}s`; // Velocidad ajustable
    starContainer.appendChild(star);

    // Eliminar estrellas cuando terminan su animación
    star.addEventListener("animationend", () => {
        star.remove();
    });
}

// Incrementar velocidad de las estrellas gradualmente
function increaseStarSpeed() {
    starSpeed += 0.2; // Incremento gradual
}

// Mostrar mensaje de celebración y detener el juego
function showCelebration() {
    clearInterval(gameInterval); // Detener el juego
    clearInterval(starInterval); // Detener la generación de estrellas

    // Crear contenedor de celebración
    const celebrationContainer = document.createElement("div");
    celebrationContainer.id = "celebration";
    celebrationContainer.innerHTML = "<h2>🎉 ¡Felicidades! Ganaste 🎉</h2>";
    document.body.appendChild(celebrationContainer);

    // Generar estrellas de celebración
    for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Estrellas rápidas
        celebrationContainer.appendChild(star);
    }

    // Reiniciar el juego después de 5 segundos
    setTimeout(() => {
        celebrationContainer.remove();
        window.location.reload();
    }, 5000);
}

// Función principal del juego
function startGame() {
    score = 0;
    obstacleSpeed = 5;
    starSpeed = 2;
    let obstaclePosition = -100;

    // Iniciar generación constante de estrellas
    starInterval = setInterval(generateStars, 500); // Crear estrellas cada 500 ms

    gameInterval = setInterval(() => {
        obstaclePosition += obstacleSpeed;
        obstacle.style.top = `${obstaclePosition}px`;

        // Generar un nuevo obstáculo si sale de la pantalla
        if (obstaclePosition > 500) {
            obstaclePosition = -100;
            obstacle.style.left = `${Math.floor(Math.random() * 340)}px`;
            score++;
            scoreDisplay.textContent = `Puntaje: ${score}`;

            // Incrementar la velocidad del obstáculo
            if (score % 2 === 0) {
                obstacleSpeed++;
                increaseStarSpeed(); // Incrementar velocidad de estrellas
            }

            // Mostrar celebración al alcanzar 10 puntos
            if (score === 10) {
                showCelebration();
            }
        }

        // Detectar colisiones
        const obstacleRect = obstacle.getBoundingClientRect();
        const playerRect = playerCar.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            clearInterval(gameInterval);
            alert(`¡Game Over! Puntaje final: ${score}`);
            window.location.reload(); // Reiniciar el juego
        }
    }, 20);
}

// Iniciar el juego automáticamente
startGame();
