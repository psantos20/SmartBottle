// script.js
document.addEventListener("DOMContentLoaded", () => {
    /* ========== SCROLL SUAVE (com offset do header fixo) ========== */
    const header = document.querySelector("header");
    const offsetTop = (el) => {
        const y = el.getBoundingClientRect().top + window.pageYOffset;
        const headerH = header ? header.offsetHeight : 0;
        return y - headerH - 8; // 8px de folga
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const id = anchor.getAttribute("href");
            if (id && id !== "#" && document.querySelector(id)) {
                e.preventDefault();
                window.scrollTo({ top: offsetTop(document.querySelector(id)), behavior: "smooth" });
            }
        });
    });

    /* ========== REVEAL ON SCROLL (fade + slide) ========== */
    const revealSelectors = ".card, .hero-content, .cta, .sobre, .features h3, .preco-card, footer";
    const targets = Array.from(document.querySelectorAll(revealSelectors));
    // adiciona classe base .reveal automaticamente
    targets.forEach((el) => el.classList.add("reveal"));

    const ioOpts = { root: null, threshold: 0.15 };
    const io = "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // pequeno "stagger" automático
                    entry.target.style.transitionDelay = (entry.target.dataset.delay || "0s");
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        }, ioOpts)
        : null;

    if (io) targets.forEach((el, i) => {
        el.dataset.delay = `${Math.min(i * 0.06, 0.5)}s`;
        io.observe(el);
    });
    else targets.forEach((el) => el.classList.add("visible")); // fallback sem IO

    /* ========== BOTÃO VOLTAR AO TOPO ========== */
    let backBtn = document.getElementById("backToTop");
    if (!backBtn) {
        backBtn = document.createElement("button");
        backBtn.id = "backToTop";
        backBtn.setAttribute("aria-label", "Voltar ao topo");
        backBtn.textContent = "↑";
        document.body.appendChild(backBtn);
    }
    const toggleBackBtn = () => {
        if (window.scrollY > 400) backBtn.classList.add("show");
        else backBtn.classList.remove("show");
    };
    toggleBackBtn();
    window.addEventListener("scroll", toggleBackBtn);
    backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    /* ========== NAVBAR SHRINK (comporta como pro) ========== */
    const nav = document.querySelector("header");
    const onNavScroll = () => {
        if (!nav) return;
        if (window.scrollY > 40) nav.classList.add("shrink");
        else nav.classList.remove("shrink");
    };
    onNavScroll();
    window.addEventListener("scroll", onNavScroll);

    /* ========== PARALLAX NO HERO (background) ========== */
    const hero = document.querySelector(".hero");
    if (hero) {
        let ticking = false;
        const doParallax = () => {
            const y = window.scrollY;
            const speed = 0.28; // ajuste fino
            hero.style.backgroundPosition = `center ${-y * speed}px`;
            ticking = false;
        };
        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(doParallax);
                ticking = true;
            }
        });
    }

    /* ========== MICROINTERAÇÃO: RIPPLE NOS BOTÕES .btn ========== */
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.style.position = "relative";
        btn.style.overflow = "hidden";
        btn.addEventListener("click", function (e) {
            const circle = document.createElement("span");
            const d = Math.max(this.clientWidth, this.clientHeight);
            const rect = this.getBoundingClientRect();
            circle.style.width = circle.style.height = `${d}px`;
            circle.style.left = `${e.clientX - rect.left - d / 2}px`;
            circle.style.top = `${e.clientY - rect.top - d / 2}px`;
            Object.assign(circle.style, {
                position: "absolute",
                borderRadius: "50%",
                background: "currentColor",
                opacity: "0.35",
                transform: "scale(0)",
                transition: "transform 600ms ease, opacity 700ms ease",
                pointerEvents: "none",
            });
            this.appendChild(circle);
            requestAnimationFrame(() => (circle.style.transform = "scale(2.8)"));
            setTimeout(() => {
                circle.style.opacity = "0";
                setTimeout(() => circle.remove(), 350);
            }, 300);
        });
    });
});

