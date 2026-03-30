export function initMatrixTelemetry() {
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
}
