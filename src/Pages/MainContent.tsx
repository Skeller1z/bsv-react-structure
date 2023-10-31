import React, { useEffect, useLayoutEffect, useState } from 'react'
import Auth from '../MainCall/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {}

const MainContent = (props: Props) => {
  //--------------------- State ------------------------------
const navigate = useNavigate()
const [data, setData] = useState([]);
const [data3, setData3] = useState([]);
  //--------------------- Onload -----------------------------
  // useEffect(() => {
  //   api();
  // }, []);

  useLayoutEffect(() => {
    api3();
  }, []);

  const api = async () => {
    await axios
      .get("https://www.melivecode.com/api/users")
      .then((response) => {
        setData(response.data);
        console.log("data");
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
      });
  };

  const api3 = async () => {
    await axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setData3(response.data.products);
        console.log("Data3");
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
      });
  };
  //--------------------- function ---------------------------
  const Logout = () => {
    Auth.LogOut();
    navigate("/Authen");
  };
  //------------------------ html ----------------------------
  return (
    <div>MainContent
      <button onClick={Logout}>Logout</button>
{/* 
      {data.map((data) => (
        <li key={data.id}>Name: {data.fname}</li>
      ))} */}
      <hr/>
      {data3.map((data) => (
        <li key={data.id}>Name: {data.title}</li>
      ))}
    </div>
  )
}

export default MainContent