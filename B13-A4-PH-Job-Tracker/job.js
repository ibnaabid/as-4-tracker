let interviewCount = [];
let rejectedCount = [];

let cardsContainer = document.getElementById("allcards");
let filterContainer = document.getElementById("filter-section");
const emptyMessage = document.getElementById("empty-message");

let totalValue = document.getElementById("totalvalue");
let interviewValue = document.getElementById("interviewvalue");
let rejectedValue = document.getElementById("rejectedvalue");

let totalBtn = document.getElementById("totalBtn");
let interviewBtn = document.getElementById("interviewBtn");
let rejectedBtn = document.getElementById("rejectedBtn");


let interviewContainer = document.createElement("div");
let rejectedContainer = document.createElement("div");
interviewContainer.id = "interviewContainer";
rejectedContainer.id = "rejectedContainer";
interviewContainer.classList.add("hidden");
rejectedContainer.classList.add("hidden");
filterContainer.appendChild(interviewContainer);
filterContainer.appendChild(rejectedContainer);

function count() {
  totalValue.innerText = document.querySelectorAll(".job-card").length;
  interviewValue.innerText = interviewCount.length;
  rejectedValue.innerText = rejectedCount.length;
}

function toggle(id) {
  [totalBtn, interviewBtn, rejectedBtn].forEach(btn => btn.classList.remove("bg-violet-400", "text-white"));
  document.getElementById(id).classList.add("bg-violet-400", "text-white");

  if (id === "totalBtn") {
    cardsContainer.style.display = "block";
    filterContainer.style.display = "none";
  } else {
    cardsContainer.style.display = "none";
    filterContainer.style.display = "block";

    if (id === "interviewBtn") {
      interviewContainer.innerHTML = "";
      interviewCount.forEach(card => interviewContainer.appendChild(card));
      interviewContainer.classList.remove("hidden");
      rejectedContainer.classList.add("hidden");
      checkEmpty("interview");
    } else if (id === "rejectedBtn") {
      rejectedContainer.innerHTML = "";
      rejectedCount.forEach(card => rejectedContainer.appendChild(card));
      rejectedContainer.classList.remove("hidden");
      interviewContainer.classList.add("hidden");
      checkEmpty("rejected");
    }
  }
}


cardsContainer.addEventListener("click", function(e) {
  const parentCard = e.target.closest(".job-card");
  if (!parentCard) return;

  if (e.target.classList.contains("fa-trash-can")) {
    interviewCount = interviewCount.filter(c => c !== parentCard);
    rejectedCount = rejectedCount.filter(c => c !== parentCard);
    parentCard.remove();
    count();
    return;
  }

  if (e.target.classList.contains("btn1")) {
    if (!interviewCount.includes(parentCard)) {
      interviewCount.push(parentCard);
      parentCard.dataset.status = "interview";
    }
    rejectedCount = rejectedCount.filter(c => c !== parentCard);
    parentCard.querySelector(".btn").innerText = "Applied";
    count();
  }

  if (e.target.classList.contains("btn2")) {
    if (!rejectedCount.includes(parentCard)) {
      rejectedCount.push(parentCard);
      parentCard.dataset.status = "rejected";
    }
    interviewCount = interviewCount.filter(c => c !== parentCard);
    parentCard.querySelector(".btn").innerText = "Rejected";
    count();
  }
});

count();