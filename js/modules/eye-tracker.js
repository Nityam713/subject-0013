export function initEyeTracker() {
  var pupil = document.getElementById("pupilGroup");
  var eyeContainer = document.getElementById("eyeContainer");
  if (!pupil || !eyeContainer) return;

  var irisCx = 100;
  var irisCy = 60;
  var irisRx = 76 * 0.45;
  var irisRy = 40 * 0.45;
  var maxDist = Math.min(irisRx, irisRy) - 8;
  var isMobile = window.matchMedia("(max-width: 760px)").matches;

  function setPupilPosition(locX, locY) {
    var loc = { x: locX, y: locY };
    var dx = loc.x - irisCx;
    var dy = loc.y - irisCy;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var clamped = Math.min(len, maxDist);
    var nx = (dx / len) * clamped;
    var ny = (dy / len) * clamped;
    pupil.setAttribute("transform", "translate(" + (irisCx + nx) + "," + (irisCy + ny) + ")");
  }

  function updatePupilByPointer(clientX, clientY) {
    var svg = eyeContainer.querySelector("svg");
    var pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    var ctm = svg.getScreenCTM();
    if (!ctm) return;
    var loc = pt.matrixTransform(ctm.inverse());
    setPupilPosition(loc.x, loc.y);
  }

  if (!isMobile) {
    document.addEventListener("mousemove", function (event) {
      updatePupilByPointer(event.clientX, event.clientY);
    });
    document.addEventListener("touchmove", function (event) {
      if (event.touches.length) {
        updatePupilByPointer(event.touches[0].clientX, event.touches[0].clientY);
      }
    }, { passive: true });
    return;
  }

  function applyGyro(beta, gamma) {
    var normalizedX = Math.max(-1, Math.min(1, gamma / 35));
    var normalizedY = Math.max(-1, Math.min(1, beta / 35));
    setPupilPosition(irisCx + normalizedX * maxDist, irisCy + normalizedY * maxDist);
  }

  function handleOrientation(event) {
    if (typeof event.beta !== "number" || typeof event.gamma !== "number") return;
    applyGyro(event.beta, event.gamma);
  }

  if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === "function") {
    document.addEventListener("click", function oneTapPermission() {
      window.DeviceOrientationEvent.requestPermission()
        .then(function (state) {
          if (state === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(function () {})
        .finally(function () {
          document.removeEventListener("click", oneTapPermission);
        });
    }, { once: true });
  } else if ("DeviceOrientationEvent" in window) {
    window.addEventListener("deviceorientation", handleOrientation);
  } else {
    document.addEventListener("touchmove", function (event) {
      if (event.touches.length) {
        updatePupilByPointer(event.touches[0].clientX, event.touches[0].clientY);
      }
    }, { passive: true });
  }
}
