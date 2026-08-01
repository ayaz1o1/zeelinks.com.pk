/*==================================================
    Zee Links Enterprise Platform
    Main JavaScript
==================================================*/
"use strict";

const header = document.querySelector(".header");
const mobileToggle = document.querySelector(".mobile-toggle");
const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");

window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("sticky", window.scrollY > 80);
    if (backToTop) backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
}, { passive: true });

if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
}

if (mobileToggle && navbar) {
    mobileToggle.addEventListener("click", () => {
        const open = navbar.classList.toggle("active");
        mobileToggle.classList.toggle("active", open);
        mobileToggle.setAttribute("aria-expanded", String(open));
    });
}

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        if (navbar) navbar.classList.remove("active");
        if (mobileToggle) mobileToggle.classList.remove("active");
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({behavior: "smooth", block: "start"});
    });
});

const revealElements = document.querySelectorAll(
    ".section-heading,.service-card,.product-card,.tool-card,.knowledge-card," +
    ".portfolio-card,.testimonial-card,.about-item,.why-card"
);

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < triggerBottom) el.classList.add("show");
    });
};
window.addEventListener("scroll", revealOnScroll, {passive: true});
revealOnScroll();

const counters = document.querySelectorAll(".counter");
const startCounter = counter => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 70));
    const update = () => {
        current += increment;
        if (current >= target) counter.textContent = `${target}+`;
        else {
            counter.textContent = current;
            requestAnimationFrame(update);
        }
    };
    update();
};

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});
    counters.forEach(c => observer.observe(c));
} else {
    counters.forEach(startCounter);
}

window.addEventListener("load", () => {
    document.querySelector(".hero-content")?.classList.add("animate-left");
    document.querySelector(".tech-card")?.classList.add("animate-right");
});

document.querySelectorAll(".portfolio-card img").forEach(image => {
    image.addEventListener("mouseenter", () => image.style.transform = "scale(1.04)");
    image.addEventListener("mouseleave", () => image.style.transform = "scale(1)");
});

document.querySelectorAll("img").forEach(img => {
    if (!img.hasAttribute("loading")) img.loading = "lazy";
});

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

if (contactForm) {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();

        const required = [...contactForm.querySelectorAll("[required]")];
        const invalid = required.find(input => !input.value.trim());

        if (invalid) {
            invalid.focus();
            showToast("Please complete the required fields.", "error");
            return;
        }

        const data = new FormData(contactForm);
        const message = [
            "Zee Links Website Enquiry",
            `Name: ${data.get("name") || ""}`,
            `Phone: ${data.get("phone") || ""}`,
            `Email: ${data.get("email") || ""}`,
            `Service: ${data.get("service") || ""}`,
            `Message: ${data.get("message") || ""}`
        ].join("\n");

        const wa = `https://wa.me/923072262350?text=${encodeURIComponent(message)}`;
        window.open(wa, "_blank", "noopener,noreferrer");
        showToast("Your enquiry is ready in WhatsApp.", "success");
        contactForm.reset();
    });
}

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".navbar a[href^='#']")];

const updateActiveNav = () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === `#${current}`
    ));
};
window.addEventListener("scroll", updateActiveNav, {passive: true});
updateActiveNav();

document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
});

console.log("%cZee Links Enterprise Platform", "color:#2563eb;font-size:20px;font-weight:bold;");

document.addEventListener("click", function(event){

    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".mobile-toggle");

    if(!navbar || !menuBtn) return;


    if(
        !navbar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ){

        navbar.classList.remove("active");

    }

});
