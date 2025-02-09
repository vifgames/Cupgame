const colors = ["red", "blue", "yellow", "green", "purple"];
let correctSequence = [];
let playerSequence = [null, null, null, null, null];

// 🎵 Load Sound Effects
const dragSound = new Audio("drag.mp3");
const dropSound = new Audio("drop.mp3");
const winSound = new Audio("win.mp3");

// 🎲 Generate a Random Correct Sequence
function generateCorrectSequence() {
    correctSequence = [...colors].sort(() => Math.random() - 0.5);
    console.log("Correct sequence:", correctSequence);
}

// 🏆 Create Draggable Cups
function createCups() {
    const cupContainer = document.getElementById("cups");
    cupContainer.innerHTML = "";

    colors.forEach(color => {
        let cup = document.createElement("div");
        cup.classList.add("cup");
        cup.style.backgroundColor = color;
        cup.textContent = color;
        cup.draggable = true;
        cup.dataset.color = color;

        // 🎵 Play sound on drag
        cup.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("color", color);
            cup.style.opacity = "0.5";
            cup.style.transform = "scale(1.2)";
            dragSound.play();
        });

        cup.addEventListener("dragend", (e) => {
            cup.style.opacity = "1";
            cup.style.transform = "scale(1)";
        });

        cupContainer.appendChild(cup);
    });
}

// 🏗️ Setup Drop Slots
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("dragover", (e) => e.preventDefault());

    slot.addEventListener("drop", (e) => {
        e.preventDefault();
        let color = e.dataTransfer.getData("color");

        if (color) {
            slot.style.backgroundColor = color;
            slot.dataset.color = color;
            playerSequence[slot.dataset.index] = color;
            dropSound.play();
        }
    });
});

// ✅ Check Placement
document.getElementById("submit").addEventListener("click", () => {
    let correctCount = playerSequence.filter((color, index) => color === correctSequence[index]).length;
    document.getElementById("feedback").textContent = `Correctly placed cups: ${correctCount}`;

    if (correctCount === 5) {
        winSound.play();
        setTimeout(() => alert("🎉 You Won! 🎉"), 300);
    }
});

// 🔄 Restart Game
document.getElementById("restart").addEventListener("click", () => {
    generateCorrectSequence();
    createCups();
    playerSequence = [null, null, null, null, null];

    document.querySelectorAll(".slot").forEach(slot => {
        slot.style.backgroundColor = "lightgray";
        delete slot.dataset.color;
    });

    document.getElementById("feedback").textContent = "Correctly placed cups: 0";
});

// 🚀 Initialize the Game
generateCorrectSequence();
createCups();
