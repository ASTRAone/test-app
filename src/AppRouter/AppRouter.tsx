import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { FORM_ROUTE } from "../utility/constants";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, Element }) => (
        <Route path={path} element={<Element />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={FORM_ROUTE} />} />
    </Routes>
  );
};
