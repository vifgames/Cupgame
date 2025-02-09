 const colors = ["red", "blue", "yellow", "green", "purple"];
let correctSequence = [];
let playerSequence = [null, null, null, null, null];

let dragTimer = null; // Timer for press-and-hold
let currentCup = null; // Track which cup is being held

// 🎲 Generate Random Sequence
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
        cup.dataset.color = color;
        cup.draggable = false; // Initially NOT draggable

        // 🕐 Press-and-Hold to Drag
        cup.addEventListener("mousedown", (e) => {
            dragTimer = setTimeout(() => {
                cup.draggable = true; // Enable dragging after 1 second
                currentCup = cup; // Store current cup
                cup.style.transform = "scale(1.2)";
            }, 1000); // 1 second hold
        });

        // 🛑 Cancel if Released Early
        cup.addEventListener("mouseup", () => {
            clearTimeout(dragTimer);
        });

        cup.addEventListener("dragstart", (e) => {
            if (cup.draggable) {
                e.dataTransfer.setData("color", cup.dataset.color);
                console.log("Dragging:", cup.dataset.color);
            } else {
                e.preventDefault(); // Stop dragging if not held long enough
            }
        });

        cup.addEventListener("dragend", () => {
            cup.style.transform = "scale(1)";
            cup.draggable = false; // Reset dragging after drop
        });

        cupContainer.appendChild(cup);
    });
}

// 🏗️ Setup Drop Slots
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    slot.addEventListener("drop", (e) => {
        e.preventDefault();
        let color = e.dataTransfer.getData("color");

        if (color && currentCup) {
            slot.style.backgroundColor = color;
            slot.dataset.color = color;

            let index = slot.dataset.index;
            playerSequence[index] = color; // Store the dropped color

            console.log(`Dropped ${color} into slot ${index}`);

            currentCup.style.display = "none"; // Hide the cup after dropping
            currentCup = null; // Reset current cup
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
