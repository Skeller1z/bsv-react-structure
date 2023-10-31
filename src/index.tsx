import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <RecoilRoot>
      <RecoilNexus />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </>
);

reportWebVitals();
