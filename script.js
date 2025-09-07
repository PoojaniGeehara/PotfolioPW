function humburg() {
  document.getElementById("mobileMenu").style.top = "50px"; // show dropdown
}

function cancel() {
  document.getElementById("mobileMenu").style.top = "-500px"; // hide dropdown
}


document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed(".writer-text" , {

        strings: ["Developer","Programmer",
    "System Analysis" ,
    "DataBase"],
    typeSpeed :100,
    backSpeed:100,
    backDelay:1000,
    loop: true

    });
});