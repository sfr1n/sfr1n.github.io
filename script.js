const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextSlide");
const prevBtn = document.getElementById("prevSlide");
const dotsContainer = document.getElementById("dots");

let current = 0;
let autoSlideInterval;
let isTransitioning = false;

/* ================= CREATE DOTS ================= */
slides.forEach((_, i) => {
const dot = document.createElement("span");
dot.classList.add("dot");

if(i === 0) dot.classList.add("active");

dot.addEventListener("click", () => {
goToSlide(i);
restartAutoSlide();
});

dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

/* ================= CORE FUNCTIONS ================= */

function showSlide(index){

if(isTransitioning) return;
isTransitioning = true;

slides.forEach(s => s.classList.remove("active"));
dots.forEach(d => d.classList.remove("active"));

slides[index].classList.add("active");
dots[index].classList.add("active");

setTimeout(()=> isTransitioning = false, 800);
}

function nextSlide(){
current = (current + 1) % slides.length;
showSlide(current);
}

function prevSlide(){
current = (current - 1 + slides.length) % slides.length;
showSlide(current);
}

function goToSlide(index){
current = index;
showSlide(current);
}

/* ================= AUTO SLIDE ================= */

function startAutoSlide(){
autoSlideInterval = setInterval(nextSlide, 7000);
}

function stopAutoSlide(){
clearInterval(autoSlideInterval);
}

function restartAutoSlide(){
stopAutoSlide();
startAutoSlide();
}

/* ================= IMAGE FULLSCREEN MODAL ================= */

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("imgModalContent");
const closeModal = document.querySelector(".img-close");

/* Make ALL work images clickable */
document.querySelectorAll(".work-grid img").forEach(img => {

img.addEventListener("click", () => {
modal.style.display = "flex";
modalImg.src = img.src;
});

});

/* Close when X clicked */
closeModal.addEventListener("click", () => {
modal.style.display = "none";
});

/* Close when clicking background */
modal.addEventListener("click", (e) => {
if(e.target === modal){
modal.style.display = "none";
}
});

/* Close with ESC key */
document.addEventListener("keydown", (e) => {
if(e.key === "Escape"){
modal.style.display = "none";
}
});


/* ================= EVENTS ================= */

if(nextBtn){
nextBtn.addEventListener("click", ()=>{
nextSlide();
restartAutoSlide();
});
}

if(prevBtn){
prevBtn.addEventListener("click", ()=>{
prevSlide();
restartAutoSlide();
});
}

/* ================= HOVER PAUSE ================= */

const slider = document.querySelector(".slider");

if(slider){
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);
}

/* ================= TAB VISIBILITY PAUSE ================= */

document.addEventListener("visibilitychange", () => {
if(document.hidden){
stopAutoSlide();
}else{
startAutoSlide();
}
});

/* ================= TOUCH SWIPE (MOBILE PRO FEATURE) ================= */

let touchStartX = 0;
let touchEndX = 0;

if(slider){

slider.addEventListener("touchstart", e=>{
touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", e=>{
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

}

function handleSwipe(){
if(touchEndX < touchStartX - 50){
nextSlide();
restartAutoSlide();
}

if(touchEndX > touchStartX + 50){
prevSlide();
restartAutoSlide();
}
}

/* ================= INIT ================= */

startAutoSlide();

const loadingScreen = document.querySelector(".loading-screen");

window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.opacity = "0";

    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 9000);
});
