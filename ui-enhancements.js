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
      title: "AI Chatbots",
      description: "Intelligent conversational agents that understand context, integrate with CRMs, and provide 24/7 human-like interactions.",
      features: ["Natural language processing", "Multi-language support", "24/7 automated availability", "Deep CRM & tool integration"],
      metric: "85% reduction in support tickets",
      icon: "message"
    },
    {
      title: "Voice Agents",
      description: "Advanced voice AI for phone systems, customer service, automated calling, and real-time speech analytics.",
      features: ["Real-time speech recognition", "Emotion detection & tone tuning", "Call routing automation", "Comprehensive voice analytics"],
      metric: "70% faster call resolution",
      icon: "mic"
    },
    {
      title: "Multi-Agent Systems",
      description: "Collaborative AI networks designed to handle complex multi-step reasoning, research, and enterprise operations.",
      features: ["Autonomous task delegation", "Cross-system orchestration", "Complex reasoning pipelines", "Secure enterprise scaling"],
      metric: "Enterprise-grade autonomous workflows",
      icon: "cpu"
    },
    {
      title: "Business Automation",
      description: "End-to-end automation for operations, sales, customer success, reporting, and internal workflows.",
      features: ["Workflow design & mapping", "CRM and tool integration", "Sales and support automation", "Live executive dashboards"],
      metric: "60% time savings across processes",
      icon: "workflow"
    },
    {
      title: "Content Automation",
      description: "Scalable content generation, multi-format localization, and automated publishing pipelines tailored for brands.",
      features: ["Automated content pipelines", "Brand voice alignment", "Multi-format localization", "Scheduled publishing workflows"],
      metric: "10x faster content deployment",
      icon: "file"
    },
    {
      title: "Pre-Built Solutions",
      description: "Enterprise-ready AI solutions deployable in 48 hours with minimal setup and maximum operational ROI.",
      features: ["Rapid 48-hour deployment", "Pre-tested automation modules", "Zero friction onboarding", "Guaranteed ROI templates"],
      metric: "Live and generating ROI in 48 hrs",
      icon: "zap"
    },
    {
      title: "AI Consultation",
      description: "Strategic AI guidance to find highest ROI use cases, choose tools, and build practical implementation roadmaps.",
      features: ["AI readiness audit", "ROI and use-case mapping", "Implementation roadmap", "Team enablement sessions"],
      metric: "200% average ROI roadmap potential",
      icon: "users"
    }
  ];

  function iconMarkup(type) {
    const icons = {
      workflow: '<rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      code: '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path><path d="m14.5 4-5 16"></path>',
      graduation: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>',
      message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
      mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line>',
      cpu: '<rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M20 15h2"></path><path d="M2 9h2"></path><path d="M20 9h2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path>',
      zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>',
      file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline>'
    };

    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[type] || icons.workflow}</svg>`;
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

  function initAiAgentWidget() {
    if (document.querySelector(".calibi-ai-widget-container")) return;

    const container = document.createElement("div");
    container.className = "calibi-ai-widget-container";
    container.innerHTML = `
      <button class="calibi-ai-toggle-btn" aria-label="Open Calibi AI Assistant">
        <span class="calibi-ai-avatar">🤖</span>
        <span class="calibi-ai-status-dot"></span>
        <span class="calibi-ai-toggle-text">AI Agent</span>
      </button>
      <div class="calibi-ai-popup" style="display: none;">
        <div class="calibi-ai-header">
          <div class="calibi-ai-title">
            <span class="calibi-ai-avatar-sm">🤖</span>
            <div>
              <strong>Calibi AI Assistant</strong>
              <span>Online | Ready to help</span>
            </div>
          </div>
          <button class="calibi-ai-close" aria-label="Close">&times;</button>
        </div>
        <div class="calibi-ai-body">
          <div class="calibi-ai-msg bot">
            Hello! I'm your Calibi AI Assistant. Looking to automate your business or schedule a free consultation with our experts?
          </div>
          <div class="calibi-ai-actions">
            <a href="https://calendly.com/prajwalen100/30min" target="_blank" rel="noopener noreferrer" class="calibi-ai-cta-btn">
              📅 Book Free Consultation (30min)
            </a>
            <a href="services.html" class="calibi-ai-secondary-btn">Explore AI Services</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const toggleBtn = container.querySelector(".calibi-ai-toggle-btn");
    const popup = container.querySelector(".calibi-ai-popup");
    const closeBtn = container.querySelector(".calibi-ai-close");

    toggleBtn.addEventListener("click", () => {
      const isVisible = popup.style.display === "flex";
      popup.style.display = isVisible ? "none" : "flex";
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    document.addEventListener("pointerdown", (e) => {
      if (!container.contains(e.target)) {
        popup.style.display = "none";
      }
    });

    // Intercept consultation / schedule clicks globally to open Calendly
    document.addEventListener("click", (e) => {
      const target = e.target.closest("button, a, [role='button']");
      if (!target) return;
      const text = target.textContent || "";
      const href = target.getAttribute("href") || "";
      if (
        text.toLowerCase().includes("consultation") ||
        text.toLowerCase().includes("schedule") ||
        text.toLowerCase().includes("book a free") ||
        href.includes("#consultation") ||
        href.includes("#calendly")
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.open("https://calendly.com/prajwalen100/30min", "_blank", "noopener,noreferrer");
      }
    }, true);
  }

  function initFlickerIntro() {
    if (sessionStorage.getItem("calibi_intro_shown") || lowPowerDevice) return;
    sessionStorage.setItem("calibi_intro_shown", "true");

    const intro = document.createElement("div");
    intro.className = "calibi-flicker-intro";
    intro.innerHTML = `
      <div class="calibi-flicker-box">
        <div class="calibi-flicker-title">
          <span></span> CALIBI.AI // NEURAL STUDIO v2.6
        </div>
        <div class="calibi-flicker-logs">
          <div>> Initializing human-AI hybrid architecture...</div>
          <div>> Loading multi-agent workflows & neural models...</div>
          <div>> Calibrating design system & responsive layout...</div>
          <div>> SYSTEM ONLINE. WELCOME TO CALIBI AI.</div>
        </div>
      </div>
    `;
    document.body.prepend(intro);
  }

  function initLocalImagesEnhancement() {
    const hero = document.querySelector(".mesh-gradient");
    if (hero && !hero.dataset.bgSet) {
      hero.dataset.bgSet = "true";
      hero.style.backgroundImage = "linear-gradient(135deg, rgba(2, 6, 23, 0.88), rgba(4, 10, 26, 0.85)), url('assets/images/hero-bg.jpg')";
      hero.style.backgroundSize = "cover";
      hero.style.backgroundPosition = "center";
    }

    const caseCards = document.querySelectorAll("#case-studies .glass-card, #testimonials .glass-card, .glass-card");
    const images = [
      "assets/images/vramp-manufacturing.jpg",
      "assets/images/devionx-tech.jpg",
      "assets/images/dermaspace-clinic.jpg",
      "assets/images/academy-workshop.jpg"
    ];

    caseCards.forEach((card, idx) => {
      if (card.querySelector(".calibi-case-img")) return;
      // Only add to case study cards or featured containers
      if (!card.closest("#case-studies") && !card.closest(".calibi-academy-main")) return;
      const imgPath = images[idx % images.length];
      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = "Calibi AI visual asset";
      img.className = "calibi-case-img";
      const head = card.querySelector("h3") || card.firstElementChild;
      if (head) {
        head.parentNode.insertBefore(img, head);
      } else {
        card.prepend(img);
      }
    });
  }

  function boot() {
    keepHeaderAlive();
    keepFooterAlive();
    removeHomeBrainLogo();
    updateServicesGrid();
    initAiAgentWidget();
    initFlickerIntro();
    initLocalImagesEnhancement();
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

    const imgInterval = window.setInterval(initLocalImagesEnhancement, 300);
    window.setTimeout(() => window.clearInterval(imgInterval), 6000);

    const delayedPasses = lowPowerDevice ? [600, 1800] : [350, 1000, 1800];
    delayedPasses.forEach((delay) => {
      window.setTimeout(() => {
        removeHomeBrainLogo();
        updateServicesGrid();
        initAiAgentWidget();
        initLocalImagesEnhancement();
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
