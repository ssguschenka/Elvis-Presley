//  АНИМАЦИЯ ДИСКА ПРИ КЛИКЕ
const disk = document.querySelector('.frisbee-flip');
const diskRoll = document.querySelector('.frisbee-tails');
const diskRollReverce = document.querySelector('.frisbee-heads')
disk.addEventListener('click', () => {
  disk.classList.add('frisbee-flip-animation');
  diskRoll.classList.add('heads-animation');
  diskRollReverce.classList.add('tails-animation');
  setTimeout(function() {
  diskRollReverce.classList.toggle('frisbee-no-rotate');
  diskRollReverce.classList.toggle('frisbee-rotate');
  }, 1500)
  
})

disk.addEventListener("animationend", AnimationHandler, false);

function AnimationHandler () {
  disk.classList.remove('frisbee-flip-animation');
   diskRoll.classList.remove('heads-animation');
  diskRollReverce.classList.remove('tails-animation');
}


document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.frisbee-flip-shake');
  // Убедимся, что анимация не начнётся, если класс уже есть,
  // и уберем его, чтобы можно было повторно запустить (если нужно)
  element.classList.remove('frisbee-flip-shake');
  // Добавим его снова, чтобы запустить анимацию
  // Можно добавить задержку, если нужно подождать, пока браузер отрисует элемент
  requestAnimationFrame(() => {
      element.classList.add('frisbee-flip-shake');
  });
});








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
  card.classList.toggle('card-inner-final');
  card.classList.toggle('card-inner-start');
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
