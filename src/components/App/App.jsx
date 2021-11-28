import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import MainNavigation from "../MainNavigation/MainNavigation";
import s from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  return (
    <div>
      <MainNavigation />

      <Suspense
        fallback={
          <Loader
            className={s.loader}
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
          />
        }
      >
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage></MovieDetailsPage>
          </Route>

          <Route path="/movies">
            <MoviesPage></MoviesPage>
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
