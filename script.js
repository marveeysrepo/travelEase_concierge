"use strict"
const uL = document.querySelector("#navLinks");
const navMenuBtn = document.querySelector("#navMenuBtn");
const navLinks = document.querySelectorAll("nav a");
const destinationCards = document.querySelectorAll(".destinationCard");
 const card = document.querySelectorAll(".card")
const scrollBtn = document.querySelector("#scrollBtn");
const mysection = document.querySelectorAll(".mysection");
console.log(card)
dynamicToggle();

function closenav() {
    uL.classList.remove("active");
    navMenuBtn.removeAttribute('aria-expanded', "false");
};

function dynamicToggle() {
/* close nav menu on click of button */
    navMenuBtn.addEventListener('click', () => {
        const ariaExpanded = navMenuBtn.getAttribute("aria-expanded") === "true";
        navMenuBtn.setAttribute('aria-expanded', !ariaExpanded);
        uL.classList.toggle("active");

    });

    /* close nav menu on click of links */
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (e.target.matches('a')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                closenav();

            /* set timeout */
            setTimeout(() => {
                document.querySelector(targetId).scrollIntoView({
                    behaviour: 'smooth',
                });
            }, 100);
            }

        
        });
    });
};

/* show scroll to top button */
window.addEventListener("scroll", () => {
    const scrollHeight = window.scrollY;
    if (scrollHeight > 2000) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    };
});

/* scroll to top */
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behaviour: 'smooth',
    });
});

/* intersection observer to scroll card */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        const element = entry.target;
        if (entry.isIntersecting && !element.classList.contains("visible")) {
            element.style.willChange = "opacity, transform";
            setTimeout(() => {
                element.classList.add("visible");
                observer.unobserve(element);
            }, index * 100);
            element.addEventListener("transitionend", () => {
                element.style.willChange = "auto";
            }, { once: true });
        };
    });
}, { threshold: 0.15 });
[...destinationCards, ...mysection, ...card].forEach((element)=>{observer.observe(element)})






/* const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // stop multiple animation
            if (!entry.target.classList.contains('visible')) {
                setTimeout(() => {
                    entry.target.classList.add("visible");                 entry.target.style.willChange = "opacity, transform";
                }, index * 150);
            };
        } else {
            entry.target.classList.remove('visible');
        };
    });
}, { threshold: 0.15 }); // show when 20% of card is available
mysection.forEach(section=>{observer.observe(section)})
destinationCards.forEach(destCard => { observer.observe(destCard) }); */