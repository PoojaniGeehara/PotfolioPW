
const mobileMenu = document.getElementById("mobileMenu");
const hamburg = document.querySelector(".hamburg");
const cancelBtn = document.querySelector(".cancel");

hamburg.addEventListener("click", () => {
    mobileMenu.style.top = "70px";
});

cancelBtn.addEventListener("click", () => {
    mobileMenu.style.top = "-500px"; 
});


document.querySelectorAll(".dropd .links a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.style.top = "-500px";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    new Typed(".writer-text", {
        strings: ["Developer", "Programmer", "System Analyst", "Database Specialist"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });
});


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
