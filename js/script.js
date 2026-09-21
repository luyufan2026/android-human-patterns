(function () {
  "use strict";

  var KEY = "case11-model";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var RECORDS = {
    portrait: {
      src: "images/archive/evelyn-portrait.jpg",
      alt: "Black-and-white portrait of a young woman in a dark turtleneck, 1960s.",
      type: "Photographic print",
      date: "Estimated 1968",
      source: "Private archive",
      layer: "VISUAL",
      reading: "A face can be indexed. Age estimated twenty to thirty. Hair short, dark. The look does not stay still.",
      effect: "Identity model gains sex, age range, hair. Visual confidence increased.",
      think: "A face is not a cause. I file the body and wait for movement.",
      facts: ["Female", "Approx. 20–30", "Short dark hair"],
      add: 12,
      reads: {
        a: "The face is read as a patient. Expression becomes symptom.",
        b: "The face is circulated as a missing person.",
        c: "The face is a print she may have left on purpose."
      }
    },
    contact: {
      src: "images/archive/contact-sheet.jpg",
      alt: "Photographic contact sheet of small film frames.",
      type: "Photographic contact sheet",
      date: "Estimated 1968",
      source: "Private archive",
      layer: "VISUAL",
      reading: "Six visible facial states detected. Emotional classification unstable. Same person, no single expression.",
      effect: "Visual confidence increased. Mood cannot be fixed.",
      think: "Multiple faces from one roll. I cannot pick a true one.",
      facts: ["Multiple facial states", "Emotion unclassified"],
      add: 8,
      reads: { a: "Instability of expression.", b: "Last known likenesses.", c: "A study of herself disappearing." }
    },
    diary: {
      src: "images/archive/diary-page.jpg",
      alt: "Handwritten diary page in ink on aged paper.",
      type: "Handwritten diary page",
      date: "1968",
      source: "Recovered notebook",
      layer: "SELF",
      reading: "First-person language. Themes: being seen, refusing to be kept. She names a wish to become unrecoverable.",
      effect: "Internal voice added. Self-perception entered the model.",
      think: "She writes about erasure. I treat writing as intention. That may be too much.",
      facts: ["Self-perception recorded", "Language of disappearance"],
      add: 11,
      reads: {
        a: "Read as rumination. A medical ear hears illness.",
        b: "Read as a last note before harm.",
        c: "Read as instruction: leave no original."
      }
    },
    flyer: {
      src: "images/archive/event-flyer.jpg",
      alt: "Worn 1960s event flyer for an underground performance.",
      type: "Event flyer",
      date: "London, 1968",
      source: "Underground press remnant",
      layer: "WITNESS",
      reading: "Art circle. Performance context. Location: London rooms that do not keep door lists.",
      effect: "Social context added. Occupation tilts toward artist.",
      think: "A public is implied. Disappearance might have had an audience.",
      facts: ["London", "Art circle", "Performance context"],
      add: 9,
      reads: {
        a: "Overstimulation. Unstable scene.",
        b: "Last place she was seen among others.",
        c: "The disappearance belongs to the work."
      }
    },
    medical: {
      src: "images/archive/medical-form.jpg",
      alt: "Medical form with typed fields and redacted lines.",
      type: "Medical form",
      date: "1967–68",
      source: "Institutional copy",
      layer: "INSTITUTION",
      reading: "Diagnostic language. Possible instability is written as fact. The form is more certain than the diary.",
      effect: "Institutional interpretation added. The model now contains a patient.",
      think: "NEW EVIDENCE CHANGES INTERPRETATION. Medical language competes with her own.",
      facts: ["Institutional patient record", "Diagnostic language present"],
      add: 10,
      reads: {
        a: "Primary source. She is a case before she is a person.",
        b: "Background only. Illness does not explain a river.",
        c: "A document she may have wanted the archive to over-believe."
      }
    },
    police: {
      src: "images/archive/police-report.jpg",
      alt: "Police report typed on official paper.",
      type: "Police note",
      date: "1968",
      source: "Metropolitan file fragment",
      layer: "INSTITUTION",
      reading: "Legal framing. Missing person. The subject becomes an incident.",
      effect: "Legal/institutional framing added. Name attached to a case number.",
      think: "The police write a victim because that is the form they have.",
      facts: ["Evelyn Vale", "Missing person filing"],
      add: 10,
      reads: {
        a: "Police language repeats the hospital.",
        b: "Primary source. A victim of accident or harm.",
        c: "A file opened because she arranged to be missed."
      }
    },
    ticket: {
      src: "images/archive/tube-ticket.jpg",
      alt: "London Underground ticket stub.",
      type: "Transport ticket",
      date: "1968",
      source: "Personal effects",
      layer: "VISUAL",
      reading: "Movement through London. A destination is implied, not proven. A ticket is not a confession.",
      effect: "Location and travel possibility added.",
      think: "I connect the ticket to leaving. I may be inventing a plan.",
      facts: ["London movement", "Travel possible"],
      add: 7,
      reads: {
        a: "Wandering. No clear destination.",
        b: "Last known route.",
        c: "A prop. Proof of passage left behind."
      }
    },
    room: {
      src: "images/archive/empty-studio.jpg",
      alt: "Empty room with a chair and daylight, no occupant.",
      type: "Room photograph",
      date: "After disappearance",
      source: "Scene record",
      layer: "VISUAL",
      reading: "Absence photographed. Furniture remains. The subject does not.",
      effect: "Environment added. Occupancy cannot be confirmed.",
      think: "An empty room is not evidence of where she went. It is evidence of where she is not.",
      facts: ["Studio / room recorded", "Subject absent"],
      add: 6,
      reads: {
        a: "Neglect. A life unkept.",
        b: "Scene after an incident.",
        c: "The work: leave the room as a print."
      }
    },
    hand: {
      src: "images/evidence/hand-injury.jpg",
      alt: "Photograph of a hand with a small injury.",
      type: "Object / body photograph",
      date: "Unknown",
      source: "Personal effects",
      layer: "VISUAL",
      reading: "Injury present. Cause not present. The body is incomplete even when photographed.",
      effect: "Physical body layer added. Harm is possible, not proven.",
      think: "I am tempted to call this self-harm because the medical file exists. That is circular.",
      facts: ["Injury recorded", "Cause unknown"],
      add: 7,
      reads: {
        a: "Self-inflicted. Fits the patient model.",
        b: "Struggle or accident.",
        c: "A mark left for whoever would catalogue her."
      }
    },
    letter: {
      src: "images/evidence/letter-sister.jpg",
      alt: "Typewritten letter on thin paper.",
      type: "Letter",
      date: "1968",
      source: "Family correspondence",
      layer: "SELF",
      reading: "Intention toward leaving. Address to a sister. Relationships exist outside the file.",
      effect: "Intention and personal relationship added.",
      think: "A letter about going is not proof she went where she said.",
      facts: ["Evelyn Vale", "Intention to leave", "Family addressee"],
      add: 10,
      reads: {
        a: "Affect. Unstable promises.",
        b: "Last contact before harm.",
        c: "A planned leaving. The artwork begins in the sentence."
      }
    },
    witness: {
      src: "images/evidence/witness-a.jpg",
      alt: "Typewritten witness statement.",
      type: "Witness statement",
      date: "1968",
      source: "Interview copy",
      layer: "WITNESS",
      reading: "Another person remembers her as composed. Memory is not a photograph.",
      effect: "How others remembered her: calm, leaving by choice.",
      think: "Witness A contradicts the medical file. I cannot average them.",
      facts: ["Remembered as composed", "Said she had work to finish"],
      add: 8,
      reads: {
        a: "Unreliable. Did not see the illness.",
        b: "She walked toward the station.",
        c: "She asked not to be followed."
      }
    },
    "witness-a": {
      src: "images/evidence/witness-a.jpg",
      alt: "Typewritten witness statement A.",
      type: "Witness statement A",
      date: "1968",
      source: "Interview copy",
      layer: "WITNESS",
      reading: "Composed. Directed. She had somewhere to be.",
      effect: "Witness memory: choice, not collapse.",
      think: "Witness A supports planned departure. Witness B will not.",
      facts: ["Witness A: composed"],
      add: 8,
      reads: {
        a: "Missed the symptoms.",
        b: "Last sighting toward transport.",
        c: "She controlled the goodbye."
      }
    },
    "witness-b": {
      src: "images/evidence/witness-b.jpg",
      alt: "Typewritten witness statement B.",
      type: "Witness statement B",
      date: "1968",
      source: "Interview copy",
      layer: "WITNESS",
      reading: "Unwell. Talking to herself. This memory prefers the hospital.",
      effect: "Witness memory: instability. Conflicts with Witness A.",
      think: "Two witnesses, two Evelyns. I should not pick the louder one.",
      facts: ["Witness B: seemed unwell"],
      add: 8,
      reads: {
        a: "Confirms the patient.",
        b: "Confusion before an accident.",
        c: "A performance of distress, or a truth used as cover."
      }
    },
    street: {
      src: "images/archive/london-street.jpg",
      alt: "1960s London street in black and white.",
      type: "Street photograph",
      date: "Late 1960s",
      source: "City archive (Fortepan)",
      layer: "VISUAL",
      reading: "Historical environment. London as a field she could vanish into.",
      effect: "Place added. The city is larger than the file.",
      think: "A street does not remember a woman. I am using atmosphere as evidence. That is weak.",
      facts: ["London, late 1960s"],
      add: 5,
      reads: {
        a: "Overstimulating environment.",
        b: "Search area.",
        c: "Stage set."
      }
    },
    coat: {
      src: "images/evidence/wet-coat.jpg",
      alt: "A dark coat, damp, photographed as an object.",
      type: "Object photograph",
      date: "1968",
      source: "Personal effects / scene",
      layer: "VISUAL",
      reading: "A coat with water. Weather, river, or staging. The object does not choose.",
      effect: "Physical trace added. Meaning withheld.",
      think: "I can attach this coat to accident, illness, or art. Each attachment is a decision.",
      facts: ["Coat recovered", "Water present"],
      add: 8,
      reads: {
        a: "Evidence of confusion.",
        b: "Evidence of accident.",
        c: "Deliberately planted evidence."
      }
    },
    map: {
      src: "images/evidence/map-fragment.jpg",
      alt: "Torn map fragment of London.",
      type: "Map fragment",
      date: "1968",
      source: "Personal effects",
      layer: "VISUAL",
      reading: "A route with a torn edge. The tear may be the point.",
      effect: "Geography added. Endpoint missing.",
      think: "A torn map looks like fate. It is also paper.",
      facts: ["Route fragment", "Endpoint missing"],
      add: 6,
      reads: {
        a: "Disorientation.",
        b: "Path toward harm.",
        c: "A map left incomplete on purpose."
      }
    }
  };

  function loadState() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { opened: [], pct: 12, facts: [], layers: [] };
  }

  function saveState(state) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function statusFor(pct) {
    if (pct < 20) return "Incomplete · Unknown subject";
    if (pct < 35) return "Incomplete · Female · Approx. 20–30";
    if (pct < 50) return "Partial · Evelyn Vale · London · Artist";
    if (pct < 62) return "Partial · Performance artist / photographer";
    return "Identity model partial";
  }

  function clarityFor(pct) {
    if (pct < 20) return "0";
    if (pct < 35) return "1";
    if (pct < 50) return "2";
    if (pct < 62) return "3";
    return "4";
  }

  function typeText(el, text, done) {
    if (!el) {
      if (done) done();
      return;
    }
    if (reduce) {
      el.textContent = text;
      if (done) done();
      return;
    }
    el.textContent = "";
    var i = 0;
    var id = setInterval(function () {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(id);
        if (done) done();
      }
    }, 14);
  }

  function sequence(steps, i) {
    i = i || 0;
    if (i >= steps.length) return;
    steps[i](function () {
      sequence(steps, i + 1);
    });
  }

  function wait(ms, done) {
    if (reduce) {
      done();
      return;
    }
    setTimeout(done, ms);
  }

  var inspect = (function () {
    var root = document.querySelector("[data-inspect]");
    if (!root) return { open: function () {} };
    var img = root.querySelector(".inspect-img img");
    var status = root.querySelector("[data-status]");
    var body = root.querySelector("[data-body]");
    var closeBtn = root.querySelector("[data-close]");
    var onDone = null;
    var timer = 0;

    function close() {
      root.hidden = true;
      if (onDone) {
        var fn = onDone;
        onDone = null;
        fn();
      }
    }

    closeBtn.addEventListener("click", close);
    root.addEventListener("click", function (e) {
      if (e.target === root) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !root.hidden) close();
    });

    function open(id, extra, done) {
      var rec = RECORDS[id];
      if (!rec) return;
      onDone = done || null;
      img.src = rec.src;
      img.alt = rec.alt;
      body.innerHTML = "";
      status.textContent = "";
      root.hidden = false;
      var path = extra && extra.path;
      var think = extra && extra.think;

      sequence([
        function (next) { typeText(status, "ACCESSING RECORD...", function () { wait(280, next); }); },
        function (next) { typeText(status, "READING...", function () { wait(280, next); }); },
        function (next) { typeText(status, "COMPARING...", function () { wait(280, next); }); },
        function (next) { typeText(status, "MODEL UPDATED", next); },
        function (next) {
          var reading = rec.reading;
          var effect = rec.effect;
          if (path && rec.reads && rec.reads[path]) {
            reading = rec.reads[path];
            effect = "Same object. Different model. Meaning moved.";
          } else if (think) {
            reading = rec.think;
            effect = extra.effect || rec.effect;
          }
          body.innerHTML =
            "<h2>Archive record</h2><p data-l1></p>" +
            "<h2>Machine reading</h2><p data-l2></p>" +
            "<h2>Model effect</h2><p data-l3></p>";
          var l1 = body.querySelector("[data-l1]");
          var l2 = body.querySelector("[data-l2]");
          var l3 = body.querySelector("[data-l3]");
          sequence([
            function (n) { typeText(l1, rec.type + ". " + rec.date + ". Source: " + rec.source + ".", n); },
            function (n) { typeText(l2, reading, n); },
            function (n) { typeText(l3, effect, n); }
          ]);
          next();
        }
      ]);
    }

    return { open: open };
  })();

  var build = document.querySelector("[data-model]");
  if (build) {
    (function () {
      var state = loadState();
      var pctEl = build.querySelector("[data-pct]");
      var statusEl = build.querySelector("[data-status]");
      var factsEl = build.querySelector("[data-facts]");
      var layersEl = build.querySelector("[data-layers]");
      var voiceEl = build.querySelector("[data-voice]");

      function render() {
        pctEl.textContent = state.pct + "%";
        statusEl.textContent = statusFor(state.pct);
        build.setAttribute("data-clarity", clarityFor(state.pct));
        if (state.facts.length) {
          factsEl.innerHTML = state.facts.map(function (f) {
            return "<li><span class=\"layer\">" + f.layer + "</span>" + f.text + "</li>";
          }).join("");
        }
        layersEl.textContent = state.layers.length ? "Layers: " + state.layers.join(" · ") : "Layers: —";
        document.querySelectorAll(".frag[data-id]").forEach(function (btn) {
          if (state.opened.indexOf(btn.getAttribute("data-id")) !== -1) btn.classList.add("is-read");
        });
      }

      function applyRecord(id) {
        var rec = RECORDS[id];
        if (!rec) return;
        if (state.opened.indexOf(id) === -1) {
          state.opened.push(id);
          state.pct = Math.min(71, state.pct + rec.add);
          rec.facts.forEach(function (text) {
            var exists = state.facts.some(function (f) { return f.text === text; });
            if (!exists) state.facts.push({ layer: rec.layer, text: text });
          });
          if (state.layers.indexOf(rec.layer) === -1) state.layers.push(rec.layer);
        }
        saveState(state);
        build.classList.add("is-flash");
        setTimeout(function () { build.classList.remove("is-flash"); }, 180);
        render();
        var lines = [
          "I begin with fragments, not a person.",
          "I add a body because photographs offer one.",
          "I add a voice because writing offers one.",
          "I add a patient because the hospital wrote one.",
          "I add a missing person because the police wrote one.",
          "The subject can be indexed. The subject cannot yet be verified."
        ];
        voiceEl.textContent = lines[Math.min(state.opened.length, lines.length - 1)];
      }

      document.querySelectorAll(".frag[data-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-id");
          inspect.open(id, {}, function () {});
          applyRecord(id);
        });
      });

      render();
    })();
  }

  var well = document.querySelector("[data-pins]");
  if (well) {
    (function () {
      var state = loadState();
      var pins = [null, null, null];
      var hypsEl = document.querySelector("[data-hyps]");
      var logEl = document.querySelector("[data-log]");
      var svg = document.querySelector("[data-links]");
      var judge = document.querySelector("[data-judge]");
      var voiceEl = judge.querySelector("[data-voice]");
      var stampEl = judge.querySelector("[data-stamp]");
      var pctEl = judge.querySelector("[data-pct]");
      var statusEl = judge.querySelector("[data-status]");
      var prevSnapshot = "";

      pctEl.textContent = state.pct + "%";
      statusEl.textContent = statusFor(state.pct);
      judge.setAttribute("data-clarity", clarityFor(state.pct));

      function reason() {
        var ids = pins.filter(Boolean);
        var set = {};
        ids.forEach(function (id) { set[id] = true; });
        var n = ids.length;
        var hyps = [];
        var lines = [];
        var log = [];
        var voice = "I have a face. I do not yet have a cause.";
        var mood = "";
        var stamp = "";

        if (n === 0) {
          hyps.push({ id: "hold", name: "No hypothesis", conf: null, note: "Observe first. Do not begin with a finished cause." });
          log.push("STATUS: waiting for combination.");
        } else if (n === 1) {
          hyps.push({ id: "hold", name: "Insufficient", conf: null, note: "A single record is not a cause." });
          log.push("OBSERVE. Do not conclude.");
          voice = "Insufficient. I refuse a story from one object.";
        } else {
          var planned = set.ticket && set.letter;
          var erasure = set.diary && (set.letter || set.flyer);
          var victim = set.police && (set.coat || set.ticket || set.map);
          var crisis = set.medical && (set["witness-b"] || set.hand || set.letter || set.ticket || set.diary);
          var institution = set.medical && set.police;
          var conflictWitness = set["witness-a"] && set["witness-b"];

          if (planned && !set.medical) {
            hyps.push({ id: "depart", name: "Planned departure", conf: 72, note: "Ticket + letter agree on leaving." });
            lines.push({ from: "ticket", to: "depart", kind: "solid" });
            lines.push({ from: "letter", to: "depart", kind: "solid" });
            log.push("HYPOTHESIS FORMED: planned departure · 72%");
            voice = "Two records agree. I treat agreement as a cause. This may be a mistake.";
            mood = "erasure";
            stamp = "Leaving";
          }

          if (planned && set.medical) {
            hyps.push({ id: "depart", name: "Planned departure", conf: 49, note: "Previously 72%. Lowered.", state: "revised" });
            hyps.push({ id: "crisis", name: "Psychological crisis", conf: 31, note: "Medical language entered." });
            hyps.push({ id: "unknown", name: "Unknown", conf: 20, note: "Remainder I cannot assign." });
            lines.push({ from: "ticket", to: "depart", kind: "dead" });
            lines.push({ from: "letter", to: "depart", kind: "solid" });
            lines.push({ from: "medical", to: "crisis", kind: "dash" });
            lines.push({ from: "medical", to: "depart", kind: "conflict" });
            log.push("NEW EVIDENCE DETECTED");
            log.push("PREVIOUS HYPOTHESIS: planned departure 72%");
            log.push("PREVIOUS MODEL INVALIDATED");
            log.push("REVISED: departure 49% · crisis 31% · unknown 20%");
            voice = "New evidence changes interpretation. I contradict myself rather than pretend continuity.";
            mood = "crisis";
            stamp = "Crisis / leaving / unknown";
          }

          if (erasure && !planned) {
            hyps.push({ id: "erasure", name: "Self-erasure", conf: 70, note: "Diary and correspondence point inward." });
            if (set.diary) lines.push({ from: "diary", to: "erasure", kind: "solid" });
            if (set.letter) lines.push({ from: "letter", to: "erasure", kind: "solid" });
            if (set.flyer) lines.push({ from: "flyer", to: "erasure", kind: "dash" });
            log.push("HYPOTHESIS FORMED: self-erasure · 70%");
            voice = "She writes about becoming unrecoverable. I may be quoting her too faithfully.";
            mood = "erasure";
            stamp = "Self-erasure";
          }

          if (erasure && set.medical) {
            hyps = [
              { id: "erasure", name: "Self-erasure", conf: 44, note: "Previously stronger. Now contested.", state: "revised" },
              { id: "crisis", name: "Psychological crisis", conf: 38, note: "Hospital reading of the same words." },
              { id: "unknown", name: "Unknown", conf: 18, note: "No single model holds." }
            ];
            lines = [];
            if (set.diary) lines.push({ from: "diary", to: "erasure", kind: "solid" });
            if (set.letter) lines.push({ from: "letter", to: "erasure", kind: "dash" });
            if (set.medical) lines.push({ from: "medical", to: "crisis", kind: "solid" });
            if (set.medical && set.diary) lines.push({ from: "medical", to: "erasure", kind: "conflict" });
            log.push("NEW EVIDENCE CHANGES INTERPRETATION");
            log.push("The diary is now two documents: art, and symptom.");
            voice = "I used her sentences as intention. The hospital uses them as proof of illness. Both are models.";
            mood = "crisis";
            stamp = "Art or illness";
          }

          if (victim && !crisis) {
            hyps.push({ id: "victim", name: "Missing victim", conf: 64, note: "Police form + physical trace." });
            if (set.police) lines.push({ from: "police", to: "victim", kind: "solid" });
            if (set.coat) lines.push({ from: "coat", to: "victim", kind: "solid" });
            if (set.ticket) lines.push({ from: "ticket", to: "victim", kind: "dash" });
            if (set.map) lines.push({ from: "map", to: "victim", kind: "dash" });
            log.push("HYPOTHESIS FORMED: missing victim · 64%");
            voice = "The police write a victim because that is the form they have.";
            mood = "institution";
            stamp = "Missing";
          }

          if (institution) {
            hyps.push({ id: "inst", name: "Institutional narrative", conf: 67, note: "Hospital and police agree on a type of woman." });
            lines.push({ from: "medical", to: "inst", kind: "solid" });
            lines.push({ from: "police", to: "inst", kind: "solid" });
            log.push("COMPARE: two institutions, one subject-type.");
            voice = "When systems agree, I become more confident. That confidence is about paperwork, not her.";
            mood = "institution";
            stamp = "File / patient / missing";
          }

          if (crisis && !planned && !erasure) {
            hyps.push({ id: "crisis", name: "Psychological crisis", conf: 61, note: "Medical record plus a supporting trace." });
            if (set.medical) lines.push({ from: "medical", to: "crisis", kind: "solid" });
            if (set["witness-b"]) lines.push({ from: "witness-b", to: "crisis", kind: "solid" });
            if (set.hand) lines.push({ from: "hand", to: "crisis", kind: "dash" });
            log.push("HYPOTHESIS FORMED: psychological crisis · 61%");
            voice = "I am assembling a breakdown because the forms invite one.";
            mood = "crisis";
            stamp = "Diagnostic overlay";
          }

          if (conflictWitness) {
            hyps.push({ id: "split", name: "Conflicting testimony", conf: null, note: "Witness A and B do not describe the same woman.", state: "revised" });
            lines.push({ from: "witness-a", to: "split", kind: "conflict" });
            lines.push({ from: "witness-b", to: "split", kind: "conflict" });
            log.push("CONFLICT: two memories, two Evelyns.");
            voice = "No single model explains all records.";
          }

          if (set.coat && set.ticket && set.police) {
            log.push("COMPARE: movement + water + police language.");
          }

          if (!hyps.length) {
            hyps.push({ id: "weak", name: "Weak relation", conf: 28, note: "I can force a story. Confidence stays low." });
            ids.forEach(function (id) {
              lines.push({ from: id, to: "weak", kind: "dash" });
            });
            log.push("HYPOTHESIS FORMED with low confidence. I may be joining what does not join.");
            voice = "I connected these because you asked me to. That is not the same as finding a cause.";
          }
        }

        var snap = JSON.stringify({ hyps: hyps, log: log });
        if (prevSnapshot) {
          var prev = JSON.parse(prevSnapshot);
          var real = function (list) {
            return (list || []).some(function (h) {
              return h.conf != null && h.id !== "hold" && h.id !== "weak";
            });
          };
          if (real(prev.hyps) && real(hyps) && snap !== prevSnapshot) {
            if (log[0] !== "NEW EVIDENCE DETECTED" && log.indexOf("PREVIOUS MODEL INVALIDATED") === -1) {
              log.unshift("REVISION: the previous combination no longer holds.");
            }
          }
        }
        prevSnapshot = snap;

        hypsEl.innerHTML = hyps.map(function (h) {
          var cls = "hyp" + (h.state === "revised" ? " is-revised" : "");
          var conf = h.conf == null ? "" : " · " + h.conf + "%";
          return "<article class=\"" + cls + "\" data-hyp-id=\"" + (h.id || "") + "\">" +
            h.name + conf + "<small>" + (h.note || "") + "</small></article>";
        }).join("");
        logEl.innerHTML = log.map(function (line) {
          return "<strong>" + line + "</strong>";
        }).join("<br>");
        voiceEl.textContent = voice;
        stampEl.textContent = stamp;
        judge.classList.remove("model--crisis", "model--erasure", "model--institution");
        if (mood) judge.classList.add("model--" + mood);
        drawLines(lines);
      }

      function drawLines(lines) {
        if (!svg) return;
        var wrap = svg.parentElement;
        var r = wrap.getBoundingClientRect();
        svg.setAttribute("viewBox", "0 0 " + Math.max(r.width, 1) + " " + Math.max(r.height, 1));
        svg.innerHTML = "";
        lines.forEach(function (ln) {
          var a = wrap.querySelector("[data-pin-id=\"" + ln.from + "\"]");
          var b = wrap.querySelector("[data-hyp-id=\"" + ln.to + "\"]");
          if (!a || !b) return;
          var ar = a.getBoundingClientRect();
          var br = b.getBoundingClientRect();
          var x1 = ar.left + ar.width / 2 - r.left;
          var y1 = ar.bottom - r.top;
          var x2 = br.left + br.width / 2 - r.left;
          var y2 = br.top - r.top;
          var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute("x2", String(x2));
          line.setAttribute("y2", String(y2));
          line.setAttribute("stroke", ln.kind === "conflict" ? "#7a2e2e" : "#1c1b18");
          line.setAttribute("stroke-width", "1");
          if (ln.kind === "dash") line.setAttribute("stroke-dasharray", "4 4");
          if (ln.kind === "dead") {
            line.setAttribute("opacity", "0.35");
            line.setAttribute("stroke-dasharray", "2 3");
            var mx = (x1 + x2) / 2;
            var my = (y1 + y2) / 2;
            var c1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var c2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            c1.setAttribute("x1", String(mx - 5));
            c1.setAttribute("y1", String(my - 5));
            c1.setAttribute("x2", String(mx + 5));
            c1.setAttribute("y2", String(my + 5));
            c2.setAttribute("x1", String(mx + 5));
            c2.setAttribute("y1", String(my - 5));
            c2.setAttribute("x2", String(mx - 5));
            c2.setAttribute("y2", String(my + 5));
            c1.setAttribute("stroke", "#1c1b18");
            c2.setAttribute("stroke", "#1c1b18");
            c1.setAttribute("stroke-width", "1");
            c2.setAttribute("stroke-width", "1");
            svg.appendChild(c1);
            svg.appendChild(c2);
          }
          svg.appendChild(line);
        });
      }

      function renderPins() {
        var slots = well.querySelectorAll(".pin");
        slots.forEach(function (slot, i) {
          var id = pins[i];
          slot.classList.toggle("is-on", !!id);
          if (!id) {
            slot.removeAttribute("data-pin-id");
            slot.innerHTML = "<p>empty</p>";
            return;
          }
          var rec = RECORDS[id];
          slot.setAttribute("data-pin-id", id);
          slot.innerHTML = "<img src=\"" + rec.src + "\" alt=\"" + rec.alt + "\"><p>" + id.replace("-", " ") + "</p>";
        });
        document.querySelectorAll(".evidence .frag").forEach(function (btn) {
          var id = btn.getAttribute("data-id");
          btn.classList.toggle("is-read", pins.indexOf(id) !== -1);
        });
        reason();
      }

      well.addEventListener("click", function (e) {
        var slot = e.target.closest(".pin");
        if (!slot || !slot.getAttribute("data-pin-id")) return;
        var id = slot.getAttribute("data-pin-id");
        pins = pins.map(function (p) { return p === id ? null : p; });
        renderPins();
      });

      document.querySelectorAll(".evidence .frag").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-id");
          inspect.open(id, { think: true, effect: "Record entered the reconstruction area." }, function () {});
          var idx = pins.indexOf(id);
          if (idx !== -1) {
            pins[idx] = null;
          } else {
            var empty = pins.indexOf(null);
            if (empty === -1) {
              pins.shift();
              pins.push(id);
            } else {
              pins[empty] = id;
            }
          }
          renderPins();
        });
      });

      window.addEventListener("resize", function () { reason(); });
      renderPins();
    })();
  }

  var branch = document.querySelector("[data-branch]");
  if (branch) {
    document.querySelectorAll(".same-ev [data-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        inspect.open(btn.getAttribute("data-id"), { path: btn.getAttribute("data-read") }, function () {});
      });
    });
    var compare = document.querySelector("[data-compare]");
    var overlap = document.querySelector("[data-overlap]");
    if (compare) {
      compare.addEventListener("click", function () {
        var on = branch.classList.toggle("is-compare");
        if (overlap) overlap.hidden = !on;
        compare.textContent = on ? "Separate the three" : "Compare all";
      });
    }
  }
})();
