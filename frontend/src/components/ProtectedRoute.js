import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from './../contexts/CurrentUserContext';

export default function ProtectedRouteElement ({ element: Component, ...props  }) {
  const { loggedIn } = useContext(CurrentUserContext);
  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}
