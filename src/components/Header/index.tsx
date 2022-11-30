import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link to="/">
            <div className="logo">
              <img src="./img/logo.svg" alt="LogoType" />
            </div>
          </Link>

          <div className={styles.menu}>
            {/* <Link to="/profile">
              <div className={styles.favorite}>
                <img src="./img/heart.svg" alt="heart" />
              </div>
            </Link> */}
            <div className={styles.user}>
              <Link to="/profile">
                <img src="./img/user.svg" alt="user" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
