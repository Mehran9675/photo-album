import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home.tsx";
import { ROUTES } from "@/constants/routes.ts";
import Favorites from "@/pages/favorites.tsx";
import { AnimatePresence } from "framer-motion";
import PhotosContext from "@/context/photosContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PhotosContext>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname}>
            <Route element={<Home />} path={ROUTES.HOME} />
            <Route element={<Favorites />} path={ROUTES.FAVORITES}></Route>
          </Routes>
        </AnimatePresence>
      </PhotosContext>
    </BrowserRouter>
  </React.StrictMode>
);
