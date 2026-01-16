// Инициализация Swiper
const swiper = new Swiper('.swiper', {
  
spaceBetween: 30,
  // If we need pagination
   pagination: {
    el: ".swiper-pagination",
    clickable: true, // Точки можно нажимать
    dynamicBullets: true, // Динамические точки (удобно для большого количества слайдов)
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  
});