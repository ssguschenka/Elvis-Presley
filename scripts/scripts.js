// СВАЙПЕР ДЛЯ КАРТОЧЕК ИГРОКОВ
const swiperTeam = new Swiper('.swiper-team', {
  slidesPerView: 3.5,
      spaceBetween: 60,

      navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

   
})

// ПЕРЕВОРАЧИВАЕМ КАРТОЧКИ ПО КЛИКУ 
const cardTeam = document.querySelectorAll('.card-inner');

cardTeam.forEach(card => {
  card.addEventListener('click', () => {
  card.classList.toggle('card-inner-final')
  card.classList.toggle('card-inner-start')
})
})



// СВАЙПЕР ДЛЯ БЛОКА ИСТОРИИ КЛУБА
const swiper = new Swiper('.history-cards', {
  
spaceBetween: 30,

   pagination: {
    el: ".swiper-pagination",
    clickable: true, // Точки можно нажимать
    dynamicBullets: true, // Динамические точки (удобно для большого количества слайдов)
  },

  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
