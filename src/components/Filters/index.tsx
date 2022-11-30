import styles from "./filter.module.scss";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"

import { saveCuisine, saveCategory, saveSearch } from "../../redux/filter";

import type { RootState } from "../../redux/store";


export function Filter() {
  const [isOpenCus, setOpenCus] = useState(false);
  const [isOpenCat, setOpenCat] = useState(false);

  const element = useRef<any>();

  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const closePopUp = (e: any) => {
    if (e.target.parentNode.parentNode !== element.current) {
      setOpenCus(false);
      setOpenCat(false);
    }
  };



  useEffect(() => {
    document.body.addEventListener("click", closePopUp);
    return () => {
      document.body.removeEventListener("click", closePopUp);
    };
  }, []);

  const cusTypesArr = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    " South East Asian",
  ];

  const dishType = [
    "Bread",
    "Cereals",
    "Condiments and sauces",
    "Desserts ",
    "Drinks",
    "Main course",
    "Pancake",
    "Preps",
    "Preserve",
    "Salad",
    "Sandwiches",
    "Side dish",
    "Soup",
    "Starter",
    "Sweets",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <div className={styles.filters}>
          <div ref={element} className={styles.categories}>
            <div
              onClick={() => {
                setOpenCus((isOpen) => !isOpen);
                setOpenCat(false);
              }}
              className={styles.cuisine}
            >
              <p>Cuisine</p>
              <img
                src="./img/arrow.svg"
                alt="arrow"
                className={isOpenCus ? styles.rotate : ""}
              />
              {isOpenCus && (
                <div className={styles.popup}>
                  <ul>
                    {cusTypesArr.map((types: any, index: number) => (
                      <li
                          key = {index}
                        onClick={() => {
                          dispatch(saveCuisine(types));
                        }}

                      >
                        {types}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div
              onClick={() => {
                setOpenCat((isOpen) => !isOpen);
                setOpenCus(false);
              }}
              className={styles.Сategory}
            >
              <p>Сategory</p>
              <img
                src="./img/arrow.svg"
                alt="arrow"
                className={isOpenCat ? styles.rotate : ""}
              />
              {isOpenCat && (
                <div className={styles.popup}>
                  <ul>
                    {dishType.map((categoryes: any, index: number) => (
                      <li
                          key = {index}
                        onClick={() => {
                          dispatch(saveCategory(categoryes));
                        }}

                      >
                        {categoryes}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className={styles.searchBlock}>
            <input
              onChange={(e) => {
                dispatch(saveSearch(e.target.value));
              }}
              className={styles.search}
              value={searchValue}
              placeholder="Search..."
            ></input>
            <img src="./img/search.svg" alt="search" />
          </div>
        </div>
      </div>
    </div>
  );
}
