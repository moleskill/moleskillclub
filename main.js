/* =========================================
   MOLESKILL CLUB — JAVASCRIPT
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const club = {
    formUrl: "",
    applicationsOpen: false
};


/* =========================================
   CURRENT YEAR
========================================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================
   MOBILE MENU
========================================= */

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

function closeMenu() {

    menu.classList.remove("active");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );

    menuBtn.setAttribute(
        "aria-label",
        "Открыть меню"
    );
}

menuBtn.addEventListener("click", () => {

    const isOpen = menu.classList.toggle("active");

    menuBtn.textContent = isOpen ? "✕" : "☰";

    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню"
    );

});

menu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

window.addEventListener("resize", () => {

    if (window.innerWidth > 950) {
        closeMenu();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================================
   APPLICATION FORM
========================================= */

const applyBtn = document.getElementById("applyBtn");

const status = document.getElementById(
    "applicationStatus"
);

const note = document.getElementById("applyNote");

const validForm =
    /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/.test(
        club.formUrl
    );

if (club.applicationsOpen && validForm) {

    status.textContent = "● Набор открыт";

    status.classList.add("open");

    applyBtn.href = club.formUrl;

    applyBtn.target = "_blank";

    applyBtn.rel = "noopener noreferrer";

    note.textContent =
        "Анкета откроется в новой вкладке.";

} else {

    status.textContent = "Набор пока не открыт";

    applyBtn.textContent = "Анкета скоро появится";

    applyBtn.classList.add("disabled");

    applyBtn.removeAttribute("href");

    applyBtn.setAttribute(
        "aria-disabled",
        "true"
    );

    note.textContent =
        "Информация о начале отбора будет опубликована здесь.";

}


/* =========================================
   SCROLL PROGRESS
========================================= */

const progressLine = document.getElementById(
    "progressLine"
);

function updateProgress() {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    progressLine.style.width =
        Math.min(100, Math.max(0, progress)) + "%";

}

window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
);

updateProgress();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(`
    .section-heading,
    .about-text,
    .info-box,
    .card,
    .step,
    .apply-box,
    .team-card,
    .event-card,
    .gallery-card,
    details
`);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    "IntersectionObserver" in window &&
    !reduceMotion
) {

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}


/* =========================================
   STAGGER ANIMATION
========================================= */

const cardGroups = document.querySelectorAll(`
    .events-grid,
    .gallery-grid,
    .team-grid,
    .cards,
    .steps
`);

cardGroups.forEach(group => {

    const cards = Array.from(group.children);

    cards.forEach((card, index) => {

        const delay = (index % 4) * 0.1;

        card.style.transitionDelay = `${delay}s`;

    });

});