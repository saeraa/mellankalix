const modal = document.querySelector("#modal-Id");
const signUp = document.querySelector("#sign-up");
const closeModal = document.querySelector(".close");
const cancel = document.querySelector(".cancel-btn");
const form = document.querySelector(".modal-content");
const modalContainer = document.querySelector(".container");

signUp.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

cancel.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function returnText() {
  let input = document.querySelector("#input-name").value;
  const thankYou = `Tack ${input} för din anmälning!`;

  modalContainer.innerHTML = thankYou;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  returnText();
});