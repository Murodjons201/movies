"use strict";

let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elForm = document.querySelector(".form");
let elSelect = document.querySelector(".select");
let elInput = document.querySelector(".input__search");
let elBookmarkList = document.querySelector(".bookmark__list");
let elBookmarkImgCard = document.querySelector(".bookmark-img");
let elBookmarkIcon = document.querySelector(".bookmark__icon");
let elOverlay = document.querySelector(".overlay");
let elBookmarkCounter = document.querySelector(".bookmark-counter");
let elMoreInfoClose = document.querySelector(".more__info__close");
let elMoreInfoCloseBtn = document.querySelector(".more-info-close");
let elMoreInfoHeading = document.querySelector(".more__info-heading");
let elMoreInfoDesk = document.querySelector(".more__info-deck");

elResult.textContent = films.length;

let addHidden = function () {
  elBookmarkList.classList.add("hidden");
  elOverlay.classList.add("hidden");
};

//REMOVE FUNCTION:
let removeHidden = function () {
  elBookmarkList.classList.remove("hidden");
  elOverlay.classList.remove("hidden");
};

//REMOVE CLICK:
elBookmarkImgCard.addEventListener("click", removeHidden);

//ADD CLICK:
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    addHidden();
  }
});

elOverlay.addEventListener("click", addHidden);

elMoreInfoCloseBtn.addEventListener("click", addHidden);

elMoreInfoClose.addEventListener("click", addHidden);

//bookmarks ni aylanib chiqib listga chiqarish:
const renderBookmarks = function (filmArr, element) {
  filmArr.forEach((film) => {
    //CREATE ELEMENT:
    let newBookmarkItem = document.createElement("li");
    let newBookmarkCard = document.createElement("div");
    let newbookmarkImg = document.createElement("img");
    let newbookmarkCardBody = document.createElement("div");
    let newbookmarkTitle = document.createElement("h6");
    let newBookmarkRemove = document.createElement("button");

    //SET ATTRIBUTE
    newBookmarkItem.setAttribute("class", "boolmark__item");
    newBookmarkCard.setAttribute("class", "bookmark__item-card");
    newbookmarkImg.setAttribute("class", "bookmark-img-top");
    newbookmarkImg.setAttribute("src", film.poster);
    newbookmarkCardBody.setAttribute("class", "bookmark-card-body");
    newbookmarkTitle.setAttribute("class", "bookmark-card-title");
    newBookmarkRemove.setAttribute(
      "class",
      "bookmark-remove-btn btn btn-primary"
    );

    //DATASET:
    newBookmarkRemove.dataset.removeBtnId = film.id;

    //TEXTCONTENT:
    newbookmarkTitle.textContent = film.title;
    newBookmarkRemove.textContent = "Remove";

    //APPENDCHAILD:
    element.appendChild(newBookmarkItem);
    newBookmarkItem.appendChild(newBookmarkCard);
    newBookmarkCard.appendChild(newbookmarkImg);
    newBookmarkCard.appendChild(newbookmarkCardBody);
    newbookmarkCardBody.appendChild(newbookmarkTitle);
    newbookmarkCardBody.appendChild(newBookmarkRemove);
  });
};

//bookmakArray:
let localBookmarks = JSON.parse(window.localStorage.getItem("localBookmark"));

const bookmarks = localBookmarks || [];

renderBookmarks(bookmarks, elBookmarkList);

elBookmarkCounter.textContent = bookmarks.length;

//removebtn:
elBookmarkList.addEventListener("click", function (evt) {
  const isBookmarkRemoveBtn = evt.target.matches(".bookmark-remove-btn");

  if (isBookmarkRemoveBtn) {
    const bookmarkRemoveBtnId = evt.target.dataset.removeBtnId;

    const bookmarkReoveFilm = bookmarks.findIndex(
      (film) => film.id === bookmarkRemoveBtnId
    );

    bookmarks.splice(bookmarkReoveFilm, 1);

    elBookmarkList.innerHTML = null;

    if (bookmarks.length === 0) {
      elOverlay.classList.add("hidden");
    }

    window.localStorage.setItem("localBookmark", JSON.stringify(bookmarks));

    let localStorageremove = JSON.parse(
      window.localStorage.getItem("localBookmark")
    );

    if (localStorageremove.length === 0) {
      window.localStorage.removeItem("localBookmark");
    }

    renderBookmarks(bookmarks, elBookmarkList);

    elBookmarkCounter.textContent = bookmarks.length;
  }
});

//bookmark push film:
elList.addEventListener("click", function (evt) {
  const isBookmarkedBtn = evt.target.matches(".bookmark-btn");
  if (isBookmarkedBtn) {
    const bookmasrkBtnId = evt.target.dataset.bookmarkBtnId;
    const bookmarkFilm = films.find((film) => film.id === bookmasrkBtnId);

    if (!bookmarks.includes(bookmarkFilm)) {
      bookmarks.push(bookmarkFilm);

      elBookmarkList.innerHTML = null;

      window.localStorage.setItem("localBookmark", JSON.stringify(bookmarks));

      renderBookmarks(bookmarks, elBookmarkList);

      elBookmarkCounter.textContent = bookmarks.length;
    }
  }
});

if (bookmarks.length === 0 || localBookmarks.length === 0) {
  elOverlay.classList.add("hidden");
}

elList.addEventListener("click", function (evt) {
  const isMoreInfoBtn = evt.target.matches(".more-info-btn");
  if (isMoreInfoBtn) {
    const moreInfoBtnId = evt.target.dataset.moreInfoBtnId;
    const moreInfoFilm = films.find((film) => film.id === moreInfoBtnId);

    elMoreInfoHeading.textContent = moreInfoFilm.title;
    elMoreInfoDesk.textContent = moreInfoFilm.overview;

    elOverlay.classList.remove("hidden");

    console.log(moreInfoFilm.title);
  }
});

//renderFilms:
const renderFilms = function (filmsArray, element) {
  filmsArray.forEach((movie) => {
    //CREATE
    let newItem = document.createElement("li");
    let newCard = document.createElement("div");
    let newImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    let newCardBtns = document.createElement("div");
    let newMoreInfo = document.createElement("button");
    let newBookmark = document.createElement("button");

    //SET ATTRIBUTE
    newItem.setAttribute("class", "movies__item");
    newCard.setAttribute("class", "movies__item-card");
    newCard.style.width = "18rem";
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", movie.poster);
    newCardBody.setAttribute("class", "card-body");
    newCardTitle.setAttribute("class", "card-title");
    newCardBtns.setAttribute("class", "card-btns");
    newMoreInfo.setAttribute("class", "more-info-btn btn btn-primary");
    newMoreInfo.setAttribute("data-bs-toggle", "modal");
    newMoreInfo.setAttribute("data-bs-target", "#exampleModal");
    newBookmark.setAttribute("class", "bookmark-btn btn btn-danger");

    //DATASET:
    newMoreInfo.dataset.moreInfoBtnId = movie.id;
    newBookmark.dataset.bookmarkBtnId = movie.id;

    //TEXT CONTENT
    newCardTitle.textContent = movie.title;
    newMoreInfo.textContent = "More info";
    newBookmark.textContent = "Bookmark";

    //APPEND
    element.appendChild(newItem);
    newItem.appendChild(newCard);
    newCard.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardBtns);
    newCardBtns.appendChild(newMoreInfo);
    newCardBtns.appendChild(newBookmark);
  });
};

renderFilms(films, elList);

//elFormSubmit ga quloq sol:
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  elList.innerHTML = null;

  let elSelectValue = elSelect.value;

  let filteredFilms = films.filter(function (film) {
    return elSelectValue === "all" || film.genres.includes(elSelectValue);
  });

  renderFilms(filteredFilms, elList);
});

//generteGenres function genrelari buyicha izlash
const generateGenres = function (film) {
  const filteredGener = [];

  film.forEach(function (movies) {
    movies.genres.forEach(function (genre) {
      if (!filteredGener.includes(genre)) {
        filteredGener.push(genre);
      }
    });
  });

  filteredGener.forEach(function (genre) {
    let newGenre = document.createElement("option");
    newGenre.value = genre;
    newGenre.textContent = genre;
    elSelect.appendChild(newGenre);
  });

  return filteredGener;
};

generateGenres(films);

//filmlarni title bn izlash keyup:
elInput.addEventListener("keyup", function (evt) {
  evt.preventDefault();

  elList.innerHTML = null;

  let elInputValue = elInput.value;

  let elSearchFilms = films.filter(function (film) {
    return film.title.toLowerCase().includes(elInputValue.toLowerCase());
  });

  renderFilms(elSearchFilms, elList);
});
