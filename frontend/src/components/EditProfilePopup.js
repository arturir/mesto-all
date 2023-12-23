import {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
export default function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        context = useContext(CurrentUserContext);

  useEffect(() => {
    setName(context.currentUser.name);
    setDescription(context.currentUser.about);
  }, [context.currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
    .then(()=> {onClose()})
    .catch((error) => {context.handleResponseError(error)})
  } 

  return (
    <PopupWithForm title={'Редактировать профиль'}  
                   onSubmit={handleSubmit}
                   name={'profile-editor'} 
                   isOpen={isOpen} 
                   onClose={onClose}>
        <input id="profile-form-name" type="text" className="form__text" name="name" placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChangeName} value={name || ''}/>
        <span className="form__input-error profile-form-name-error"></span>
        <input id="profile-form-metier" type="text" className="form__text" name="description" placeholder="Деятельность" minLength="2" maxLength="200" required onChange={handleChangeDescription} value={description || ''}/>
        <span className="form__input-error profile-form-metier-error"></span>
    </PopupWithForm>
  )

}
