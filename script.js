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
  var photo = fig.querySelector('img');
  function sansPhoto() { fig.classList.add('sans-photo'); }
  photo.addEventListener('error', sansPhoto);
  if (photo.complete && photo.naturalWidth === 0) { sansPhoto(); }

  // Un lien direct vers une fiche (#projet-..., #veille-...) l'ouvre
  function ouvrirCible() {
    var id = decodeURIComponent(location.hash.slice(1));
    var cible = id && document.getElementById(id);
    var fiche = cible && cible.querySelector('details');
    if (fiche) { fiche.open = true; }
  }
  window.addEventListener('hashchange', ouvrirCible);
  ouvrirCible();

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
