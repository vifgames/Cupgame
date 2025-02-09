    const colors = ["red", "blue", "yellow", "green", "purple"];
let correctSequence = [];
let playerSequence = [null, null, null, null, null];
let submissionCount = 0;
let selectedCup = null; // Currently selected cup element

// Grab DOM elements
const cupContainer = document.getElementById("cups");
const slotElements = document.querySelectorAll(".slot");
const feedbackElement = document.getElementById("feedback");

// Generate a random target (correct) sequence
function generateCorrectSequence() {
    correctSequence = [...colors].sort(() => Math.random() - 0.5);
    console.log("Correct sequence:", correctSequence);
}

// Create the cup elements and add them to the cups container
function createCups() {
    cupContainer.innerHTML = "";
    colors.forEach((color) => {
        let cup = document.createElement("div");
        cup.classList.add("cup");
        cup.style.backgroundColor = color;
        cup.textContent = color;
        cup.dataset.color = color;

        cup.addEventListener("click", () => {
            if (selectedCup) {
                selectedCup.classList.remove("selected");
            }
            selectedCup = cup;
            cup.classList.add("selected");
        });

        cupContainer.appendChild(cup);
    });
}

// Set up the slot click events
slotElements.forEach((slot) => {
    slot.addEventListener("click", () => {
        let slotIndex = slot.dataset.index;

        if (selectedCup) {
            if (slot.firstChild) {
                // Swap the cups if the slot is occupied
                let existingCup = slot.firstChild;
                slot.replaceChild(selectedCup, existingCup);
                existingCup.classList.remove("selected");
                cupContainer.appendChild(existingCup);
            } else {
                // Move the selected cup to an empty slot
                slot.appendChild(selectedCup);
            }
            playerSequence[slotIndex] = selectedCup.dataset.color;
            selectedCup.classList.remove("selected");
            selectedCup = null;
        } else if (slot.firstChild) {
            // Select the cup in the slot (without moving it)
            selectedCup = slot.firstChild;
            selectedCup.classList.add("selected");
        }
    });
});

// When the user clicks "Submit Guess", count attempts & check correctness
document.getElementById("submit").addEventListener("click", () => {
    submissionCount++;
    let correctCount = 0;
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] === correctSequence[i]) {
            correctCount++;
        }
    }
    feedbackElement.textContent = `Correctly placed cups: ${correctCount} | Submissions: ${submissionCount}`;
    if (correctCount === colors.length) {
        setTimeout(() => alert(`🎉 You Won in ${submissionCount} submissions! 🎉`), 300);
    }
});

// Restart the game: reset everything
document.getElementById("restart").addEventListener("click", () => {
    playerSequence = [null, null, null, null, null];
    submissionCount = 0;
    feedbackElement.textContent = `Correctly placed cups: 0 | Submissions: 0`;
    cupContainer.innerHTML = "";
    slotElements.forEach((slot) => {
        slot.innerHTML = "";
        slot.style.backgroundColor = "lightgray";
    });
    createCups();
    generateCorrectSequence();
});

// Initialize the game
generateCorrectSequence();
createCups();
