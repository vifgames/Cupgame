const colors = ["red", "blue", "yellow", "green", "purple"];
let correctSequence = [];
let playerSequence = [null, null, null, null, null];

// Generate a random sequence
function generateCorrectSequence() {
    correctSequence = [...colors].sort(() => Math.random() - 0.5);
    console.log("Correct sequence:", correctSequence); // Debugging
}

// Create draggable cups
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

        cup.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("color", color);
        });

        cupContainer.appendChild(cup);
    });
}

// Setup drop slots
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("dragover", (e) => e.preventDefault());

    slot.addEventListener("drop", (e) => {
        let color = e.dataTransfer.getData("color");
        let index = slot.dataset.index;
        slot.style.backgroundColor = color;
        slot.dataset.color = color;
        playerSequence[index] = color;
    });
});

// Check the correct placement
document.getElementById("submit").addEventListener("click", () => {
    let correctCount = playerSequence.filter((color, index) => color === correctSequence[index]).length;
    document.getElementById("feedback").textContent = `Correctly placed cups: ${correctCount}`;

    if (correctCount === 5) {
        alert("You won! 🎉");
    }
});

// Restart game
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

// Initialize game
generateCorrectSequence();
createCups();