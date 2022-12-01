import styles from "./conten.module.scss";

import { Card } from "../../components/Card";
import { Skeleton } from "../../components/Skeleton";

import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/debonce";
import { useEffect } from "react";

import { useGetRecipesQuery, useLazyGetMoreDataQuery } from "../../redux/api";

import { clearStatus } from "../../redux/addFavoriteApi";

import type { RootState } from "../../redux/store";
import { IcardTypes } from "../../types/card";

import { toast } from "react-toastify";
import { Filter } from "../../components/Filters";

export function Content() {
  const dispatch = useDispatch();

  const cuisineType = useSelector(
    (state: RootState) => state.filter.cuisineValue
  );

  const category = useSelector(
    (state: RootState) => state.filter.categoryValue
  );
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const { status } = useSelector((state: RootState) => state.favorite);

  const deboncedSearchValue = useDebounce(searchValue, 350);

  const totalCusValue = cuisineType ? cuisineType : "world";

  const totalCategoryValue = category ? category : "Starter";

  const {
    data = [],
    refetch,
  } = useGetRecipesQuery({
    deboncedSearchValue,
    totalCusValue,
    totalCategoryValue,
  });

  const [trigger, result] = useLazyGetMoreDataQuery(); //endpoint for fetch new data

  const fetchNewData = () => {
    result.data
      ? trigger(result.data._links.next.href)
      : trigger(data._links.next.href);

    refetch();
  };

  useEffect(() => {
    dispatch(clearStatus());
    toast(status);
  }, [status]);


  return (
    <>
      <Filter />
      <div className={styles.container}>
        <div id="start" className={styles.promo}>
          <div className={styles.titles}>
            <h1 className="title">Choose CuisineType first</h1>
            <p> Cuisine: {cuisineType}</p>
            <p> Category: {category}</p>
          </div>
          <div id="contentMain" className={styles.contentMain}>

            {result?.data 
              ? result.data.hits.map((recipes: IcardTypes, index: number) => (
                  <Card key={index} {...recipes} />
                ))
              : data.hits?.map((recipes: IcardTypes, index: number) => (
                  <Card key={index} {...recipes} />
                ))}

            <a
              href="
            #start
            "
            >
              <button
                onClick={() => {
                  fetchNewData();
                }}
                className={styles.btn}
              >
                Next
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
