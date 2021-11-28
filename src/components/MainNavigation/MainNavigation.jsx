import React from "react";
import { NavLink } from "react-router-dom";
import s from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header>
      <div className={s.mainContainer}>
        <nav className={s.mainNavigation}>
          <NavLink
            exact
            to="/"
            className={s.mainNavigation__link}
            activeClassName={s.mainNavigation__activeLink}
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={s.mainNavigation__link}
            activeClassName={s.mainNavigation__activeLink}
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
