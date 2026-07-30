(function () {
  const currentPathname = window.location.pathname;
  const pathName = (currentPathname.split("/").pop() || "index.html").toLowerCase();
  const basePath = currentPathname.endsWith(".html")
    ? currentPathname.replace(/[^/]+$/, "")
    : currentPathname.endsWith("/")
      ? currentPathname
      : `${currentPathname}/`;
  const resolvePageHref = (page) => page;
  const isHomePage = pathName === "" || pathName === "index.html" || pathName === "public_html";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const mobileViewport = window.matchMedia("(max-width: 900px)").matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const lowPowerDevice = reduceMotion || coarsePointer || mobileViewport || saveData || lowMemory;
  const heavyEffectsAllowed = finePointer && !lowPowerDevice;

  document.documentElement.classList.add("calibi-enhanced");
  if (lowPowerDevice) document.documentElement.classList.add("calibi-lite");
  if (isHomePage) document.documentElement.classList.add("calibi-home-static");
  if (isHomePage) document.body.classList.add("calibi-home-static-body");

  function initHeader() {
    if (document.querySelector(".calibi-site-header")) {
      document.body.classList.add("has-calibi-header");
      return;
    }

    const current = window.location.pathname.split("/").pop() || "index.html";
    const links = [
      { href: resolvePageHref("index.html"), label: "Home", match: "index.html" },
      { href: resolvePageHref("services.html"), label: "Services", match: "services.html" },
      { href: resolvePageHref("academy.html"), label: "Calibi AI Academy", match: "academy.html" },
      { href: resolvePageHref("story.html"), label: "Our Story", match: "story.html" }
    ];

    const header = document.createElement("header");
    header.className = "calibi-site-header";
    header.innerHTML = `
      <a class="calibi-brand" href="${resolvePageHref("index.html")}">
        <span class="calibi-brand-mark">C</span>
        <span>Calibi AI</span>
      </a>
      <nav class="calibi-nav" aria-label="Main navigation">
        ${links.map((link) => `<a href="${link.href}" class="${current === link.match ? "is-active" : ""}">${link.label}</a>`).join("")}
      </nav>
      <a class="calibi-header-cta" href="${resolvePageHref("academy.html")}">Start Training</a>
    `;

    document.body.prepend(header);
    document.body.classList.add("has-calibi-header");
  }

  function keepHeaderAlive() {
    initHeader();
    if (lowPowerDevice) {
      [250, 900, 1800].forEach((delay) => window.setTimeout(initHeader, delay));
      return;
    }

    const observer = new MutationObserver(() => {
      if (!document.querySelector(".calibi-site-header")) {
        initHeader();
      }
    });

    observer.observe(document.body, { childList: true });

    [100, 300, 700, 1200, 2200, 4000].forEach((delay) => {
      window.setTimeout(initHeader, delay);
    });
  }

  function renderFooter() {
    return `
      <div class="calibi-footer-inner">
        <div class="calibi-footer-brand">
          <a class="calibi-brand" href="${resolvePageHref("index.html")}">
            <span class="calibi-brand-mark">C</span>
            <span>Calibi AI</span>
          </a>
          <p>Premium AI automation, development, consulting, and training for businesses, colleges, and corporate teams.</p>
          <div class="calibi-footer-contact">
            <a class="calibi-contact-pill" href="mailto:sales@calibiai.com">
              <span>@</span>
              <strong>sales@calibiai.com</strong>
            </a>
            <div class="calibi-contact-pill">
              <span>IN</span>
              <strong>Hinjewadi Phase 1, Pune, Maharashtra 411057</strong>
            </div>
          </div>
        </div>
        <div>
          <h3>Services We Offer</h3>
          <a href="${resolvePageHref("services.html")}">Business Automation</a>
          <a href="${resolvePageHref("services.html")}">AI Consultation</a>
          <a href="${resolvePageHref("services.html")}">AI Development</a>
          <a href="${resolvePageHref("academy.html")}">AI Training</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="${resolvePageHref("story.html")}">Our Story</a>
          <a href="${resolvePageHref("academy.html")}">Calibi AI Academy</a>
          <a href="${resolvePageHref("services.html")}">Detailed Services</a>
          <a href="${resolvePageHref("academy.html")}#academy-contact">Partnership Enquiry</a>
        </div>
      </div>
      <div class="calibi-footer-bottom">
        <p>&copy; 2026 Calibi AI. All rights reserved.</p>
      </div>
    `;
  }

  function initFooter() {
    const footers = Array.from(document.querySelectorAll("footer"));
    let footer = document.querySelector(".calibi-site-footer") || footers[0];

    if (!footer) {
      footer = document.createElement("footer");
      document.body.appendChild(footer);
    }

    footers.forEach((item) => {
      if (item !== footer) item.remove();
    });

    footer.className = "calibi-site-footer";
    const latestFooterAlreadyVisible = footer.textContent.includes("Services We Offer") &&
      footer.textContent.includes("sales@calibiai.com") &&
      footer.textContent.includes("2026 Calibi AI");
    if (footer.dataset.calibiUpdated === "true" && latestFooterAlreadyVisible) return;

    footer.dataset.calibiUpdated = "true";
    footer.innerHTML = renderFooter();
  }

  function keepFooterAlive() {
    initFooter();
    if (lowPowerDevice) {
      [300, 1200, 2400].forEach((delay) => window.setTimeout(initFooter, delay));
      return;
    }

    const observer = new MutationObserver(() => {
      const footer = document.querySelector("footer");
      if (!footer || !footer.classList.contains("calibi-site-footer") || footer.dataset.calibiUpdated !== "true") {
        initFooter();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    [100, 400, 900, 1600, 2600, 4200, 6500].forEach((delay) => window.setTimeout(initFooter, delay));
    const footerTimer = window.setInterval(initFooter, 500);
    window.setTimeout(() => window.clearInterval(footerTimer), 12000);
  }

  const serviceCards = [
    {
      title: "Business Automation",
      description: "End-to-end automation for operations, sales, customer success, reporting, and internal workflows.",
      features: ["Workflow design", "CRM and tool integration", "Sales and support automation", "Live dashboards"],
      metric: "60% time savings across core processes",
      icon: "workflow"
    },
    {
      title: "AI Consultation",
      description: "Strategic AI guidance to find the highest ROI use cases, choose tools, and build a practical roadmap.",
      features: ["AI readiness audit", "ROI and use-case mapping", "Implementation roadmap", "Team enablement"],
      metric: "200% average ROI roadmap potential",
      icon: "users"
    },
    {
      title: "AI Development",
      description: "Custom AI products, internal copilots, agents, dashboards, and integrations built for your business.",
      features: ["Custom AI apps", "Agentic workflows", "API and data integration", "Secure deployment"],
      metric: "Production-ready AI systems",
      icon: "code"
    },
    {
      title: "AI Training for Colleges & Corporates",
      description: "Premium hands-on AI training programs for students, teams, founders, and enterprise departments.",
      features: ["Role-based workshops", "Prompting and automation", "Live project labs", "Certification-ready sessions"],
      metric: "Practical AI skills from day one",
      icon: "graduation"
    }
  ];

  function iconMarkup(type) {
    const icons = {
      workflow: '<rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      code: '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path><path d="m14.5 4-5 16"></path>',
      graduation: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>'
    };

    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[type]}</svg>`;
  }

  function renderServiceCard(card, index) {
    const outer = document.createElement("div");
    outer.className = "calibi-service-shell";
    outer.style.setProperty("--delay", `${index * 90}ms`);

    outer.innerHTML = `
      <article class="glass-card calibi-feature-card h-full">
        <div class="calibi-card-topline">
          <div class="calibi-service-icon">${iconMarkup(card.icon)}</div>
          <span>Featured Service</span>
        </div>
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <ul>${card.features.map((feature) => `<li><span></span>${feature}</li>`).join("")}</ul>
        <div class="calibi-card-metric">${card.metric}</div>
      </article>
    `;

    return outer;
  }

  function updateServicesGrid() {
    const services = document.querySelector("#services section");
    const grid = services && services.querySelector(".grid");
    const heading = services && services.querySelector("h2");
    const intro = services && services.querySelector(".text-muted-foreground");
    if (!grid || grid.dataset.calibiUpdated === "true") return;

    if (heading) {
      heading.innerHTML = '<span class="gradient-text">Premium AI Services</span> Built for Growth';
    }
    if (intro) {
      intro.textContent = "A focused suite of high-impact AI services for companies, colleges, and teams ready to move from ideas to working systems.";
    }

    grid.dataset.calibiUpdated = "true";
    grid.classList.add("calibi-services-grid");
    grid.innerHTML = "";
    serviceCards.forEach((card, index) => grid.appendChild(renderServiceCard(card, index)));
  }

  function initHeroBrain() {
    if (lowPowerDevice) return;
    const heroBrain = document.querySelector(".mesh-gradient .lucide-brain");
    const heroWrap = heroBrain && heroBrain.closest(".relative");
    if (!heroWrap || heroWrap.dataset.calibiBrain === "true") return;

    heroWrap.dataset.calibiBrain = "true";
    heroWrap.classList.add("calibi-brain-stage");

    for (let index = 0; index < 4; index += 1) {
      const orbit = document.createElement("span");
      orbit.className = "calibi-brain-orbit";
      orbit.style.setProperty("--orbit-delay", `${index * -1.4}s`);
      orbit.style.setProperty("--orbit-size", `${118 + index * 24}px`);
      heroWrap.appendChild(orbit);
    }
  }

  function initPremiumHero() {
    const hero = document.querySelector(".mesh-gradient");
    const heroContent = hero && hero.querySelector(".max-w-5xl");
    const title = hero && hero.querySelector("h1");
    const bodyCopy = hero && hero.querySelector("p");
    const ctaRow = hero && hero.querySelector(".flex.flex-col.sm\\:flex-row");
    const trusted = hero && Array.from(hero.querySelectorAll(".text-sm.font-semibold"))
      .find((element) => element.textContent.trim().toLowerCase() === "trusted by");

    if (!hero || !heroContent || !title || hero.dataset.calibiPremiumHero === "true") return;
    hero.dataset.calibiPremiumHero = "true";
    hero.classList.add("calibi-premium-hero");
    heroContent.classList.add("calibi-hero-content");

    if (!lowPowerDevice) {
      const ambient = document.createElement("div");
      ambient.className = "calibi-hero-ambient";
      ambient.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      `;
      hero.prepend(ambient);
    }

    const badge = document.createElement("div");
    badge.className = "calibi-hero-badge";
    badge.innerHTML = '<span></span> Premium AI Automation Studio';
    title.parentNode.insertBefore(badge, title);

    title.innerHTML = '<span class="calibi-title-line gradient-text">Build Smarter Systems</span><br><span class="text-foreground">with Premium AI Automation</span>';
    if (bodyCopy) {
      bodyCopy.textContent = "We design, develop, automate, and train teams on AI systems that feel practical, polished, and ready for real business operations.";
    }

    if (ctaRow) {
      ctaRow.classList.add("calibi-hero-actions");
    }

    if (trusted && trusted.parentElement) {
      trusted.parentElement.classList.add("calibi-trusted-row");
    }

    if (!lowPowerDevice) {
      const chips = document.createElement("div");
      chips.className = "calibi-floating-chips";
      chips.innerHTML = `
        <span style="--x:8%;--y:30%;--d:-1s">AI Development</span>
        <span style="--x:76%;--y:26%;--d:-2.5s">Workflow Automation</span>
        <span style="--x:12%;--y:70%;--d:-4s">Corporate AI Training</span>
        <span style="--x:72%;--y:72%;--d:-.2s">Consulting Roadmaps</span>
      `;
      hero.appendChild(chips);
    }

    const stats = document.createElement("div");
    stats.className = "calibi-hero-stats";
    stats.innerHTML = `
      <div><strong>4</strong><span>Core AI Services</span></div>
      <div><strong>50+</strong><span>Companies Supported</span></div>
      <div><strong>2x</strong><span>Faster Execution</span></div>
    `;
    if (trusted && trusted.parentElement) {
      trusted.parentElement.parentNode.insertBefore(stats, trusted.parentElement);
    } else if (ctaRow) {
      ctaRow.insertAdjacentElement("afterend", stats);
    }

    if (!heavyEffectsAllowed) return;
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty("--hero-shift-x", `${x * 8}%`);
      hero.style.setProperty("--hero-shift-y", `${y * 5}%`);
      hero.style.setProperty("--hero-content-x", `${x * -8}px`);
      hero.style.setProperty("--hero-content-y", `${y * -5}px`);
      hero.style.setProperty("--hero-chip-x", `${x * 14}px`);
      hero.style.setProperty("--hero-chip-y", `${y * 10}px`);
      hero.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }, { passive: true });
  }

  function initAcademySection() {
    const services = document.querySelector("#services");
    if (!services || document.querySelector("#academy")) return;

    const academy = document.createElement("section");
    academy.id = "academy";
    academy.className = "calibi-academy-section";
    academy.innerHTML = `
      <div class="calibi-academy-bg" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="container mx-auto max-w-7xl">
        <div class="calibi-academy-header">
          <div class="calibi-hero-badge"><span></span> Calibi AI Academy</div>
          <h2><span class="gradient-text">AI Training Partnerships</span><br>for Colleges & Corporates</h2>
          <p>We partner with institutions and teams to deliver practical AI workshops, hands-on labs, and automation training that moves learners from curiosity to real execution.</p>
        </div>

        <div class="calibi-academy-stage">
          <div class="calibi-academy-orbit" aria-hidden="true">
            <span>Prompt Engineering</span>
            <span>Automation Labs</span>
            <span>AI Product Building</span>
            <span>Career Skills</span>
          </div>

          <div class="calibi-academy-card calibi-academy-main">
            <div class="calibi-academy-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
            </div>
            <h3>Partner-Led AI Workshops</h3>
            <p>Custom training programs for colleges, placement cells, innovation clubs, departments, and corporate teams.</p>
            <div class="calibi-academy-metrics">
              <div><strong>1-3 Day</strong><span>Bootcamps</span></div>
              <div><strong>Live</strong><span>Project Labs</span></div>
              <div><strong>Team</strong><span>Enablement</span></div>
            </div>
          </div>
        </div>

        <div class="calibi-academy-grid">
          <article class="calibi-academy-card">
            <h3>For Colleges</h3>
            <p>Hands-on student workshops on AI tools, prompt engineering, automation, project building, and career-ready AI workflows.</p>
          </article>
          <article class="calibi-academy-card">
            <h3>For Corporates</h3>
            <p>Role-based AI adoption training for operations, sales, HR, marketing, founders, and leadership teams.</p>
          </article>
          <article class="calibi-academy-card">
            <h3>Workshop Outcomes</h3>
            <p>Every program ends with live demos, reusable templates, real workflows, and a clear next-step implementation roadmap.</p>
          </article>
        </div>

        <div class="calibi-academy-marquee" aria-hidden="true">
          <div>
            <span>College AI Workshops</span>
            <span>Corporate AI Training</span>
            <span>Hands-on Automation Labs</span>
            <span>Student Innovation Programs</span>
            <span>Leadership AI Enablement</span>
          </div>
          <div>
            <span>College AI Workshops</span>
            <span>Corporate AI Training</span>
            <span>Hands-on Automation Labs</span>
            <span>Student Innovation Programs</span>
            <span>Leadership AI Enablement</span>
          </div>
        </div>
      </div>
    `;

    services.insertAdjacentElement("afterend", academy);
  }

  function initAcademyContactForm() {
    const form = document.querySelector("#academy-partnership-form");
    if (!form || form.dataset.calibiReady === "true") return;
    form.dataset.calibiReady = "true";
    if (form.dataset.submitMode === "direct") return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent("Calibi AI Academy Partnership Enquiry");
      const body = encodeURIComponent([
        "Hello Calibi AI Team,",
        "",
        "I am interested in Calibi AI Academy training/partnership.",
        "",
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `College / Company: ${data.get("organization") || ""}`,
        `Partnership Type: ${data.get("type") || ""}`,
        `Expected Participants: ${data.get("participants") || ""}`,
        "",
        "Message:",
        data.get("message") || "",
        "",
        "Regards"
      ].join("\n"));

      window.location.href = `mailto:prajwal@calibiai.com?subject=${subject}&body=${body}`;
    });
  }

  function initCursor() {
    if (!heavyEffectsAllowed) return;

    const cursor = document.createElement("div");
    const aura = document.createElement("div");
    cursor.className = "calibi-cursor";
    aura.className = "calibi-cursor-aura";
    document.body.append(cursor, aura);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;

    window.addEventListener("pointermove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function tick() {
      auraX += (mouseX - auraX) * 0.16;
      auraY += (mouseY - auraY) * 0.16;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();

    const hotTargets = "a, button, [role='button'], .glass-card, .cursor-pointer";
    document.addEventListener("pointerover", (event) => {
      if (event.target.closest(hotTargets)) document.documentElement.classList.add("calibi-cursor-hot");
    });
    document.addEventListener("pointerout", (event) => {
      if (event.target.closest(hotTargets)) document.documentElement.classList.remove("calibi-cursor-hot");
    });
  }

  function initMagneticHover() {
    if (!heavyEffectsAllowed) return;

    document.querySelectorAll("button, a, .glass-card").forEach((element) => {
      if (element.dataset.calibiMagnetic === "true") return;
      element.dataset.calibiMagnetic = "true";
      element.classList.add("calibi-magnetic");

      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.setProperty("--mx", `${x * 0.08}px`);
        element.style.setProperty("--my", `${y * 0.08}px`);
      }, { passive: true });

      element.addEventListener("pointerleave", () => {
        element.style.removeProperty("--mx");
        element.style.removeProperty("--my");
      });
    });
  }

  function initRevealFallback() {
    if (!("IntersectionObserver" in window)) return;

    const selectors = [
      "section > .container > .text-center",
      ".glass-card",
      "footer .container > div"
    ].join(",");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("calibi-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    document.querySelectorAll(selectors).forEach((element) => {
      element.classList.add("calibi-reveal");
      observer.observe(element);
    });
  }

  function initScrollProgress() {
    if (isHomePage) return;
    const bar = document.createElement("div");
    bar.className = "calibi-scroll-progress";
    document.body.appendChild(bar);

    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function boot() {
    keepHeaderAlive();
    keepFooterAlive();
    removeHomeBrainLogo();
    updateServicesGrid();
    if (!isHomePage) {
      initHeroBrain();
      initPremiumHero();
    }
    initCursor();
    initAcademyContactForm();
    if (!isHomePage) initMagneticHover();
    initRevealFallback();
    initScrollProgress();
    initTouchFeedback();

    const delayedPasses = lowPowerDevice ? [600, 1800] : [350, 1000, 1800];
    delayedPasses.forEach((delay) => {
      window.setTimeout(() => {
        removeHomeBrainLogo();
        updateServicesGrid();
        if (!isHomePage) {
          initHeroBrain();
          initPremiumHero();
        }
        initHeader();
        initAcademyContactForm();
        if (!isHomePage) initMagneticHover();
      }, delay);
    });
  }

  function initTouchFeedback() {
    if (!coarsePointer) return;
    document.addEventListener("pointerdown", (event) => {
      const target = event.target.closest("a,button,[role='button'],.glass-card");
      if (!target) return;

      const ripple = document.createElement("span");
      ripple.className = "calibi-touch-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 500);
    }, { passive: true });
  }

  function removeHomeBrainLogo() {
    // Keep the brain logo
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
