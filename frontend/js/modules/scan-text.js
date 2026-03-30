export function initScanText() {
  var scanTargets = document.querySelectorAll(".scan-text");
  if (!scanTargets.length) return;

  scanTargets.forEach(function (element) {
    var lines = element.innerHTML.split("<br>");
    element.innerHTML = "";
    lines.forEach(function (line) {
      var span = document.createElement("span");
      span.textContent = line.trim();
      element.appendChild(span);
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.3 });

  scanTargets.forEach(function (element) {
    observer.observe(element);
  });
}
