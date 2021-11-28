import React, { useEffect, useState } from "react";
import {
  Route,
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { getMovieDetails } from "../../services/fetchApi";
import { getIdFromSlug } from "../../services/slug";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();
  const { url } = useRouteMatch();

  const movieId = getIdFromSlug(slug);

  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await getMovieDetails(movieId);

      setMovie(currentMovie);
    };

    getMovie();
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      {movie && (
        <section className={s.movieDetialsSection}>
          <div className={s.mainContainer}>
            <button
              type="button"
              onClick={handleGoBack}
              className={s.movieDetails__button}
            >
              {location?.state?.from?.label ?? "Find another movie"}
            </button>

            <div className={s.movieCard}>
              <div className={s.posterContainer}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://pomogaetsrazu.ru/images/offers/2829219234.jpg"
                  }
                  alt={movie.title}
                />
              </div>

              <div className={s.descrContainer}>
                <h2 className={s.movieCard__title}>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h2>
                <p className={s.movieCard__text}>
                  User score: {movie.vote_average}
                </p>

                <h3>Overview</h3>
                <p className={s.movieCard__text}>
                  {movie.overview ? movie.overview : "No overwies yet"}
                </p>

                <h3>Genres</h3>
                <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              </div>
            </div>

            <div className={s.additionalInfo}>
              <h3>Additional Information</h3>
              <ul className={s.additionalInfo__list}>
                <li className={s.additionalInfo__item}>
                  <NavLink
                    className={s.additionalInfo__link}
                    activeClassName={s.additionalInfo__activeLink}
                    to={{ pathname: `${url}/cast`, state: location.state }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={s.additionalInfo__item}>
                  <NavLink
                    className={s.additionalInfo__link}
                    activeClassName={s.additionalInfo__activeLink}
                    to={{ pathname: `${url}/reviews`, state: location.state }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>

            <Route path={`${url}/cast`}>
              <MovieCast movieId={movieId} />
            </Route>

            <Route path={`${url}/reviews`}>
              <MovieReviews movieId={movieId} />
            </Route>
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetailsPage;

// location?.state?.from?.location

// parentPage={location.state}
