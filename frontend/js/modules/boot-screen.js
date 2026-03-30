export function initBootScreen() {
  var screen = document.getElementById("bootScreen");
  var lineA = document.getElementById("bootLineA");
  var lineB = document.getElementById("bootLineB");
  if (!screen || !lineA || !lineB) return;

  lineA.classList.add("boot-line-visible");
  setTimeout(function () {
    lineB.classList.add("boot-line-visible");
  }, 650);

  setTimeout(function () {
    screen.classList.add("done");
  }, 1500);
}
