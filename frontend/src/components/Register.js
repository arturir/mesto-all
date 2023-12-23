import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { register } from "../Auth";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from './../contexts/CurrentUserContext';

export default function Login ({handleInfoTooltip}) {

    const navigate = useNavigate(),
          [formValue, setFormValue] = useState({email: "", password: ""}),
          { errorRegLogHandle } = useContext(CurrentUserContext);

    function handleChangeEmail(e) {
        setFormValue({...formValue, email: e.target.value});
    }
    function handleChangePassword(e) {
        setFormValue({...formValue, password: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password, email } = formValue;
        register(password, email)
        .then(res => {
            handleInfoTooltip('ok', 'Вы успешно зарегистрировались!')
            navigate('/login', {replace: true});
          }
        )
        .catch(err => errorRegLogHandle(err))
    } 

    return (
            <main>
                <form className="form form_log-reg" onSubmit={handleSubmit}>
                    <h2 className="form__title form__title_theme_black form__title_typeform_log-reg">Регистрация</h2>
                    <input onChange={handleChangeEmail} id="login-form-email" type="text" className="form__text form__text_theme_black" name="email" placeholder="Email" minLength="4" maxLength="100" value={formValue.email} required />
                    <span className="form__input-error login-form-email-error"></span>
                    <input onChange={handleChangePassword}id="login-form-password" type="password" className="form__text form__text_theme_black" name="password" placeholder="Пароль" minLength="6" maxLength="100" value={formValue.password} required  />
                    <span className="form__input-error login-form-password-error"></span>
                    <button type="submit" className="form__submit form__submit_theme_black form__submit_offset">Зарегестрироваться</button>
                    <div className="form__bottom-wrapper">
                        <p className="form__bottom-text">Уже зарегестрированны?</p>{<NavLink to="/sign-in"  className="form__bottom-link">Войти</NavLink> }
                    </div>
                </form>
            </main>
    )
}