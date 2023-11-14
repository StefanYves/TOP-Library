const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.update = function () {
  if (this.read === "Yes") {
    this.read = "No";
    console.log(this.read);
  } else if (this.read === "No") {
    this.read = "Yes";
    console.log(this.read);
  }
};

const formClass = document.getElementById("form");
const overlay = document.getElementById("overlay");
const container = document.getElementById("container");

container.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("update")) {
    const cardToUpdate = target.closest(".book-card");
    const cardIndex = cardToUpdate.dataset.index;

    if (cardIndex !== undefined) {
      myLibrary[cardIndex].update();
      const readStatus = cardToUpdate.querySelector(".read-status");
      readStatus.textContent = `Have you read it: ${myLibrary[cardIndex].read}`;
    }
  } else if (target.classList.contains("delete")) {
    const cardToDelete = target.closest(".book-card");
    const cardIndex = cardToDelete.dataset.index;

    if (cardIndex !== undefined) {
      container.removeChild(cardToDelete);
      myLibrary.splice(cardIndex, 1);
      // Update data-index for remaining cards
      const allCards = container.querySelectorAll(".book-card");
      allCards.forEach((card, index) => {
        card.dataset.index = index;
      });
    }
  }
});

const form = document
  .querySelector("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(myLibrary);

    const bookIndex = myLibrary.length - 1;
    console.log(`BookIndex: ${bookIndex}`);

    const newDiv = document.createElement("div");
    newDiv.classList.add(
      "book-card",
      "read-book",
      "shadow-lg",
      "w-1/3",
      "m-auto",
      "mt-10",
      "bg-white",
      "rounded-lg"
    );
    newDiv.dataset.index = bookIndex;

    newDiv.innerHTML = `
    <div class="flex flex-col ml-5 mr-5 mt-2 mb-2 font-roboto font-bold">
    <h1 class="text-2xl">Title: ${title}</h1>
    <p>Author: ${author}</p>
    <p>Pages: ${pages}</p>
    <p class="read-status">Have you read it: ${read}</p>
    <button class="update bg-green-300 rounded-lg mb-2" id="class">Update</button>
    <button class="delete bg-red-300 rounded-lg">Delete</button>
    </div>
    `;

    container.appendChild(newDiv);
    formClass.classList.add("hidden");
    overlay.classList.add("hidden");
  });

const addBook = document.getElementById("addBook");
addBook.addEventListener("click", (e) => {
  formClass.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
