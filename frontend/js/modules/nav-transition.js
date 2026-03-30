export function initNavTransition() {
  var bootScreen = document.getElementById("bootScreen");
  var bootLineA = document.getElementById("bootLineA");
  var bootLineB = document.getElementById("bootLineB");
  var storyLink = document.getElementById("storyLink");

  function ensureBootOverlay() {
    if (bootScreen && bootLineA && bootLineB) return;
    var overlay = document.createElement("div");
    overlay.className = "boot-screen done";
    overlay.id = "bootScreen";
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML =
      '<p class="boot-line boot-line-visible" id="bootLineA">INITIALIZING_AUDIT...</p>' +
      '<p class="boot-line boot-line-muted" id="bootLineB">SUBJECT_DETECTED.</p>';
    document.body.appendChild(overlay);
    bootScreen = overlay;
    bootLineA = document.getElementById("bootLineA");
    bootLineB = document.getElementById("bootLineB");
  }

  function runBootThenNavigate(href) {
    ensureBootOverlay();

    bootScreen.classList.remove("done");
    bootLineA.classList.add("boot-line-visible");
    bootLineB.classList.remove("boot-line-visible");

    setTimeout(function () {
      bootLineB.classList.add("boot-line-visible");
    }, 220);

    setTimeout(function () {
      window.location.href = href;
    }, 620);
  }

  document.querySelectorAll(".boot-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      var href = link.getAttribute("href");
      if (!href) return;
      runBootThenNavigate(href);
    });
  });

  if (storyLink) {
    storyLink.addEventListener("click", function (event) {
      event.preventDefault();
      storyLink.classList.remove("glitch-hover");
      void storyLink.offsetWidth;
      storyLink.classList.add("glitch-hover");
    });
  }
}
