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

    var note = "Signal clean. The Weave holds. You are readable.";
    if (csi < 30) note = "Severe fragmentation. The story holding you together is under strain.";
    else if (csi < 45) note = "Narrative load too high. You are losing the thread of yourself.";
    else if (csi < 60) note = "Partial coherence. The method still works — but you are not fully present.";
    else if (csi < 75) note = "Stable. You are inside the story and it is holding.";
    else note = "High clarity. You see the edges. He would find this worth noting.";
    csiNote.textContent = note;
  }

  sleepRange.addEventListener("input", updateCSI);
  focusRange.addEventListener("input", updateCSI);
  socialRange.addEventListener("input", updateCSI);
  updateCSI();
}
