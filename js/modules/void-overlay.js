export function initVoidOverlay() {
  var overlay = document.getElementById("voidOverlay");
  var submitThought = document.getElementById("submitThought");
  var closeBtn = document.getElementById("voidNo");
  var yesBtn = document.getElementById("voidYes");
  if (!overlay || !submitThought || !closeBtn || !yesBtn) return;

  submitThought.addEventListener("click", function () {
    overlay.hidden = false;
    overlay.classList.add("open");
    document.getElementById("voidQuestion").textContent = "Are you sure you want to know?";
  });

  closeBtn.addEventListener("click", function () {
    overlay.classList.remove("open");
    overlay.hidden = true;
  });

  yesBtn.addEventListener("click", function () {
    document.body.classList.add("glitch-active");
    overlay.classList.remove("open");
    overlay.hidden = true;
    setTimeout(function () {
      document.body.classList.remove("glitch-active");
    }, 1400);
  });
}
