"use strict"
const uL = document.querySelector("#navLinks");
const navMenuBtn = document.querySelector("#navMenuBtn");
const navLinks = document.querySelectorAll("nav a");
const destinationCards = document.querySelectorAll(".destinationCard");
 
const scrollBtn = document.querySelector("#scrollBtn");
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
        if (entry.isIntersecting) {
            // stop multiple animation
            if (!entry.target.classList.contains('visible')) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 150);
            };
        } else {
            entry.target.classList.remove('visible');
      console.log(`${index}: card went out of view`);
       }
    });
}, { threshold: 0.2 }); // show when 20% of card is available
destinationCards.forEach(destCard => { observer.observe(destCard) });