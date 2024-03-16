const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements //

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileEditCloseButton = profileEditModal.querySelector("#close-button");
const profileDesc = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescInput = document.querySelector("#profile-desc-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const cardAddModal = document.querySelector("#add-image-modal");
const cardAddButton = document.querySelector("#image-add-button");
const cardAddCloseButton = cardAddModal.querySelector("#close-button");
const cardAddForm = cardAddModal.querySelector("#card-add-form");
const photoPreviewModal = document.querySelector("#image-preview-modal");
const photoPreviewModalCloseButton = photoPreviewModal.querySelector("#close-button");


// Functions //

function openModal(modal){
  modal.classList.add("modal_opened");
}

function closeModal(modal){
  modal.classList.remove("modal_opened");
}

function submitForm(event) {
    event.preventDefault();
    profileDesc.textContent = profileDescInput.value;
    profileTitle.textContent = profileTitleInput.value;
    closeModal(profileEditModal);
}

function renderCard(cardEl, container){
  container.prepend(cardEl);
}

function getCardView(cardData){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.alt = cardData.name;
  cardImageElement.src = cardData.link;
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = cardData.name;

  // add event listener for card like button
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle("liked");
  });

  // add event listener for card delete button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener('click', ()=>{
    cardElement.remove();
  });

  // modal popout for the card image when clicked
  cardImageElement.addEventListener('click', ()=>{
     
  });

  // create click event for preview modal
  cardImageElement.addEventListener('click', (e)=> {

    const photoPreviewImage = photoPreviewModal.querySelector("#preview-picture");
    const photoPreviewName = photoPreviewModal.querySelector(".preview__name");
    photoPreviewImage.src = e.target.src;
    photoPreviewName.textContent = e.target.alt;
    photoPreviewModal.classList.add("modal_opened");
  })


  return cardElement;
}

// Initializer //

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});


// Event Listeners //

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescInput.value = profileDesc.textContent;
});

cardAddButton.addEventListener("click", () => {
  openModal(cardAddModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

cardAddCloseButton.addEventListener("click", () => {
  closeModal(cardAddModal);
});

photoPreviewModalCloseButton.addEventListener("click", () => {
  closeModal(photoPreviewModal);
});

profileEditForm.addEventListener("submit", submitForm);

cardAddForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({
    name: name,
    link: link,
  });
  renderCard(cardView, cardListElement);
  closeModal(cardAddModal);
});



