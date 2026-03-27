export function initRiskModal() {
  var riskModal = document.getElementById("riskModal");
  var staticOverlay = document.getElementById("staticOverlay");
  var recalculateBtn = document.getElementById("riskRecalculate");
  var acceptBtn = document.getElementById("riskAccept");
  if (!riskModal || !staticOverlay || !recalculateBtn || !acceptBtn) return;

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest(".risk-btn");
    if (!trigger) return;
    if (window.matchMedia("(max-width: 760px)").matches && navigator.vibrate) {
      navigator.vibrate(35);
    }
    riskModal.hidden = false;
    riskModal.classList.add("open");
  });

  recalculateBtn.addEventListener("click", function () {
    riskModal.classList.remove("open");
    riskModal.hidden = true;
  });

  acceptBtn.addEventListener("click", function () {
    riskModal.classList.remove("open");
    riskModal.hidden = true;
    document.body.classList.add("static-active");
    staticOverlay.classList.add("active");
    setTimeout(function () {
      staticOverlay.classList.remove("active");
      document.body.classList.remove("static-active");
      window.location.href = "#origin";
    }, 500);
  });
}
