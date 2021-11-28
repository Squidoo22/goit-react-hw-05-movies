import React, { useEffect, useState } from "react";
import { getMovieCast } from "../../services/fetchApi";
import s from "./MovieCast.module.css";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState(null);

  const anchor = document.querySelector("#cast");

  useEffect(() => {
    const getCast = async () => {
      const { cast } = await getMovieCast(movieId);

      setCast(cast);

      if (anchor) {
        window.scrollTo({
          top: anchor.offsetTop,
          behavior: "smooth",
        });
      }
    };

    getCast();
  }, [movieId, anchor]);

  return (
    <div>
      <ul className={s.castList} id="cast">
        {cast &&
          cast.map(({ id, profile_path, original_name, character }) => (
            <li key={id} className={s.castItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : "https://pomogaetsrazu.ru/images/offers/2829219234.jpg"
                }
                alt={original_name}
              />
              <div className={s.itemDescr}>
                <p className={s.personName}>{original_name}</p>
                <p className={s.character}>Character: {character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;
