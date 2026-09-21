(function () {
  "use strict";

  var KEY = "case11-model";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var RECORDS = {
    portrait: {
      src: "images/archive/evelyn-portrait.jpg",
      alt: "Black-and-white portrait of a young woman in a dark turtleneck, 1960s.",
      type: "Photographic portrait",
      date: "London, c. 1968",
      source: "Source uncertain",
      layer: "VISUAL",
      reading: "Female. Estimated age 20–30. Facial consistency 78%. A face can be indexed. Character cannot.",
      effect: "Identity model 08% → 26%. Visual identity added.",
      think: "A face is not a cause.",
      facts: ["Female", "Approx. 20–30"],
      fields: { age: "20–30 (est.)" },
      add: 18,
      steps: [
        "Accessing record...",
        "Image detected: photographic portrait",
        "Facial structure match: 78%",
        "Estimated gender: female",
        "Estimated age range: 20–30",
        "Adding to subject model...",
        "Identity model updated: 08% → 26%"
      ],
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
      reading: "Six facial states. Emotional classification unstable.",
      effect: "Visual confidence increased. Mood cannot be fixed.",
      think: "Multiple faces from one roll.",
      facts: ["Multiple facial states"],
      fields: {},
      add: 8,
      steps: [
        "Accessing record...",
        "Image detected: contact sheet",
        "Six visible facial states",
        "Emotional classification: unstable",
        "Model updated"
      ],
      reads: { a: "Instability of expression.", b: "Last known likenesses.", c: "A study of herself disappearing." }
    },
    diary: {
      src: "images/archive/diary-page.jpg",
      alt: "Handwritten diary page in ink on aged paper.",
      type: "Handwritten diary",
      date: "July 1968",
      source: "Recovered notebook",
      layer: "SELF",
      reading: "Controlled conceptual thinking. She writes of becoming unrecoverable.",
      effect: "Internal voice added. If a hospital already spoke, conflict is possible.",
      think: "I treat writing as intention. That may be too much.",
      facts: ["Self-perception recorded"],
      fields: { occupation: "Artist? (self)" },
      add: 11,
      steps: [
        "Accessing record...",
        "Source type: first-person manuscript",
        "Language: controlled, conceptual",
        "Theme: refusing to be kept",
        "Adding SELF layer...",
        "Model updated"
      ],
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
      reading: "Art circle. Performance context. A public is implied.",
      effect: "Social world added. Occupation tilts toward artist.",
      think: "Disappearance might have had an audience.",
      facts: ["Art circle"],
      fields: { location: "London", occupation: "Performance artist / photographer" },
      add: 9,
      steps: [
        "Accessing record...",
        "Document type: event flyer",
        "Temporal match: 1968",
        "Context: underground art",
        "Adding social world...",
        "Model updated"
      ],
      reads: {
        a: "Overstimulating scene.",
        b: "Last place among others.",
        c: "The disappearance belongs to the work."
      }
    },
    medical: {
      src: "images/archive/medical-form.jpg",
      alt: "Medical form with typed fields and redacted lines.",
      type: "Medical record",
      date: "1967–68",
      source: "Institutional copy",
      layer: "INSTITUTION",
      reading: "Diagnostic language. Claim: possible instability. The form is more certain than the diary.",
      effect: "Institutional identity added. Label: possible instability?",
      think: "Medical language competes with her own.",
      facts: ["Institutional patient record"],
      fields: { status: "Possible instability?" },
      add: 10,
      steps: [
        "Accessing record...",
        "Document type: hospital form",
        "Language: diagnostic",
        "Claim: possible instability",
        "Adding INSTITUTION layer...",
        "Model updated"
      ],
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
      effect: "Name attached to a case number.",
      think: "The police write a victim because that is the form they have.",
      facts: ["Missing person filing"],
      fields: { name: "Evelyn Vale", status: "Missing" },
      add: 10,
      steps: [
        "Accessing record...",
        "Document type: police note",
        "Name detected: Evelyn Vale",
        "Legal frame: missing person",
        "Adding INSTITUTION layer...",
        "Model updated"
      ],
      reads: {
        a: "Police language repeats the hospital.",
        b: "Primary source. Victim of accident or harm.",
        c: "A file opened because she arranged to be missed."
      }
    },
    ticket: {
      src: "images/archive/tube-ticket.jpg",
      alt: "London Underground ticket stub.",
      type: "Transport ticket",
      date: "12 Jun 68",
      source: "Personal effects",
      layer: "VISUAL",
      reading: "Movement through London. A ticket is not a confession.",
      effect: "Location and travel possibility added.",
      think: "I connect the ticket to leaving. I may be inventing a plan.",
      facts: ["London movement"],
      fields: { location: "London" },
      add: 7,
      steps: [
        "Accessing record...",
        "Object: transport ticket",
        "Location: London Underground",
        "Movement implied, destination unproven",
        "Model updated"
      ],
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
      reading: "Absence photographed. The subject does not remain.",
      effect: "Environment added. Occupancy unconfirmed.",
      think: "An empty room is evidence of where she is not.",
      facts: ["Subject absent from room"],
      fields: {},
      add: 6,
      steps: [
        "Accessing record...",
        "Image detected: empty interior",
        "Occupancy: none",
        "Model updated"
      ],
      reads: {
        a: "Neglect. A life unkept.",
        b: "Scene after an incident.",
        c: "The work: leave the room as a print."
      }
    },
    hand: {
      src: "images/evidence/hand-injury.jpg",
      alt: "Photograph of a hand with a small injury.",
      type: "Body photograph",
      date: "Unknown",
      source: "Personal effects",
      layer: "VISUAL",
      reading: "Injury present. Cause not present.",
      effect: "Physical body layer added. Harm possible, not proven.",
      think: "Calling this self-harm because a medical file exists is circular.",
      facts: ["Injury recorded"],
      fields: {},
      add: 7,
      steps: [
        "Accessing record...",
        "Image detected: hand",
        "Injury present, cause absent",
        "Model updated"
      ],
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
      reading: "Intention toward leaving. A relationship exists outside the file.",
      effect: "Intention and personal relationship added.",
      think: "A letter about going is not proof she went where she said.",
      facts: ["Intention to leave"],
      fields: { name: "Evelyn Vale" },
      add: 10,
      steps: [
        "Accessing record...",
        "Document type: letter",
        "Addressee: family",
        "Content: leaving",
        "Adding SELF layer...",
        "Model updated"
      ],
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
      reading: "Remembered as composed. Not unstable — just far away.",
      effect: "How others remembered her: calm, leaving by choice.",
      think: "This memory contradicts the hospital.",
      facts: ["Remembered as composed"],
      fields: {},
      add: 8,
      steps: [
        "Accessing record...",
        "Source type: witness statement",
        "Claim: she was different, not unstable",
        "Adding WITNESS layer...",
        "Model updated"
      ],
      reads: {
        a: "Unreliable. Did not see the illness.",
        b: "She walked toward the station.",
        c: "She asked not to be followed."
      }
    },
    "witness-a": {
      src: "images/evidence/witness-a.jpg",
      alt: "Witness statement A.",
      type: "Witness statement A",
      date: "1968",
      source: "Interview copy",
      layer: "WITNESS",
      reading: "Composed. Directed. She had somewhere to be.",
      effect: "Witness memory: choice, not collapse.",
      think: "Witness A supports planned departure.",
      facts: ["Witness A: composed"],
      fields: {},
      add: 8,
      steps: [
        "Accessing record...",
        "Witness A: composed",
        "Supports planned leaving",
        "Model updated"
      ],
      reads: {
        a: "Missed the symptoms.",
        b: "Last sighting toward transport.",
        c: "She controlled the goodbye."
      }
    },
    "witness-b": {
      src: "images/evidence/witness-b.jpg",
      alt: "Witness statement B.",
      type: "Witness statement B",
      date: "1968",
      source: "Interview copy",
      layer: "WITNESS",
      reading: "Unwell. Talking to herself. This memory prefers the hospital.",
      effect: "Witness memory: confusion. Conflicts with Witness A.",
      think: "Two witnesses, two Evelyns.",
      facts: ["Witness B: seemed unwell"],
      fields: {},
      add: 8,
      steps: [
        "Accessing record...",
        "Witness B: confused",
        "Supports crisis reading",
        "Model updated"
      ],
      reads: {
        a: "Confirms the patient.",
        b: "Confusion before an accident.",
        c: "A performance of distress, or a truth used as cover."
      }
    },
    object: {
      src: "images/archive/matchbook.jpg",
      alt: "Worn matchbook, a small personal object.",
      type: "Personal object",
      date: "Unknown",
      source: "Personal effects",
      layer: "VISUAL",
      reading: "A small object without a sentence. I am tempted to invent one.",
      effect: "Trace added. Meaning withheld.",
      think: "An object is not a biography.",
      facts: ["Personal effect recovered"],
      fields: {},
      add: 5,
      steps: [
        "Accessing record...",
        "Object photograph",
        "No inscription that holds",
        "Model updated"
      ],
      reads: { a: "Disorder.", b: "Dropped in flight.", c: "Left as a signature." }
    },
    coat: {
      src: "images/evidence/wet-coat.jpg",
      alt: "A dark coat, damp, photographed as an object.",
      type: "Object photograph",
      date: "1968",
      source: "Scene / personal effects",
      layer: "VISUAL",
      reading: "Water on cloth. Weather, river, or staging. The object does not choose.",
      effect: "Physical trace added. Meaning withheld.",
      think: "I can attach this coat to accident, illness, or art.",
      facts: ["Coat recovered", "Water present"],
      fields: {},
      add: 8,
      steps: [
        "Accessing record...",
        "Object: coat",
        "Water present",
        "Cause of water: unknown",
        "Model updated"
      ],
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
      reading: "A route with a torn edge.",
      effect: "Geography added. Endpoint missing.",
      think: "A torn map looks like fate. It is also paper.",
      facts: ["Route fragment"],
      fields: { location: "London" },
      add: 6,
      steps: [
        "Accessing record...",
        "Map fragment",
        "Endpoint missing",
        "Model updated"
      ],
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
    return { opened: [], pct: 8, fields: {}, layers: [] };
  }

  function saveState(state) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function clarityFor(pct) {
    if (pct < 20) return "0";
    if (pct < 35) return "1";
    if (pct < 50) return "2";
    if (pct < 62) return "3";
    return "4";
  }

  function stamp() {
    var d = new Date();
    function z(n) { return n < 10 ? "0" + n : String(n); }
    return z(d.getHours()) + ":" + z(d.getMinutes()) + ":" + z(d.getSeconds());
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
    }, 12);
  }

  function sequence(steps, i) {
    i = i || 0;
    if (i >= steps.length) return;
    steps[i](function () { sequence(steps, i + 1); });
  }

  function wait(ms, done) {
    if (reduce) done();
    else setTimeout(done, ms);
  }

  var machine = document.querySelector("[data-machine]");
  var cog = document.querySelector("[data-cog]");
  var cogStatus = document.querySelector("[data-status]");
  var voiceEl = document.querySelector("[data-voice]");
  var cogBusy = false;
  var idleTimer = 0;
  var idlePool = document.body.classList.contains("page-recon")
    ? ["Waiting for combination", "A single record is not a cause", "Observing relations", "Do not conclude yet"]
    : document.body.classList.contains("page-none")
      ? ["Same archive. Three models held", "No single original", "Waiting for a path reading", "Truth confidence: unknown"]
      : ["Observing archive field", "No record selected", "Identity model incomplete", "Waiting for visual input", "I do not begin with a person"];
  var idleAt = 0;

  function setStatus(text) {
    if (cogStatus) cogStatus.textContent = text;
    if (machine) machine.classList.add("is-live");
  }

  function trimCog() {
    if (!cog) return;
    while (cog.children.length > 36) cog.removeChild(cog.firstChild);
  }

  function appendCog(text, typed, done) {
    if (!cog) {
      if (done) done();
      return;
    }
    var line = document.createElement("p");
    var full = "[" + stamp() + "] " + text;
    cog.appendChild(line);
    trimCog();
    cog.scrollTop = cog.scrollHeight;
    typeText(line, full, function () {
      cog.scrollTop = cog.scrollHeight;
      if (done) done();
    });
  }

  function startIdle() {
    if (!cog || reduce) return;
    function tick() {
      if (cogBusy) return;
      appendCog(idlePool[idleAt % idlePool.length], true);
      idleAt += 1;
      idleTimer = setTimeout(tick, 2600 + Math.floor(Math.random() * 900));
    }
    idleTimer = setTimeout(tick, 400);
  }

  function writeCog(lines, done) {
    if (!cog) {
      if (done) done();
      return;
    }
    cogBusy = true;
    clearTimeout(idleTimer);
    var i = 0;
    function next() {
      if (i >= lines.length) {
        cogBusy = false;
        startIdle();
        if (done) done();
        return;
      }
      var text = lines[i];
      i += 1;
      appendCog(text, true, function () { wait(160, next); });
    }
    next();
  }

  startIdle();

  var inspect = (function () {
    var root = document.querySelector("[data-inspect]");
    if (!root) return { open: function () {} };
    var img = root.querySelector(".inspect-img img");
    var status = root.querySelector("[data-istatus]");
    var body = root.querySelector("[data-body]");
    var closeBtn = root.querySelector("[data-close]");

    function close() {
      root.hidden = true;
      document.querySelectorAll(".frag.is-open").forEach(function (el) {
        el.classList.remove("is-open");
      });
    }

    closeBtn.addEventListener("click", close);
    root.addEventListener("click", function (e) {
      if (e.target === root) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !root.hidden) close();
    });

    function open(id, extra) {
      var rec = RECORDS[id];
      if (!rec) return;
      img.src = rec.src;
      img.alt = rec.alt;
      body.innerHTML = "";
      status.textContent = "";
      root.hidden = false;
      var path = extra && extra.path;
      var think = extra && extra.think;
      var reading = rec.reading;
      var effect = rec.effect;
      if (path && rec.reads && rec.reads[path]) {
        reading = rec.reads[path];
        effect = "Same object. Different model. Meaning moved.";
      } else if (think) {
        reading = rec.think;
        effect = (extra && extra.effect) || rec.effect;
      }
      sequence([
        function (next) { typeText(status, "ACCESSING RECORD...", function () { wait(220, next); }); },
        function (next) { typeText(status, "READING...", function () { wait(220, next); }); },
        function (next) { typeText(status, "MODEL EFFECT READY", next); },
        function (next) {
          body.innerHTML =
            "<h2>Archive record</h2><p data-l1></p>" +
            "<h2>Machine reading</h2><p data-l2></p>" +
            "<h2>Model effect</h2><p data-l3></p>";
          sequence([
            function (n) { typeText(body.querySelector("[data-l1]"), rec.type + ". " + rec.date + ". " + rec.source + ".", n); },
            function (n) { typeText(body.querySelector("[data-l2]"), reading, n); },
            function (n) { typeText(body.querySelector("[data-l3]"), effect, n); }
          ]);
          next();
        }
      ]);
    }

    return { open: open };
  })();

  var subject = document.querySelector("[data-model]");
  if (subject) {
    (function () {
      var state = loadState();
      var pctEl = subject.querySelector("[data-pct]");
      var bar = subject.querySelector("[data-bar]");
      var form = subject.querySelector("[data-layer-form]");

      function hasConflict() {
        var o = state.opened;
        var med = o.indexOf("medical") !== -1;
        var diary = o.indexOf("diary") !== -1;
        var w = o.indexOf("witness") !== -1 || o.indexOf("witness-a") !== -1;
        return (med && diary) || (med && w);
      }

      function render() {
        pctEl.textContent = (state.pct < 10 ? "0" + state.pct : state.pct) + "%";
        if (bar) bar.style.width = state.pct + "%";
        subject.setAttribute("data-clarity", clarityFor(state.pct));
        subject.classList.toggle("is-conflict", hasConflict());
        ["name", "age", "occupation", "location", "status"].forEach(function (k) {
          var el = subject.querySelector("[data-f=\"" + k + "\"]");
          if (el) el.textContent = state.fields[k] || "Unknown";
        });
        if (hasConflict() && state.fields.status && /instability/i.test(state.fields.status)) {
          var st = subject.querySelector("[data-f=\"status\"]");
          if (st) st.textContent = "Contested / multiple states";
        }
        if (form) {
          form.querySelectorAll("input").forEach(function (inp) {
            var on = state.layers.indexOf(inp.value) !== -1;
            inp.disabled = !on;
            if (on && !inp.dataset.ready) {
              inp.checked = true;
              inp.dataset.ready = "1";
            }
          });
        }
        document.querySelectorAll(".frag[data-id]").forEach(function (btn) {
          btn.classList.toggle("is-read", state.opened.indexOf(btn.getAttribute("data-id")) !== -1);
        });
      }

      function apply(id) {
        var rec = RECORDS[id];
        if (!rec) return;
        var before = state.pct;
        if (state.opened.indexOf(id) === -1) {
          state.opened.push(id);
          state.pct = Math.min(71, state.pct + rec.add);
          if (state.layers.indexOf(rec.layer) === -1) state.layers.push(rec.layer);
          Object.keys(rec.fields || {}).forEach(function (k) {
            state.fields[k] = rec.fields[k];
          });
        }
        rec.effect = rec.effect.replace(/\d+%\s*→\s*\d+%/, before + "% → " + state.pct + "%");
        saveState(state);
        render();
        var lines = rec.steps.slice();
        if (hasConflict()) {
          lines.push("CONFLICT DETECTED");
          lines.push("Diary / witness language does not match the hospital");
          lines.push("PREVIOUS MODEL REVISED");
          lines.push("MULTIPLE SUBJECT STATES POSSIBLE");
          setStatus("Status: conflict");
          if (voiceEl) voiceEl.textContent = "I built one woman. The records built another.";
        } else {
          setStatus("Status: observing");
          if (voiceEl) voiceEl.textContent = "A face is a beginning. It is not yet a person.";
        }
        writeCog(lines);
      }

      if (form) {
        form.addEventListener("change", function () {
          ["VISUAL", "SELF", "INSTITUTION", "WITNESS"].forEach(function (layer) {
            var inp = form.querySelector("input[value=\"" + layer + "\"]");
            subject.classList.toggle("layer-off-" + layer, inp && !inp.disabled && !inp.checked);
          });
        });
      }

      document.querySelectorAll(".frags .frag[data-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-id");
          document.querySelectorAll(".frag.is-open").forEach(function (el) { el.classList.remove("is-open"); });
          btn.classList.add("is-open");
          inspect.open(id, {});
          apply(id);
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
      var svg = document.querySelector("[data-links]");
      var judge = document.querySelector("[data-judge]");
      var pctEl = judge.querySelector("[data-pct]");
      var bar = judge.querySelector("[data-bar]");
      var stampEl = judge.querySelector("[data-stamp]");
      var prevSnapshot = "";

      pctEl.textContent = (state.pct < 10 ? "0" + state.pct : state.pct) + "%";
      if (bar) bar.style.width = state.pct + "%";
      judge.setAttribute("data-clarity", clarityFor(state.pct));

      function reason() {
        var ids = pins.filter(Boolean);
        var set = {};
        ids.forEach(function (id) { set[id] = true; });
        var n = ids.length;
        var hyps = [];
        var lines = [];
        var log = [];
        var mood = "";
        var hypName = "None";
        var conf = "—";
        var rev = "Not yet";

        if (n === 0) {
          hyps.push({ id: "hold", name: "No hypothesis", note: "Observe first." });
          log.push("Waiting for combination");
        } else if (n === 1) {
          hyps.push({ id: "hold", name: "Insufficient", note: "A single record is not a cause." });
          log.push("Observe. Do not conclude.");
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
            log.push("Hypothesis formed: planned departure 72%");
            hypName = "Planned departure";
            conf = "72%";
            mood = "erasure";
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
            log.push("Previous hypothesis: planned departure 72%");
            log.push("PREVIOUS MODEL INVALIDATED");
            log.push("Revised: departure 49% · crisis 31% · unknown 20%");
            hypName = "Split: leaving / crisis";
            conf = "49% / 31% / 20%";
            rev = "Previous model invalidated";
            mood = "crisis";
          }

          if (erasure && !planned) {
            hyps.push({ id: "erasure", name: "Self-erasure", conf: 70, note: "Diary and correspondence point inward." });
            if (set.diary) lines.push({ from: "diary", to: "erasure", kind: "solid" });
            if (set.letter) lines.push({ from: "letter", to: "erasure", kind: "solid" });
            if (set.flyer) lines.push({ from: "flyer", to: "erasure", kind: "dash" });
            log.push("Hypothesis formed: self-erasure 70%");
            hypName = "Self-erasure";
            conf = "70%";
            mood = "erasure";
          }

          if (erasure && set.medical) {
            hyps = [
              { id: "erasure", name: "Self-erasure", conf: 44, note: "Now contested.", state: "revised" },
              { id: "crisis", name: "Psychological crisis", conf: 38, note: "Hospital reading of the same words." },
              { id: "unknown", name: "Unknown", conf: 18, note: "No single model holds." }
            ];
            lines = [];
            if (set.diary) lines.push({ from: "diary", to: "erasure", kind: "solid" });
            if (set.letter) lines.push({ from: "letter", to: "erasure", kind: "dash" });
            if (set.medical) lines.push({ from: "medical", to: "crisis", kind: "solid" });
            if (set.medical && set.diary) lines.push({ from: "medical", to: "erasure", kind: "conflict" });
            log.push("CONFLICT DETECTED");
            log.push("The diary is now two documents: art, and symptom");
            log.push("PREVIOUS MODEL REVISED");
            hypName = "Art or illness";
            conf = "44% / 38%";
            rev = "Contested";
            mood = "crisis";
          }

          if (victim && !crisis) {
            hyps.push({ id: "victim", name: "Accident / missing victim", conf: 64, note: "Police form + physical trace." });
            if (set.police) lines.push({ from: "police", to: "victim", kind: "solid" });
            if (set.coat) lines.push({ from: "coat", to: "victim", kind: "solid" });
            if (set.ticket) lines.push({ from: "ticket", to: "victim", kind: "dash" });
            log.push("Hypothesis formed: missing victim 64%");
            hypName = "Missing victim";
            conf = "64%";
            mood = "institution";
          }

          if (institution) {
            hyps.push({ id: "inst", name: "Institutional narrative", conf: 67, note: "Hospital and police agree on a type of woman." });
            lines.push({ from: "medical", to: "inst", kind: "solid" });
            lines.push({ from: "police", to: "inst", kind: "solid" });
            log.push("Two institutions, one subject-type");
            hypName = "Institutional narrative";
            conf = "67%";
            mood = "institution";
          }

          if (crisis && !planned && !erasure) {
            hyps.push({ id: "crisis", name: "Psychological crisis", conf: 61, note: "Medical record plus a supporting trace." });
            if (set.medical) lines.push({ from: "medical", to: "crisis", kind: "solid" });
            if (set["witness-b"]) lines.push({ from: "witness-b", to: "crisis", kind: "solid" });
            log.push("Hypothesis formed: psychological crisis 61%");
            hypName = "Psychological crisis";
            conf = "61%";
            mood = "crisis";
          }

          if (conflictWitness) {
            hyps.push({ id: "split", name: "Conflicting testimony", note: "Witness A and B do not describe the same woman.", state: "revised" });
            lines.push({ from: "witness-a", to: "split", kind: "conflict" });
            lines.push({ from: "witness-b", to: "split", kind: "conflict" });
            log.push("CONFLICT DETECTED");
            log.push("Two memories, two Evelyns");
            hypName = "Conflicting testimony";
            rev = "Split";
          }

          if (!hyps.length) {
            hyps.push({ id: "weak", name: "Weak relation", conf: 28, note: "I can force a story. Confidence stays low." });
            ids.forEach(function (id) { lines.push({ from: id, to: "weak", kind: "dash" }); });
            log.push("Low-confidence join");
            hypName = "Weak relation";
            conf = "28%";
          }
        }

        var snap = JSON.stringify({ hyps: hyps });
        if (prevSnapshot && snap !== prevSnapshot && n > 1 && log[0] !== "NEW EVIDENCE DETECTED" && log[0] !== "CONFLICT DETECTED") {
          var prev = JSON.parse(prevSnapshot);
          if ((prev.hyps || []).some(function (h) { return h.conf; })) {
            log.unshift("REVISION: previous combination no longer holds");
            rev = "Revised";
          }
        }
        prevSnapshot = snap;

        hypsEl.innerHTML = hyps.map(function (h) {
          var cls = "hyp" + (h.state === "revised" ? " is-revised" : "");
          var c = h.conf == null ? "" : " · " + h.conf + "%";
          return "<article class=\"" + cls + "\" data-hyp-id=\"" + (h.id || "") + "\">" + h.name + c + "<small>" + (h.note || "") + "</small></article>";
        }).join("");

        judge.querySelector("[data-f=\"hyp\"]").textContent = hypName;
        judge.querySelector("[data-f=\"conf\"]").textContent = conf;
        judge.querySelector("[data-f=\"rev\"]").textContent = rev;
        judge.classList.remove("model--crisis", "model--erasure", "model--institution");
        if (mood) judge.classList.add("model--" + mood);
        if (mood === "crisis") judge.classList.add("is-conflict");
        else judge.classList.remove("is-conflict");
        if (stampEl) stampEl.textContent = hypName === "None" ? "She left a ticket. That is not the same as leaving." : hypName;
        setStatus(n < 2 ? "Status: comparing" : "Status: hypothesising");
        writeCog(log.length ? log : ["Waiting for combination"]);
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
          var b = document.querySelector("[data-hyp-id=\"" + ln.to + "\"]");
          if (!a || !b) return;
          var ar = a.getBoundingClientRect();
          var br = b.getBoundingClientRect();
          var wr = wrap.getBoundingClientRect();
          var x1 = ar.left + ar.width / 2 - wr.left;
          var y1 = ar.bottom - wr.top;
          var x2 = br.left + br.width / 2 - wr.left;
          var y2 = br.top - wr.top;
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
            var mx = (x1 + x2) / 2;
            var my = (y1 + y2) / 2;
            ["-5,-5,5,5", "5,-5,-5,5"].forEach(function (pair) {
              var p = pair.split(",");
              var c = document.createElementNS("http://www.w3.org/2000/svg", "line");
              c.setAttribute("x1", String(mx + Number(p[0])));
              c.setAttribute("y1", String(my + Number(p[1])));
              c.setAttribute("x2", String(mx + Number(p[2])));
              c.setAttribute("y2", String(my + Number(p[3])));
              c.setAttribute("stroke", "#1c1b18");
              svg.appendChild(c);
            });
          }
          svg.appendChild(line);
        });
      }

      function renderPins() {
        well.querySelectorAll(".pin").forEach(function (slot, i) {
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
          btn.classList.toggle("is-read", pins.indexOf(btn.getAttribute("data-id")) !== -1);
        });
        reason();
      }

      well.addEventListener("click", function (e) {
        var slot = e.target.closest(".pin");
        if (!slot || !slot.getAttribute("data-pin-id")) return;
        pins = pins.map(function (p) { return p === slot.getAttribute("data-pin-id") ? null : p; });
        renderPins();
      });

      document.querySelectorAll(".evidence .frag").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-id");
          document.querySelectorAll(".frag.is-open").forEach(function (el) { el.classList.remove("is-open"); });
          btn.classList.add("is-open");
          inspect.open(id, { think: true, effect: "Record entered the reconstruction area." });
          var idx = pins.indexOf(id);
          if (idx !== -1) pins[idx] = null;
          else {
            var empty = pins.indexOf(null);
            if (empty === -1) {
              pins.shift();
              pins.push(id);
            } else pins[empty] = id;
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
        var id = btn.getAttribute("data-id");
        var path = btn.getAttribute("data-read");
        inspect.open(id, { path: path });
        var rec = RECORDS[id];
        var label = path === "a" ? "patient" : path === "b" ? "victim" : "artist";
        setStatus("Status: split · path " + path.toUpperCase());
        writeCog([
          "Same object: " + rec.type,
          "Path " + path.toUpperCase() + " reading (" + label + ")",
          rec.reads[path],
          "NO SINGLE MODEL EXPLAINS ALL RECORDS"
        ]);
        if (voiceEl) voiceEl.textContent = "Which one did I find? Which one did I create?";
      });
    });
    var compare = document.querySelector("[data-compare]");
    var overlap = document.querySelector("[data-overlap]");
    if (compare) {
      compare.addEventListener("click", function () {
        var on = branch.classList.toggle("is-compare");
        if (overlap) overlap.hidden = !on;
        compare.textContent = on ? "Separate the three" : "Compare all";
        writeCog(on
          ? ["COMPARE ALL", "Same archive. Three Evelyns.", "Truth confidence: unknown", "Original: unresolved"]
          : ["Separated. Three coherent models remain."]);
      });
    }
  }
})();
