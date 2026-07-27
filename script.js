/* ==========================================================
   Zee Links Corporate Edition
   script.js Part 1
   ========================================================== */


document.addEventListener("DOMContentLoaded",()=>{


/* =========================
   LOADER
========================= */


const loader=document.getElementById("loader");


window.addEventListener("load",()=>{


setTimeout(()=>{


if(loader){

loader.style.opacity="0";

loader.style.visibility="hidden";

}


},700);


});






/* =========================
   THEME TOGGLE
========================= */


const themeBtn=
document.getElementById("themeToggle");


if(themeBtn){


const savedTheme=
localStorage.getItem("zee-theme");


if(savedTheme==="light"){

document.body.classList.add("light");

updateThemeIcon();

}



themeBtn.addEventListener("click",()=>{


document.body.classList.toggle("light");



if(document.body.classList.contains("light")){


localStorage.setItem(
"zee-theme",
"light"
);


}

else{


localStorage.setItem(
"zee-theme",
"dark"
);


}



updateThemeIcon();


});


}



function updateThemeIcon(){


if(!themeBtn)return;


if(document.body.classList.contains("light")){


themeBtn.innerHTML=
'<i class="fa-solid fa-sun"></i>';


}

else{


themeBtn.innerHTML=
'<i class="fa-solid fa-moon"></i>';


}


}







/* =========================
   MOBILE MENU
========================= */


const menuBtn=
document.getElementById("menuBtn");


let mobileMenu=
document.querySelector(".mobile-menu");



if(!mobileMenu){


mobileMenu=
document.createElement("div");


mobileMenu.className=
"mobile-menu";



mobileMenu.innerHTML=`

<a href="#">Home</a>

<a href="#services">Services</a>

<a href="#products">Products</a>

<a href="#brands">Brands</a>

<a href="#tools">Tools</a>

<a href="#contact">Contact</a>

`;



document.body.appendChild(mobileMenu);


}



if(menuBtn){


menuBtn.addEventListener("click",()=>{


mobileMenu.classList.toggle("active");


mobileMenu.style.display =
mobileMenu.classList.contains("active")
?
"flex"
:
"none";


});


}






/* =========================
   SMOOTH SCROLL
========================= */


document
.querySelectorAll('a[href^="#"]')
.forEach(link=>{


link.addEventListener("click",function(e){


const target=
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


if(mobileMenu){

mobileMenu.style.display="none";

}


}


});


});






/* =========================
   SCROLL TOP
========================= */


const scrollBtn=
document.getElementById("scrollTop");



window.addEventListener("scroll",()=>{


if(scrollBtn){


if(window.scrollY>500){


scrollBtn.style.display="flex";


}

else{


scrollBtn.style.display="none";


}


}


});



if(scrollBtn){


scrollBtn.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


};


}



});

/* ==========================================================
   Zee Links Corporate Edition
   script.js Part 2
   ========================================================== */


/* =========================
   SCROLL REVEAL ANIMATION
========================= */


const revealElements =
document.querySelectorAll(
".service-card, .product-card, .brand-card, .tool-card, .testimonial-card, .gallery img"
);



const revealObserver =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


}


});


},{
threshold:0.15
});



revealElements.forEach(element=>{


element.classList.add("fade-up");


revealObserver.observe(element);


});







/* =========================
   TOAST MESSAGE
========================= */


function showToast(message){


const toast =
document.getElementById("toast");



if(!toast)return;



toast.textContent=message;


toast.classList.add("show");



setTimeout(()=>{


toast.classList.remove("show");


},3000);


}







/* =========================
   WHATSAPP QUOTE SYSTEM
========================= */


const whatsappButtons =
document.querySelectorAll(
".whatsapp-btn, .floating-whatsapp"
);



whatsappButtons.forEach(button=>{


button.addEventListener("click",(e)=>{


let phone="92XXXXXXXXXX";


let message=
"Hello Zee Links,%0A%0A"+
"I need information about CCTV / Networking services.%0A%0A"+
"Please contact me.";



let url=
"https://wa.me/"
+
phone
+
"?text="
+
message;



button.href=url;



});


});







/* =========================
   CONTACT QUICK MESSAGE
========================= */


const contactLinks =
document.querySelectorAll(
".facebook-btn"
);



contactLinks.forEach(link=>{


link.addEventListener("click",()=>{


showToast(
"Opening Zee Links Facebook page..."
);


});


});







/* =========================
   SERVICE CARD CLICK
========================= */


document
.querySelectorAll(".service-card")
.forEach(card=>{


card.addEventListener("click",()=>{


let service =
card.querySelector("h3")
.innerText;



showToast(
service+" selected"
);



});


});







/* =========================
   IMAGE ERROR HANDLING
========================= */


document
.querySelectorAll("img")
.forEach(img=>{


img.addEventListener("error",()=>{


img.style.display="none";


});


});







/* =========================
   CURRENT YEAR UPDATE
========================= */


const year =
document.querySelector(".copyright");



if(year){


year.innerHTML =
year.innerHTML.replace(
"2026",
new Date().getFullYear()
);


}

/* ==========================================================
   Zee Links Corporate Edition
   script.js Part 3 (Final)
   ========================================================== */


/* =========================
   PWA SERVICE WORKER
========================= */


if("serviceWorker" in navigator){


window.addEventListener("load",()=>{


navigator.serviceWorker
.register("sw.js")


.then(()=>{


console.log(
"Zee Links PWA Service Worker Active"
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





/* =========================
   LAZY IMAGE LOADING
========================= */


document
.querySelectorAll("img")
.forEach(image=>{


image.setAttribute(
"loading",
"lazy"
);


});







/* =========================
   EXTERNAL LINK SECURITY
========================= */


document
.querySelectorAll(
'a[target="_blank"]'
)
.forEach(link=>{


link.setAttribute(
"rel",
"noopener noreferrer"
);


});







/* =========================
   DISABLE EMPTY LINKS
========================= */


document
.querySelectorAll('a[href="#"]')
.forEach(link=>{


link.addEventListener("click",(e)=>{


e.preventDefault();


});


});







/* =========================
   ONLINE STATUS
========================= */


window.addEventListener(
"offline",
()=>{


showToast(
"No Internet Connection"
);


});



window.addEventListener(
"online",
()=>{


showToast(
"Internet Connection Restored"
);


});







/* =========================
   CONSOLE BRANDING
========================= */


console.log(`

====================================

        Zee Links

 Technology • Security • Networking

        Corporate Edition

====================================

`);