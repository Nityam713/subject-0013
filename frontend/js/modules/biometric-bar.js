export function initBiometricBar(store) {
  var depthValue = document.getElementById("depthValue");
  var timeValue = document.getElementById("timeValue");
  var loadValue = document.getElementById("loadValue");
  var stateValue = document.getElementById("stateValue");
  var actionValue = document.getElementById("actionValue");
  var stressPath = document.getElementById("stressPath");
  var ticker = document.getElementById("bioTicker");
  if (!depthValue || !timeValue || !stressPath || !ticker) return;

  var mouseSpeed = 0;
  var lastX = 0;
  var lastY = 0;
  var lastTime = performance.now();
  var stressBase = 24;
  var actions = 0;

  store.subscribe(function (state) {
    depthValue.textContent = String(state.scrollDepth);
    if (loadValue) {
      var loadIndex = Math.max(0, Math.min(100, Math.round(state.mouseSpeed * 42 + state.scrollDepth * 0.35)));
      loadValue.textContent = String(loadIndex);
    }
    if (stateValue) {
      var sessionState = "Stable";
      if (state.mouseSpeed > 1.5 || state.scrollDepth > 80) sessionState = "Escalating";
      else if (state.mouseSpeed > 0.8 || state.scrollDepth > 45) sessionState = "Scanning";
      stateValue.textContent = sessionState;
    }
    if (actionValue) {
      actionValue.textContent = String(actions);
    }
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

  document.addEventListener("click", function (event) {
    if (event.target.closest("a, button")) {
      actions += 1;
      if (actionValue) actionValue.textContent = String(actions);
    }
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
