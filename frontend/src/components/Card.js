import { useContext } from 'react';
import {CurrentUserContext} from './../contexts/CurrentUserContext';
export default function Card ({card, onCardClick, onCardLike, onDeleteClick}) {
    const context = useContext(CurrentUserContext),
    currentUser = context.currentUser;
    const isOwn =  (card.owner._id || card.owner) === currentUser._id;
    const isLiked = card.likes?.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `card__like ${isLiked && 'card__like_active'}` 
      );
    const {link, name, likes} = card;
    const handleLikeClick = () => {
        onCardLike(card);   
    }
    const handleDeleteClick = () => {
        onDeleteClick(card);
    }
    const handleClick = () => {
        onCardClick(card);
    }
    return (
        <div className={`card`}>
            <img src={link} className="card__image" alt={name}  onClick={handleClick} />
            <div className="card__wrapper">
                <h2 className="card__title">{name}</h2>
                <div className="card__wrapper-like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__current-likes">{likes?.length}</p>
                </div>
            </div>
            {isOwn && <button type="button" className="card__delete" onClick={handleDeleteClick}></button> }
        </div>
    )

}
