export function initClinicalNavigation() {
  var audioContext = null;

  function playClickSound() {
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      var oscillator = audioContext.createOscillator();
      var gain = audioContext.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(1180, audioContext.currentTime);
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.02, audioContext.currentTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.045);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      // Ignore unavailable audio contexts.
    }
  }

  document.querySelectorAll(".clinical-link").forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      link.classList.remove("glitch-hover");
      void link.offsetWidth;
      link.classList.add("glitch-hover");
      playClickSound();
    });
  });
}
