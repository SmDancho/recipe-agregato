
import styles from "./Card.module.scss";
import { IcardTypes } from "../../types/card";


import { useDispatch, useSelector } from "react-redux";
import { savePage } from "../../redux/recipePage";
import { Link, useNavigate } from "react-router-dom";
import { addFavorite } from "../../redux/addFavoriteApi";

import { checkIsAuth } from "../../redux/auth";

export function Card(props: IcardTypes) {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(
      addFavorite({
        label: props.recipe.label,
        img: props.recipe.image,
        cusType: props.recipe.cuisineType,
        category: props.recipe.dishType,
        link: props._links?.self?.href,
      })
    );
  };
  const saveRecipeUrl = () => dispatch(savePage(props._links?.self?.href));

  return (
    <div className={styles.cardWarpper}>
      <div className={styles.imgBlock}>
        <img width={120} height={110} src={props.recipe.image} alt="Dish" />
      </div>
      <div className={styles.titleCard}>
        <h3>{props.recipe.label.slice(0, 40)}</h3>
      </div>
      <div className={styles.types}>
        <div className={styles.cusineType}>
          Cuisine: {props.recipe.cuisineType}
        </div>
        <div className={styles.dishType}>Category: {props.recipe.dishType}</div>
        <div className={styles.calories}>
          Calories: {Math.floor(props.recipe.calories)} cal.
        </div>
      </div>

      <div className={styles.cardBtns}>
        <Link to={"/recipe"}>
          <button
            onClick={() => {
              saveRecipeUrl();
            }}
            className={styles.cardBtn}
          >
            More
          </button>
        </Link>
        <button
          onClick={() => {
            isAuth ? handleSubmit() : navigate("/profile");
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <img src="./img/greenheart.png" alt="to favorite button" />
        </button>
      </div>
    </div>
  );
}
