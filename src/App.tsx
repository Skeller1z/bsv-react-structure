import React, { Suspense, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./routes/routes";
import { setupPwaUpdateNotifications } from "./PWA/pwaUpdateNotifications";
import Loading from "./Components/Global/Loading/LoadingPage";

 //---------------- DevStore/interface -----------------------
 export default function App(){
  //--------------------- State ------------------------------

  //--------------------- Onload -----------------------------
  useEffect(() => {
    setupPwaUpdateNotifications();
  }, []);
  
  //--------------------- function ----------------------------

  //--------------------- html --------------------------------
  return (
    <>
      <Suspense fallback={<Loading />}> 
        <Router />
      </Suspense>
    </>
  );
}

  //---------------------- Component ---------------------------

