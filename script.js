"use strict"
const uL = document.querySelector("#navLinks");
const navMenuBtn = document.querySelector("#navMenuBtn");
const navLinks = document.querySelectorAll("nav a");
const destinationCards = document.querySelectorAll(".destinationCard");
const scrollBtn = document.querySelector("#scrollBtn");
const mysections = document.querySelectorAll(".mysection");
const img = document.querySelector("#personimg");
const prevbtn = document.querySelector("#prevbtn");
const nextbtn = document.querySelector("#nextbtn");
const author = document.querySelector("#personname");
const job = document.querySelector("#job");
const info = document.querySelector("#comment");
 const reviews = [
    {
        id: 1,
        name: 'Alex Starnes',
        job: 'Exceptional Service and Stress-Free Travel!',
        img : 'imagesjs/alex-starnes-WYE2UhXsU1Y-unsplash.webp',
        text: "I travel a lot for work, and I’ve used plenty of concierge services over the years, but this one stands out! From the moment I reached out for assistance, the team was professional, courteous, and incredibly efficient. They arranged my taxi rides in a matter of minutes, and I didn't have to deal with any of the usual airport chaos.I’ll be using them again for all my future trips!",
    },
    {
        id: 2,
        name: "jurica-koletic",
        job: "A Perfect Travel Experience from Start to Finish!",
        img: "imagesjs/jurica-koletic-7YVZYZeITc8-unsplash.webp",
        text: "I booked this travel service for an upcoming international trip, and I can’t recommend them enough! The travel arrangements were seamless — from flights to the private taxi rides between the airport and my hotel, everything was handled with such attention to detail. I felt completely taken care of and would absolutely trust them for all my future trips.",
    },
    {
        id: 3,
        name: "Ronny Sison",
        job: "Great Service with Minor Hiccups",
        img: "imagesjs/ronny-sison-4lnzxFIgTmg-unsplash.webp",
        text: "Overall, I was really happy with the  service. The taxi rides were punctual, and the drivers were professional. The team did a great job securing my visa and helping me navigate some tricky paperwork for my business trip. However, there was a slight delay with my pickup on the return leg of the trip, which caused a little bit of stress. That said, the customer service team handled the situation quickly and apologized.",
    },
    {
        id: 4,
        name: "Ryan Hoffman",
        job: "Impressive, Reliable, and So Convenient!",
        img: "imagesjs/ryan-hoffman-Ft4p5E9HjTQ-unsplash.webp",
        text: "I can’t believe how much easier this company made my trip! I was planning a vacation and had no idea where to begin when it came to logistics. I contacted them, and they handled everything — from booking a private taxi to getting my visa sorted quickly and without stress. Their communication was always prompt, and I felt supported throughout the entire experience. 100% will use them again.",
    },
    {
        id: 5,
        name: "Troy Spoelma",
        job: "Convenient, But Room for Improvement",
        img: "imagesjs/troy-spoelma-3paKXHWzsDw-unsplash.webp",
        text: "I was really impressed with the easy travel  service overall. They handled all my taxi arrangements perfectly. However, I would’ve appreciated more proactive communication about some of the logistics — for instance, I wasn’t kept in the loop on some of the details of my visa processing, which caused a bit of confusion. Still, I’d definitely use this service again and would recommend it to others.",
    },
]

let initialItem = 0;
//load initial item on page load
window.addEventListener("DOMContentLoaded", () => {
    const item = reviews[initialItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
    console.log(`item is: ${item} + ${initialItem}`)
});
// show person item
function showPerson(person) {
    const item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
    console.log(`person is: ${person}`)
};
prevbtn.addEventListener("click", () => {
    initialItem--;
    if (initialItem < 0) {
        initialItem = reviews.length - 1;
    }
    showPerson(initialItem)
});
nextbtn.addEventListener('click', (e) => {
    initialItem++;
    if (initialItem > reviews.length - 1) {
        initialItem = 0;
    };
    showPerson(initialItem);
    console.log(initialItem)

})



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
/*         console.log("Observing:", entry.target.className, entry.isIntersecting); // ✅ debug
 */        if (entry.isIntersecting) {
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
 
