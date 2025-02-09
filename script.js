         const colors = ["red", "blue", "yellow", "green", "purple"];
let correctSequence = [];
let playerSequence = [null, null, null, null, null];
let selectedCup = null; // Stores the currently selected cup

// 🎲 Generate Random Sequence
function generateCorrectSequence() {
    correctSequence = [...colors].sort(() => Math.random() - 0.5);
    console.log("Correct sequence:", correctSequence);
}

// 🏆 Create Clickable Cups
function createCups() {
    const cupContainer = document.getElementById("cups");
    cupContainer.innerHTML = "";

    colors.forEach(color => {
        let cup = document.createElement("div");
        cup.classList.add("cup");
        cup.style.backgroundColor = color;
        cup.textContent = color;
        cup.dataset.color = color;

        // 📌 Click to Select a Cup
        cup.addEventListener("click", () => {
            if (selectedCup) {
                selectedCup.classList.remove("selected"); // Remove previous selection
            }
            selectedCup = cup;
            cup.classList.add("selected"); // Highlight selected cup
        });

        cupContainer.appendChild(cup);
    });
}

// 🏗️ Setup Clickable Slots
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("click", () => {
        if (selectedCup) {
            let color = selectedCup.dataset.color;

            // ✅ Move the Cup to the Selected Slot
            slot.style.backgroundColor = color;
            slot.dataset.color = color;

            let index = slot.dataset.index;
            playerSequence[index] = color; // Store the moved color

            console.log(`Moved ${color} to slot ${index}`);

            // ❌ Remove the cup after placing it
            selectedCup.remove();
            selectedCup = null;
        }
    });
});

// ✅ Check Placement
document.getElementById("submit").addEventListener("click", () => {
    let correctCount = playerSequence.filter((color, index) => color === correctSequence[index]).length;
    document.getElementById("feedback").textContent = `Correctly placed cups: ${correctCount}`;

    if (correctCount === 5) {
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
