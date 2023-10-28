import React from 'react'
import Auth from '../MainCall/Auth';
import { useNavigate } from 'react-router-dom';

type Props = {}

const MainContent = (props: Props) => {
  //--------------------- State ------------------------------
const navigate = useNavigate()
  //--------------------- Onload -----------------------------

  //--------------------- function ---------------------------
  const Logout = () => {
    Auth.LogOut();
    navigate("/Authen");
  };
  //------------------------ html ----------------------------
  return (
    <div>MainContent
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default MainContent