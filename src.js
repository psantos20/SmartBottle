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

    /* ========== NAVBAR SHRINK (comporta como pro) ========== */
    const nav = document.querySelector("header");
    const onNavScroll = () => {
        if (!nav) return;
        if (window.scrollY > 40) nav.classList.add("shrink");
        else nav.classList.remove("shrink");
    };
    onNavScroll();
    window.addEventListener("scroll", onNavScroll);


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

