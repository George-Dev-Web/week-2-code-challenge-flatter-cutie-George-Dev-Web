document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/characters";
  const characterBar = document.getElementById("character-bar");
  const nameElement = document.getElementById("name");
  const imageElement = document.getElementById("image");
  const voteCountElement = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const votesInput = document.getElementById("votes");
  const resetButton = document.getElementById("reset-btn");

  let currentCharacter = null;

  // Fetch and display characters in the character bar
  fetch(baseURL)
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacter(character));
        characterBar.appendChild(span);
      });
    })
    .catch((error) => console.error("Error fetching characters:", error));

  // Function to display selected character details
  function displayCharacter(character) {
    currentCharacter = character;
    nameElement.textContent = character.name;
    imageElement.src = character.image;
    voteCountElement.textContent = character.votes;
    console.log(`Selected: ${character.name}, Votes: ${character.votes}`);
  }

  // Handle votes submission
  votesForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    if (!currentCharacter) return;

    const newVotes = parseInt(votesInput.value) || 0; // Get the entered votes
    currentCharacter.votes += newVotes; // Update vote count
    voteCountElement.textContent = currentCharacter.votes; // Display updated votes
    console.log(`+${newVotes} votes for ${currentCharacter.name}`);
    votesInput.value = ""; // Clear input field
  });

  // Handle resetting votes
  resetButton.addEventListener("click", () => {
    if (!currentCharacter) return;
    currentCharacter.votes = 0; // Reset votes to zero
    voteCountElement.textContent = "0"; // Update UI
    console.log(`Votes reset for ${currentCharacter.name}`);
  });
});
