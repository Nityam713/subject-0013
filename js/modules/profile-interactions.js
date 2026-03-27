export function initProfileInteractions() {
  if (document.body.getAttribute("data-page") !== "profile") return;

  var sleepRange = document.getElementById("sleepRange");
  var focusRange = document.getElementById("focusRange");
  var socialRange = document.getElementById("socialRange");
  var csiValue = document.getElementById("csiValue");
  var csiNote = document.getElementById("csiNote");
  if (!sleepRange || !focusRange || !socialRange || !csiValue || !csiNote) return;

  function updateCSI() {
    var sleep = Number(sleepRange.value);
    var focus = Number(focusRange.value);
    var social = Number(socialRange.value);
    var csi = Math.max(0, Math.min(100, Math.round(sleep * 0.35 + focus * 0.45 + (100 - social) * 0.2)));
    csiValue.textContent = String(csi);

    var note = "Baseline stable. Variance accepted.";
    if (csi < 45) note = "Instability detected. Reduce social load and recover sleep.";
    if (csi >= 45 && csi < 70) note = "Moderate drift. Execution quality may fluctuate.";
    if (csi >= 70) note = "High coherence. Suitable for high-risk decisions.";
    csiNote.textContent = note;
  }

  sleepRange.addEventListener("input", updateCSI);
  focusRange.addEventListener("input", updateCSI);
  socialRange.addEventListener("input", updateCSI);
  updateCSI();
}
