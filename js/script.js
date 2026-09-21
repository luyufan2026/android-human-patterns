/* Minimal observation chrome. Layout is CSS Grid, not JS. */

function pad(n) {
  return String(n).padStart(2, "0");
}

function stamp() {
  const now = new Date();
  return (
    now.getFullYear() +
    "." +
    pad(now.getMonth() + 1) +
    "." +
    pad(now.getDate()) +
    "  " +
    pad(now.getHours()) +
    ":" +
    pad(now.getMinutes()) +
    ":" +
    pad(now.getSeconds())
  );
}

function tickClock() {
  document.querySelectorAll("[data-clock]").forEach(function (el) {
    el.textContent = stamp();
  });
}

function flickerConfidence() {
  document.querySelectorAll("[data-confidence]").forEach(function (el) {
    el.textContent = 74 + Math.floor(Math.random() * 7) + "%";
  });
}

tickClock();
window.setInterval(tickClock, 1000);

if (document.querySelector("[data-confidence]")) {
  window.setInterval(flickerConfidence, 2600);
}

(function () {
  var dialog = document.querySelector("[data-zoom]");
  if (!dialog) return;

  var frame = dialog.querySelector("img");
  var stills = document.querySelectorAll(
    ".board img, .model img, .feed img, .sim-frame img"
  );

  stills.forEach(function (img) {
    img.addEventListener("click", function () {
      frame.src = img.currentSrc || img.src;
      frame.alt = img.alt || "";
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });
})();

(function () {
  if (!document.body.classList.contains("page-causality")) return;

  var futures = ["stay", "leave", "laugh", "silence", "cry"];
  var replay = document.querySelector("[data-replay]");
  var frames = document.querySelectorAll("[data-future]");
  var i = 0;

  function tickReplay() {
    var word = futures[i % futures.length];
    if (replay) replay.textContent = word;
    frames.forEach(function (frame) {
      frame.classList.toggle(
        "is-live",
        frame.getAttribute("data-future") === word
      );
    });
    i += 1;
  }

  tickReplay();
  window.setInterval(tickReplay, 1100);

  window.setInterval(function () {
    document.querySelectorAll("[data-prob]").forEach(function (el) {
      var base = parseInt(el.getAttribute("data-prob"), 10);
      if (isNaN(base)) return;
      el.textContent =
        Math.max(1, base + Math.floor(Math.random() * 5) - 2) + "%";
    });
    document.querySelectorAll("[data-sim-conf]").forEach(function (el) {
      el.textContent = 38 + Math.floor(Math.random() * 7) + "%";
    });
    document.querySelectorAll("[data-vars]").forEach(function (el) {
      el.textContent = String(16 + Math.floor(Math.random() * 4));
    });
    document.querySelectorAll("[data-unknown]").forEach(function (el) {
      el.textContent = String(5 + Math.floor(Math.random() * 4));
    });
  }, 1400);
})();

(function () {
  if (!document.body.classList.contains("page-emotion")) return;

  var root = document.querySelector(".observe");
  var svg = document.querySelector(".net");
  var readout = document.querySelector("[data-readout]");
  if (!root || !svg || !readout) return;

  var statusEl = readout.querySelector("[data-status]");
  var bodyEl = readout.querySelector("[data-body]");
  var samples = Array.prototype.slice.call(document.querySelectorAll(".sample"));
  var subject = document.querySelector(".subject-back");
  var token = 0;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hub() {
    var r = subject.getBoundingClientRect();
    var o = root.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - o.left,
      y: r.top + r.height * 0.18 - o.top
    };
  }

  function drawNet() {
    var o = root.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + Math.max(1, o.width) + " " + Math.max(1, o.height));
    var h = hub();
    var html = '<circle cx="' + h.x + '" cy="' + h.y + '" r="2"></circle>';
    samples.forEach(function (s) {
      var b = s.getBoundingClientRect();
      var x = b.left + b.width / 2 - o.left;
      var y = b.top + b.height / 2 - o.top;
      html +=
        '<line x1="' +
        h.x +
        '" y1="' +
        h.y +
        '" x2="' +
        x +
        '" y2="' +
        y +
        '"></line><circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="1.3"></circle>';
    });
    svg.innerHTML = html;
  }

  function closeReadout() {
    token += 1;
    readout.hidden = true;
    samples.forEach(function (s) {
      s.classList.remove("is-on");
    });
  }

  function later(ms, my, fn) {
    window.setTimeout(function () {
      if (my !== token) return;
      fn();
    }, reduce ? 0 : ms);
  }

  function typeLine(el, text, my, done) {
    if (reduce) {
      el.textContent = text;
      done();
      return;
    }
    var i = 0;
    el.textContent = "";
    var t = window.setInterval(function () {
      if (my !== token) {
        window.clearInterval(t);
        return;
      }
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) {
        window.clearInterval(t);
        done();
      }
    }, 17);
  }

  function openSample(btn) {
    var my = ++token;
    samples.forEach(function (s) {
      s.classList.toggle("is-on", s === btn);
    });
    var fromLeft =
      btn.classList.contains("s-fear") ||
      btn.classList.contains("s-shock") ||
      btn.classList.contains("s-anger") ||
      btn.classList.contains("s-cam");
    readout.classList.toggle("readout--right", fromLeft);
    readout.classList.toggle("readout--left", !fromLeft);
    readout.hidden = false;
    statusEl.textContent = "ANALYZING...";
    bodyEl.innerHTML = "";

    var id = btn.getAttribute("data-id");
    var cls = btn.getAttribute("data-class");
    var conf = btn.getAttribute("data-conf");
    var note = btn.getAttribute("data-note") || "";

    later(420, my, function () {
      statusEl.textContent = "CLASSIFICATION RUNNING...";
    });

    later(980, my, function () {
      statusEl.innerHTML = 'Class locked<span class="cursor">_</span>';
      var metas = [
        "Sample <span>" + id + "</span>",
        "Class: <span>" + cls + "</span>",
        "Confidence: <span>" + conf + "%</span>"
      ];
      metas.forEach(function (html, i) {
        later(260 * (i + 1), my, function () {
          var p = document.createElement("p");
          p.className = "meta";
          p.innerHTML = html;
          bodyEl.appendChild(p);
        });
      });
      later(260 * 4, my, function () {
        var p = document.createElement("p");
        bodyEl.appendChild(p);
        typeLine(p, note, my, function () {});
      });
    });
  }

  samples.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("is-on") && !readout.hidden) {
        closeReadout();
        return;
      }
      openSample(btn);
    });
  });

  readout.querySelector(".readout-close").addEventListener("click", closeReadout);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeReadout();
  });

  drawNet();
  window.addEventListener("resize", drawNet);
})();
