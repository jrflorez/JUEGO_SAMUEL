let score = 0;
let gameInterval;

const startBtn = document.getElementById("start-btn");
const starsContainer = document.getElementById("stars-container");
const scoreDisplay = document.getElementById("score");

// Crear el mensaje especial
const specialMessage = document.createElement("div");
specialMessage.id = "special-message";
specialMessage.textContent = "TE AMO CHIQUITICO ❤️";
specialMessage.style.display = "none"; // Oculto inicialmente
document.body.appendChild(specialMessage);

startBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = `Puntaje: ${score}`;
    starsContainer.innerHTML = "";
    specialMessage.style.display = "none"; // Esconder el mensaje al reiniciar
    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.top = `${Math.random() * 350}px`;
        star.style.left = `${Math.random() * 750}px`;

        star.addEventListener("click", () => {
            score++;
            scoreDisplay.textContent = `Puntaje: ${score}`;
            star.remove();

            // Mostrar el mensaje especial si llega a 10 puntos
            if (score === 10) {
                specialMessage.style.display = "block";
            }
        });

        starsContainer.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 3000);
    }, 1000);
});
