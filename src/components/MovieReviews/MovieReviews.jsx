import React, { useEffect, useState } from "react";
import { getReviews } from "../../services/fetchApi";
import s from "./MovieReviews.module.css";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  const anchor = document.querySelector("#reviews");

  useEffect(() => {
    const getCast = async () => {
      const { results } = await getReviews(movieId);

      setReviews(results);

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
    <div id="reviews">
      <ul>
        {reviews && reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <li key={id} className={s.reviewItem}>
              <h3>Author: {author}</h3>
              <p className={s.reviewText}>{content}</p>
            </li>
          ))
        ) : (
          <li className={s.reviewItem}>
            We don't have any reviews for this movie
          </li>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
