export function initObserverBackground(store) {
  function applyObserverTone() {
    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.min(1, window.scrollY / maxScroll);
    /* Bone (#f5f3ef = 245,243,239) darkens slightly as reader scrolls deeper */
    var r = Math.round(245 - progress * 18);
    var g = Math.round(243 - progress * 18);
    var b = Math.round(239 - progress * 16);
    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    store.setState({ scrollDepth: Math.round(progress * 100) });
  }

  window.addEventListener("scroll", applyObserverTone, { passive: true });
  applyObserverTone();
}
