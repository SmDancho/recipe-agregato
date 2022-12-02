//lib
import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import { Header } from "./components/Header";

//pages
import { Content } from "./pages/Home";
import { Recipe } from "./pages/recipe";
import { Profile } from "./pages/profile";

//functions
import { getme } from "./redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { getfavorite } from "./redux/addFavoriteApi";

import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const getUserToken: String | null = useSelector(
    (state: RootState) => state.auth.token
  );

  useEffect(() => {
    dispatch(getme());
    dispatch(getfavorite());
  }, [getUserToken]);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path={`/profile`} element={<Profile />}></Route>
        <Route path={`/recipe`} element={<Recipe />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
