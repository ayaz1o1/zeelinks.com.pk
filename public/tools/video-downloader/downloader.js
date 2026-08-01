/* ==========================================================
   ZeeLinks Portal v1.0
   script.js - Part 1
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       Loader
    ------------------------------- */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 800);
    });

    /* -------------------------------
       Theme Toggle
    ------------------------------- */

    const themeBtn = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

    /* -------------------------------
       Mobile Menu
    ------------------------------- */

    const menuBtn = document.getElementById("menuBtn");

    let mobileMenu =
        document.querySelector(".mobile-menu");

    if (!mobileMenu) {

        mobileMenu = document.createElement("div");

        mobileMenu.className = "mobile-menu";

        mobileMenu.innerHTML = `
            <a href="https://zeelinks.com.pk/">Home</a>
            <a href="#download">Download</a>
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
            <a href="https://zeelinks.com.pk/#contact">Contact</a>
        `;

        document.body.appendChild(mobileMenu);

    }

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

    mobileMenu.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

            });

        });

    /* -------------------------------
       Smooth Scroll
    ------------------------------- */

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function(e) {

                e.preventDefault();

                const target =
                    document.querySelector(this.getAttribute("href"));

                if (target) {

                    target.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            });

        });

    /* -------------------------------
       Scroll To Top
    ------------------------------- */

    const topBtn =
        document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            if(topBtn) topBtn.style.display = "flex";

        } else {

            if(topBtn) topBtn.style.display = "none";

        }

    });

    topBtn?.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});

/* ==========================================================
   ZeeLinks Portal v1.0
   script.js - Part 2
   ========================================================== */

/* -------------------------------
   FAQ Accordion
-------------------------------- */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/* -------------------------------
   Scroll Reveal Animation
-------------------------------- */

const revealElements = document.querySelectorAll(
".feature-card, .platform-card, .stat-box, .faq-item, .download-card"
);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

revealElements.forEach(el=>{

el.classList.add("fade-up");

revealObserver.observe(el);

});

/* -------------------------------
   Toast Notification
-------------------------------- */

const toast = document.getElementById("toast");

function showToast(message){

if(!toast) return;

toast.textContent = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

/* -------------------------------
   Contact Form
-------------------------------- */

const contactForm =
document.querySelector(".contact-form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

showToast("Thank you! Your message has been received.");

contactForm.reset();

});

}

/* -------------------------------
   Newsletter
-------------------------------- */

const newsletterBtn =
document.querySelector(".newsletter button");

const newsletterInput =
document.querySelector(".newsletter input");

if(newsletterBtn && newsletterInput){

newsletterBtn.addEventListener("click",()=>{

const email = newsletterInput.value.trim();

if(email===""){

showToast("Please enter your email address.");

return;

}

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email)){

showToast("Please enter a valid email address.");

return;

}

showToast("Subscription successful!");

newsletterInput.value="";

});

}

/* URL validation handled by integrated downloader bridge. */

/* -------------------------------
   Unified Downloader Bridge
-------------------------------- */

(() => {
    const input = document.getElementById("videoURL");
    const button = document.getElementById("analyzeBtn");
    const result = document.getElementById("downloadResult");

    if (!input || !button || !result) return;

    // Set this global before loading downloader.js in production, e.g.
    // window.ZEE_LINKS_DOWNLOADER_API = "https://downloader-api.example.com";
    // Leave empty while the backend is not deployed.
    const API_BASE = String(window.ZEE_LINKS_DOWNLOADER_API || "").replace(/\/$/, "");

    const directMediaPattern = /\.(mp4|webm|mov|m4v|mp3|m4a|ogg|wav)(\?.*)?$/i;

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
        }[char]));
    }

    function render(message, type = "info", html = false) {
        result.innerHTML = `<div class="download-preview ${type}">${html ? message : `<p>${escapeHtml(message)}</p>`}</div>`;
    }

    function renderFormats(data) {
        const formats = Array.isArray(data.formats) ? data.formats : [];
        if (!formats.length) {
            render("The URL was analyzed, but the downloader engine did not return any downloadable formats.", "warning");
            return;
        }

        const title = data.title ? `<h3>${escapeHtml(data.title)}</h3>` : "<h3>Available downloads</h3>";
        const thumb = data.thumbnail ? `<img class="download-thumb" src="${escapeHtml(data.thumbnail)}" alt="Video thumbnail" loading="lazy">` : "";
        const links = formats.map(format => {
            const url = String(format.url || "");
            if (!/^https?:\/\//i.test(url)) return "";
            const label = escapeHtml(format.label || format.ext || "Download");
            const ext = format.ext ? ` <small>${escapeHtml(format.ext)}</small>` : "";
            return `<a class="download-action" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" download>${label}${ext}</a>`;
        }).filter(Boolean).join("");

        result.innerHTML = `<div class="download-preview success">${thumb}${title}<div class="download-format-list">${links}</div></div>`;
    }

    async function analyze() {
        const value = input.value.trim();
        if (!value) {
            render("Paste a video URL first.", "warning");
            input.focus();
            return;
        }

        let url;
        try {
            url = new URL(value);
            if (!/^https?:$/.test(url.protocol)) throw new Error();
        } catch {
            render("Please enter a complete URL beginning with http:// or https://.", "error");
            return;
        }

        buttonLoading(button, true);
        render("Checking the URL…", "info");

        // Direct media URLs do not need the extraction backend.
        if (directMediaPattern.test(url.pathname + url.search)) {
            render(`<h3>Direct media URL detected</h3><p>Your browser can open this media directly. Server permissions may determine whether it downloads or plays.</p><a class="download-action" href="${escapeHtml(url.href)}" target="_blank" rel="noopener noreferrer">Open / Download Media</a>`, "success", true);
            buttonLoading(button, false);
            return;
        }

        if (!API_BASE) {
            render(`<h3>Downloader backend not connected yet</h3><p>The frontend is ready, but the production server-side downloader API has not been configured. This is expected until the backend is deployed.</p><p class="small-note">For your safety and legal compliance, use this tool only for content you are permitted to download.</p>`, "warning", true);
            buttonLoading(button, false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/analyze`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ url: url.href })
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.error || "The downloader server could not analyze this URL.");
            }
            renderFormats(data);
        } catch (error) {
            render(error.message || "Unable to analyze the URL. Please try again.", "error");
        } finally {
            buttonLoading(button, false);
        }
    }

    button.addEventListener("click", analyze);
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") analyze();
    });
})();


/* ==========================================================
   ZeeLinks Portal v1.0
   script.js - Part 3
   ========================================================== */


/* -------------------------------
   Theme Icon Sync
-------------------------------- */

function updateThemeIcon(){

    const themeBtn =
    document.getElementById("themeToggle");

    if(!themeBtn) return;


    if(document.body.classList.contains("light")){

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }
    else{

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

}


updateThemeIcon();



/* -------------------------------
   Keyboard Accessibility
-------------------------------- */


document.addEventListener("keydown",(event)=>{


    // Press ESC to close mobile menu

    if(event.key === "Escape"){

        const mobileMenu =
        document.querySelector(".mobile-menu");


        if(mobileMenu){

            mobileMenu.classList.remove("active");

        }

    }


});



/* -------------------------------
   Copy URL Helper
-------------------------------- */


function copyText(text){

    navigator.clipboard.writeText(text)

    .then(()=>{

        showToast("Copied to clipboard!");

    })

    .catch(()=>{

        showToast("Copy failed.");

    });

}



const urlInput =
document.getElementById("videoURL");


if(urlInput){


    urlInput.addEventListener("keydown",(e)=>{


        if(e.key==="Enter"){


            document
            .getElementById("analyzeBtn")
            ?.click();


        }


    });


}



/* -------------------------------
   Button Loading Effect
-------------------------------- */


function buttonLoading(button,state){


    if(state){


        button.dataset.oldText =
        button.innerHTML;


        button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';


        button.disabled=true;


    }

    else{


        button.innerHTML =
        button.dataset.oldText;


        button.disabled=false;


    }


}



/* -------------------------------
   Service Worker Registration
-------------------------------- */


if("serviceWorker" in navigator){


window.addEventListener("load",()=>{


    navigator.serviceWorker
    .register("sw.js")


    .then(()=>{


        console.log(
        "ZeeLinks Service Worker Registered"
        );


    })


    .catch(error=>{


        console.log(
        "Service Worker Error:",
        error
        );


    });


});


}



/* -------------------------------
   Performance Optimization
-------------------------------- */


window.addEventListener("load",()=>{


    document.body.classList.add("loaded");


});



/* -------------------------------
   External Link Protection
-------------------------------- */


document
.querySelectorAll('a[target="_blank"]')
.forEach(link=>{


    link.setAttribute(
    "rel",
    "noopener noreferrer"
    );


});



/* -------------------------------
   Console Branding
-------------------------------- */


console.log(`

================================

   ZeeLinks Portal v1.0

   Modern Web Application

   Developed for Zee Links

================================

`);