import {useEffect, useState} from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import ImagePopup from './components/ImagePopup';
import api from './utils/Api';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import ProtectedRouteElement from './components/ProtectedRoute';
import { checkToken } from './Auth';
import  Login from './components/Login';
import  Register from './components/Register';
import InfoTooltip from './components/InfoTooltip';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState({}),
        [isSomePopupOpen, setIsSomePopupOpen] = useState(false),
        [currentUser, setCurrentUser] = useState({}),
        [cards, setCards] = useState([]),
        [loggedIn, setLoggedIn] = useState(false),
        [login, setLogin] = useState(''),
        [textInfoTooltip, setTextInfoTooltip] = useState(''),
        [typeInfoTooltip, setTypeInfoTooltip] = useState(''),
        navigate = useNavigate(); 

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isSomePopupOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.querySelector("body").classList.add("body_no-scroll");
      return () => {
        document.removeEventListener("keydown", handleEscClose);
        document.querySelector("body").classList.remove("body_no-scroll");
      };
    }
  }, [isSomePopupOpen]);
  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((data) => {setCurrentUser(data)})
      .catch((error) => {handleResponseError(error)});
    }
  }, [loggedIn]);
  useEffect(()=> {
    if (loggedIn) {
      api.getCards()
      .then(data => {setCards(data)})
      .catch((error) => {handleResponseError(error)});
    }
  }, [loggedIn]);
  useEffect(() => {
    tokenCheck();
  }, [])     

  function handleResponseError (error) {
    console.error("Ошибка данных, подробнее > ", error);
  }
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function handleCardClick (card) {
    setSelectedCard(card);
    setIsSomePopupOpen(true);
  }
  function handleOpenTooltip () {
    setIsInfoTooltipPopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
    setIsSomePopupOpen(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
       .then((newCard) => {setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))})
       .catch((error) => {handleResponseError(error)});
  } 
  function handleCardDelete (card) {
    api.deleteCard(card._id)
       .then(() => {setCards((cards) => cards.filter(c => c !== card ))})
       .catch((error) => {handleResponseError(error)});
  }
  function handleUpdateUser ({name, about}) {
    return (
      api.editProfile(name, about)
         .then(data => setCurrentUser(data))
    )
  }
  function handleUpdateAvatar (url) {
    return (
      api.editAvatar(url)
         .then(url => setCurrentUser(url))
    )
  }
  function handleAddNewCard ({name, link}) {
    return (
      api.addNewCard(name, link)
         .then(data => setCards([data, ...cards]))
    )
  }
  function handleInfoTooltip (type, text) {
    setTypeInfoTooltip(type);
    setTextInfoTooltip(text);
    handleOpenTooltip();
  }
  function exitAccount () {
    setLogin('');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }
  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      checkToken(jwt).then(res => {
        if (res) {
          setLoggedIn(true);
          setLogin(res.email)
          navigate("/", {replace: true})
        }
      })
      .catch(err=> console.log(err, ' Неправильный токен или он отсутствует'));
    }
  } 
  function errorRegLogHandle(err) {
    if (typeof(err)==='object') {
      handleInfoTooltip('error', 'Что-то пошло не так! Попробуйте ещё раз.');
    } else {
      handleInfoTooltip('error', err)
    }
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, handleCardLike, handleCardDelete, cards, handleResponseError, errorRegLogHandle, loggedIn}}>
      <div className="page">
          <Header exitAccount={exitAccount} login={login} />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement element={Main} 
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick} 
              handleEditAvatarClick={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              />} 
            />
            <Route path="/signin" element={!loggedIn ? <Login handleInfoTooltip={handleInfoTooltip} setLoggedIn={setLoggedIn} setLogin={setLogin} /> : <Navigate to="/" replace />} />
            <Route path="/signup" element={!loggedIn ? <Register handleInfoTooltip={handleInfoTooltip} /> : <Navigate to="/" replace />} />
            <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
          </Routes>
       
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddNewCard} />
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} type={typeInfoTooltip} title={textInfoTooltip} />
          <ImagePopup card={selectedCard} 
                      name={'image'} 
                      onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );

}
