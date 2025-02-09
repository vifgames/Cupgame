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
      // Remove any previous selection
      if (selectedCup) {
        selectedCup.classList.remove("selected");
      }
      selectedCup = cup;
      cup.classList.add("selected");
    });
    cupContainer.appendChild(cup);
  });
}

// Clear the current cup selection
function clearSelection() {
  if (selectedCup) {
    selectedCup.classList.remove("selected");
    selectedCup = null;
  }
}

// Set up the slot click events
slotElements.forEach((slot) => {
  slot.addEventListener("click", () => {
    const slotIndex = slot.dataset.index;
    // If a cup is selected, move it into this slot
    if (selectedCup) {
      // If this slot already has a cup, remove that cup back to the cups area
      if (slot.firstChild) {
        const existingCup = slot.firstChild;
        cupContainer.appendChild(existingCup);
        playerSequence[slotIndex] = null;
      }
      // Move the selected cup into this slot
      slot.appendChild(selectedCup);
      playerSequence[slotIndex] = selectedCup.dataset.color;
      selectedCup.classList.remove("selected");
      selectedCup = null;
    } else {
      // If no cup is selected and the slot has a cup, remove it so it can be repositioned
      if (slot.firstChild) {
        const cupToRemove = slot.firstChild;
        slot.removeChild(cupToRemove);
        cupContainer.appendChild(cupToRemove);
        playerSequence[slotIndex] = null;
      }
    }
  });
});

// When the user clicks "Submit Guess", increment the submission count and check the answer
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

// Restart the game: reset variables, clear cups and slots, and regenerate the game state
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
