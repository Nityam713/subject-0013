export function initObserverBackground(store) {
  function applyObserverTone() {
    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.min(1, window.scrollY / maxScroll);
    var tone = Math.round(255 - progress * 13);
    document.body.style.backgroundColor = "rgb(" + tone + "," + tone + "," + tone + ")";
    store.setState({ scrollDepth: Math.round(progress * 100) });
  }

  window.addEventListener("scroll", applyObserverTone, { passive: true });
  applyObserverTone();
}
