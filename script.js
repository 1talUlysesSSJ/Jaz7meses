
/* ================================================================
   CÓDIGO SECRETO — la fecha de hoy: 20/11/2026
   ================================================================ */
var CODIGO_SECRETO = "20112026";
var CODIGOS_ACEPTADOS = [CODIGO_SECRETO, "201126"];

var inputs = Array.prototype.slice.call(document.querySelectorAll('#codeRow input'));
var errorMsg = document.getElementById('errorMsg');
var lockCard = document.getElementById('lockCard');

inputs[0].focus();

inputs.forEach(function(inp, i){
  inp.addEventListener('input', function(){
    inp.value = inp.value.replace(/\D/g,'').slice(-1);
    if(inp.value && i < inputs.length-1) inputs[i+1].focus();
  });

  inp.addEventListener('keydown', function(e){
    if(e.key === 'Backspace' && !inp.value && i > 0) inputs[i-1].focus();
    if(e.key === 'ArrowLeft' && i > 0) inputs[i-1].focus();
    if(e.key === 'ArrowRight' && i < inputs.length-1) inputs[i+1].focus();
  });

  inp.addEventListener('paste', function(e){
    e.preventDefault();
    var txt = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g,'');
    txt.split('').forEach(function(ch, j){
      if(inputs[j]) inputs[j].value = ch;
    });
    var next = Math.min(txt.length, inputs.length-1);
    if(inputs[next]) inputs[next].focus();
  });
});

/* ---------- Explosión de corazones ---------- */
function burstHearts(x, y, n){
  var simbolos = ['💙','♥','🩵','✿'];

  for(var i=0;i<n;i++){
    var s = document.createElement('span');
    s.className = 'burst';
    s.textContent = simbolos[Math.floor(Math.random()*simbolos.length)];
    s.style.left = (x + (Math.random()*120-60)) + 'px';
    s.style.top = y + 'px';
    s.style.setProperty('--dx', (Math.random()*160-80)+'px');
    s.style.animationDelay = (Math.random()*0.25)+'s';

    document.body.appendChild(s);

    (function(el){
      setTimeout(function(){
        el.remove();
      }, 1900);
    })(s);
  }
}

/* ---------- Validación del código ---------- */
document.getElementById('codeForm').addEventListener('submit', function(e){
  e.preventDefault();

  var escrito = inputs.map(function(i){
    return i.value;
  }).join('');

  if(CODIGOS_ACEPTADOS.indexOf(escrito) !== -1){
    errorMsg.textContent = '';

    var r = lockCard.getBoundingClientRect();
    burstHearts(r.left + r.width/2, r.top + 120, 16);

    document.getElementById('lockScreen').style.display = 'none';

    var contenido = document.getElementById('contenido');
    contenido.hidden = false;

    window.scrollTo({top:0});

    setTimeout(function(){
      burstHearts(window.innerWidth/2, 140, 12);
    }, 350);

  } else {
    errorMsg.textContent = 'Mmm, ese no es… piensa en la fecha de hoy: día, mes y año. 💙';

    lockCard.classList.remove('shake');
    void lockCard.offsetWidth;
    lockCard.classList.add('shake');

    if(escrito.length < 8){
      var vacio = inputs.find(function(i){
        return !i.value;
      });

      if(vacio) vacio.focus();
    }
  }
});

/* ---------- Sobre de la carta ---------- */
var escena = document.getElementById('sobreEscena');

function abrirSobre(){
  if(escena.classList.contains('abierto')) return;

  escena.classList.add('abierto');

  document.getElementById('tocaTexto').textContent = 'Abriendo tu cartita…';

  setTimeout(function(){
    document.getElementById('cartaCompleta').classList.add('visible');

    document.getElementById('tocaTexto').style.display = 'none';

    document.getElementById('cartaCompleta').scrollIntoView({
      behavior:'smooth',
      block:'start'
    });
  }, 950);
}

escena.addEventListener('click', abrirSobre);

escena.addEventListener('keydown', function(e){
  if(e.key==='Enter' || e.key===' '){
    e.preventDefault();
    abrirSobre();
  }
});

/* ---------- Jardín de tulipanes azules ---------- */
var _tulipId = 0;

function tulipSVG(c1, c2, altura){
  _tulipId++;

  var g = 'tg' + _tulipId;
  var gc = 'tc' + _tulipId;
  var gl = 'tl' + _tulipId;

  return '<svg viewBox="0 0 120 250" style="height:'+altura+'px" aria-hidden="true">'
    + '<defs>'
    + '<linearGradient id="'+g+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="'+c2+'"/><stop offset="55%" stop-color="'+c1+'"/><stop offset="100%" stop-color="'+c1+'"/></linearGradient>'
    + '<linearGradient id="'+gc+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".95"/><stop offset="28%" stop-color="'+c2+'"/><stop offset="100%" stop-color="'+c1+'"/></linearGradient>'
    + '<linearGradient id="'+gl+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5cb877"/><stop offset="100%" stop-color="#256e3f"/></linearGradient>'
    + '</defs>'
    + '<ellipse cx="60" cy="242" rx="26" ry="5" fill="#1a4d2e" opacity=".18"/>'
    + '<path d="M60 244 C 57 196, 57 152, 60 112" stroke="#2e7d4f" stroke-width="6.5" fill="none" stroke-linecap="round"/>'
    + '<path d="M60 244 C 58 198, 58 154, 60 112" stroke="#5cb877" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>'
    + '<path d="M59 210 C 36 206, 18 188, 16 160 C 38 163, 54 182, 59 210 Z" fill="url(#'+gl+')"/>'
    + '<path d="M59 206 C 42 198, 30 184, 24 168" stroke="#1f5c33" stroke-width="1.4" fill="none" opacity=".45"/>'
    + '<path d="M61 228 C 84 222, 100 204, 102 176 C 82 181, 66 200, 61 228 Z" fill="url(#'+gl+')"/>'
    + '<path d="M62 224 C 78 214, 90 200, 96 184" stroke="#1f5c33" stroke-width="1.4" fill="none" opacity=".4"/>'
    + '<path d="M60 118 C 42 108, 32 88, 30 58 C 28 44, 30 34, 34 26 C 42 34, 47 44, 49 56 C 50 42, 54 30, 60 20 C 66 30, 70 42, 71 56 C 73 44, 78 34, 86 26 C 90 34, 92 44, 90 58 C 88 88, 78 108, 60 118 Z" fill="'+c1+'"/>'
    + '<path d="M60 122 C 36 110, 26 84, 29 50 C 38 56, 45 66, 48 78 C 48 60, 52 44, 60 30 C 68 44, 72 60, 72 78 C 75 66, 82 56, 91 50 C 94 84, 84 110, 60 122 Z" fill="url(#'+g+')" stroke="'+c1+'" stroke-width="1" stroke-opacity=".35"/>'
    + '<path d="M60 122 C 47 110, 44 84, 49 56 C 54 64, 57 74, 60 86 C 63 74, 66 64, 71 56 C 76 84, 73 110, 60 122 Z" fill="url(#'+gc+')"/>'
    + '<path d="M48 108 C 40 94, 38 72, 42 54 C 47 64, 49 76, 50 90 C 50 98, 49 104, 48 108 Z" fill="#ffffff" opacity=".28"/>'
    + '<path d="M72 108 C 80 94, 82 72, 78 54 C 73 64, 71 76, 70 90 C 70 98, 71 104, 72 108 Z" fill="#000000" opacity=".08"/>'
    + '<ellipse cx="46" cy="66" rx="4.5" ry="13" fill="#ffffff" opacity=".55" transform="rotate(-14 46 66)"/>'
    + '<circle cx="76" cy="52" r="3" fill="#ffffff" opacity=".75"/>'
    + '<circle cx="75" cy="51" r="1.1" fill="#ffffff"/>'
    + '<path d="M60 34 L61.6 40 L60 46 L58.4 40 Z" fill="#ffffff" opacity=".85"/>'
    + '</svg>';
}

var tonos = [
  ['#1d6fd1','#7db9f2'],
  ['#2f8fe8','#a8d2fa'],
  ['#0ea5e9','#7dd3fc'],
  ['#2563eb','#93c5fd'],
  ['#3d8fe8','#bcd9fb'],
  ['#0284c7','#38bdf8'],
  ['#1e7ac2','#8fc7f5']
];

var alturas = [238, 268, 292, 312, 292, 268, 238];

/* ---------- Escenas de tulipanes ---------- */
var paletas = [
  [
    ['#7db9f2','#cfe6fd'],
    ['#5aa7ef','#a8d2fa'],
    ['#8fc7f5','#dcecfd'],
    ['#6db1f7','#bcd9fb'],
    ['#4f9be8','#93c5fd']
  ],
  [
    ['#164a8a','#3d8fe8'],
    ['#1d6fd1','#5aa7ef'],
    ['#0f4c9c','#2f8fe8'],
    ['#256fcf','#7db9f2'],
    ['#123f78','#256fcf']
  ],
  [
    ['#0e7490','#67e8f9'],
    ['#0891b2','#22d3ee'],
    ['#0ea5e9','#7dd3fc'],
    ['#0284c7','#38bdf8'],
    ['#155e75','#2dd4bf']
  ],
  tonos
];

/* ---------- Frases de los tulipanes ---------- */
var frasesTulipan = [
  'Este floreció solo para ti 💙',
  'Como tú: raro, azul y hermoso',
  'Un mes más contigo… y los que faltan',
  'Si fueras una flor, serías esta',
  'Te quiero, hoy y en cada pétalo',
  'Este tulipán te eligió a ti también',
  'Floreces y me haces florecer a mí',
  '7 meses y sigues siendo mi favorita',
  'Para ti, que haces bonito todo'
];

var ultimoIndiceFrase = -1;
var toquesJardin = {};
var totalToquesJardin = 0;
var fraseTimer = null;

function mostrarFraseTulipan(){
  var caja = document.getElementById('fraseFlotante');
  if(!caja) return;

  var idx = Math.floor(Math.random()*frasesTulipan.length);

  if(idx === ultimoIndiceFrase){
    idx = (idx+1)%frasesTulipan.length;
  }

  ultimoIndiceFrase = idx;

  caja.innerHTML = frasesTulipan[idx] +
    '<small>Toca otro tulipán… todos guardan algo para ti</small>';

  caja.classList.add('visible');

  if(fraseTimer) clearTimeout(fraseTimer);

  fraseTimer = setTimeout(function(){
    caja.classList.remove('visible');
  }, 2600);
}

/* ---------- Pétalos y destellos ---------- */
function soltarPetalosYDestellos(x, y){
  var coloresP = [
    '#7db9f2',
    '#3d8fe8',
    '#a8d2fa',
    '#256fcf',
    '#93c5fd',
    '#67e8f9'
  ];

  for(var i=0;i<9;i++){
    var p = document.createElement('span');
    p.className = 'petalo-burst';

    var sz = 9 + Math.random()*10;

    p.style.width = sz+'px';
    p.style.height = sz+'px';
    p.style.left = (x + (Math.random()*36-18))+'px';
    p.style.top = (y + (Math.random()*20-10))+'px';
    p.style.background = coloresP[Math.floor(Math.random()*coloresP.length)];

    p.style.setProperty('--dx', (Math.random()*170-85)+'px');
    p.style.setProperty('--dy', (-(50+Math.random()*110))+'px');
    p.style.setProperty('--rot', (Math.random()*260-130)+'deg');

    p.style.animationDelay = (Math.random()*0.12)+'s';

    document.body.appendChild(p);

    (function(el){
      setTimeout(function(){
        el.remove();
      }, 1500);
    })(p);
  }

  for(var j=0;j<4;j++){
    var d = document.createElement('span');
    d.className = 'destello';

    d.textContent = Math.random() > .5 ? '✦' : '✧';

    d.style.left = (x + (Math.random()*70-35))+'px';
    d.style.top = (y + (Math.random()*24-12))+'px';

    d.style.setProperty('--dx', (Math.random()*50-25)+'px');
    d.style.animationDelay = (Math.random()*0.18)+'s';

    document.body.appendChild(d);

    (function(el){
      setTimeout(function(){
        el.remove();
      }, 1300);
    })(d);
  }
}

/* ---------- Contador del jardín ---------- */
function actualizarContadorJardin(){
  var wrap = document.getElementById('contadorWrap');
  var texto = document.getElementById('contadorTexto');
  var cors = document.getElementById('contadorCorazones');

  if(!wrap || !texto) return;

  wrap.classList.add('visible');

  texto.textContent = totalToquesJardin >= 7
    ? '¡Ya tocaste los 7 tulipanes! Uno por cada mes 💙'
    : 'Has tocado ' + totalToquesJardin + ' de 7 tulipanes';

  if(cors){
    cors.textContent = '💙'.repeat(Math.min(totalToquesJardin,7));
  }
}

/* ---------- Hacer que los tulipanes sean interactivos ---------- */
function hacerTocable(elTulipan, esDelJardin, indiceJardin){
  elTulipan.setAttribute('role','button');
  elTulipan.setAttribute('tabindex','0');
  elTulipan.setAttribute('aria-label','Tulipán azul, tócalo para que florezca');
  elTulipan.title = 'Tócame 💙';

  function tocar(e){
    if(e) e.stopPropagation();

    var r = elTulipan.getBoundingClientRect();

    var cx = r.left + r.width/2;
    var cy = r.top + Math.min(90, r.height*0.32);

    elTulipan.classList.remove('tocado');

    void elTulipan.offsetWidth;

    elTulipan.classList.add('tocado');
    elTulipan.classList.add('ya-tocado');

    setTimeout(function(){
      elTulipan.classList.remove('tocado');
    }, 760);

    burstHearts(cx, cy, 7);
    soltarPetalosYDestellos(cx, cy);
    mostrarFraseTulipan();

    if(esDelJardin && typeof indiceJardin === 'number' && !toquesJardin[indiceJardin]){
      toquesJardin[indiceJardin] = true;
      totalToquesJardin++;

      actualizarContadorJardin();

      if(totalToquesJardin === 7){
        setTimeout(function(){
          burstHearts(window.innerWidth/2, 180, 18);

          soltarPetalosYDestellos(window.innerWidth/2, 180);

          var caja = document.getElementById('fraseFlotante');

          if(caja){
            caja.innerHTML =
              '¡Florecieron todos para ti! 💙' +
              '<small>7 tulipanes, 7 meses, un solo amor: tú</small>';

            caja.classList.add('visible');

            if(fraseTimer) clearTimeout(fraseTimer);

            fraseTimer = setTimeout(function(){
              caja.classList.remove('visible');
            }, 3600);
          }
        }, 450);
      }
    }

    if(navigator.vibrate){
      try{
        navigator.vibrate(18);
      }catch(_){}
    }
  }

  elTulipan.addEventListener('click', tocar);

  elTulipan.addEventListener('keydown', function(e){
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      tocar(e);
    }
  });
}

/* ---------- Crear escenas de tulipanes ---------- */
function poblarEscena(el){
  var n = parseInt(el.getAttribute('data-count') || '5', 10);

  var pal = paletas[
    parseInt(el.getAttribute('data-paleta') || '0', 10)
  ] || paletas[0];

  var esPortada = el.classList.contains('hero-scene');

  el.innerHTML = '';

  var centro = (n - 1) / 2;

  for(var i = 0; i < n; i++){
    var t = pal[i % pal.length];

    var base = esPortada ? 318 : (n > 6 ? 208 : 252);

    var distCentro = Math.abs(i - centro);

    var h = base - distCentro * 13 + ((i % 2) * 7);

    var d = document.createElement('div');

    d.className = 'tulipan';

    d.style.zIndex = String(10 - Math.round(distCentro));

    d.style.animationDelay =
      (Math.abs(i - centro) * 0.14) + 's, ' +
      (1.2 + i * 0.16) + 's';

    d.innerHTML = tulipSVG(t[0], t[1], h);

    hacerTocable(d, false, null);

    el.appendChild(d);
  }
}

Array.prototype.forEach.call(
  document.querySelectorAll('.tulip-scene'),
  poblarEscena
);

/* ---------- Botón para mostrar el jardín ---------- */
document.getElementById('btnTulipanes').addEventListener('click', function(){
  var jardin = document.getElementById('jardin');

  if(!jardin.classList.contains('visible')){
    jardin.innerHTML = '';

    toquesJardin = {};
    totalToquesJardin = 0;

    tonos.forEach(function(t, i){
      var d = document.createElement('div');

      d.className = 'tulipan';

      d.style.zIndex = String(10 - Math.abs(i - 3));

      d.style.animationDelay =
        (Math.abs(i - 3)*0.13)+'s, '+(1.2+i*0.15)+'s';

      d.innerHTML = tulipSVG(t[0], t[1], alturas[i]);

      hacerTocable(d, true, i);

      jardin.appendChild(d);
    });

    jardin.classList.add('visible');
    jardin.removeAttribute('aria-hidden');

    this.innerHTML = '🌷 &nbsp;Ahora tócalos, uno por uno 👆';

    var pista = document.getElementById('pistaJardin');

    if(pista) pista.style.display = 'block';

    actualizarContadorJardin();

    setTimeout(function(){
      document.getElementById('mensajeTulipanes').classList.add('visible');

      var r = jardin.getBoundingClientRect();

      burstHearts(
        window.innerWidth/2,
        Math.max(80, r.top + 60),
        10
      );

      jardin.scrollIntoView({
        behavior:'smooth',
        block:'center'
      });
    }, 1500);

  } else {
    burstHearts(window.innerWidth/2, 160, 10);

    soltarPetalosYDestellos(window.innerWidth/2, 160);
  }
});

/* ---------- Tarjetas de promesas ---------- */
Array.prototype.forEach.call(
  document.querySelectorAll('.promesa'),
  function(btn){
    btn.addEventListener('click', function(){
      btn.classList.toggle('revelada');
    });
  }
);

/* ---------- Mensaje secreto final ---------- */
var btnSecreto = document.getElementById('btnSecreto');

if(btnSecreto){
  btnSecreto.addEventListener('click', function(){
    var mensaje = document.getElementById('mensajeSecreto');

    mensaje.classList.toggle('visible');

    btnSecreto.textContent = mensaje.classList.contains('visible')
      ? 'Volver a guardar mi secreto 💙'
      : 'Abrir mi último secreto 💙';

    if(mensaje.classList.contains('visible')){
      burstHearts(window.innerWidth/2, window.innerHeight*.65, 14);
    }
  });
}

/* ---------- Pétalos flotando de fondo ---------- */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var bg = document.getElementById('petalsBg');

  var colores = [
    '#a8d2fa',
    '#7db9f2',
    '#cfe6fd',
    '#8fc7f5'
  ];

  for(var i=0;i<14;i++){
    var p = document.createElement('span');

    p.className = 'petal-fall';

    var size = 9 + Math.random()*11;

    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = (Math.random()*100)+'vw';
    p.style.background = colores[i % colores.length];

    p.style.animationDuration = (11 + Math.random()*12)+'s';
    p.style.animationDelay = (-Math.random()*16)+'s';

    bg.appendChild(p);
  }
})();
