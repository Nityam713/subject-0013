export function initVoidOverlay() {
  var overlay = document.getElementById("voidOverlay");
  var submitThought = document.getElementById("submitThought");
  var questionEl = document.getElementById("voidQuestion");
  var actionsEl = document.getElementById("voidActions");
  if (!overlay || !submitThought || !questionEl || !actionsEl) return;

  var audioCtx = null;

  function getAudioCtx() {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  var soundIndex = 0;

  var soundBank = [
    /* 0 — Static burst + sub thud: the default "filed" sound */
    function (ctx, now, master) {
      var buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      var src = ctx.createBufferSource(); src.buffer = buf;
      var flt = ctx.createBiquadFilter(); flt.type = "bandpass"; flt.frequency.value = 1800; flt.Q.value = 0.7;
      var g = ctx.createGain(); g.gain.setValueAtTime(0.5, now); g.gain.linearRampToValueAtTime(0, now + 0.3);
      src.connect(flt); flt.connect(g); g.connect(master); src.start(now);
      var sub = ctx.createOscillator(); sub.type = "sine"; sub.frequency.setValueAtTime(55, now); sub.frequency.linearRampToValueAtTime(22, now + 0.8);
      var sg = ctx.createGain(); sg.gain.setValueAtTime(0.25, now + 0.05); sg.gain.linearRampToValueAtTime(0, now + 0.8);
      sub.connect(sg); sg.connect(master); sub.start(now + 0.05); sub.stop(now + 0.85);
    },
    /* 1 — Descending digital scream: three pitches falling fast */
    function (ctx, now, master) {
      [0, 0.07, 0.14].forEach(function (t, i) {
        var o = ctx.createOscillator(); o.type = "sawtooth";
        o.frequency.setValueAtTime(2400 - i * 500, now + t);
        o.frequency.exponentialRampToValueAtTime(60, now + t + 0.18);
        var g = ctx.createGain(); g.gain.setValueAtTime(0.12, now + t); g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.2);
        o.connect(g); g.connect(master); o.start(now + t); o.stop(now + t + 0.22);
      });
    },
    /* 2 — Long eerie drone: sine fading in and out slowly */
    function (ctx, now, master) {
      var o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(110, now); o.frequency.linearRampToValueAtTime(82, now + 2.2);
      var g = ctx.createGain(); g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(0.12, now + 0.4); g.gain.linearRampToValueAtTime(0.06, now + 1.6); g.gain.linearRampToValueAtTime(0, now + 2.2);
      o.connect(g); g.connect(master); o.start(now); o.stop(now + 2.25);
      var hi = ctx.createOscillator(); hi.type = "sine"; hi.frequency.setValueAtTime(2200, now + 0.3); hi.frequency.linearRampToValueAtTime(1400, now + 2.0);
      var hg = ctx.createGain(); hg.gain.setValueAtTime(0, now + 0.3); hg.gain.linearRampToValueAtTime(0.025, now + 0.6); hg.gain.linearRampToValueAtTime(0, now + 2.0);
      hi.connect(hg); hg.connect(master); hi.start(now + 0.3); hi.stop(now + 2.05);
    },
    /* 3 — Mechanical typewriter click sequence: 5 rapid taps */
    function (ctx, now, master) {
      [0, 0.06, 0.13, 0.21, 0.3].forEach(function (t) {
        var o = ctx.createOscillator(); o.type = "square"; o.frequency.setValueAtTime(900, now + t); o.frequency.exponentialRampToValueAtTime(200, now + t + 0.04);
        var g = ctx.createGain(); g.gain.setValueAtTime(0.09, now + t); g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.05);
        o.connect(g); g.connect(master); o.start(now + t); o.stop(now + t + 0.06);
      });
    },
    /* 4 — Radio interference sweep: noise swept across the spectrum */
    function (ctx, now, master) {
      var buf = ctx.createBuffer(1, ctx.sampleRate * 1.2, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      var src = ctx.createBufferSource(); src.buffer = buf;
      var flt = ctx.createBiquadFilter(); flt.type = "bandpass"; flt.Q.value = 4;
      flt.frequency.setValueAtTime(200, now); flt.frequency.exponentialRampToValueAtTime(8000, now + 0.6); flt.frequency.exponentialRampToValueAtTime(300, now + 1.2);
      var g = ctx.createGain(); g.gain.setValueAtTime(0.35, now); g.gain.linearRampToValueAtTime(0.1, now + 0.8); g.gain.linearRampToValueAtTime(0, now + 1.2);
      src.connect(flt); flt.connect(g); g.connect(master); src.start(now);
    },
    /* 5 — Deep impact boom: sub punch with high crack */
    function (ctx, now, master) {
      var o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(80, now); o.frequency.exponentialRampToValueAtTime(20, now + 0.5);
      var g = ctx.createGain(); g.gain.setValueAtTime(0.5, now); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      o.connect(g); g.connect(master); o.start(now); o.stop(now + 0.55);
      var buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      var src = ctx.createBufferSource(); src.buffer = buf;
      var ng = ctx.createGain(); ng.gain.setValueAtTime(0.4, now); ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      src.connect(ng); ng.connect(master); src.start(now);
    },
    /* 6 — Glitching heartbeat: two pulses, irregular */
    function (ctx, now, master) {
      [0, 0.22, 0.28, 0.62].forEach(function (t, i) {
        var o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(i % 2 === 0 ? 48 : 38, now + t);
        var g = ctx.createGain(); g.gain.setValueAtTime(0, now + t); g.gain.linearRampToValueAtTime(0.3, now + t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.18);
        o.connect(g); g.connect(master); o.start(now + t); o.stop(now + t + 0.2);
      });
    },
    /* 7 — Tape rewind screech: fast upward pitch sweep */
    function (ctx, now, master) {
      var o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.setValueAtTime(80, now); o.frequency.exponentialRampToValueAtTime(4000, now + 0.35);
      var g = ctx.createGain(); g.gain.setValueAtTime(0.08, now); g.gain.linearRampToValueAtTime(0.14, now + 0.2); g.gain.linearRampToValueAtTime(0, now + 0.38);
      var flt = ctx.createBiquadFilter(); flt.type = "highpass"; flt.frequency.value = 400;
      o.connect(flt); flt.connect(g); g.connect(master); o.start(now); o.stop(now + 0.4);
    },
    /* 8 — Crackle and silence: sparse random pops like a dying signal */
    function (ctx, now, master) {
      var times = [0, 0.08, 0.09, 0.22, 0.38, 0.39, 0.55, 0.7];
      times.forEach(function (t) {
        var buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.018), ctx.sampleRate);
        var d = buf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        var src = ctx.createBufferSource(); src.buffer = buf;
        var g = ctx.createGain(); g.gain.setValueAtTime(0.25 + Math.random() * 0.2, now + t);
        src.connect(g); g.connect(master); src.start(now + t);
      });
    },
    /* 9 — Low frequency hum with harmonic distortion: the Weave under strain */
    function (ctx, now, master) {
      var o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(60, now);
      var wave = ctx.createWaveShaper();
      var curve = new Float32Array(256);
      for (var i = 0; i < 256; i++) { var x = (i * 2) / 256 - 1; curve[i] = (Math.PI + 180) * x / (Math.PI + 180 * Math.abs(x)); }
      wave.curve = curve; wave.oversample = "4x";
      var g = ctx.createGain(); g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(0.18, now + 0.2); g.gain.linearRampToValueAtTime(0.1, now + 1.4); g.gain.linearRampToValueAtTime(0, now + 2.0);
      o.connect(wave); wave.connect(g); g.connect(master); o.start(now); o.stop(now + 2.05);
      var o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.setValueAtTime(180, now);
      var g2 = ctx.createGain(); g2.gain.setValueAtTime(0, now); g2.gain.linearRampToValueAtTime(0.04, now + 0.3); g2.gain.linearRampToValueAtTime(0, now + 1.8);
      o2.connect(g2); g2.connect(master); o2.start(now); o2.stop(now + 1.85);
    }
  ];

  function playReceiptTone() {
    try {
      var ctx = getAudioCtx();
      var now = ctx.currentTime;
      var master = ctx.createGain();
      master.gain.setValueAtTime(0.7, now);
      master.connect(ctx.destination);
      soundBank[soundIndex % soundBank.length](ctx, now, master);
      soundIndex++;
    } catch (e) {
      /* Ignore unavailable audio contexts */
    }
  }

  var responses = [
    "Noted. Filed under: things people say when they think someone is listening.",
    "Received. The hypothesis updates accordingly.",
    "Logged. You are more predictable than you intended to be.",
    "Confirmed. I had already written this down.",
    "Filed. You are not the first to say this. You will not be the last.",
    "Recorded. The pattern holds.",
    "Noted. This changes nothing. It also changes everything. I have not decided which.",
    "Received. I was wondering when you would say it."
  ];

  function openOverlay() {
    questionEl.textContent = "Say it. I am listening.";
    actionsEl.innerHTML =
      '<button type="button" class="primary" id="voidYes">Say it.</button>' +
      '<button type="button" id="voidNo">Not yet.</button>';
    document.getElementById("voidYes").addEventListener("click", showInput);
    document.getElementById("voidNo").addEventListener("click", closeOverlay);
    overlay.hidden = false;
    overlay.classList.add("open");
  }

  function showInput() {
    questionEl.textContent = "";
    actionsEl.innerHTML =
      '<div class="void-input-wrap">' +
        '<input type="text" class="void-input" id="voidInput" placeholder="Type it." maxlength="140" autocomplete="off" />' +
        '<button type="button" class="primary" id="voidSend">Send.</button>' +
      '</div>';
    var input = document.getElementById("voidInput");
    var sendBtn = document.getElementById("voidSend");
    input.focus();
    sendBtn.addEventListener("click", function () { handleSend(input.value.trim()); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") handleSend(input.value.trim());
      if (e.key === "Escape") closeOverlay();
    });
  }

  function handleSend(text) {
    if (!text) return;
    var response = responses[Math.floor(Math.random() * responses.length)];
    questionEl.textContent = response;
    actionsEl.innerHTML = '<button type="button" id="voidNo">Close.</button>';
    document.getElementById("voidNo").addEventListener("click", function () {
      playReceiptTone();
      document.body.classList.add("glitch-active");
      closeOverlay();
      setTimeout(function () {
        document.body.classList.remove("glitch-active");
      }, 1400);
    });
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    overlay.hidden = true;
  }

  submitThought.addEventListener("click", openOverlay);
}
