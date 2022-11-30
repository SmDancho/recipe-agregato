import Styles from "./auth.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../redux/auth";

import type { RootState } from "../../redux/store";

export function Auth() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const status = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const handleSubmitregister = () => {
    try {
      dispatch(registerUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitLogin = () => {
    try {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={Styles.wrapper}>
        <div className={Styles.container}>
          <div className={Styles.formBlock}>
            {login ? (
              //login
              <form onSubmit={(e) => e.preventDefault()}>
                <h3 className="title"> Login in</h3>

                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  onClick={() => handleSubmitLogin()}
                  className={Styles.authBtn}
                >
                  Login in
                </button>
                <p
                  onClick={() => setLogin((val) => !val)}
                  className={Styles.loginBtn}
                >
                  Sign up
                </p>
              </form>
            ) : (
              //register
              <form onSubmit={(e) => e.preventDefault()}>
                <h3 className="title"> Sign up to React recipes</h3>

                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  onClick={() => handleSubmitregister()}
                  className={Styles.authBtn}
                >
                  Sign up
                </button>

                <p
                  onClick={() => setLogin((val) => !val)}
                  className={Styles.loginBtn}
                >
                  Sign in
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
