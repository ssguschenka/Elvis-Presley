
// ФУНКЦИИ ДЛЯ СМЕНЫ ТЕМ

const disk = document.querySelector(".frisbee-flip");  //контейнер диска
const html = document.documentElement;  //весь документ


// Получение значения атрибута data-theme 
// return - dark || light
function getTheme() {
  return (
    html.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark")
  );
}

// Функция смены темы
// @param{theme} - полученыый из getTheme()
function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

const diskRoll = document.querySelector(".frisbee-tails");  // Лицевая сторона диска
const diskRollReverce = document.querySelector(".frisbee-heads"); // Оборотная сторона диска

//  Анимациия диска и смена темы
disk.addEventListener("click", () => {
  disk.classList.add("frisbee-flip-animation"); // Подбрасывание ддиска вверх
  diskRoll.classList.add("heads-animation");  // Кручение лицевой стороны диска
  diskRollReverce.classList.add("tails-animation");  // Кручение оборотной стороны диска

  // Задержка, чтобы тема сменялась на верхней точке подбрасывания диска 
  setTimeout(function () {
    // При остановке анимации диск должен остановиться на противоположной стороне
    diskRollReverce.classList.toggle("frisbee-no-rotate"); 
    diskRollReverce.classList.toggle("frisbee-rotate"); 

    // Меняем тему и сразу же меняем изображеия на карточках игроков оттлкиваясь от новой темы
    const changedTheme = getTheme() === "light" ? "dark" : "light"
    setTheme(changedTheme);
    updateCardsBackgrounImage(changedTheme);
  }, 1000);
});

// Оставляем выбранную тему при перезагрузки страницы
window
  .matchMedia("(prefers-color-scheme : light)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "light" : "dark");
      
    }
  });

  // Ожидание конца анимаций диска
  //Удаление всех классов анимаций у диска - AnimationHandler()
disk.addEventListener("animationend", AnimationHandler, false);

function AnimationHandler() {
  disk.classList.remove("frisbee-flip-animation");
  diskRoll.classList.remove("heads-animation");
  diskRollReverce.classList.remove("tails-animation");
  disk.classList.remove("frisbee_shake-animation");
}


// Смена фона блока fresbee при прокрутке
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 1450 && scrollPosition < 2200) {
    document.body.style.backgroundColor = "var(--block-frisbee)";
    document.querySelector('.frisbee_title').style.filter = 'drop-shadow(5px 5px 1px var(--darck--accent-color))';
    document.querySelector('.frisbee_image_tasua').style.filter = 'drop-shadow(15px 15px 1px var(--darck--accent-color))';
    document.querySelector('.frisbee_image_masha').style.filter = 'drop-shadow(15px 2px 1px var(--darck--accent-color))';
    document.querySelectorAll('.frisbee_icon').forEach(elem => elem.style.filter = 'drop-shadow(5px 5px 1px var(--darck--accent-color))');
    document.querySelectorAll('.frisbee_text-container').forEach(elem => elem.style.boxShadow = '5px 5px 1px var(--darck--accent-color)');
  } else {
    document.body.style.backgroundColor = "var(--backround-color-body)";
    document.querySelector('.frisbee_title').style.filter = 'none';
    document.querySelector('.frisbee_image_tasua').style.filter = 'none';
    document.querySelector('.frisbee_image_masha').style.filter = 'none';
    document.querySelector('.frisbee_image_masha').style.filter = 'none';
    document.querySelectorAll('.frisbee_icon').forEach(elem => elem.style.filter = 'none');
    document.querySelectorAll('.frisbee_text-container').forEach(elem => elem.style.boxShadow = 'none');
  }
});

// Отрисовка карточек игроков
const cardsContainerUp = document.querySelector(".players-up");  //  Верхний контейнер карточек
const cardTemplateUp = document.querySelector("#card-template-up").content;  // Шаблон карточки

const cardsContainerDown = document.querySelector(".players-down");  //  Нижний контейнер карточек
const cardTemplateDown = document.querySelector("#card-template-down").content;  // Шаблон карточки


//  Функция отрисовки карточек
// @param{data, cloneCard} - 
// data - обьект c информацией об игроке, поученный из json-файла 
// cloneCard - шаблон карточки 
// return - cloneCards - отрисованная карточка по шаблону
function createCards(data, cloneCard) {
  const cloneCards = cloneCard.cloneNode(true).firstElementChild; //получили карточку
  const current = getTheme();  //получили тему
  cloneCards.dataset.image = data.image;
  cloneCards.dataset.imageLight = data.imageLight;
  const front = cloneCards.querySelector(".card_front");

  if (current === 'light') {
    front.style.backgroundImage = "url(" + data.imageLight + ")";
  } else {
    front.style.backgroundImage = "url(" + data.image + ")";
  }

  const number = cloneCards.querySelector(".card_back-number");
  number.textContent = data.number;

  // ПЕРЕВОРАЧИВАЕМ КАРТОЧКИ ПО КЛИКУ
  // const cardTeam = cloneCards.querySelectorAll(".card-inner");
  // cardTeam.forEach((card) => {
  //   card.addEventListener("click", () => {
  //     card.classList.toggle("card-inner-final");
  //     card.classList.toggle("card-inner-start");
  //   });
  // });
  return cloneCards;
}

//Обновление карточек при смене темы - меняем фоновое изображение у карточки игрорка
function updateCardsBackgrounImage(theme) {
  document.querySelectorAll(".card").forEach((card) => {
    const front = card.querySelector(".card_front");

    if (!front) return;

    if (theme === "light") {
      front.style.backgroundImage = `url(${card.dataset.imageLight})`;
    } else {
      front.style.backgroundImage = `url(${card.dataset.image})`;
    }
  });
}


let playersArrUp = [];  // Массив карточек игроков из верхнего ряда
let playersArrDown = [];  // Массив карточек игроков из нижнего ряда

 //  Получение массива с игроками
 // Создание и добавление в контейнеры карточек для каждого элемента массива
 // Создание свайпера для карточек игроков
fetch("players-data.json") //  Поиск файла
  .then((response) => response.json()) //  Загрузка
  .then((data) => {
    const middleIndex = Math.floor(data.length / 2);  //Делим полученный массив пополам
    
    playersArrUp = data.slice(0, middleIndex);  // Добавляем в массив первую половину полученных обьектов

    playersArrUp.forEach((elem) => {   
      cardsContainerUp.append(createCards(elem, cardTemplateUp));
    });

    playersArrDown = data.slice(middleIndex);  // Добавляем в массив оставшуюся половину полученных обьектов
    playersArrDown.forEach((elem) => {
      cardsContainerDown.append(createCards(elem, cardTemplateDown));
    });

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
        },
      },

      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
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


