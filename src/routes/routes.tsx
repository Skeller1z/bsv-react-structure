import React, { useEffect, useRef } from "react";
import { isBrowser } from "react-device-detect";
import { Navigate, useRoutes } from "react-router-dom";

const MainAuth = React.lazy(
  () => import("../Components/Global/MainPage/Login/MainAuth")
);
const Login = React.lazy(
  () => import("../Components/Global/MainPage/Login/Login")
);
const Main = React.lazy(() => import("../Components/Global/MainPage/Login/Main"));
const MainContent = React.lazy(() => import("../Pages/MainContent"));
const Menu_Mobile = React.lazy(() => import("../Menu/Menu_Mobile"));
const Menu_PC = React.lazy(() => import("../Menu/Menu_PC"));

export default function Router() {
  const menupayRef = useRef(null);
  return useRoutes([
    {
      path: "/Authen",
      element: <MainAuth />,
      children: [
        { index: true, path: "/Authen", element: <Login navTo={"/"} /> },
      ],
    },  
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          path: "/",
          element: isBrowser ? (
            <Menu_PC pageshow={<MainContent />} />
          ) : (
            <Menu_Mobile pageshow={<MainContent />}/>
          ),
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}


//index: true,
