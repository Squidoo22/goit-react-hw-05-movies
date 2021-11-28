import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/fetchApi";
import { makeSlug } from "../../services/slug";
import s from "./HomePage.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await fetchTrendingMovies();

      setMovies(results);
    };

    getMovies();
  }, []);

  return (
    <section className={s.homePage}>
      <div className={s.mainContainer}>
        <h2 className={s.title}>Trending Today</h2>

        <ul className={s.moviesList}>
          {movies.map(({ id, title, poster_path }) => (
            <li className={s.moviesList__item} key={id}>
              <Link
                to={{
                  pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                  state: {
                    from: {
                      location,
                      label: "Back to Home",
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
      </div>
    </section>
  );
};

export default Home;
