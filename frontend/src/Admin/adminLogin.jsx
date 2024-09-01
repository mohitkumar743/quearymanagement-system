import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";



function adminLogin() {
  useEffect(()=>{
    
    document.title= "Admin Login || QMS";
})
  const navigate = useNavigate();
  const [AdminData, setAdminData] = useState({
    mobilenumber: "",
    password: "",

  });

  const handleChange = (e) => {
    setAdminData({
      ...AdminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://queary-management-system-server.onrender.com/api/user/Admin", AdminData)
      .then((response) => {
        //console.log(response.data.token);
        if (response.data.token) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your are Login Sucessfully !",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem('AdminAuthtoken', response.data.token); // Store the token in localStorage
          navigate('/Admin/AdminPortal'); // Navigate to user portal
        } else {
          Swal.fire({
            title: "sorry ",
            text: "your mobile number or password is wrong please try with correct details",
            icon: "error",
          }); 
        }
        setAdminData({
          mobilenumber: "",
          password: "",
        });
      })
      .catch((error) => {
        // console.error("There was an error saving the data!", error.response.data.message);
        Swal.fire({
          title: "sorry ",
          text: error.response.data.message,
          icon: "error",
        });
      });
  };

  return (
    <>
    <div className='text-white sm:text-4xl text-3xl font-semibold text-center pt-9'>Welcome to the QMS Portal</div>
      <div className="flex justify-center items-center ">
        <div className="h-[75vh] w-[50vw]  items-center flex flex-col  border-b-orange-500">
          <h3 className=" font-bold text-3xl mt-5 text-white">Admin Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col   mt-3  text-black">
              <input
                className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                type="text"
                name="mobilenumber"
                value={AdminData.mobilenumber}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
              />
              <input
                className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                type="password"
                name="password"
                value={AdminData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
              <button
                className=" border-2  h-[60px] p-1 m-3 rounded-md bg-slate-400 hover:bg-orange-500 border-black text-center"
                type="submit"
              >
               Admin Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default adminLogin