import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const Main = (props: Props) => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default Main;
