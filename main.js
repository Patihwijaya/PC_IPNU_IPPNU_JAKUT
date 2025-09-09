// navbar
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-white", "shadow-md");
  } else {
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("bg-white", "shadow-md");
  }
});

// caraousel
const caraousel = document.getElementById("caraousel");
const slides = caraousel.children;
const dots = document.querySelectorAll(".dot");
let index = 0;

function updateCarousel() {
  caraousel.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-white", i === index);
    dot.classList.toggle("bg-white/50", i !== index);
  });
}

function next() {
  index = (index + 1) % slides.length;
  updateCarousel();
}
function prev() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
});

// auto play
updateCarousel();
setInterval(next, 4000); // Geser otomatis setiap 4 detik
// akhir caraousel

// hamburger
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", function () {
  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("animate-slideDown");
  } else {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("animate-slideDown");
  }
});
// akhir hamburger

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scroll-container");
  const track = document.getElementById("track");

  // Gandakan isi track biar loop-nya seamless (tanpa loncat terlihat)
  track.innerHTML += track.innerHTML;

  let speed = 1.0; // px per frame (atur sesuai selera)
  let rafId = null;

  function loop() {
    container.scrollLeft += speed;

    // kalau sudah lewat setengah lebar (karena digandakan), reset ke awal
    const half = track.scrollWidth / 2;
    if (container.scrollLeft >= half) {
      container.scrollLeft = 0;
    }

    rafId = requestAnimationFrame(loop);
  }

  // mulai animasi
  loop();

  // pause saat hover, lanjut saat keluar (biar user bisa baca)
  container.addEventListener("mouseenter", () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
  container.addEventListener("mouseleave", () => {
    loop();
  });
});
