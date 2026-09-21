/* ARU-07 — restrained archive behaviour. Layout is CSS Grid. */

function pad(n) {
  return String(n).padStart(2, "0");
}

function stamp() {
  var now = new Date();
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

tickClock();
window.setInterval(tickClock, 1000);

(function shards() {
  var root =
    document.querySelector(".catalog") ||
    document.querySelector(".night") ||
    document.querySelector(".forked") ||
    document.querySelector(".clip-board") ||
    document.querySelector(".memory-board");
  var readout = document.querySelector("[data-readout]");
  if (!root || !readout) return;

  var statusEl = readout.querySelector("[data-status]");
  var bodyEl = readout.querySelector("[data-body]");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".shard"));
  var token = 0;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    }, 16);
  }

  function closeReadout() {
    token += 1;
    readout.hidden = true;
    buttons.forEach(function (b) {
      b.classList.remove("is-on");
    });
  }

  function addMeta(html, cls) {
    var p = document.createElement("p");
    p.className = cls || "meta";
    p.innerHTML = html;
    bodyEl.appendChild(p);
    return p;
  }

  function pathNote(btn) {
    var active = document.querySelector(".path.is-on");
    if (!active) return "";
    var key = active.getAttribute("data-path");
    return btn.getAttribute("data-" + key) || "";
  }

  function openShard(btn) {
    var my = ++token;
    buttons.forEach(function (b) {
      b.classList.toggle("is-on", b === btn);
    });
    var box = btn.getBoundingClientRect();
    var fromLeft = box.left < window.innerWidth / 2;
    readout.classList.toggle("readout--right", fromLeft);
    readout.classList.toggle("readout--left", !fromLeft);
    readout.hidden = false;
    statusEl.textContent = "ACCESSING RECORD...";
    bodyEl.innerHTML = "";

    var id = btn.getAttribute("data-id") || "";
    var type = btn.getAttribute("data-type") || "";
    var date = btn.getAttribute("data-date") || "";
    var source = btn.getAttribute("data-source") || "";
    var note = btn.getAttribute("data-note") || pathNote(btn);
    var quote = btn.getAttribute("data-quote") || "";
    var conf = btn.getAttribute("data-conf") || "";
    var conflict = btn.getAttribute("data-flag") === "conflict";

    later(320, my, function () {
      statusEl.textContent = "VERIFYING SOURCE...";
    });
    later(780, my, function () {
      statusEl.textContent = "ANALYZING...";
    });
    later(1180, my, function () {
      statusEl.innerHTML = "Archive fragment " + id + '<span class="cursor">_</span>';
      addMeta("Type: <span>" + type + "</span>");
    });
    if (date) {
      later(1480, my, function () {
        addMeta("Date: <span>" + date + "</span>");
      });
    }
    if (source) {
      later(1720, my, function () {
        addMeta("Source: <span>" + source + "</span>");
      });
    }
    later(2040, my, function () {
      addMeta("System interpretation:");
    });
    later(2280, my, function () {
      var p = document.createElement("p");
      bodyEl.appendChild(p);
      typeLine(p, note, my, function () {});
    });
    if (quote) {
      later(2800, my, function () {
        var p = document.createElement("p");
        p.className = "quote";
        bodyEl.appendChild(p);
        typeLine(p, quote, my, function () {});
      });
    }
    if (conflict) {
      later(3200, my, function () {
        addMeta("Conflict detected", "warn");
      });
    }
    if (conf) {
      later(quote ? 3600 : 3000, my, function () {
        addMeta("Confidence: <span>" + conf + "%</span>");
      });
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("is-on") && !readout.hidden) {
        closeReadout();
        return;
      }
      openShard(btn);
    });
  });

  readout.querySelector(".readout-close").addEventListener("click", closeReadout);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeReadout();
  });
})();

(function models() {
  if (!document.body.classList.contains("page-none")) return;

  var copy = {
    a: {
      code: "Reading A",
      title: "Missing person",
      body:
        "The police file treats her as a woman who left and did not return. The photographs are evidence of a life, not of a performance.",
      coh: "High",
      ver: "Incomplete"
    },
    b: {
      code: "Reading B",
      title: "Last work",
      body:
        "The diary and the flyer can be read as a score. Disappearance is indexed as absence. It may have been the work.",
      coh: "High",
      ver: "Incomplete"
    },
    c: {
      code: "Reading C",
      title: "Copy, no original",
      body:
        "Each still is a print of a print. The file is complete. The source is not in the archive.",
      coh: "High",
      ver: "Impossible"
    },
    d: {
      code: "Reading D",
      title: "Unverified",
      body:
        "More records do not produce one stable identity. The subject can be indexed. The subject cannot yet be verified.",
      coh: "Not applicable",
      ver: "Incomplete"
    }
  };

  var panel = document.querySelector("[data-model]");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".path"));
  var current = "a";

  function paint(key) {
    current = key;
    var m = copy[key];
    panel.querySelector("h2").textContent = m.code;
    panel.querySelector(".title").textContent = m.title;
    panel.querySelector("[data-model-body]").textContent = m.body;
    var stats = panel.querySelectorAll(".stat span");
    if (stats[0]) stats[0].textContent = m.coh;
    if (stats[1]) stats[1].textContent = m.ver;
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-path") === key;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".same .shard").forEach(function (shard) {
      var text = shard.getAttribute("data-" + key) || "";
      var el = shard.querySelector("[data-reading]");
      if (el) el.textContent = text;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      paint(tab.getAttribute("data-path"));
    });
  });

  paint("a");

  var reveal = document.querySelector("[data-reveal]");
  if (!reveal) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ran = false;

  function play() {
    if (ran) return;
    ran = true;
    var lines = [
      "Index complete.",
      "Identity match: 62% · partial",
      "Verification: incomplete",
      "Original source: not found."
    ];
    var first = reveal.querySelector('[data-line="0"]');
    function show(i) {
      if (i === 0) {
        first.textContent = lines[0];
      }
      if (i === 1) {
        first.textContent = lines[0] + "  /  " + lines[1];
      }
      if (i === 2) {
        first.textContent = lines[2];
        first.className = "after";
      }
      if (i === 3) {
        first.textContent = lines[3];
      }
      var extra = reveal.querySelector('[data-line="' + i + '"]');
      if (i > 0 && extra && extra !== first) extra.hidden = false;
    }
    show(0);
    var delays = reduce ? [0, 0, 0, 0, 0] : [0, 1100, 2600, 3800, 4200];
    window.setTimeout(function () {
      show(1);
    }, delays[1]);
    window.setTimeout(function () {
      show(2);
      reveal.querySelector('[data-line="1"]').hidden = false;
      reveal.querySelector('[data-line="2"]').hidden = false;
    }, delays[2]);
    window.setTimeout(function () {
      reveal.querySelector('[data-line="3"]').hidden = false;
      reveal.querySelector('[data-line="4"]').hidden = false;
    }, delays[3]);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play();
        });
      },
      { threshold: 0.4 }
    );
    io.observe(reveal);
  } else {
    play();
  }
})();

(function dossier() {
  function fileStamp() {
    var now = new Date();
    return (
      now.getFullYear() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      "_" +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds())
    );
  }

  function tickFile() {
    document.querySelectorAll("[data-filestamp]").forEach(function (el) {
      el.textContent = fileStamp();
    });
  }

  if (document.querySelector("[data-filestamp]")) {
    tickFile();
    window.setInterval(tickFile, 1000);
  }

  var gate = document.querySelector("[data-access]");
  var line = document.querySelector("[data-access-line]");
  if (!gate || !line) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var steps = ["ACCESSING FILE...", "LOADING VISUAL RECORD...", "ARCHIVE OPENED"];

  if (reduce) {
    gate.hidden = true;
    return;
  }

  var i = 0;
  line.textContent = steps[0];
  var t = window.setInterval(function () {
    i += 1;
    if (i >= steps.length) {
      window.clearInterval(t);
      window.setTimeout(function () {
        gate.hidden = true;
      }, 420);
      return;
    }
    line.textContent = steps[i];
  }, 520);
})();

(function folders() {
  if (!document.body.classList.contains("page-recon")) return;

  var board = document.querySelector(".clip-board");
  var label = document.querySelector("[data-section-label]");
  var note = document.querySelector("[data-folder-note]");
  var noteTitle = document.querySelector("[data-folder-title]");
  var noteCopy = document.querySelector("[data-folder-copy]");
  var readout = document.querySelector("[data-readout]");
  if (!board) return;

  var meta = {
    visual: {
      title: "Visual records",
      copy: ""
    },
    writings: {
      title: "Personal writings",
      copy: "Two pages. Authorship attributed. The hand is not certified."
    },
    medical: {
      title: "Medical",
      copy: "Night intake, 1968. The name is present. The signature is not."
    },
    police: {
      title: "Police",
      copy: "Missing-person note. Last seen: London. The report does not close."
    },
    audio: {
      title: "Audio / testimony",
      copy: "Tape incomplete. Two witnesses. They do not agree."
    },
    objects: {
      title: "Objects",
      copy: "A ticket. A matchbook. Possession is not presence."
    }
  };

  function keyFromHash() {
    var raw = (window.location.hash || "#visual").replace("#", "");
    return meta[raw] ? raw : "visual";
  }

  function closeReadout() {
    if (!readout || readout.hidden) return;
    var closeBtn = readout.querySelector(".readout-close");
    if (closeBtn) closeBtn.click();
  }

  function apply() {
    var key = keyFromHash();
    var info = meta[key];
    var filtered = key !== "visual";

    board.classList.toggle("is-filtered", filtered);
    if (label) label.textContent = info.title;
    document.title = "FILE 011 — " + info.title + " — Evelyn Vale";

    document.querySelectorAll("[data-folder]").forEach(function (link) {
      var on = link.getAttribute("data-folder") === key;
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    board.querySelectorAll(".shard").forEach(function (el) {
      var cat = el.getAttribute("data-cat") || "visual";
      var extra = el.hasAttribute("data-extra");
      var match = cat === key;
      el.classList.toggle("is-in", match);
      if (extra) el.hidden = !(filtered && match);
    });

    if (note) {
      note.hidden = !filtered;
      if (filtered) {
        if (noteTitle) noteTitle.textContent = info.title;
        if (noteCopy) noteCopy.textContent = info.copy;
      }
    }

    closeReadout();
    if (!filtered) return;

    window.setTimeout(function () {
      var lead = board.querySelector(".shard.is-in[data-lead]:not([hidden])");
      if (lead) lead.click();
    }, 120);
  }

  window.addEventListener("hashchange", apply);
  apply();
})();

(function unitPresence() {
  var unit = document.querySelector("[data-unit]");
  var still = document.querySelector("[data-still]");
  var stillB = document.querySelector("[data-still-b]");
  var thoughts = document.querySelectorAll(".unit-thoughts li");
  if (!unit || !still) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mode = unit.getAttribute("data-mode") || "observe";
  var thoughtIndex = 0;

  function cycleThought() {
    if (!thoughts.length) return;
    thoughts.forEach(function (el, i) {
      el.classList.toggle("is-on", i === thoughtIndex);
    });
    thoughtIndex = (thoughtIndex + 1) % thoughts.length;
  }

  if (thoughts.length) {
    window.setInterval(cycleThought, mode === "judge" ? 2200 : 3400);
  }

  if (reduce) return;

  var gx = 0;
  var gy = 0;
  var x = 0;
  var y = 0;
  var bx = 0;
  var by = 0;
  var range = mode === "judge" ? 10 : mode === "interpret" ? 8 : 6;
  var lastMove = 0;

  function lookAtPoint(px, py) {
    var box = still.getBoundingClientRect();
    gx = Math.max(-1, Math.min(1, (px - (box.left + box.width / 2)) / 260));
    gy = Math.max(-1, Math.min(1, (py - (box.top + box.height / 2)) / 200));
  }

  function lookAtEl(el) {
    if (!el) return;
    var box = el.getBoundingClientRect();
    lookAtPoint(box.left + box.width / 2, box.top + box.height / 2);
  }

  function interest() {
    if (mode === "observe") {
      return [
        document.querySelector(".portrait img"),
        document.querySelector(".subject-id"),
        document.querySelector(".file-log table")
      ].filter(Boolean);
    }
    if (mode === "interpret") {
      return Array.prototype.filter.call(document.querySelectorAll(".shard"), function (el) {
        return !el.hidden && el.offsetWidth > 0;
      });
    }
    return [
      document.querySelector(".path.is-on"),
      document.querySelector(".same .shard"),
      document.querySelector(".model-copy")
    ].filter(Boolean);
  }

  document.addEventListener("mousemove", function (event) {
    lastMove = Date.now();
    lookAtPoint(event.clientX, event.clientY);
  });

  document.addEventListener("click", function (event) {
    var target = event.target.closest(".shard, .path");
    if (target) lookAtEl(target);
  });

  window.setInterval(function () {
    if (Date.now() - lastMove < 1600) return;
    var els = interest();
    if (els.length) lookAtEl(els[thoughtIndex % Math.max(els.length, 1)]);
  }, mode === "judge" ? 1400 : 2600);

  function frame() {
    var ease = mode === "judge" ? 0.12 : 0.07;
    var jx = mode === "judge" ? Math.sin(Date.now() / 240) * 0.7 : 0;
    var jy = mode === "judge" ? Math.cos(Date.now() / 180) * 0.5 : 0;
    x += (gx * range + jx - x) * ease;
    y += (gy * range * 0.7 + jy - y) * ease;
    still.style.transform =
      "translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px) scale(1.08)";
    if (stillB) {
      bx += (-gx * range * 0.8 - bx) * 0.08;
      by += (-gy * range * 0.8 - by) * 0.08;
      stillB.style.transform =
        "translate(" + (bx + jx).toFixed(2) + "px, " + (by - jy).toFixed(2) + "px) scale(1.12)";
    }
    window.requestAnimationFrame(frame);
  }
  frame();

  window.setTimeout(function () {
    var first = interest()[0];
    if (first) lookAtEl(first);
  }, 400);
})();
