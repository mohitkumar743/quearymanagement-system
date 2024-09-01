import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import QuearyCard from "../Components/QuearyCard";

function UserPortal() {
  useEffect(()=>{
    
    document.title= "Portal || QMS";
})
  const navigate = useNavigate();
  const [Userdata, setUserdata] = useState("");
  const [Queries, setQueries] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Authtoken");

    if (!token) {
      Swal.fire({
        title: "Sorry",
        text: "You are not authorized to access this page. Please log in to your account.",
        icon: "error",
      }).then(() => {
        navigate("/"); 
      });
    } else {
      const fetchUserInfo = async () => {
        try {
          const res = await axios.get(
            "https://queary-management-system-server.onrender.com/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(res.data);
          // setUserdata(res.data);

          
          if (res.data.MobileNumber) {
            fetchQueries(res.data.MobileNumber);
          }
        } catch (err) {
          console.error("Failed to fetch user info", err);
        }
      };

      fetchUserInfo();
    }
  }, [navigate]);

  const fetchQueries = async (Mobilenumber) => {
    try {
      const response = await axios.get(
        `https://queary-management-system-server.onrender.com/api/queary/queries/${Mobilenumber}`
      );
      console.log(response.data);
      setQueries(response.data);
    } catch (err) {
      setError("Error fetching queries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Authtoken");

    Swal.fire({
      position: "center",
      icon: "success",
      text: "You have been logged out successfully.",
      showConfirmButton: true,
      timer: 1500,
    }).then(() => {
      navigate("/");
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
          <Link to="/RegisterQueary"><button className='btn sm:m-3 m-1 sm:w-[180px] w-[30vw] hover:bg-amber-600 hover:text-black text-white bg-transparent shadow-md'>Register Your Queary</button></Link>

            <button
              onClick={handleLogout}
              className="btn text-white btn-outline sm:m-3 m-1 sm:w-[100px] w-[80px]"
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
          {Userdata && (
            <span className="navbar-user text-3xl">
              Welcome {Userdata.Name}
            </span>
          )}
        </div>
      </div>

      <div className="text-left  sm:max-h-[80vh]  overflow-y-auto">
        {Queries.length > 0 ? (
          Queries.map((query) => <QuearyCard key={query._id} query={query} />)
        ) : (
          <p className="text-white text-center mt-44">
            No queries found for this user.
          </p>
        )}
      </div>
    </>
  );
}

export default UserPortal;
