import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  
  return (
    <>
    <div className="text-center text-white h-[10vh] flex flex-row items-center justify-around">
      <div className="font-extrabold"> <Link to="/">Q M S</Link></div>
      <div className="">
      <Link to="/admin"><button className="btn text-white btn-outline m-3 w-[100px] ">admin Login</button></Link>
      <Link to="/Login"><button className="btn text-white btn-outline m-3 w-[100px] ">Login</button></Link>
      <Link to="/signup"><button className="btn text-white btn-outline m-3 w-[100px] ">SignUp</button></Link>
      
      </div>
      </div>
     
    </>
  );
}

export default Navbar;
