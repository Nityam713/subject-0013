export function initMatrixTelemetry() {
  var page = document.body.getAttribute("data-page");
  var cardsContainer = document.querySelector(".cards");
  if (!cardsContainer) return;

  setInterval(function () {
    var liveValues = cardsContainer.querySelectorAll(".live-value");
    if (!liveValues.length) return;
    liveValues.forEach(function (node) {
      var base = Number(node.getAttribute("data-base")) || 50;
      var next = Math.max(2, Math.min(99, base + Math.floor(Math.random() * 9) - 4));
      node.textContent = String(next);
    });
  }, 1100);

  var holdTimer = null;
  var activeCard = null;

  function startPeek(card) {
    holdTimer = setTimeout(function () {
      card.classList.add("peek");
      activeCard = card;
    }, 380);
  }

  function clearPeek() {
    clearTimeout(holdTimer);
    if (activeCard) {
      activeCard.classList.remove("peek");
      activeCard = null;
    }
  }

  cardsContainer.addEventListener("touchstart", function (event) {
    var card = event.target.closest(".card");
    if (!card) return;
    startPeek(card);
  }, { passive: true });

  cardsContainer.addEventListener("touchend", clearPeek, { passive: true });
  cardsContainer.addEventListener("touchcancel", clearPeek, { passive: true });

  function cloneCardForFeed(card) {
    var clone = card.cloneNode(true);
    clone.querySelectorAll(".live-value").forEach(function (node) {
      if (!node.getAttribute("data-base")) {
        node.setAttribute("data-base", node.textContent.trim() || "50");
      }
    });
    return clone;
  }

  var cloning = false;
  window.addEventListener("scroll", function () {
    if (page !== "home") return;
    if (!window.matchMedia("(max-width: 760px)").matches || cloning) return;
    if (window.innerHeight + window.scrollY < document.body.offsetHeight - 320) return;
    cloning = true;
    var sourceCards = Array.from(cardsContainer.children).slice(0, 3);
    sourceCards.forEach(function (card) {
      cardsContainer.appendChild(cloneCardForFeed(card));
    });
    setTimeout(function () {
      cloning = false;
    }, 250);
  }, { passive: true });
}
