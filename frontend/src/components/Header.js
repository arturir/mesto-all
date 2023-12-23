import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { CurrentUserContext } from './../contexts/CurrentUserContext';

export default function Header ({exitAccount,  login}) {

    const { loggedIn } = useContext(CurrentUserContext);
    const usePathname = (url) => {
        const location = useLocation();
        return (url === location.pathname);
    }

    return (
        <header className="header">
            <NavLink href="/" className="header__logo" />
            <nav className="header__menu">
                <div className="header__wrapper-meun">
                    {loggedIn && <p className="header__email">{login}</p> }
                    {loggedIn && <NavLink to="/" className="header__link" onClick={exitAccount}>Выйти</NavLink> }
                </div>
                { usePathname("/sign-in") && <NavLink to="/sign-up" className="header__link">Регистрация</NavLink> }
                { usePathname("/sign-up") && <NavLink to="/sign-in" className="header__link">Войти</NavLink> }
            </nav>
        </header>
    )
    
}