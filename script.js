"use strict"
const menuBtn = document.querySelector("#navMenuBtn");
const navUl = document.querySelector("#navLinks");
const navLinks = document.querySelectorAll("#navLinks a");

function dynamicToggle() {

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
    const ariaExpanded = menuBtn.getAttribute('Aria-expanded') === 'true';
    menuBtn.setAttribute('Aria-expanded', !ariaExpanded);
        console.log(ariaExpanded)
            navUl.classList.toggle("active");

})

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const targetId = e.target.getAttribute("href");
            closeMenu();
            setTimeout(() => {
        document.querySelector(targetId).scrollIntoView({
                    behaviour: 'smooth',
                });
            }, 100)
        };
    });
}); 
}
dynamicToggle();

function closeMenu() {
    navUl.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", false);
}
