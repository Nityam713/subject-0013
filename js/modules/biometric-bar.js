export function initBiometricBar(store) {
  var depthValue = document.getElementById("depthValue");
  var timeValue = document.getElementById("timeValue");
  var stressPath = document.getElementById("stressPath");
  var ticker = document.getElementById("bioTicker");
  if (!depthValue || !timeValue || !stressPath || !ticker) return;

  var mouseSpeed = 0;
  var lastX = 0;
  var lastY = 0;
  var lastTime = performance.now();
  var stressBase = 24;

  store.subscribe(function (state) {
    depthValue.textContent = String(state.scrollDepth);
    var stressLabel = state.mouseSpeed > 1 ? "elevated" : "nominal";
    ticker.setAttribute(
      "data-ticker",
      "Status: Subject Analyzing... Stress Level: " + stressLabel + "... Depth Reading: " + state.scrollDepth + "%..."
    );
  });

  setInterval(function () {
    var elapsed = Math.floor((Date.now() - store.getState().startedAt) / 1000);
    var min = String(Math.floor(elapsed / 60)).padStart(2, "0");
    var sec = String(elapsed % 60).padStart(2, "0");
    timeValue.textContent = min + ":" + sec;
  }, 1000);

  document.addEventListener("mousemove", function (event) {
    var now = performance.now();
    var dt = Math.max(16, now - lastTime);
    var dx = event.clientX - lastX;
    var dy = event.clientY - lastY;
    var velocity = Math.sqrt(dx * dx + dy * dy) / dt;
    mouseSpeed = mouseSpeed * 0.7 + velocity * 0.3;
    store.setState({ mouseSpeed });
    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = now;
  });

  setInterval(function () {
    var amplitude = Math.min(18, 3 + store.getState().mouseSpeed * 30);
    var x = 0;
    var points = ["M0 " + stressBase];
    while (x < 180) {
      x += 12;
      var y = stressBase + (Math.random() * amplitude * 2 - amplitude);
      points.push("L" + x + " " + Math.max(4, Math.min(45, Math.round(y))));
    }
    stressPath.setAttribute("d", points.join(" "));
  }, 220);
}
