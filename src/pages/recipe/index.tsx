import Styles from "./recipe.module.scss";
import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../redux/store";

export function Recipe() {
  const [data, setData] = useState<any>([]);
  const [ingredients, setIngredient] = useState<any>([]);
  const [isload, setLaod] = useState<boolean>(false);

  console.log(data);
  const url = useSelector((state: RootState) => state.recipePage.value);
  const totalUrl = url ? url : window.localStorage.getItem("recipeUrl");

  useEffect(() => {
    axios.get(totalUrl).then((response) => {
      setData(response.data.recipe);
      setIngredient(response.data.recipe.ingredients);
      setLaod(true);
    });
  }, [totalUrl]);

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <div className={Styles.firstScreen}>
            <div className={Styles.descr}>
              <div className={Styles.imgBlock}>
                <img src={data.image} alt="dish" />
              </div>
              <div className={Styles.text}>
                <div className={Styles.label}>{data.label}</div>

                <div>
                  <li>Diet: {isload && data.dietLabels.join(" , ")}</li>
                </div>

                <div className={Styles.textOptions}>
                  <ul>
                    <li>{data.cuisineType}</li>
                    <a href={data.url} target="_blank" rel="noreferrer">
                      <li className={Styles.instructionBtn}>instruction </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={Styles.howToCook}>
            <div className={Styles.ingredients}>
              <div className={Styles.Cooktitle}>
                {ingredients.length} ingredients
              </div>
              {ingredients.map((ingredient: any, index: number) => (
                <ul key={index} className={Styles.list}>
                  <li>
                    {index + 1} {ingredient.food}
                  </li>
                </ul>
              ))}
            </div>

            <div className={Styles.nuration}>
              <div className={Styles.Cooktitle}>Nurations</div>
              <ul className={Styles.list}>
                <li>Calories: {Math.round(data.calories)}</li>
                <li>weight: {Math.round(data.totalWeight)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
