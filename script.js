// Portfolio de Maxime Forest — petit script, sans dépendance.
(function () {
  'use strict';

  // Menu sur petit écran
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    }
  });

  // Portrait : initiales si la photo est absente
  var fig = document.getElementById('portrait');
  if (fig) {
    var photo = fig.querySelector('img');
    var sansPhoto = function () { fig.classList.add('sans-photo'); };
    photo.addEventListener('error', sansPhoto);
    if (photo.complete && photo.naturalWidth === 0) { sansPhoto(); }
  }

  // Badges : libellé de secours si l'image est absente
  document.querySelectorAll('img[data-secours]').forEach(function (img) {
    function remplacer() { img.replaceWith(img.getAttribute('data-secours')); }
    img.addEventListener('error', remplacer);
    if (img.complete && img.naturalWidth === 0) { remplacer(); }
  });

  // Un lien direct vers une fiche (#projet-..., #veille-...) l'ouvre
  function ouvrirCible() {
    var id = decodeURIComponent(location.hash.slice(1));
    var cible = id && document.getElementById(id);
    var fiche = cible && cible.tagName === 'ARTICLE' && cible.querySelector('details');
    if (fiche) { fiche.open = true; }
  }
  window.addEventListener('hashchange', ouvrirCible);
  ouvrirCible();

  // Fiche ouverte : les cartes voisines gardent la hauteur qu'elles ont quand tout est fermé
  function egaliser(grille) {
    var cartes = Array.prototype.slice.call(grille.children);
    cartes.forEach(function (c) { c.style.minHeight = ''; });
    if (!grille.querySelector('details[open]')) { return; }
    grille.classList.add('mesure');
    var rangs = {};
    var hauts = cartes.map(function (c) {
      var y = c.offsetTop;
      rangs[y] = Math.max(rangs[y] || 0, c.getBoundingClientRect().height);
      return y;
    });
    grille.classList.remove('mesure');
    cartes.forEach(function (c, i) { c.style.minHeight = rangs[hauts[i]] + 'px'; });
  }
  function egaliserTout() {
    document.querySelectorAll('.grid').forEach(function (g) {
      if (g.querySelector('details')) { egaliser(g); }
    });
  }
  document.addEventListener('toggle', function (e) {
    var g = e.target.closest && e.target.closest('.grid');
    if (g) { egaliser(g); }
  }, true);
  var attente;
  window.addEventListener('resize', function () {
    clearTimeout(attente);
    attente = setTimeout(egaliserTout, 120);
  });
  egaliserTout();

  // Rubrique en cours de lecture, signalée dans le menu
  var liens = {};
  nav.querySelectorAll('a').forEach(function (a) {
    liens[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        Object.keys(liens).forEach(function (k) {
          liens[k].classList.toggle('on', k === e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { obs.observe(s); });
  }

  document.getElementById('annee').textContent = new Date().getFullYear();
})();
