(function () {
  'use strict';
  var D = window.APP;
  var TOTAL = D.total;
  var KEY = 'brasilenas.v2';
  var view = document.getElementById('view');
  var nav = document.getElementById('nav');
  var layer = document.getElementById('layer');
  var toastEl = document.getElementById('toast');

  // ------------------------------------------------------------------ estado
  function load() {
    var base = { email: null, nombre: '', done: [], tutorial: false, tema: 'claro', banner: false };
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === 'object') {
        base.email = typeof s.email === 'string' ? s.email : null;
        base.nombre = typeof s.nombre === 'string' ? s.nombre : '';
        base.done = Array.isArray(s.done) ? s.done : [];
        base.tutorial = !!s.tutorial; base.banner = !!s.banner;
        base.tema = s.tema === 'oscuro' ? 'oscuro' : 'claro';
      }
    } catch (e) {}
    return base;
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function aplicaTema() { document.body.setAttribute('data-tema', S.tema); var m = document.querySelector('meta[name=theme-color]'); if (m) m.content = S.tema === 'oscuro' ? '#14101F' : '#F7F5FC'; }
  aplicaTema();

  // ------------------------------------------------------------------ utilidades
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.classList.remove('show'); }, 2400); }
  function go(h) { if (location.hash === h) render(); else location.hash = h; }
  function html(s) { view.innerHTML = s; window.scrollTo(0, 0); }
  function brand() { return '<div class="brand"><b>EL TRUCO DE</b><i>LAS BRASILEÑAS</i></div>'; }
  function ico(n) {
    var p = {
      mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
      spark: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
      x: '<path d="M6 6l12 12M18 6L6 18"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
      chev: '<path d="M9 6l6 6-6 6"/>', down: '<path d="M6 9l6 6 6-6"/>', back: '<path d="M15 6l-6 6 6 6"/>', wa: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/>'
    }[n] || '';
    return '<svg class="i" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }
  function yt(id) {
    var o = /^https?:$/.test(location.protocol) ? '&origin=' + encodeURIComponent(location.origin) : '';
    return 'https://www.youtube.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id + '&playsinline=1&rel=0&modestbranding=1&controls=0&disablekb=1&fs=0&iv_load_policy=3' + o;
  }
  // YouTube exige el referrer: sin esto (o abriendo el archivo desde el disco) da "Error 153".
  var IFR = ' referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen';
  function enlaceYt(id) { return '<a class="yt-link" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=' + id + '">¿No carga el video? Míralo en YouTube</a>'; }
  function thumb(id) { return 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg'; }

  // ------------------------------------------------------------------ programa
  function dia(d) { return D.dias[d - 1]; }
  function esEntreno(d) { var t = dia(d).tipo; return t === 'gluteo' || t === 'pierna' || t === 'express' || t === 'final'; }
  function esCircuito(d) { var t = dia(d).tipo; return t === 'express' || t === 'final'; }
  function idsDe(d) { var t = dia(d).tipo; return D.entrenos[t === 'final' ? 'gluteo' : t] || []; }
  function isDone(d) { return S.done.indexOf(d) !== -1; }
  function actual() { for (var d = 1; d <= TOTAL; d++) if (S.done.indexOf(d) === -1) return d; return TOTAL + 1; }
  function pct() { return Math.round(S.done.length / TOTAL * 100); }
  function unidad(d) { return esCircuito(d) ? 'vueltas' : 'series'; }
  function metaChips(d) {
    var x = dia(d);
    if (!esEntreno(d)) return x.min ? '<span class="chip">' + x.min + ' minutos</span>' : '';
    return '<span class="chip">' + x.min + ' minutos</span><span class="chip">' + x.reps + ' reps × ' + x.series + ' ' + unidad(d) + '</span><span class="chip">5 ejercicios</span>';
  }
  function marcar(d, v) {
    var i = S.done.indexOf(d);
    if (v && i === -1) S.done.push(d);
    if (!v && i !== -1) S.done.splice(i, 1);
    save();
  }

  // ------------------------------------------------------------------ acceso (correo)
  function vLogin() {
    nav.hidden = true; document.body.classList.add('sin-nav');
    html('<div class="login"><img class="logo" src="icons/icon-192.png" alt="">' + brand() +
      '<div class="login-pill">' + ico('spark') + '21 DÍAS · PIERNAS Y GLÚTEOS FIRMES</div>' +
      '<h1>¡Bienvenida a tu reto!</h1>' +
      '<p class="muted login-sub">Entrenamientos rápidos, sin equipamiento, con video demostrativo en cada ejercicio. 21 días para unos glúteos más firmes y piernas tonificadas.</p>' +
      '<form id="acceso" class="login-form" novalidate><label for="correo">Correo</label>' +
      '<div class="field">' + ico('mail') + '<input id="correo" type="email" inputmode="email" autocomplete="email" autocapitalize="off" placeholder="tu@correo.com" required></div>' +
      '<p class="small muted" id="ayuda">Utiliza el mismo correo usado en la compra</p>' +
      '<button class="btn" type="submit">Acceder a mi reto</button></form>' +
      '<div class="login-stats"><div><b>21</b><span>DÍAS</span></div><div><b>15-30</b><span>MIN/DÍA</span></div><div><b>3</b><span>ENTRENOS</span></div></div></div>');
    var f = document.getElementById('acceso'), inp = document.getElementById('correo'), ayuda = document.getElementById('ayuda');
    f.onsubmit = function (e) {
      e.preventDefault();
      var v = inp.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { ayuda.textContent = 'Escribe un correo válido, por ejemplo tu@correo.com'; ayuda.className = 'small login-err'; inp.focus(); return; }
      S.email = v.toLowerCase(); save(); go('#/inicio');
    };
  }

  function tutorial() {
    if (S.tutorial) return;
    var pasos = [['Entrenamientos del reto', 'Los 21 días están organizados en 3 semanas en la pestaña Entrenamientos.'], ['Videos demostrativos', 'En cada día, toca "Ver ejercicios del día" para abrir los videos.'], ['Marca tu progreso', 'Al terminar cada entrenamiento, el día se marca como completado.']];
    layer.innerHTML = '<div class="modal-bg"><div class="modal"><div class="modal-ico">👋</div><h2 class="center">¡Bienvenida!</h2><p class="muted center">Mira cómo funciona en 30 segundos</p>' +
      pasos.map(function (p, i) { return '<div class="paso"><span class="num">' + (i + 1) + '</span><div><b>' + p[0] + '</b><p class="muted small" style="margin:2px 0 0">' + p[1] + '</p></div></div>'; }).join('') +
      '<button class="btn" id="tuto-ok" style="margin-top:16px">¡A empezar!</button></div></div>';
    document.getElementById('tuto-ok').onclick = function () { S.tutorial = true; save(); layer.innerHTML = ''; };
  }

  // ------------------------------------------------------------------ banner de instalación
  var deferredInstall = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredInstall = e; });
  function bannerHtml() {
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone;
    if (standalone || S.banner) return '';
    return '<div class="banner" id="banner"><div class="row between"><div class="row"><span class="banner-ico">⬇</span><div><b>Instala la app en tu pantalla de inicio</b><p class="small muted" style="margin:0">Ten la app siempre a mano, abre directo sin el navegador</p></div></div><button class="x" id="banner-x" aria-label="Cerrar">' + ico('x') + '</button></div>' +
      '<button class="link" id="banner-paso">Ver paso a paso ' + ico('down') + '</button><div class="banner-pasos" id="banner-pasos" hidden><p class="small"><b>iPhone (Safari):</b> toca Compartir → «Añadir a pantalla de inicio».</p><p class="small"><b>Android (Chrome):</b> menú ⋮ → «Instalar app» o «Añadir a pantalla de inicio».</p></div></div>';
  }
  function bindBanner() {
    var x = document.getElementById('banner-x'), p = document.getElementById('banner-paso');
    if (x) x.onclick = function () { S.banner = true; save(); var b = document.getElementById('banner'); if (b) b.remove(); };
    if (p) p.onclick = function () {
      if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; return; }
      var el = document.getElementById('banner-pasos'); el.hidden = !el.hidden;
    };
  }

  // ------------------------------------------------------------------ inicio
  function saludo() { var h = new Date().getHours(); return h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches'); }
  function vInicio() {
    var a = actual(), n = S.done.length, nombre = S.nombre ? S.nombre.split(' ')[0] : 'Atleta';
    var puntos = '';
    for (var w = 0; w < 3; w++) {
      puntos += '<div class="semana-pts">';
      for (var d = w * 7 + 1; d <= w * 7 + 7; d++) puntos += '<i class="' + (isDone(d) ? 'on' : (d === a ? 'now' : '')) + '"></i>';
      puntos += '</div>';
    }
    var hoy;
    if (a > TOTAL) {
      hoy = '<div class="card hoy center"><div style="font-size:42px">🏆</div><h2>¡Completaste los 21 días!</h2><p class="muted">Tómate una foto y mide tu cadera para comparar con el día 1. Puedes repetir el reto cuando quieras.</p><a class="btn" href="#/entrenamientos">Ver mis entrenamientos</a></div>';
    } else {
      var x = dia(a);
      hoy = '<div class="card hoy"><div class="eyebrow">DÍA ' + a + ' DE ' + TOTAL + ' · ENTRENAMIENTO DEL DÍA</div><h2>' + esc(x.titulo) + '</h2><p class="muted">' + esc(x.texto) + '</p><div class="meta">' + metaChips(a) + '</div>' +
        (esEntreno(a) ? '<button class="btn" data-guiado="' + a + '">' + ico('play') + (n === 0 ? 'Empezar mi reto' : 'Empezar entrenamiento guiado') + '</button>'
          : '<button class="btn ok" data-marcar="' + a + '">' + ico('check') + 'Marcar día ' + a + ' como hecho</button>') + '</div>';
    }
    html('<div class="pagina"><h1 class="saludo">' + saludo() + ', ' + esc(nombre) + '!</h1><p class="muted" style="margin:4px 0 18px">Bienvenida al Reto El Truco de las Brasileñas</p>' +
      '<div class="card viaje"><div class="row between"><div><div class="eyebrow">TU VIAJE</div><div class="viaje-dia">Día <b>' + Math.min(a, TOTAL) + '</b> de ' + TOTAL + '</div></div><div class="pct"><b>' + pct() + '%</b><span>COMPLETADOS</span></div></div>' +
      '<div class="pts">' + puntos + '</div><div class="pts-l"><span>SEMANA 1</span><span>SEMANA 2</span><span>SEMANA 3</span></div></div>' +
      hoy + bannerHtml() + '</div>');
    bindDia(); bindBanner();
  }

  function bindDia() {
    view.querySelectorAll('[data-guiado]').forEach(function (b) { b.onclick = function () { abrirGuiado(parseInt(b.getAttribute('data-guiado'), 10)); }; });
    view.querySelectorAll('[data-marcar]').forEach(function (b) { b.onclick = function () { var d = parseInt(b.getAttribute('data-marcar'), 10); marcar(d, true); modalDia(d); render(); }; });
  }

  // ------------------------------------------------------------------ entrenamientos
  function vEntrenos() {
    var out = '<div class="pagina"><h1>Entrenamientos del Reto</h1><p class="muted" style="margin:4px 0 16px">21 días para piernas tonificadas y glúteos firmes. Marca cada día como completado.</p>' +
      '<div class="card"><h3>Progreso general</h3><div class="barra"><i style="width:' + pct() + '%"></i></div><p class="muted small" style="margin:8px 0 0">' + S.done.length + ' de ' + TOTAL + ' entrenamientos completados</p></div>';
    D.semanas.forEach(function (s, w) {
      out += '<h2 class="sem">Semana ' + s.n + ' — <span>' + s.nombre + '</span></h2><p class="muted small" style="margin:2px 0 12px">Foco: ' + s.foco + '</p>';
      for (var d = w * 7 + 1; d <= w * 7 + 7; d++) {
        var x = dia(d), hecho = isDone(d);
        out += '<div class="card dcard' + (hecho ? ' hecho' : '') + '" id="d' + d + '"><button class="circ" data-toggle="' + d + '" aria-label="Marcar día ' + d + '">' + (hecho ? ico('check') : '') + '</button><div class="dbody">' +
          '<div class="row wrap"><span class="pill soft">DÍA ' + d + '</span><span class="pill">' + x.etiqueta + '</span></div>' +
          '<h3>' + esc(x.titulo) + '</h3><p class="muted small">' + esc(x.texto) + '</p><div class="meta">' + metaChips(d) + (x.nota ? '<span class="chip warn">' + esc(x.nota) + '</span>' : '') + '</div>' +
          (esEntreno(d) ? '<div class="acciones"><button class="btn small" data-guiado="' + d + '">' + ico('play') + 'Iniciar entrenamiento guiado</button><button class="btn small ghost" data-ver="' + d + '">Ver ejercicios del día</button></div><div class="lista-ej" id="ej' + d + '" hidden></div>' : '') +
          '</div></div>';
      }
    });
    html(out + bannerHtml() + '</div>');
    bindDia(); bindBanner();
    view.querySelectorAll('[data-toggle]').forEach(function (b) { b.onclick = function () { var d = parseInt(b.getAttribute('data-toggle'), 10); marcar(d, !isDone(d)); render(); }; });
    view.querySelectorAll('[data-ver]').forEach(function (b) {
      b.onclick = function () {
        var d = parseInt(b.getAttribute('data-ver'), 10), box = document.getElementById('ej' + d);
        if (box.hidden) {
          box.innerHTML = idsDe(d).map(function (id, i) {
            var e = D.ejercicios[id];
            return '<div class="ej"><div class="ej-h"><span class="num">' + (i + 1) + '</span><b>' + esc(e.nombre) + '</b></div><div class="video"><iframe src="' + yt(e.yt) + '" title="' + esc(e.nombre) + '" loading="lazy"' + IFR + '></iframe><div class="vshield"></div></div>' + '</div>';
          }).join('');
          box.hidden = false; b.textContent = 'Ocultar ejercicios';
        } else { box.innerHTML = ''; box.hidden = true; b.textContent = 'Ver ejercicios del día'; }
      };
    });
  }

  // ------------------------------------------------------------------ entrenamiento guiado
  var G = null, tick = null;
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function ring(total, centro) {
    var r = 120, c = 2 * Math.PI * r;
    return '<div class="ring2"><svg viewBox="0 0 280 280"><circle cx="140" cy="140" r="' + r + '" class="ring-bg"/><circle cx="140" cy="140" r="' + r + '" class="ring-fg" id="ring-fg" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="0"/></svg><div class="ring-c">' + centro + '</div></div>';
  }
  function abrirGuiado(d) {
    var circ = esCircuito(d), n = idsDe(d).length, laps = circ ? dia(d).series : 1;
    G = { d: d, fase: 'intro', i: 0, lap: 1, laps: laps, circ: circ, n: n, hechos: 0, total: n * (circ ? laps : 1), cal: 0, fin: 0, dur: 30 };
    document.body.classList.add('bloqueado');
    pintaGuiado();
  }
  function cerrarGuiado(pregunta) {
    if (pregunta && G && G.fase !== 'intro' && !confirm('¿Salir del entrenamiento? Perderás el avance de esta sesión.')) return;
    stopTick(); G = null; layer.innerHTML = ''; document.body.classList.remove('bloqueado');
  }
  function topbar(titulo) { return '<div class="g-top"><button class="x" id="g-x" aria-label="Cerrar">' + ico('x') + '</button><b>' + esc(titulo) + '</b><span style="width:36px"></span></div>'; }
  function barra() { var p = Math.round(G.hechos / G.total * 100); return '<div class="g-prog"><div class="g-prog-t"><span>' + (G.hechos < G.total ? Math.min(G.hechos + 1, G.total) : G.total) + ' DE ' + G.total + '</span><span>' + p + '%</span></div><div class="barra"><i style="width:' + p + '%"></i></div></div>'; }
  function startCuenta(seg, onEnd) {
    stopTick();
    G.fin = Date.now() + seg * 1000; G.dur = seg;
    tick = setInterval(function () {
      var left = (G.fin - Date.now()) / 1000, rest = Math.max(0, Math.ceil(left));
      var num = document.getElementById('cuenta'); if (num) num.textContent = rest;
      var fg = document.getElementById('ring-fg');
      if (fg) { var c = parseFloat(fg.getAttribute('stroke-dasharray')); fg.setAttribute('stroke-dashoffset', (c * (1 - Math.min(1, Math.max(0, left / G.dur)))).toFixed(1)); }
      if (rest <= 0) { stopTick(); if (onEnd) onEnd(); }
    }, 250);
  }
  function pintaGuiado() {
    if (!G) return;
    var d = G.d, x = dia(d), ids = idsDe(d), h;
    stopTick();
    if (G.fase === 'intro') {
      h = topbar(x.titulo) + '<div class="g-body"><div class="eyebrow">LISTA PARA EMPEZAR · DÍA ' + d + '</div><h1>' + esc(x.titulo) + '</h1><p class="muted">Te guío ejercicio por ejercicio. Toca "Completado" al terminar cada uno: el descanso es automático.</p>' +
        '<div class="g-stats"><div><b>' + x.min + '</b><span>MINUTOS</span></div><div><b>' + x.reps + '</b><span>REPS</span></div><div><b>' + x.series + '</b><span>' + unidad(d).toUpperCase() + '</span></div></div>' +
        ids.map(function (id, i) { return '<div class="g-ej"><span class="num">' + (i + 1) + '</span><img src="' + thumb(D.ejercicios[id].yt) + '" alt=""><b>' + esc(D.ejercicios[id].nombre) + '</b></div>'; }).join('') + '</div>' +
        '<div class="g-foot"><button class="btn" id="g-go">' + ico('play') + 'Empezar</button></div>';
    } else if (G.fase === 'cal') {
      var c = D.calentamiento[G.cal], ultimo = G.cal === D.calentamiento.length - 1;
      h = topbar(x.titulo) + '<div class="g-body center"><div class="row between"><div class="left"><div class="eyebrow cal">🔥 CALENTAMIENTO</div><div class="muted small">Etapa ' + (G.cal + 1) + ' de ' + D.calentamiento.length + '</div></div><button class="pill-btn" id="g-skipcal">Ya calenté</button></div>' +
        ring(30, '<div class="ring-emoji">' + c.icono + '</div><div class="muted small"><span id="cuenta">30</span>s</div>') +
        '<h2>' + esc(c.titulo) + '</h2><p class="muted">' + esc(c.texto) + '</p><div class="dots">' + D.calentamiento.map(function (_, i) { return '<i class="' + (i === G.cal ? 'on' : '') + '"></i>'; }).join('') + '</div></div>' +
        '<div class="g-foot"><button class="btn warm" id="g-next">' + (ultimo ? 'Empezar entrenamiento' : 'Siguiente etapa') + ico('chev') + '</button></div>';
    } else if (G.fase === 'ej') {
      var e = D.ejercicios[ids[G.i]];
      h = topbar(x.titulo) + barra() + '<div class="g-body"><div class="eyebrow">' + (G.i + 1) + ' DE ' + G.n + (G.circ ? ' · VUELTA ' + G.lap + ' DE ' + G.laps : '') + '</div><h1 class="g-t">' + esc(e.nombre) + '</h1>' +
        '<div class="video"><iframe src="' + yt(e.yt) + '" title="' + esc(e.nombre) + '"' + IFR + '></iframe><div class="vshield"></div></div>' +
        '<div class="g-reps"><span>' + (G.circ ? 'POR VUELTA' : 'SERIES') + '</span><b>' + x.reps + ' reps</b><em>' + (G.circ ? G.laps + ' vueltas' : x.series + ' series') + '</em></div></div>' +
        '<div class="g-foot"><button class="btn" id="g-ok">' + ico('check') + 'Completado</button></div>';
    } else if (G.fase === 'desc') {
      var sig = D.ejercicios[ids[G.i]];
      h = topbar(x.titulo) + barra() + '<div class="g-body center"><div class="eyebrow gris">DESCANSO</div>' + ring(30, '<div class="ring-num"><span id="cuenta">30</span></div><div class="muted small">s</div>') +
        '<button class="g-sig" id="g-sig"><img src="' + thumb(sig.yt) + '" alt=""><div class="left"><span class="muted small">SIGUIENTE</span><b>' + esc(sig.nombre) + '</b></div>' + ico('chev') + '</button>' +
        '<div class="g-desc"><button class="btn ghost" id="g-m15">-15s</button><button class="btn ghost" id="g-p15">+15s</button><button class="btn" id="g-saltar">Saltar descanso</button></div></div>';
    }
    layer.innerHTML = '<div class="guiado">' + h + '</div>';
    var $ = function (id) { return document.getElementById(id); };
    $('g-x').onclick = function () { cerrarGuiado(true); };
    if (G.fase === 'intro') $('g-go').onclick = function () { G.fase = 'cal'; G.cal = 0; pintaGuiado(); };
    if (G.fase === 'cal') {
      startCuenta(30, null);
      $('g-skipcal').onclick = function () { G.fase = 'ej'; G.i = 0; pintaGuiado(); };
      $('g-next').onclick = function () { if (G.cal < D.calentamiento.length - 1) { G.cal++; } else { G.fase = 'ej'; G.i = 0; } pintaGuiado(); };
    }
    if (G.fase === 'ej') $('g-ok').onclick = function () { completado(); };
    if (G.fase === 'desc') {
      var sigue = function () { G.fase = 'ej'; pintaGuiado(); };
      startCuenta(30, sigue);
      $('g-saltar').onclick = sigue; $('g-sig').onclick = sigue;
      $('g-m15').onclick = function () { G.fin -= 15000; };
      $('g-p15').onclick = function () { G.fin += 15000; G.dur += 15; };
    }
  }
  function completado() {
    G.hechos++;
    var ultimo = G.i === G.n - 1;
    if (G.circ) {
      if (!ultimo) { G.i++; pintaGuiado(); return; }
      if (G.lap >= G.laps) return terminaGuiado();
      G.lap++; G.i = 0; G.fase = 'desc'; pintaGuiado(); return;
    }
    if (ultimo) return terminaGuiado();
    G.i++; G.fase = 'desc'; pintaGuiado();
  }
  // Circuito: despues de la ultima vuelta del ejercicio final no hay descanso; entre vueltas el "siguiente" es el primer ejercicio.
  function terminaGuiado() {
    var d = G.d; stopTick(); G = null; layer.innerHTML = ''; document.body.classList.remove('bloqueado');
    marcar(d, true); modalDia(d); render();
  }
  function modalDia(d) {
    var n = S.done.length, sig = actual(), x = dia(d), conf = '';
    for (var i = 0; i < 28; i++) conf += '<i style="left:' + (Math.random() * 100).toFixed(0) + '%;animation-delay:' + (Math.random() * .8).toFixed(2) + 's;background:' + ['#7C3AED', '#F59E0B', '#EC4899', '#10B981', '#3B82F6'][i % 5] + '"></i>';
    var texto = encodeURIComponent(D.compartir.replace('{dia}', d));
    layer.innerHTML = '<div class="modal-bg"><div class="confeti">' + conf + '</div><div class="modal center"><button class="x modal-x" id="m-x" aria-label="Cerrar">' + ico('x') + '</button><div class="modal-ico">🎉</div><div class="eyebrow">CERRASTE UNO MÁS</div><h2>Día ' + d + ' completado</h2><p class="muted">' + esc(x.titulo) + '</p>' +
      '<div class="m-stats"><div><b>' + n + '<small>/' + TOTAL + '</small></b><span>COMPLETADOS</span></div><div><b>' + pct() + '%</b><span>PROGRESO</span></div></div>' +
      (sig <= TOTAL ? '<div class="m-sig"><span class="muted small">' + (sig === d + 1 ? 'MAÑANA' : 'SIGUIENTE') + ' · DÍA ' + sig + '</span><b>' + esc(dia(sig).titulo) + '</b></div>' : '<div class="m-sig"><b>🏆 ¡Terminaste el reto de 21 días!</b></div>') +
      '<a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + texto + '">' + ico('wa') + 'Compartir en WhatsApp</a><button class="btn ghost" id="m-ok" style="margin-top:10px">Cerrar</button></div></div>';
    var cerrar = function () { layer.innerHTML = ''; };
    document.getElementById('m-x').onclick = cerrar; document.getElementById('m-ok').onclick = cerrar;
  }

  // ------------------------------------------------------------------ protocolos
  function vProtocolos() {
    var ids = Object.keys(D.protocolos);
    var out = '<div class="pagina"><div class="eyebrow">BIBLIOTECA DE PROTOCOLOS</div><h1>Tus protocolos</h1><p class="muted" style="margin:4px 0 14px">Programas bonus para acompañar tu transformación.</p>' +
      '<div class="card cuenta"><span class="eyebrow">MIS PROTOCOLOS</span><b>' + ids.length + '</b></div>';
    D.grupos.forEach(function (g) {
      out += '<div class="grupo"><span>' + g.nombre + '</span><i>' + g.ids.length + '</i></div>';
      g.ids.forEach(function (id) {
        var p = D.protocolos[id];
        out += '<a class="card proto" href="#/protocolo/' + id + '"><div class="proto-ico">' + p.icono + '</div><div><span class="badge">DESBLOQUEADO</span><h3>' + esc(p.titulo) + '</h3><p class="muted small">' + esc(p.desc) + '</p><span class="link">Acceder al programa ' + ico('chev') + '</span></div></a>';
      });
    });
    html(out + bannerHtml() + '</div>'); bindBanner();
  }
  function vProtocolo(id) {
    var p = D.protocolos[id]; if (!p) return go('#/protocolos');
    var out = '<div class="pagina"><button class="back" id="volver">' + ico('back') + 'Volver a los protocolos</button><div class="eyebrow">' + p.etiqueta + '</div><h1>' + p.icono + ' ' + esc(p.titulo) + '</h1><p class="muted" style="margin:4px 0 14px">' + esc(p.desc) + '</p>' +
      '<div class="card"><p style="margin:0">' + esc(p.intro) + '</p></div>' +
      '<div class="pstats">' + p.stats.map(function (s) { return '<div><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>'; }).join('') + '</div>';
    p.secciones.forEach(function (s, k) {
      var cuerpo = (s.intro ? '<p class="muted small" style="margin:0 0 10px">' + esc(s.intro) + '</p>' : '') + (s.texto ? '<p style="margin:0">' + esc(s.texto) + '</p>' : '') +
        (s.lista ? '<ul class="lista">' + s.lista.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
        (s.items ? s.items.map(function (it) { return '<div class="item"><b>' + esc(it.t) + '</b><p class="muted">' + esc(it.d) + '</p></div>'; }).join('') : '');
      if (s.plegable) out += '<div class="card acc"><button class="acc-h" data-acc="' + k + '"><b>' + esc(s.h) + '</b>' + ico('down') + '</button><div class="acc-b" id="acc' + k + '" hidden>' + cuerpo + '</div></div>';
      else out += '<div class="card"><h3>' + esc(s.h) + '</h3><div style="margin-top:8px">' + cuerpo + '</div></div>';
    });
    out += '<div class="warn">⚠️ ' + esc(p.aviso) + '</div></div>';
    html(out);
    document.getElementById('volver').onclick = function () { go('#/protocolos'); };
    view.querySelectorAll('[data-acc]').forEach(function (b) {
      b.onclick = function () { var el = document.getElementById('acc' + b.getAttribute('data-acc')); el.hidden = !el.hidden; b.classList.toggle('abierto', !el.hidden); };
    });
  }

  // ------------------------------------------------------------------ perfil
  function vPerfil() {
    var inicial = (S.nombre || S.email || 'A').charAt(0).toUpperCase();
    var tieneNotif = 'Notification' in window;
    var notif = tieneNotif ? (Notification.permission === 'granted' ? 'Activadas' : (Notification.permission === 'denied' ? 'Bloqueadas por el navegador. Permítelas en la configuración del sitio.' : 'Desactivadas')) : 'No disponibles en este navegador';
    var logros = D.logros.map(function (l) {
      var ok = S.done.length >= l.n;
      return '<div class="logro' + (ok ? ' ok' : '') + '"><span>' + (ok ? l.icono : '🔒') + '</span><b>' + l.nombre + '</b><small>' + l.texto + '</small></div>';
    }).join('');
    html('<div class="pagina"><h1>Mi Perfil</h1><p class="muted" style="margin:4px 0 16px">Gestiona tu información y preferencias</p>' +
      '<div class="card"><div class="row" style="gap:14px"><div class="avatar">' + esc(inicial) + '</div><div><b>' + esc(S.nombre || 'Alumna') + '</b><p class="muted small" style="margin:0">' + esc(S.email) + '</p></div></div>' +
      '<form id="f-perfil" style="margin-top:16px"><label class="lbl" for="p-nombre">Nombre completo</label><div class="field"><input id="p-nombre" type="text" autocomplete="name" value="' + esc(S.nombre) + '" placeholder="Tu nombre"></div>' +
      '<label class="lbl" for="p-correo">Correo</label><div class="field"><input id="p-correo" type="email" value="' + esc(S.email) + '" disabled></div><button class="btn" type="submit" style="margin-top:14px">Guardar cambios</button></form></div>' +
      '<h2 class="sec">Tus conquistas</h2><p class="muted small" style="margin:2px 0 12px">Hitos que desbloqueaste en el camino</p><div class="logros">' + logros + '</div>' +
      '<h2 class="sec">Preferencias</h2><div class="card">' +
      '<div class="setting"><div><b>Tema</b><span>' + (S.tema === 'oscuro' ? 'Modo oscuro activado' : 'Modo claro activado') + '</span></div><button class="btn small ghost" id="p-tema" style="width:auto">Cambiar</button></div>' +
      '<div class="setting"><div><b>Notificaciones</b><span>' + notif + '</span></div>' + (tieneNotif && Notification.permission === 'default' ? '<button class="btn small ghost" id="p-notif" style="width:auto">Activar</button>' : '') + '</div>' +
      '<div class="setting"><div><b>Reiniciar progreso</b><span>Borra los días completados</span></div><button class="btn small ghost" id="p-reset" style="width:auto">Reiniciar</button></div></div>' +
      '<button class="btn ghost salir" id="p-salir">Salir</button>' +
      '<p class="small muted center" style="margin-top:18px">Los entrenamientos, la alimentación y los protocolos de esta app tienen carácter educativo y de acondicionamiento físico general. No constituyen consejo médico. Consulta a un profesional de la salud antes de comenzar, especialmente si estás embarazada, tienes alguna condición de salud o tomas medicamentos.</p></div>');
    document.getElementById('f-perfil').onsubmit = function (e) { e.preventDefault(); S.nombre = document.getElementById('p-nombre').value.trim(); save(); toast('Cambios guardados'); render(); };
    document.getElementById('p-tema').onclick = function () { S.tema = S.tema === 'oscuro' ? 'claro' : 'oscuro'; save(); aplicaTema(); render(); };
    var pn = document.getElementById('p-notif'); if (pn) pn.onclick = function () { Notification.requestPermission().then(function () { render(); }); };
    document.getElementById('p-reset').onclick = function () { if (confirm('¿Reiniciar todo tu progreso?')) { S.done = []; save(); toast('Progreso reiniciado'); render(); } };
    document.getElementById('p-salir').onclick = function () { S.email = null; save(); go('#/'); };
  }

  // ------------------------------------------------------------------ router
  function render() {
    var h = location.hash.replace(/^#\/?/, '') || '', parts = h.split('/'), r = parts[0];
    if (!S.email) { layer.innerHTML = ''; return vLogin(); }
    document.body.classList.remove('sin-nav'); nav.hidden = false;
    var tab = { protocolo: 'protocolos', '': 'inicio' }[r] || r;
    nav.querySelectorAll('a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-t') === tab); });
    if (r === 'entrenamientos') vEntrenos();
    else if (r === 'protocolos') vProtocolos();
    else if (r === 'protocolo') vProtocolo(parts[1]);
    else if (r === 'perfil') vPerfil();
    else vInicio();
    if (!G) tutorial();
  }
  window.addEventListener('hashchange', function () { if (G) cerrarGuiado(false); render(); });
  render();

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
