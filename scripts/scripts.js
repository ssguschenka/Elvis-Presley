//  АНИМАЦИЯ ДИСКА ПРИ КЛИКЕ
const disk = document.querySelector(".frisbee-flip");
const theme = document.documentElement;
const diskRoll = document.querySelector(".frisbee-tails");
const diskRollReverce = document.querySelector(".frisbee-heads");
disk.addEventListener("click", () => {
  disk.classList.add("frisbee-flip-animation");
  diskRoll.classList.add("heads-animation");
  diskRollReverce.classList.add("tails-animation");
  setTimeout(function () {
    diskRollReverce.classList.toggle("frisbee-no-rotate");
    diskRollReverce.classList.toggle("frisbee-rotate");
    theme.classList.toggle("theme-light");
    theme.classList.toggle("theme-dark");
  }, 1000);

  // if (theme.hasAttribute('theme')) {
  //     theme.removeAttribute('theme');
  //     localStorage.removeItem('theme');
  //   } else {
  //     theme.setAttribute('theme', 'theme-ligh');
  //     localStorage.setItem('theme', 'theme-ligh');
  //   }
});

disk.addEventListener("animationend", AnimationHandler, false);

function AnimationHandler() {
  disk.classList.remove("frisbee-flip-animation");
  diskRoll.classList.remove("heads-animation");
  diskRollReverce.classList.remove("tails-animation");
}

// document.addEventListener('DOMContentLoaded', () => {
//   const element = document.querySelector('.frisbee-flip-shake');
//   // Убедимся, что анимация не начнётся, если класс уже есть,
//   // и уберем его, чтобы можно было повторно запустить (если нужно)
//   element.classList.remove('frisbee-flip-shake');
//   // Добавим его снова, чтобы запустить анимацию
//   // Можно добавить задержку, если нужно подождать, пока браузер отрисует элемент
//   requestAnimationFrame(() => {
//       element.classList.add('frisbee-flip-shake');
//   });
// });

const mediaQuery = window.matchMedia("(width <= 548px)");

// СВАЙПЕР ДЛЯ КАРТОЧЕК ИГРОКОВ
const swiperTeam = new Swiper(".swiper-team", {
  slidesPerView: 3,
  spaceBetween: 60,

  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    458: {
      slidesPerView: 2,
      spaceBetween: 30,
    }, 
    500: {
      slidesPerView: 2.4,
      spaceBetween: 40,
    },
    780: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 60,
    }
  },

  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ПЕРЕВОРАЧИВАЕМ КАРТОЧКИ ПО КЛИКУ
const cardTeam = document.querySelectorAll(".card-inner");

cardTeam.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("card-inner-final");
    card.classList.toggle("card-inner-start");
  });
});

// СВАЙПЕР ДЛЯ БЛОКА ИСТОРИИ КЛУБА
const swiper = new Swiper(".history-cards", {
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    clickable: true, // Точки можно нажимать
    dynamicBullets: true, // Динамические точки (удобно для большого количества слайдов)
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
