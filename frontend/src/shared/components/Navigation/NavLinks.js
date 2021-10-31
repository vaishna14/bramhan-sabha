import React, { useContext, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
import { useHistory } from "react-router-dom";

const NavLinks = props => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(()=>{
    if(auth.admin){
    history.push("/request");
    }
  })

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && !auth.admin  && (
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      )}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY DETAILS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )} */}

      {auth.isLoggedIn && auth.admin && (
        <li>
          <NavLink to="/request"> REQUEST
     
        </NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login/Register</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <>
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
