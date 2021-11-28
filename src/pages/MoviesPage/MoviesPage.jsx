import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Notiflix from "notiflix";
import { searchMovies } from "../../services/fetchApi";
import { makeSlug } from "../../services/slug";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movieToFind, setMovieToFind] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchString = new URLSearchParams(location.search).get("query");

    if (searchString) {
      const getMovies = async () => {
        const { results } = await searchMovies(searchString);

        setFoundMovies(results);
        setMovieToFind("");
      };

      getMovies();
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movieToFind.trim()) {
      const { results } = await searchMovies(movieToFind);

      setFoundMovies(results);
      setMovieToFind("");

      if (results.length === 0) {
        Notiflix.Notify.warning(
          "No movies found! Please change your request and try again"
        );
      }

      history.push({
        ...location,
        search: `query=${movieToFind}`,
      });
    }
  };

  return (
    <section className={s.moviesPage}>
      <div className={s.mainContainer}>
        <form onSubmit={handleSubmit} className={s.searchForm}>
          <input
            type="text"
            placeholder="Find movie"
            value={movieToFind}
            onChange={(e) => setMovieToFind(e.target.value)}
            className={s.searchForm__input}
          />

          <button type="submit" className={s.searchForm__button}>
            Search
          </button>
        </form>

        {foundMovies.length > 0 && (
          <ul className={s.moviesList}>
            {foundMovies.map(({ id, title, poster_path }) => (
              <li className={s.moviesList__item} key={id}>
                <Link
                  to={{
                    pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                    state: {
                      from: {
                        location,
                        label: "Back to Movies",
                      },
                    },
                  }}
                >
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w300${poster_path}`
                        : "https://pomogaetsrazu.ru/images/offers/2829219234.jpg"
                    }
                    alt={title}
                  />
                  <p className={s.moviesList__movieTitle}>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div></div>
    </section>
  );
};

export default MoviesPage;
