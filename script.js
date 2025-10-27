"use strict"
const uL = document.querySelector("#navLinks");
const navMenuBtn = document.querySelector("#navMenuBtn");
const navLinks = document.querySelectorAll("nav a");
const destinationCards = document.querySelectorAll(".destinationCard");
const scrollBtn = document.querySelector("#scrollBtn");
const mysections = document.querySelectorAll(".mysection");
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
                    behavior: 'smooth',
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
        behavior: 'smooth',
    });
});

/* intersection observer to scroll card */

 const observer = new IntersectionObserver((entries) => {
    

     entries.forEach((entry, index) => {
        console.log("Observing:", entry.target.className, entry.isIntersecting); // ✅ debug
        if (entry.isIntersecting) {
             setTimeout(() => {
                    entry.target.classList.add("visible");
                    entry.target.style.willChange = "opacity, transform";
                    observer.unobserve(entry.target);
                }, index * 150);
            entry.target.addEventListener("transitionend", () => {
                entry.target.style.willChange = "auto";
            }, {once:true})
        } 
    });
}, { threshold: 0.15 }); // show when 20% of card is available

[...destinationCards, ...mysections].forEach((el) => { observer.observe(el) });
 
