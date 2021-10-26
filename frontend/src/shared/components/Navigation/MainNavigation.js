import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Menu } from "semantic-ui-react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.personal.profile);
  const displayType = useSelector((state) => state.personal.displayType);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const profileClicked = () => {
    dispatch({
      type: "profile",
      profile: !profile,
    });
    dispatch({
      type: "display_type",
      displayType: displayType,
    });
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h4>
        <ul className="nav-links">
            {/* <li> */}
              <button className="user-profile" onClick={profileClicked}>
                <Icon name="user" />
              </button>
            {/* </li> */}
            </ul>
        </h4>
        <h3 className="main-navigation__title">
          

            <Link to="/">Brahman Sabha Chandrapur</Link>
          {/* </ul> */}
        </h3>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
