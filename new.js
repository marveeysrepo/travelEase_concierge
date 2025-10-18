"use strict"

const menuBtn = document.querySelector("#navMenuBtn");
const ul = document.querySelector("#navLinks");
const navLinks = document.querySelectorAll("#navLinks a");
const scrollBtn = document.querySelector("#scrollBtn");
function toggleLogic() {
    // add event to menuBtn
    // get aria expanded and toggle its value
    //  toggle navclasslist
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const ariaExpanded = menuBtn.getAttribute("aria-expanded") === "true";
        ul.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", !ariaExpanded)
    });

    // close nav and scroll into view on click of navlinks
    // attach event listener for each link
    // check if target matches attribute
    // prevent default link behaviour
    // get the target id
    // close nav menu
    //  set timeout, select targetid, then  scroll smoothly into view
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            if (e.target.matches("a")) {
                e.preventDefault();
                const targetId = e.target.getAttribute("href");
                closeNav();
                setTimeout(() => {
                    document.querySelector(targetId).scrollIntoView({ behaviour: "smooth", });
                }, 100);
            };
        });
    });
  
    
};

toggleLogic();

function closeNav() {
    ul.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
};

/* scroll to top button logic */

window.addEventListener("scroll", () => {
    const scrollPosition = scrollY;
    if (scrollPosition > 1500) {
        scrollBtn.classList.add("show")
    } else {
        scrollBtn.classList.remove("show");
    };
})
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth", }); 
});