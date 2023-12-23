import { useContext, useEffect } from 'react';
import Card from './Card';
import addButton from '../images/add.svg';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import api from '../utils/Api'
export default function Main ({handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, onCardClick}) {

    const { currentUser, handleCardLike, handleCardDelete, cards, tokenCheck, setCurrentUser, handleResponseError, setCards, jwt } = useContext(CurrentUserContext);
      useEffect(() => {
        api.getUserInfo()
        .then((data) => {setCurrentUser(data)})
        .catch((error) => {handleResponseError(error)});
      }, []);
      useEffect(()=> {
        api.getCards()
        .then(data => {setCards(data);})
        .catch((error) => {handleResponseError(error)});
      }, []);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__left-column">
                    <div className="profile__avatar" onClick={handleEditAvatarClick} style={{ backgroundImage: `url(${currentUser ? currentUser.avatar : ''})` }} > 
                    </div>
                    <div className="profile__info">
                        <div className="profile__wrapper-name">
                            <h1 className="profile__name">{currentUser ?  currentUser.name : ''}</h1>
                            <button type="button" className="profile__edit" onClick={handleEditProfileClick}></button>
                        </div>
                        <h2 className="profile__metier">{currentUser ? currentUser.about : ''}</h2>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}>
                    <img src={addButton} className="profile__add" alt="Добавить" />
                </button>
            </section>
            <section className="cards">
                {cards.map((card)=> (
                    <Card card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onDeleteClick={handleCardDelete} key={card._id||card.card._id} />
                ))}
            </section>
        </main>
    )
    
}