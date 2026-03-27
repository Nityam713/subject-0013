export function initDecisionSimulator() {
  var resultEl = document.getElementById("simResult");
  var btnYes = document.getElementById("btnYes");
  var btnNo = document.getElementById("btnNo");
  if (!resultEl || !btnYes || !btnNo) return;

  var yesOutcomes = [
    "Result: Throughput +38%. Cost: sleep debt +14%; interpersonal bandwidth -9%. Net: positive under quarterly lens.",
    "Result: Regret expectancy down 19% (modeled). New failure surface: reputation in slow-burn scenarios.",
    "Result: Optionality preserved. Liquidity buffer required: +2.1 months runway to stay within tolerance.",
    "Result: Social isolation +12%. Efficiency gained: 40%. Affect flatline risk: elevated."
  ];

  var noOutcomes = [
    "Result: Status quo bias reinforced. Opportunity cost accrues ~0.7% per week (estimated).",
    "Result: Safety margin widened. Stagnation index +11%. Relief measurable; growth curve flattened.",
    "Result: Deferred decision logged. Cognitive load -8% short-term; compound uncertainty + later.",
    "Result: Risk avoided. Counterfactual upside censored. Emotional temperature: stable."
  ];

  function setPressed(yes) {
    btnYes.setAttribute("aria-pressed", yes ? "true" : "false");
    btnNo.setAttribute("aria-pressed", yes ? "false" : "true");
  }

  function randomPick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  btnYes.addEventListener("click", function () {
    setPressed(true);
    resultEl.classList.remove("empty");
    resultEl.textContent = randomPick(yesOutcomes);
  });

  btnNo.addEventListener("click", function () {
    setPressed(false);
    resultEl.classList.remove("empty");
    resultEl.textContent = randomPick(noOutcomes);
  });
}
