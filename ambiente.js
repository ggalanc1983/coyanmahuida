// Sonido ambiente del bosque, generado en el navegador con Web Audio.
// Suena de forma continua e independiente de las fotos, así que no se corta al cambiar de punto.
//
// El paisaje sonoro cambia solo entre distintos momentos:
//   · calma        → solo viento y hojas (20–60 s)
//   · aves sueltas → cada tanto canta un ave, con pausas largas
//   · actividad    → algunas aves a la vez, por poco tiempo
// Cada "ave" tiene su propia voz (tono, ritmo, posición izquierda/derecha y distancia), y el
// grupo de aves va cambiando, así que el sonido nunca se repite igual.
//
// Además hay una MÚSICA SUAVE generada aquí mismo (composición original, sin derechos de autor
// de terceros): acordes lentos y notas sueltas tipo campana, muy tenues. Se activa por separado.
//
// ¿Quieres usar una grabación real? Copia un archivo de audio en  audio/ambiente.mp3
// Si existe, se usa en lugar del sonido generado y se reproduce en bucle sin cortes.

export function createAmbience() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return { start() {}, setOn() {}, isOn: () => false, supported: false };
  const ctx = new AC();
  const master = ctx.createGain();          // naturaleza
  master.gain.value = 0;
  master.connect(ctx.destination);
  const musicMaster = ctx.createGain();     // música
  musicMaster.gain.value = 0;
  musicMaster.connect(ctx.destination);

  let on = false, musicOn = false, started = false, natVol = 0.8, musVol = 0.35;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const rint = (a, b) => Math.floor(rnd(a, b + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const later = (fn, s) => setTimeout(fn, s * 1000);

  // ---------- Reverberación suave (eco del bosque) ----------
  const verb = ctx.createConvolver();
  {
    const len = Math.floor(ctx.sampleRate * 2.6), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.4);
    }
    verb.buffer = ir;
  }
  const verbGain = ctx.createGain(); verbGain.gain.value = 0.36;
  verb.connect(verbGain).connect(master);
  const birdBus = ctx.createGain(); birdBus.gain.value = 0;     // se abre y cierra según el momento
  birdBus.connect(master); birdBus.connect(verb);
  const fxBus = ctx.createGain(); fxBus.gain.value = 1;
  fxBus.connect(master); fxBus.connect(verb);

  // ---------- Viento y hojas (ruido filtrado en bucle sin costura) ----------
  function noiseBuffer(seconds, brown) {
    const len = Math.floor(ctx.sampleRate * seconds), fade = Math.floor(ctx.sampleRate * 0.8);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let last = 0, b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
        else { b0 = 0.997 * b0 + w * 0.029; b1 = 0.985 * b1 + w * 0.032; b2 = 0.95 * b2 + w * 0.048; d[i] = (b0 + b1 + b2 + w * 0.02) * 0.9; }
      }
      for (let i = 0; i < fade; i++) { const k = i / fade; d[i] = d[i] * k + d[len - fade + i] * (1 - k); }
    }
    return buf;
  }
  // El viento en un bosque se oye sobre todo como susurro de hojas: ruido rosa filtrado en
  // bandas medias-altas, con un aleteo suave, y un fondo grave muy leve.
  const windGain = ctx.createGain(); windGain.gain.value = 0.05;   // fondo grave, muy bajo
  const leafGain = ctx.createGain(); leafGain.gain.value = 0.05;   // susurro de hojas
  const leafGain2 = ctx.createGain(); leafGain2.gain.value = 0.03; // segunda capa, otro lado
  let windLP, leafBP, leafBP2;
  function startNoise() {
    const w = ctx.createBufferSource(); w.buffer = noiseBuffer(13, true); w.loop = true;
    windLP = ctx.createBiquadFilter(); windLP.type = 'lowpass'; windLP.frequency.value = 320; windLP.Q.value = 0.3;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 70;
    w.connect(hp).connect(windLP).connect(windGain).connect(master); w.start();
    const mk = (secs, gain, freq, pan) => {
      const l = ctx.createBufferSource(); l.buffer = noiseBuffer(secs, false); l.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.45;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7000;
      // aleteo de las hojas: modulación lenta e irregular del volumen
      const flutter = ctx.createGain(); flutter.gain.value = 1;
      const lfo = ctx.createOscillator(), lfoG = ctx.createGain(); lfo.frequency.value = rnd(0.15, 0.4); lfoG.gain.value = 0.25;
      lfo.connect(lfoG).connect(flutter.gain); lfo.start();
      let node = l.connect(bp).connect(lp).connect(flutter).connect(gain);
      if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; gain.connect(p).connect(master); } else gain.connect(master);
      l.start(); return bp;
    };
    leafBP = mk(11, leafGain, 2200, -0.35);
    leafBP2 = mk(9, leafGain2, 3400, 0.45);
  }
  let windLevel = 1;   // la escena "calma" sube un poco el viento, la de "actividad" lo baja
  function gust() {
    const t = ctx.currentTime, up = rnd(2.5, 6), hold = rnd(1, 4), down = rnd(4, 9);
    const strong = Math.random() < 0.2;
    const peak = (strong ? rnd(0.11, 0.15) : rnd(0.06, 0.09)) * windLevel;
    const rest = rnd(0.025, 0.04) * windLevel;
    for (const [g, k] of [[leafGain, 1], [leafGain2, rnd(0.5, 0.9)]]) {
      g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(peak * k, t, up / 3); g.gain.setTargetAtTime(rest * k, t + up + hold, down / 3);
    }
    windGain.gain.cancelScheduledValues(t);
    windGain.gain.setTargetAtTime((strong ? 0.07 : 0.04) * windLevel, t, up / 3); windGain.gain.setTargetAtTime(0.025 * windLevel, t + up + hold, down / 3);
    leafBP.frequency.setTargetAtTime(strong ? rnd(2600, 3200) : rnd(1800, 2500), t, up / 2);
    leafBP.frequency.setTargetAtTime(rnd(1700, 2200), t + up + hold, down / 2);
    later(gust, up + hold + down + rnd(2, 12));
  }

  // ---------- Síntesis de cantos ----------
  function voiceOut(bird) {
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400 + (1 - bird.dist) * 7000;
    const g = ctx.createGain(); g.gain.value = 1;
    if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = bird.pan; g.connect(lp).connect(p).connect(birdBus); }
    else g.connect(lp).connect(birdBus);
    return g;
  }
  function note(out, t, f0, f1, dur, vol, type = 'sine', vib = 0, vibDepth = 0.06) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(60, f1), t + dur);
    if (vib) { const m = ctx.createOscillator(), mg = ctx.createGain(); m.frequency.value = vib; mg.gain.value = f0 * vibDepth; m.connect(mg).connect(o.frequency); m.start(t); m.stop(t + dur + 0.05); }
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.025, dur * 0.3));
    g.gain.setTargetAtTime(0, t + dur * 0.7, dur * 0.18);
    o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.3);
  }
  // Plantillas de canto. "p" son los rasgos fijos de cada ave (tono base f, velocidad s, variante k).
  const SONGS = {
    // silbido claro de dos notas
    silbo: (o, t, v, p) => { note(o, t, p.f, p.f * 1.22, 0.24 * p.s, v); note(o, t + 0.32 * p.s, p.f * 1.22, p.f * 0.9, 0.34 * p.s, v); return 0.75 * p.s; },
    // frase de silbidos seguida de un trino corto (como el canto de un chincol)
    frase: (o, t, v, p) => { note(o, t, p.f, p.f * 1.02, 0.28 * p.s, v); note(o, t + 0.36 * p.s, p.f * 1.18, p.f * 1.12, 0.22 * p.s, v * 0.9);
      const n = rint(5, 9), st = 0.055 * p.s; for (let i = 0; i < n; i++) note(o, t + 0.7 * p.s + i * st, p.f * 1.3, p.f * 1.05, st * 0.8, v * 0.7); return 0.75 * p.s + n * st; },
    // trino rápido y descendente
    trino: (o, t, v, p) => { const n = rint(8, 15), st = 0.05 * p.s;
      for (let i = 0; i < n; i++) { const f = p.f * 1.4 * (1 - i * 0.012); note(o, t + i * st, f, f * 0.86, st * 0.8, v * 0.75); } return n * st; },
    // gorjeo con vibrato
    gorjeo: (o, t, v, p) => { note(o, t, p.f, p.f * (p.k > 0.5 ? 1.12 : 0.88), rnd(0.45, 0.75) * p.s, v * 0.7, 'sine', 24 + p.k * 14); return 0.85 * p.s; },
    // llamada grave y repetida, como un hued-hued lejano
    grave: (o, t, v, p) => { const f = p.f * 0.26, n = rint(3, 5);
      for (let i = 0; i < n; i++) note(o, t + i * 0.25 * p.s, f * (1 - i * 0.04), f * (1 - i * 0.04) * 0.93, 0.15, v * 1.3, 'triangle'); return n * 0.25 * p.s; },
    // serie de notas que bajan, como un chucao a lo lejos
    chucao: (o, t, v, p) => { const f = p.f * 0.45, n = rint(4, 6);
      for (let i = 0; i < n; i++) note(o, t + i * 0.13, f * (1 - i * 0.05), f * (1 - i * 0.05) * 0.8, 0.09, v, 'triangle');
      note(o, t + n * 0.13 + 0.06, f * 0.7, f * 0.55, 0.3, v * 0.9, 'triangle'); return n * 0.13 + 0.45; },
    // arrullo suave de tres notas, como una tórtola
    arrullo: (o, t, v, p) => { const f = p.f * 0.17; note(o, t, f, f * 1.05, 0.35, v * 1.4, 'sine'); note(o, t + 0.5, f * 1.08, f * 0.95, 0.55, v * 1.5, 'sine'); note(o, t + 1.2, f, f * 0.92, 0.4, v * 1.3, 'sine'); return 1.7; },
    // pío agudo y suelto
    pio: (o, t, v, p) => { const f = p.f * 1.7; note(o, t, f, f * 0.7, 0.08, v * 0.6); if (p.k > 0.4) note(o, t + 0.15, f * 1.05, f * 0.72, 0.07, v * 0.5); return 0.3; },
    // nota que sube, como un llamado de contacto
    sube: (o, t, v, p) => { note(o, t, p.f * 0.8, p.f * 1.35, 0.18 * p.s, v * 0.8); return 0.3; },
  };
  const KINDS = Object.keys(SONGS);
  function newBird() {
    return {
      song: pick(KINDS), f: rnd(2300, 3500), s: rnd(0.85, 1.2), k: Math.random(),
      pan: rnd(-0.95, 0.95), dist: Math.random(), reps: rint(1, 4), out: null,
    };
  }
  let roster = Array.from({ length: 7 }, newBird);
  function refreshRoster() {
    // algunas aves se van y llegan otras nuevas
    const n = rint(1, 3);
    for (let i = 0; i < n; i++) roster[rint(0, roster.length - 1)] = newBird();
  }
  function sing(bird, extraReps = 0) {
    if (!bird.out) bird.out = voiceOut(bird);
    const v = 0.03 + (1 - bird.dist) * 0.085;
    let t = ctx.currentTime + 0.05;
    const reps = Math.max(1, bird.reps + extraReps + rint(-1, 1));
    for (let r = 0; r < reps; r++) t += SONGS[bird.song](bird.out, t, v * rnd(0.85, 1.1), bird) + rnd(0.5, 2.2);
    return t - ctx.currentTime;
  }

  // ---------- Otros sonidos ocasionales ----------
  function woodpecker() {   // golpeteo lejano de un carpintero
    const t0 = ctx.currentTime + 0.05, n = rint(9, 16), pan = rnd(-0.8, 0.8), vol = rnd(0.05, 0.09);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null; if (p) { p.pan.value = pan; p.connect(fxBus); }
    let t = t0;
    for (let i = 0; i < n; i++) {
      const src = ctx.createBufferSource(); src.buffer = clickBuf;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = rnd(900, 1300); bp.Q.value = 4;
      const g = ctx.createGain(); g.gain.value = vol * (1 - i / (n * 1.6));
      src.connect(bp).connect(g).connect(p || fxBus); src.start(t);
      t += 0.06 - i * 0.0012;
    }
  }
  let clickBuf;
  function rustle() {       // ráfaga breve de hojas
    const src = ctx.createBufferSource(); src.buffer = rustleBuf;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = rnd(2500, 4500);
    const g = ctx.createGain(), t = ctx.currentTime, d = rnd(0.8, 2);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(rnd(0.04, 0.08), t + d * 0.3); g.gain.linearRampToValueAtTime(0, t + d);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) { p.pan.value = rnd(-0.9, 0.9); src.connect(hp).connect(g).connect(p).connect(fxBus); } else src.connect(hp).connect(g).connect(fxBus);
    src.start(t, rnd(0, 2)); src.stop(t + d + 0.1);
  }
  let rustleBuf;
  function fxLoop() {
    if (on) { if (Math.random() < 0.3) woodpecker(); else rustle(); }
    later(fxLoop, rnd(25, 70));
  }

  // ---------- Director de escenas ----------
  const SCENES = {
    calma:     { dur: [20, 60], bird: 0,    wind: 1.25, gap: null },
    sueltas:   { dur: [30, 70], bird: 0.85, wind: 1.0,  gap: [6, 16], who: 2 },
    actividad: { dur: [18, 40], bird: 1.0,  wind: 0.85, gap: [1.5, 5], who: 4 },
  };
  const NEXT = { calma: ['sueltas', 'sueltas', 'actividad'], sueltas: ['calma', 'calma', 'actividad'], actividad: ['calma', 'sueltas'] };
  let scene = 'sueltas', sceneEnd = 0, cast = [], birdTimer = null;
  function setScene(name) {
    scene = name; const sc = SCENES[name], t = ctx.currentTime;
    sceneEnd = performance.now() + rnd(...sc.dur) * 1000;
    windLevel = sc.wind;
    birdBus.gain.cancelScheduledValues(t);
    birdBus.gain.setTargetAtTime(sc.bird, t, sc.bird ? 2 : 4);   // entradas y salidas graduales
    if (name !== 'calma') { refreshRoster(); cast = [...roster].sort(() => Math.random() - 0.5).slice(0, sc.who); }
  }
  function birdLoop() {
    if (performance.now() > sceneEnd) setScene(pick(NEXT[scene]));
    const sc = SCENES[scene];
    let wait = 3;
    if (on && sc.gap) {
      const b = pick(cast);
      const dur = sing(b, scene === 'actividad' ? 1 : 0);
      wait = (scene === 'actividad' ? dur * rnd(0.3, 0.8) : dur) + rnd(...sc.gap);
      // en actividad, a veces otra ave responde
      if (scene === 'actividad' && Math.random() < 0.4) later(() => on && sing(pick(cast)), rnd(0.8, 2.5));
    }
    birdTimer = later(birdLoop, wait);
  }

  // ---------- Música suave (composición generada, sin derechos de terceros) ----------
  const musVerb = ctx.createConvolver();
  {
    const len = Math.floor(ctx.sampleRate * 4.5), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    musVerb.buffer = ir;
  }
  const musLP = ctx.createBiquadFilter(); musLP.type = 'lowpass'; musLP.frequency.value = 1500; musLP.Q.value = 0.3;
  const musDry = ctx.createGain(); musDry.gain.value = 0.55;
  const musWet = ctx.createGain(); musWet.gain.value = 0.7;
  musLP.connect(musDry).connect(musicMaster); musLP.connect(musVerb).connect(musWet).connect(musicMaster);
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  // Progresión en Re mayor: Dmaj9 – Bm7 – Gmaj7 – Aadd9 (en notas MIDI)
  const CHORDS = [[50, 57, 62, 66, 69, 76], [47, 54, 62, 66, 69, 74], [43, 55, 59, 62, 66, 71], [45, 52, 57, 61, 64, 71]];
  const SCALE = [74, 76, 78, 81, 83, 86, 88, 90];   // pentatónica de Re, registro medio-agudo
  let chordIdx = 0, musicStarted = false;
  function pad(chord, t, dur) {
    for (const m of chord) {
      for (const det of [-4, 4]) {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = m < 52 ? 'sine' : 'triangle'; o.frequency.value = hz(m); o.detune.value = det + rnd(-2, 2);
        const v = (m < 52 ? 0.05 : 0.022) * rnd(0.8, 1.1);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + dur * 0.35);
        g.gain.setValueAtTime(v, t + dur * 0.7); g.gain.linearRampToValueAtTime(0, t + dur + 3);
        o.connect(g).connect(musLP); o.start(t); o.stop(t + dur + 3.2);
      }
    }
  }
  function bell(t) {
    const m = pick(SCALE), f = hz(m), v = rnd(0.018, 0.035);
    for (const [mult, amp, dec] of [[1, 1, 2.6], [2, 0.18, 1.2], [3, 0.06, 0.7]]) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f * mult;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * amp, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dec);
      if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = rnd(-0.5, 0.5); o.connect(g).connect(p).connect(musLP); } else o.connect(g).connect(musLP);
      o.start(t); o.stop(t + dec + 0.1);
    }
  }
  function musicLoop() {
    const dur = rnd(9, 13);
    if (musicOn) {
      const t = ctx.currentTime + 0.1;
      // a veces se repite el acorde o se salta uno, para que no sea un ciclo fijo
      chordIdx = (chordIdx + (Math.random() < 0.15 ? 2 : 1)) % CHORDS.length;
      pad(CHORDS[chordIdx], t, dur);
      // pocas notas sueltas, y a veces ninguna
      const n = Math.random() < 0.3 ? 0 : rint(1, 3);
      for (let i = 0; i < n; i++) bell(t + rnd(1, dur - 1));
    }
    later(musicLoop, dur);
  }

  // ---------- Grabación real opcional ----------
  async function tryRecording() {
    try {
      const r = await fetch('audio/ambiente.mp3');
      if (!r.ok) return false;
      const buf = await ctx.decodeAudioData(await r.arrayBuffer());
      const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
      const g = ctx.createGain(); g.gain.value = 0.9; s.connect(g).connect(master); s.start();
      return true;
    } catch (e) { return false; }
  }

  async function start() {
    if (started) return; started = true;
    try { await ctx.resume(); } catch (e) {}
    if (!musicStarted) { musicStarted = true; musicLoop(); }
    if (await tryRecording()) return;
    clickBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.02), ctx.sampleRate);
    { const d = clickBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6); }
    rustleBuf = noiseBuffer(4, false);
    startNoise(); gust();
    setScene(Math.random() < 0.5 ? 'calma' : 'sueltas');
    birdLoop();
    later(fxLoop, rnd(15, 40));
  }
  function fade(gainNode, target, secs) {
    const t = ctx.currentTime;
    gainNode.gain.cancelScheduledValues(t);
    gainNode.gain.setValueAtTime(gainNode.gain.value, t);
    gainNode.gain.linearRampToValueAtTime(target, t + secs);
  }
  // naturaleza (aves, viento, hojas)
  function setOn(v) {
    on = v; if (v) { try { ctx.resume(); } catch (e) {} }
    fade(master, v ? natVol * 1.1 : 0, v ? 1.5 : 0.5);
  }
  function setNatureVolume(x) { natVol = x; if (on) fade(master, x * 1.1, 0.3); }
  // música
  function setMusic(v) {
    musicOn = v; if (v) { try { ctx.resume(); } catch (e) {} }
    fade(musicMaster, v ? musVol : 0, v ? 3 : 1);
  }
  function setMusicVolume(x) { musVol = x; if (musicOn) fade(musicMaster, x, 0.3); }
  return { start, setOn, setNatureVolume, setMusic, setMusicVolume, isOn: () => on, isMusicOn: () => musicOn, supported: true };
}
