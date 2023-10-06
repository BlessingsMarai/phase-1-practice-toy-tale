let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// Fetch Andy's Toys
async function fetchToys() {
  const response = await fetch("http://localhost:3000/toys");
  const toys = await response.json();

  // Render toys to DOM
  const toyCollection = document.querySelector("#toy-collection");
  toys.forEach((toy) => {
    const toyCard = document.createElement("div");
    toyCard.classList.add("card");

    // Add toy name to card
    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;
    toyCard.appendChild(toyName);

    // Add toy image to card
    const toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.classList.add("toy-avatar");
    toyCard.appendChild(toyImage);

    // Add toy likes to card
    const toyLikes = document.createElement("p");
    toyLikes.textContent = `${toy.likes} Likes`;
    toyCard.appendChild(toyLikes);

    // Add like button to card
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-btn");
    likeButton.id = toy.id;
    likeButton.textContent = "Like ❤️";

    // Add event listener to like button
    likeButton.addEventListener("click", async () => {
      // Increment toy likes
      const newLikes = toy.likes + 1;

      // Send PATCH request to update toy likes
      const response = await fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: newLikes,
        }),
      });

      // If PATCH request is successful, update toy likes in DOM
      if (response.ok) {
        // Get updated toy data from response
        const toy = await response.json();

        // Update toy likes in DOM
        toyLikes.textContent = `${toy.likes} Likes`;
      }
    });

    // Append like button to card
    toyCard.appendChild(likeButton);

    // Append toy card to DOM
    toyCollection.appendChild(toyCard);
  });
}

window.onload = () => {
  fetchToys();
};
