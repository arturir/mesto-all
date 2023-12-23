import {useRef, useContext} from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from './../contexts/CurrentUserContext';
export default function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

  const avatar = useRef(),
        { handleResponseError } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value
    })
    .then(()=> {onClose()})
    .catch((error) => {handleResponseError(error)})
  } 

  return (
    <PopupWithForm title={'Обновить аватар'} 
                   onSubmit={handleSubmit}
                   name={'avatar-editor'} 
                   isOpen={isOpen} 
                   onClose={onClose}>
      <input ref={avatar} id="new-place-form-place" type="url" className="form__text" name="avatar" placeholder="URL" minLength="2" maxLength="256" required />
      <span className="form__input-error new-place-form-place-error"></span>            
    </PopupWithForm>       
  )
    
}