import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminQuearyCard from "../Components/AdminQuearyCard";

function AdminPortal() {
  const navigate = useNavigate();
  const [query, setQueries] = useState([]);
// it is used for fetching all quearies 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/queary/allqueries")
      .then((response) => {
        setQueries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the queries!", error);
      });
  }, []);

  
// logout handle
  const handleLogout = () => {
    localStorage.removeItem("AdminAuthtoken");

    Swal.fire({
      position: "center",
      icon: "success",
      text: "You have been logged out successfully.",
      showConfirmButton: true,
      timer: 1500,
    }).then(() => {
      navigate("/"); // Redirect to login page
    });
  };
  






  return (
    <>
      <div>
        <div className="text-center text-white h-[10vh] flex flex-row items-center justify-around">
          <div className="font-extrabold">
            <Link to="/">Q M S</Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="btn text-white btn-outline m-3 w-[100px]"
            >
              Logout
            </button>

            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="/user.png" alt="User Avatar" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-white text-center">
          <span className="navbar-user text-3xl">Welcome To Admin Panel</span>
        </div>
      </div>

      <div className="text-left">
        {query.length > 0 ? (
          query.map((query) => <AdminQuearyCard key={query._id}query={query}  />)
        ) : (
          <p className="text-white text-center mt-44">
            No queries found for this user.
          </p>
        )}
      </div>
    </>
  );
}

export default AdminPortal;
