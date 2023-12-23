import { useState, useContext } from "react";
import { authorize } from "../Auth";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from './../contexts/CurrentUserContext';

export default function Login ({handleInfoTooltip, setLoggedIn, setLogin}) {

    const [formValue, setFormValue] = useState({email: "", password: ""}),
          navigate = useNavigate(),
          { errorRegLogHandle } = useContext(CurrentUserContext);

    function handleChangeEmail(e) {
      setFormValue({...formValue, email: e.target.value});
    }
    function handleChangePassword(e) {
      setFormValue({...formValue, password: e.target.value});
    }
    function handleSubmit (e) {
      e.preventDefault();
      authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setFormValue({email: '', password: ''});
          setLoggedIn(true);
          setLogin(formValue.email);
          handleInfoTooltip('ok', 'Вы успешно вошли!')
          navigate('/', {replace: true});
        } else {
          throw new Error (data)
        }
      })
      .catch(err => errorRegLogHandle(err))
    } 

    return (
      <main>
        <form className="form form_log-reg" onSubmit={handleSubmit}>
          <h2 className="form__title form__title_theme_black form__title_typeform_log-reg">Вход</h2>
          <input onChange={handleChangeEmail} id="login-form-email" type="email" className="form__text form__text_theme_black" name="email" placeholder="Email" minLength="4" maxLength="100" value={formValue.email} required />
          <span className="form__input-error login-form-email-error"></span>
          <input onChange={handleChangePassword}id="login-form-password" type="password" className="form__text form__text_theme_black" name="password" placeholder="Пароль" minLength="6" maxLength="100" value={formValue.password} required  />
          <span className="form__input-error login-form-password-error"></span>
          <button type="submit" className="form__submit form__submit_theme_black form__submit_offset">Войти</button>    
        </form>
      </main>
    )
    
}