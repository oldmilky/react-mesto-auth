import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import registrationOk from '../images/registration-ok.svg';
import registrationNoOK from '../images/login-fail.svg';
import * as auth from '../utils/auth';
import Login from './Login';
const escapeHtml = require('escape-html');

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState();
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState({ iconPath: '', text: '' });
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    api.getUserInfo().then(data => setCurrentUser(data))
    .catch(error => api.errorHandler(error));
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipContent({iconPath, text}) {
    setMessage({ iconPath: iconPath, text: text })
  }

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser({name, about}) {
    api.editUserInfo(name, about).then(() => {
      const updatedUser = { ...currentUser };
        updatedUser.name = name;
        updatedUser.about = about;

        setCurrentUser({ ...updatedUser });
      setIsEditProfilePopupOpen(false);
    })
    .catch(error => api.errorHandler(error));
  }

  function handleUpdateAvatar({avatar}) {
    api.editUserAvatar(avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      setIsEditAvatarPopupOpen(false);
    })
    .catch(error => api.errorHandler(error));
  }

  React.useEffect(() => {
    api.getInitialCards().then(cardList => {
      setCards(cardList);
    })
    .catch(error => api.errorHandler(error))
  }, []);

  // ????????????????
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    // ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    const changeLike = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id)
    changeLike.then((newCard) => {
      // ?????????????????? ?????????? ???????????? ???? ???????????? ????????????????????, ???????????????????? ?? ???????? ?????????? ????????????????
      // const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // // ?????????????????? ??????????
      // setCards(newCards);
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(error => api.errorHandler(error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch(error => api.errorHandler(error));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link).then((card) => {
      setCards([card, ...cards]);
      setIsAddPlacePopupOpen(false);
    })
    .catch(error => api.errorHandler(error));
  }

  useEffect(() => {
    function hadleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', hadleEscClose);
    return () => {
      document.removeEventListener('keydown', hadleEscClose);
    }
  }, []);

  // ??????????????????????

  function registration(email, password) {
    auth.register(escapeHtml(email), password)
    .then(() => {
        handleInfoTooltipContent({iconPath: registrationOk, text: '???? ?????????????? ????????????????????????????????????!'})
        handleInfoTooltipPopupOpen();
        // ???????????????????????????? ???? ???????????????? ???????????? ???????????? 3?????? ?? ?????????????????? ??????????
        setTimeout(history.push, 3000, "/sign-in");
    }).catch((err)=> {
      handleInfoTooltipContent({iconPath: registrationNoOK, text: '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.'})
      handleInfoTooltipPopupOpen();
      console.log(err)
    })
  }  

  // ?????????????????????? 
  
  function authorization(email, password) {
    auth.authorize(escapeHtml(email), password )
    .then((data) => {
      setEmail(email);
      if (!data) {
        throw new Error('?????????????????? ????????????');
      }
      // auth.getContent(data)
      //   .then((res) => {
      //     setEmail(res.data.email);
      //   }).catch(err => console.log(err));
        setLoggedIn(true)
        handleInfoTooltipContent({iconPath: registrationOk, text: '???? ?????????????? ????????????????????????????!'})
        handleInfoTooltipPopupOpen()
        // ???????????????????????????? ???? ?????????????? ???????????????? ???????????? 3?????? ?? ?????????????????? ??????????
        history.push("/");
    }).catch((err) => {
      handleInfoTooltipContent({iconPath: registrationNoOK, text: '?????? ???? ?????????? ???? ??????!'})
      handleInfoTooltipPopupOpen();
      console.log(err)
    })
  }

    // ?????????? ???? ????????????
    function handleSignOut() {
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      setEmail('');
      history.push('/sign-in');
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} handleSignOut={handleSignOut} />
        <Switch>

        {currentUser && <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />}
          <Route path="/sign-in">
            <Login 
              authorization={authorization}
            />
          </Route>
          <Route path="/sign-up">
            <Register 
              registration={registration}
            />
          </Route>

        <Route path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>

        </Switch>

      </div>
      {currentUser &&
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          /> 
      }
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
        {currentUser &&
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}   
          /> 
        }
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}
      />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen} 
            onClose={closeAllPopups} 
            message={message}
          />
    </CurrentUserContext.Provider>
  );
}

export default App;