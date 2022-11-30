import React from "react";
import styles from "./favCard.module.scss";
import { IfavCard } from "../../types/card";
import { useDispatch } from "react-redux";
import { savePage } from "../../redux/recipePage";
import { Link } from "react-router-dom";

import { removeFavorite } from "../../redux/addFavoriteApi";

export function Favcard(props: IfavCard) {
  const dispatch = useDispatch();

  const removeCard = () => dispatch(removeFavorite({ label: props.label }));

  const saveRecipeUrl = () => dispatch(savePage(props.link));
  return (
    <div>
      <div className={styles.cardWarpper}>
        <div className={styles.imgBlock}>
          <img width={120} height={110} src={props.img} alt="Dish" />
        </div>
        <div className={styles.titleCard}>
          <h3>{props.label?.slice(0, 40)}</h3>
        </div>
        <div className={styles.types}>
          <div className={styles.cusineType}>Cuisine: {props.cusType}</div>
          <div className={styles.dishType}>Category: {props.category}</div>
        </div>

        <div className={styles.cardBtns}>
          <button
            onSubmit={(e) => e.preventDefault()}
            onClick={() => removeCard()}
          >
            delete
          </button>
          <Link to={"/recipe"}>
            <button onClick={() => saveRecipeUrl()}>more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
