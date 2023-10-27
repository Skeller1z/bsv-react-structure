import { useRoutes } from "react-router-dom";
import Menu_PC from "../Menu/Menu_PC";
import Menu_Mobile from "../Menu/Menu_Mobile";
import { isBrowser } from "react-device-detect";
import Main from "../Components/Global/MainPage/Main";
import MainContent from "../Pages/MainContent";
import Login from "../Components/Global/MainPage/Login/Login";
import MainAuth from "../Components/Global/MainPage/Login/MainAuth";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainAuth />,
    },
    { index: true, 
      path: "/Authen", 
      element: <Login /> 
    },
    {
      path: "/main",
      element: <Main />,
      children: [
        {
          index: true,
          path: "/main",
          element: isBrowser ? (
            <Menu_PC pageshow={<MainContent />} />
          ) : (
            <Menu_Mobile/>
          ),
        },
      ]
      }    
  ]);
}

//index: true,
