let score = 0;
let gameInterval;

const startBtn = document.getElementById("start-btn");
const starsContainer = document.getElementById("stars-container");
const scoreDisplay = document.getElementById("score");

startBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = `Puntaje: ${score}`;
    starsContainer.innerHTML = "";
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
        });

        starsContainer.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 3000);
    }, 1000);
});
