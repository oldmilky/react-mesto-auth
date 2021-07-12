// Переменные редактирования профиля
const popupEditWrap = document.querySelector('.popup_type_edit');
const popupButton = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__information');
const popupForm = document.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_name_name');
const popupJob = document.querySelector('.popup__input_name_profession');
const popupEditSaveButton = popupEditWrap.querySelector('.popup__button-save');
const popupEditSelector = '.popup_type_edit';
const popupEditCloseButtonSelector = '.popup__button-close';
const profileSelectors = {
    profileNameSelector: '.profile__name', 
    profileProfessionSelector: '.profile__information',
    profileAvatarSelector: '.popup_type_avatar',
    profileUserAvatarSelector: '.profile__avatar'
  }
const userId = '2418718154fcc07d77175ad9'
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const nameInput = popupEditWrap.querySelector('.popup__input_name_name');
const professionInput = popupEditWrap.querySelector('.popup__input_name_profession');

// Переменные редактирования аватара
const avatarImage = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarButton = document.querySelector('.profile__avatar-wrapp');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const popupAvatarInput = popupAvatar.querySelector('.popup__input_name_link-avatar');
const popupAvatarSubmitButton = popupAvatar.querySelector('.popup__button-save');
const popupAvatarCloseButton = '.popup__button-close';

// Переменные добавляния карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddSaveButton = popupAdd.querySelector('.popup__button-save');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddSelector = '.popup_type_add';
const popupAddCloseButtonSelector = '.popup__button-close';
const gridCardTemplateId = '#grid-template';

// Попап подтверждения
const popupConfirmSelector = '.popup_type_confirm';
const popupDeleteIcon = document.querySelector('.grid-item__delete-icon');

// Попап картинки при нажатии
const popupFullImage = document.querySelector('.popup_type_image');
const popupImageSelector = '.popup_type_image';
const popupImageCloseButtonSelector = '.popup__button-close';
const imageSelector = '.popup__image';
const popupImageTitleSelector = '.popup__title-image';
const popupFullImageImage = popupFullImage.querySelector('.popup__image');
const popupFullImageTitle = popupFullImage.querySelector('.popup__title-image');
const popupFullImageClose = popupFullImage.querySelector('.popup__button-close');

// Переменные картинки
const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

const photoCard = document.querySelector('.grid-places');

const openedPopup = document.querySelector('.popup_opened');

const escKeyCode = 27;

const inputErrorSelector = '.popup__input-error';

export {
    popupEditWrap,
    popupButton,
    popupButtonClose,
    profileName,
    profileJob,
    popupForm,
    popupName,
    popupJob,
    popupEditSaveButton,
    popupAdd,
    popupAddButton,
    popupAddButtonClose,
    popupAddForm,
    popupAddSaveButton,
    popupFullImage,
    popupFullImageImage,
    popupFullImageTitle,
    popupFullImageClose,
    titleCardInput,
    linkCardInput,
    photoCard,
    openedPopup,
    popupImageSelector,
    popupImageCloseButtonSelector,
    imageSelector,
    popupImageTitleSelector,
    escKeyCode,
    profileSelectors,
    popupEditOpenButton,
    nameInput,
    professionInput,
    popupEditSelector,
    popupEditCloseButtonSelector,
    popupAddOpenButton,
    popupAddSelector,
    popupAddCloseButtonSelector,
    inputErrorSelector,
    avatarImage,
    popupAvatar,
    popupAvatarButton,
    popupAvatarForm,
    popupAvatarInput,
    popupAvatarSubmitButton,
    popupAvatarCloseButton,
    popupConfirmSelector,
    popupDeleteIcon,
    userId,
    gridCardTemplateId
};