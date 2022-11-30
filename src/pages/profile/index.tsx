import { useEffect } from "react";

import styles from "./profile.module.scss";
import { Auth } from "../../components/auth";
import { checkIsAuth, logout } from "../../redux/auth";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../redux/store";
import { IfavCard } from "../../types/card";
import { Favcard } from "../../components/favCard";

import { clearStatus, getfavorite } from "../../redux/addFavoriteApi";

import { toast } from "react-toastify";

export function Profile() {
  const dispatch = useDispatch();

  const logOutFunc = () => dispatch(logout());

  const isAuth = useSelector(checkIsAuth);

  const getUserData: any = useSelector((state: RootState) => state.auth.user);
  const getfavoriteData: any = useSelector(
    (state: RootState) => state.favorite.list
  );

  const status = useSelector((state: RootState) => state.favorite.status);

  useEffect(() => {
    dispatch(clearStatus());
    dispatch(getfavorite());
    toast(status);
  }, [status]);

  return isAuth ? (
    <div>
      <div className={styles.container}>
        <div className={styles.promo}>
          <div>{getUserData?.username}</div>
          <button onClick={() => logOutFunc()}>Log out</button>
          <h1 className={styles.title}>favorite recipes</h1>
          <div className={styles.profilePromo}>
            {getfavoriteData?.map((recipes: IfavCard) => (
              <Favcard {...recipes} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Auth />
  );
}
