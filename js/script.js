/* Interaction only: log, subject model, page-2 hypothesis revision. */
(function () {
  "use strict";

  var KEY = "case11-model";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  function rec(o) {
    o.fields = o.fields || {};
    o.think = o.think || o.reading;
    o.steps = ["Accessing record..."].concat(o.more || [o.type, "Model updated"]);
    delete o.more;
    return o;
  }

  var RECORDS = {
    portrait: rec({
      src: "images/archive/evelyn-portrait.jpg",
      alt: "Black-and-white portrait of a young woman in a dark turtleneck, 1960s.",
      type: "Photographic portrait", date: "London, c. 1968", source: "Source uncertain",
      layer: "VISUAL", add: 18, fields: { age: "20–30 (est.)" },
      reading: "Female. Estimated age 20–30. Facial consistency 78%. A face can be indexed. Character cannot.",
      think: "A face is not a cause.",
      effect: "Identity model 08% → 26%. Visual identity added.",
      more: ["Image detected: photographic portrait", "Facial structure match: 78%", "Estimated gender: female", "Estimated age range: 20–30", "Adding to subject model...", "Identity model updated: 08% → 26%"],
      reads: { a: "The face is read as a patient. Expression becomes symptom.", b: "The face is circulated as a missing person.", c: "The face is a print she may have left on purpose." }
    }),
    contact: rec({
      src: "images/archive/contact-sheet.jpg", alt: "Photographic contact sheet of small film frames.",
      type: "Photographic contact sheet", date: "Estimated 1968", source: "Private archive",
      layer: "VISUAL", add: 8,
      reading: "Six facial states. Emotional classification unstable.",
      think: "Multiple faces from one roll.",
      effect: "Visual confidence increased. Mood cannot be fixed.",
      more: ["Image detected: contact sheet", "Six visible facial states", "Emotional classification: unstable"],
      reads: { a: "Instability of expression.", b: "Last known likenesses.", c: "A study of herself disappearing." }
    }),
    diary: rec({
      src: "images/archive/diary-page.jpg", alt: "Handwritten diary page in ink on aged paper.",
      type: "Handwritten diary", date: "July 1968", source: "Recovered notebook",
      layer: "SELF", add: 11, fields: { occupation: "Artist? (self)" },
      reading: "Controlled conceptual thinking. She writes of becoming unrecoverable.",
      think: "I treat writing as intention. That may be too much.",
      effect: "Internal voice added. If a hospital already spoke, conflict is possible.",
      more: ["Source type: first-person manuscript", "Language: controlled, conceptual", "Theme: refusing to be kept", "Adding SELF layer..."],
      reads: { a: "Read as rumination. A medical ear hears illness.", b: "Read as a last note before harm.", c: "Read as instruction: leave no original." }
    }),
    flyer: rec({
      src: "images/archive/event-flyer.jpg", alt: "Worn 1960s event flyer for an underground performance.",
      type: "Event flyer", date: "London, 1968", source: "Underground press remnant",
      layer: "WITNESS", add: 9, fields: { location: "London", occupation: "Performance artist / photographer" },
      reading: "Art circle. Performance context. A public is implied.",
      think: "Disappearance might have had an audience.",
      effect: "Social world added. Occupation tilts toward artist.",
      more: ["Document type: event flyer", "Temporal match: 1968", "Context: underground art", "Adding social world..."],
      reads: { a: "Overstimulating scene.", b: "Last place among others.", c: "The disappearance belongs to the work." }
    }),
    medical: rec({
      src: "images/archive/medical-form.jpg", alt: "Medical form with typed fields and redacted lines.",
      type: "Medical record", date: "1967–68", source: "Institutional copy",
      layer: "INSTITUTION", add: 10, fields: { status: "Possible instability?" },
      reading: "Diagnostic language. Claim: possible instability. The form is more certain than the diary.",
      think: "Medical language competes with her own.",
      effect: "Institutional identity added. Label: possible instability?",
      more: ["Document type: hospital form", "Language: diagnostic", "Claim: possible instability", "Adding INSTITUTION layer..."],
      reads: { a: "Primary source. She is a case before she is a person.", b: "Background only. Illness does not explain a river.", c: "A document she may have wanted the archive to over-believe." }
    }),
    police: rec({
      src: "images/archive/police-report.jpg", alt: "Police report typed on official paper.",
      type: "Police note", date: "1968", source: "Metropolitan file fragment",
      layer: "INSTITUTION", add: 10, fields: { name: "Evelyn Vale", status: "Missing" },
      reading: "Legal framing. Missing person. The subject becomes an incident.",
      think: "The police write a victim because that is the form they have.",
      effect: "Name attached to a case number.",
      more: ["Document type: police note", "Name detected: Evelyn Vale", "Legal frame: missing person", "Adding INSTITUTION layer..."],
      reads: { a: "Police language repeats the hospital.", b: "Primary source. Victim of accident or harm.", c: "A file opened because she arranged to be missed." }
    }),
    ticket: rec({
      src: "images/archive/tube-ticket.jpg", alt: "London Underground ticket stub.",
      type: "Transport ticket", date: "12 Jun 68", source: "Personal effects",
      layer: "VISUAL", add: 7, fields: { location: "London" },
      reading: "Movement through London. A ticket is not a confession.",
      think: "I connect the ticket to leaving. I may be inventing a plan.",
      effect: "Location and travel possibility added.",
      more: ["Object: transport ticket", "Location: London Underground", "Movement implied, destination unproven"],
      reads: { a: "Wandering. No clear destination.", b: "Last known route.", c: "A prop. Proof of passage left behind." }
    }),
    room: rec({
      src: "images/archive/empty-studio.jpg", alt: "Empty room with a chair and daylight, no occupant.",
      type: "Room photograph", date: "After disappearance", source: "Scene record",
      layer: "VISUAL", add: 6,
      reading: "Absence photographed. The subject does not remain.",
      think: "An empty room is evidence of where she is not.",
      effect: "Environment added. Occupancy unconfirmed.",
      more: ["Image detected: empty interior", "Occupancy: none"],
      reads: { a: "Neglect. A life unkept.", b: "Scene after an incident.", c: "The work: leave the room as a print." }
    }),
    hand: rec({
      src: "images/evidence/hand-injury.jpg", alt: "Photograph of a hand with a small injury.",
      type: "Body photograph", date: "Unknown", source: "Personal effects",
      layer: "VISUAL", add: 7,
      reading: "Injury present. Cause not present.",
      think: "Calling this self-harm because a medical file exists is circular.",
      effect: "Physical body layer added. Harm possible, not proven.",
      more: ["Image detected: hand", "Injury present, cause absent"],
      reads: { a: "Self-inflicted. Fits the patient model.", b: "Struggle or accident.", c: "A mark left for whoever would catalogue her." }
    }),
    letter: rec({
      src: "images/evidence/letter-sister.jpg", alt: "Typewritten letter on thin paper.",
      type: "Letter", date: "1968", source: "Family correspondence",
      layer: "SELF", add: 10, fields: { name: "Evelyn Vale" },
      reading: "Intention toward leaving. A relationship exists outside the file.",
      think: "A letter about going is not proof she went where she said.",
      effect: "Intention and personal relationship added.",
      more: ["Document type: letter", "Addressee: family", "Content: leaving", "Adding SELF layer..."],
      reads: { a: "Affect. Unstable promises.", b: "Last contact before harm.", c: "A planned leaving. The artwork begins in the sentence." }
    }),
    witness: rec({
      src: "images/evidence/witness-a.jpg", alt: "Typewritten witness statement.",
      type: "Witness statement", date: "1968", source: "Interview copy",
      layer: "WITNESS", add: 8,
      reading: "Remembered as composed. Not unstable — just far away.",
      think: "This memory contradicts the hospital.",
      effect: "How others remembered her: calm, leaving by choice.",
      more: ["Source type: witness statement", "Claim: she was different, not unstable", "Adding WITNESS layer..."],
      reads: { a: "Unreliable. Did not see the illness.", b: "She walked toward the station.", c: "She asked not to be followed." }
    }),
    "witness-b": rec({
      src: "images/evidence/witness-b.jpg", alt: "Witness statement B.",
      type: "Witness statement B", date: "1968", source: "Interview copy",
      layer: "WITNESS", add: 8,
      reading: "Unwell. Talking to herself. This memory prefers the hospital.",
      think: "Two witnesses, two Evelyns.",
      effect: "Witness memory: confusion. Conflicts with Witness A.",
      more: ["Witness B: confused", "Supports crisis reading"],
      reads: { a: "Confirms the patient.", b: "Confusion before an accident.", c: "A performance of distress, or a truth used as cover." }
    }),
    object: rec({
      src: "images/archive/matchbook.jpg", alt: "Worn matchbook, a small personal object.",
      type: "Personal object", date: "Unknown", source: "Personal effects",
      layer: "VISUAL", add: 5,
      reading: "A small object without a sentence. I am tempted to invent one.",
      think: "An object is not a biography.",
      effect: "Trace added. Meaning withheld.",
      more: ["Object photograph", "No inscription that holds"],
      reads: { a: "Disorder.", b: "Dropped in flight.", c: "Left as a signature." }
    }),
    coat: rec({
      src: "images/evidence/wet-coat.jpg", alt: "A dark coat, damp, photographed as an object.",
      type: "Object photograph", date: "1968", source: "Scene / personal effects",
      layer: "VISUAL", add: 8,
      reading: "Water on cloth. Weather, river, or staging. The object does not choose.",
      think: "I can attach this coat to accident, illness, or art.",
      effect: "Physical trace added. Meaning withheld.",
      more: ["Object: coat", "Water present", "Cause of water: unknown"],
      reads: { a: "Evidence of confusion.", b: "Evidence of accident.", c: "Deliberately planted evidence." }
    }),
    map: rec({
      src: "images/evidence/map-fragment.jpg", alt: "Torn map fragment of London.",
      type: "Map fragment", date: "1968", source: "Personal effects",
      layer: "VISUAL", add: 6, fields: { location: "London" },
      reading: "A route with a torn edge.",
      think: "A torn map looks like fate. It is also paper.",
      effect: "Geography added. Endpoint missing.",
      more: ["Map fragment", "Endpoint missing"],
      reads: { a: "Disorientation.", b: "Path toward harm.", c: "A map left incomplete on purpose." }
    })
  };
  RECORDS["witness-a"] = RECORDS.witness;

  function loadState() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { opened: [], pct: 8, fields: {}, layers: [] };
  }

  function saveState(state) {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function clarityFor(pct) {
    return pct < 20 ? "0" : pct < 35 ? "1" : pct < 50 ? "2" : pct < 62 ? "3" : "4";
  }

  function stamp() {
    var d = new Date();
    function z(n) { return n < 10 ? "0" + n : String(n); }
    return z(d.getHours()) + ":" + z(d.getMinutes()) + ":" + z(d.getSeconds());
  }

  function typeText(el, text, done) {
    if (!el) { if (done) done(); return; }
    if (reduce) { el.textContent = text; if (done) done(); return; }
    el.textContent = "";
    var i = 0;
    var id = setInterval(function () {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(id); if (done) done(); }
    }, 12);
  }

  function sequence(steps, i) {
    i = i || 0;
    if (i < steps.length) steps[i](function () { sequence(steps, i + 1); });
  }

  function wait(ms, done) { reduce ? done() : setTimeout(done, ms); }

  function markOpen(btn) {
    $$(".frag.is-open").forEach(function (el) { el.classList.remove("is-open"); });
    if (btn) btn.classList.add("is-open");
  }

  var machine = $("[data-machine]");
  var cog = $("[data-cog]");
  var cogStatus = $("[data-status]");
  var voiceEl = $("[data-voice]");
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

  function appendCog(text, done) {
    if (!cog) { if (done) done(); return; }
    var line = document.createElement("p");
    cog.appendChild(line);
    while (cog.children.length > 36) cog.removeChild(cog.firstChild);
    cog.scrollTop = cog.scrollHeight;
    typeText(line, "[" + stamp() + "] " + text, function () {
      cog.scrollTop = cog.scrollHeight;
      if (done) done();
    });
  }

  function startIdle() {
    if (!cog || reduce) return;
    function tick() {
      if (cogBusy) return;
      appendCog(idlePool[idleAt % idlePool.length]);
      idleAt += 1;
      idleTimer = setTimeout(tick, 2600 + Math.floor(Math.random() * 900));
    }
    idleTimer = setTimeout(tick, 400);
  }

  function writeCog(lines, done) {
    if (!cog) { if (done) done(); return; }
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
      appendCog(lines[i++], function () { wait(160, next); });
    }
    next();
  }

  startIdle();

  var inspect = (function () {
    var root = $("[data-inspect]");
    if (!root) return { open: function () {} };
    var img = $(".inspect-img img", root);
    var status = $("[data-istatus]", root);
    var body = $("[data-body]", root);

    function close() {
      root.hidden = true;
      $$(".frag.is-open").forEach(function (el) { el.classList.remove("is-open"); });
    }

    $("[data-close]", root).addEventListener("click", close);
    root.addEventListener("click", function (e) { if (e.target === root) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !root.hidden) close();
    });

    function open(id, extra) {
      var rec = RECORDS[id];
      if (!rec) return;
      extra = extra || {};
      img.src = rec.src;
      img.alt = rec.alt;
      body.innerHTML = "";
      status.textContent = "";
      root.hidden = false;
      var reading = rec.reading;
      var effect = rec.effect;
      if (extra.path && rec.reads[extra.path]) {
        reading = rec.reads[extra.path];
        effect = "Same object. Different model. Meaning moved.";
      } else if (extra.think) {
        reading = rec.think;
        effect = extra.effect || rec.effect;
      }
      sequence([
        function (next) { typeText(status, "ACCESSING RECORD...", function () { wait(220, next); }); },
        function (next) { typeText(status, "READING...", function () { wait(220, next); }); },
        function (next) { typeText(status, "MODEL EFFECT READY", next); },
        function (next) {
          body.innerHTML = "<h2>Archive record</h2><p data-l1></p><h2>Machine reading</h2><p data-l2></p><h2>Model effect</h2><p data-l3></p>";
          sequence([
            function (n) { typeText($("[data-l1]", body), rec.type + ". " + rec.date + ". " + rec.source + ".", n); },
            function (n) { typeText($("[data-l2]", body), reading, n); },
            function (n) { typeText($("[data-l3]", body), effect, n); }
          ]);
          next();
        }
      ]);
    }

    return { open: open };
  })();

  var subject = $("[data-model]");
  if (subject) {
    var state = loadState();
    var form = $("[data-layer-form]", subject);

    function hasConflict() {
      var o = state.opened;
      var med = o.indexOf("medical") !== -1;
      return (med && o.indexOf("diary") !== -1) || (med && (o.indexOf("witness") !== -1 || o.indexOf("witness-a") !== -1));
    }

    function render() {
      $("[data-pct]", subject).textContent = (state.pct < 10 ? "0" : "") + state.pct + "%";
      var bar = $("[data-bar]", subject);
      if (bar) bar.style.width = state.pct + "%";
      subject.setAttribute("data-clarity", clarityFor(state.pct));
      subject.classList.toggle("is-conflict", hasConflict());
      ["name", "age", "occupation", "location", "status"].forEach(function (k) {
        var el = $("[data-f=\"" + k + "\"]", subject);
        if (el) el.textContent = state.fields[k] || "Unknown";
      });
      if (hasConflict() && /instability/i.test(state.fields.status || "")) {
        $("[data-f=\"status\"]", subject).textContent = "Contested / multiple states";
      }
      if (form) {
        $$("input", form).forEach(function (inp) {
          var on = state.layers.indexOf(inp.value) !== -1;
          inp.disabled = !on;
          if (on && !inp.dataset.ready) { inp.checked = true; inp.dataset.ready = "1"; }
        });
      }
      $$(".frag[data-id]").forEach(function (btn) {
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
        Object.keys(rec.fields).forEach(function (k) { state.fields[k] = rec.fields[k]; });
      }
      rec.effect = rec.effect.replace(/\d+%\s*→\s*\d+%/, before + "% → " + state.pct + "%");
      saveState(state);
      render();
      var lines = rec.steps.slice();
      if (hasConflict()) {
        lines.push("CONFLICT DETECTED", "Diary / witness language does not match the hospital", "PREVIOUS MODEL REVISED", "MULTIPLE SUBJECT STATES POSSIBLE");
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
          var inp = $("input[value=\"" + layer + "\"]", form);
          subject.classList.toggle("layer-off-" + layer, inp && !inp.disabled && !inp.checked);
        });
      });
    }

    $$(".frags .frag[data-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        markOpen(btn);
        inspect.open(btn.getAttribute("data-id"));
        apply(btn.getAttribute("data-id"));
      });
    });

    render();
  }

  var well = $("[data-pins]");
  if (well) {
    var state = loadState();
    var pins = [null, null, null];
    var hypsEl = $("[data-hyps]");
    var svg = $("[data-links]");
    var judge = $("[data-judge]");
    var stampEl = $("[data-stamp]", judge);
    var prevSnapshot = "";

    $("[data-pct]", judge).textContent = (state.pct < 10 ? "0" : "") + state.pct + "%";
    if ($("[data-bar]", judge)) $("[data-bar]", judge).style.width = state.pct + "%";
    judge.setAttribute("data-clarity", clarityFor(state.pct));

    function has(set, id) { return !!set[id]; }

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
        var planned = has(set, "ticket") && has(set, "letter");
        var erasure = has(set, "diary") && (has(set, "letter") || has(set, "flyer"));
        var victim = has(set, "police") && (has(set, "coat") || has(set, "ticket") || has(set, "map"));
        var crisis = has(set, "medical") && (has(set, "witness-b") || has(set, "hand") || has(set, "letter") || has(set, "ticket") || has(set, "diary"));
        var institution = has(set, "medical") && has(set, "police");

        if (planned && !has(set, "medical")) {
          hyps.push({ id: "depart", name: "Planned departure", conf: 72, note: "Ticket + letter agree on leaving." });
          lines.push({ from: "ticket", to: "depart", kind: "solid" }, { from: "letter", to: "depart", kind: "solid" });
          log.push("Hypothesis formed: planned departure 72%");
          hypName = "Planned departure"; conf = "72%"; mood = "erasure";
        }
        if (planned && has(set, "medical")) {
          hyps = [
            { id: "depart", name: "Planned departure", conf: 49, note: "Previously 72%. Lowered.", state: "revised" },
            { id: "crisis", name: "Psychological crisis", conf: 31, note: "Medical language entered." },
            { id: "unknown", name: "Unknown", conf: 20, note: "Remainder I cannot assign." }
          ];
          lines = [
            { from: "ticket", to: "depart", kind: "dead" },
            { from: "letter", to: "depart", kind: "solid" },
            { from: "medical", to: "crisis", kind: "dash" },
            { from: "medical", to: "depart", kind: "conflict" }
          ];
          log = ["NEW EVIDENCE DETECTED", "Previous hypothesis: planned departure 72%", "PREVIOUS MODEL INVALIDATED", "Revised: departure 49% · crisis 31% · unknown 20%"];
          hypName = "Split: leaving / crisis"; conf = "49% / 31% / 20%"; rev = "Previous model invalidated"; mood = "crisis";
        }
        if (erasure && !planned) {
          hyps.push({ id: "erasure", name: "Self-erasure", conf: 70, note: "Diary and correspondence point inward." });
          if (has(set, "diary")) lines.push({ from: "diary", to: "erasure", kind: "solid" });
          if (has(set, "letter")) lines.push({ from: "letter", to: "erasure", kind: "solid" });
          if (has(set, "flyer")) lines.push({ from: "flyer", to: "erasure", kind: "dash" });
          log.push("Hypothesis formed: self-erasure 70%");
          hypName = "Self-erasure"; conf = "70%"; mood = "erasure";
        }
        if (erasure && has(set, "medical")) {
          hyps = [
            { id: "erasure", name: "Self-erasure", conf: 44, note: "Now contested.", state: "revised" },
            { id: "crisis", name: "Psychological crisis", conf: 38, note: "Hospital reading of the same words." },
            { id: "unknown", name: "Unknown", conf: 18, note: "No single model holds." }
          ];
          lines = [];
          if (has(set, "diary")) lines.push({ from: "diary", to: "erasure", kind: "solid" });
          if (has(set, "letter")) lines.push({ from: "letter", to: "erasure", kind: "dash" });
          lines.push({ from: "medical", to: "crisis", kind: "solid" });
          if (has(set, "diary")) lines.push({ from: "medical", to: "erasure", kind: "conflict" });
          log = ["CONFLICT DETECTED", "The diary is now two documents: art, and symptom", "PREVIOUS MODEL REVISED"];
          hypName = "Art or illness"; conf = "44% / 38%"; rev = "Contested"; mood = "crisis";
        }
        if (victim && !crisis) {
          hyps.push({ id: "victim", name: "Accident / missing victim", conf: 64, note: "Police form + physical trace." });
          if (has(set, "police")) lines.push({ from: "police", to: "victim", kind: "solid" });
          if (has(set, "coat")) lines.push({ from: "coat", to: "victim", kind: "solid" });
          if (has(set, "ticket")) lines.push({ from: "ticket", to: "victim", kind: "dash" });
          log.push("Hypothesis formed: missing victim 64%");
          hypName = "Missing victim"; conf = "64%"; mood = "institution";
        }
        if (institution) {
          hyps.push({ id: "inst", name: "Institutional narrative", conf: 67, note: "Hospital and police agree on a type of woman." });
          lines.push({ from: "medical", to: "inst", kind: "solid" }, { from: "police", to: "inst", kind: "solid" });
          log.push("Two institutions, one subject-type");
          hypName = "Institutional narrative"; conf = "67%"; mood = "institution";
        }
        if (crisis && !planned && !erasure) {
          hyps.push({ id: "crisis", name: "Psychological crisis", conf: 61, note: "Medical record plus a supporting trace." });
          lines.push({ from: "medical", to: "crisis", kind: "solid" });
          if (has(set, "witness-b")) lines.push({ from: "witness-b", to: "crisis", kind: "solid" });
          log.push("Hypothesis formed: psychological crisis 61%");
          hypName = "Psychological crisis"; conf = "61%"; mood = "crisis";
        }
        if (has(set, "witness-a") && has(set, "witness-b")) {
          hyps.push({ id: "split", name: "Conflicting testimony", note: "Witness A and B do not describe the same woman.", state: "revised" });
          lines.push({ from: "witness-a", to: "split", kind: "conflict" }, { from: "witness-b", to: "split", kind: "conflict" });
          log.push("CONFLICT DETECTED", "Two memories, two Evelyns");
          hypName = "Conflicting testimony"; rev = "Split";
        }
        if (!hyps.length) {
          hyps.push({ id: "weak", name: "Weak relation", conf: 28, note: "I can force a story. Confidence stays low." });
          ids.forEach(function (id) { lines.push({ from: id, to: "weak", kind: "dash" }); });
          log.push("Low-confidence join");
          hypName = "Weak relation"; conf = "28%";
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
        return "<article class=\"hyp" + (h.state === "revised" ? " is-revised" : "") + "\" data-hyp-id=\"" + (h.id || "") + "\">" +
          h.name + (h.conf == null ? "" : " · " + h.conf + "%") + "<small>" + (h.note || "") + "</small></article>";
      }).join("");

      $("[data-f=\"hyp\"]", judge).textContent = hypName;
      $("[data-f=\"conf\"]", judge).textContent = conf;
      $("[data-f=\"rev\"]", judge).textContent = rev;
      judge.classList.remove("model--crisis", "model--erasure", "model--institution", "is-conflict");
      if (mood) judge.classList.add("model--" + mood);
      if (mood === "crisis") judge.classList.add("is-conflict");
      if (stampEl) stampEl.textContent = hypName === "None" ? "She left a ticket. That is not the same as leaving." : hypName;
      setStatus(n < 2 ? "Status: comparing" : "Status: hypothesising");
      writeCog(log.length ? log : ["Waiting for combination"]);
      drawLines(lines);
    }

    function svgLine(x1, y1, x2, y2, attrs) {
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1); line.setAttribute("y1", y1);
      line.setAttribute("x2", x2); line.setAttribute("y2", y2);
      line.setAttribute("stroke", attrs.stroke || "#1c1b18");
      line.setAttribute("stroke-width", "1");
      if (attrs.dash) line.setAttribute("stroke-dasharray", attrs.dash);
      if (attrs.opacity) line.setAttribute("opacity", attrs.opacity);
      svg.appendChild(line);
    }

    function drawLines(lines) {
      if (!svg) return;
      var wrap = svg.parentElement;
      var wr = wrap.getBoundingClientRect();
      svg.setAttribute("viewBox", "0 0 " + Math.max(wr.width, 1) + " " + Math.max(wr.height, 1));
      svg.innerHTML = "";
      lines.forEach(function (ln) {
        var a = wrap.querySelector("[data-pin-id=\"" + ln.from + "\"]");
        var b = $("[data-hyp-id=\"" + ln.to + "\"]");
        if (!a || !b) return;
        var ar = a.getBoundingClientRect();
        var br = b.getBoundingClientRect();
        var x1 = ar.left + ar.width / 2 - wr.left;
        var y1 = ar.bottom - wr.top;
        var x2 = br.left + br.width / 2 - wr.left;
        var y2 = br.top - wr.top;
        svgLine(x1, y1, x2, y2, {
          stroke: ln.kind === "conflict" ? "#7a2e2e" : "#1c1b18",
          dash: ln.kind === "dash" ? "4 4" : "",
          opacity: ln.kind === "dead" ? "0.35" : ""
        });
        if (ln.kind === "dead") {
          var mx = (x1 + x2) / 2;
          var my = (y1 + y2) / 2;
          svgLine(mx - 5, my - 5, mx + 5, my + 5, {});
          svgLine(mx + 5, my - 5, mx - 5, my + 5, {});
        }
      });
    }

    function renderPins() {
      $$(".pin", well).forEach(function (slot, i) {
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
      $$(".evidence .frag").forEach(function (btn) {
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

    $$(".evidence .frag").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        markOpen(btn);
        inspect.open(id, { think: true, effect: "Record entered the reconstruction area." });
        var idx = pins.indexOf(id);
        if (idx !== -1) pins[idx] = null;
        else {
          var empty = pins.indexOf(null);
          if (empty === -1) { pins.shift(); pins.push(id); }
          else pins[empty] = id;
        }
        renderPins();
      });
    });

    window.addEventListener("resize", reason);
    renderPins();
  }

  var branch = $("[data-branch]");
  if (branch) {
    $$(".same-ev [data-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var path = btn.getAttribute("data-read");
        var rec = RECORDS[id];
        var label = path === "a" ? "patient" : path === "b" ? "victim" : "artist";
        inspect.open(id, { path: path });
        setStatus("Status: split · path " + path.toUpperCase());
        writeCog(["Same object: " + rec.type, "Path " + path.toUpperCase() + " reading (" + label + ")", rec.reads[path], "NO SINGLE MODEL EXPLAINS ALL RECORDS"]);
        if (voiceEl) voiceEl.textContent = "Which one did I find? Which one did I create?";
      });
    });
    var compare = $("[data-compare]");
    var overlap = $("[data-overlap]");
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
