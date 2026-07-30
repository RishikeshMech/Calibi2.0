// Calibi AI — shared front-end behaviors (nav, carousels, scroll reveal)
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* Carousels: prev/next buttons scroll the track by one card width */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel-track");
    var prevBtn = root.querySelector('[data-action="prev"]');
    var nextBtn = root.querySelector('[data-action="next"]');
    if (!track) return;

    function step() {
      var card = track.querySelector(":scope > *");
      if (!card) return 320;
      var style = getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || "24");
      return card.getBoundingClientRect().width + gap;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        track.scrollBy({ left: -step(), behavior: "smooth" });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        track.scrollBy({ left: step(), behavior: "smooth" });
      });
    }
  });

  /* Scroll-triggered reveal animations — restrained, one-time */
  var revealTargets = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Close other open FAQ items for a cleaner accordion feel (optional single-open) */
  document.querySelectorAll(".faq-list").forEach(function (list) {
    var items = list.querySelectorAll("details.faq-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  });
})();
