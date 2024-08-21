{/* <h1>Queries</h1>
      <ul>
        {queries.map(query => (
          <li key={query._id}>
            {query.title}
            <ul>
              <li> {query.description}</li>
              <li> {query.status}</li>
            </ul>
          </li>
        ))}
      </ul> 




      <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col   mt-3  text-white">
              <input
                placeholder="Enter Your Full Name"
                className=" w-[30vw] rounded-md py-2 text-black m-3 border-2 border-black"
                {...register("Name", { required: true })}
              />
              {errors.Name && (
                <span>
                  <font color="red">this is required please fil this</font>
                </span>
              )}

              <input
                placeholder="Enter Your Mobile Number"
                className=" text-black w-[30vw] rounded-md py-2 m-3 border-2 border-black"
                {...register("MobileNumber", {
                  required: true,
                  minLength: {
                    value: 10,
                    message: "mobile no must be  10 digit",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mobile No must be 10 digit",
                  },
                })}
              />
              {errors.MobileNumber && (
                <span>
                  <font color="red">{errors.MobileNumber.message}</font>
                </span>
              )}

              <input
                placeholder="Enter Your Email"
                className=" text-black w-[30vw] rounded-md py-2 m-3 border-2 border-black"
                {...register("Email", { required: true })}
              />
              {errors.Email && (
                <span>
                  <font color="red">{errors.Email.message}</font>
                </span>
              )}

              <input
                placeholder="Enter Your QUEARY"
                className=" text-black w-[30vw] rounded-md py-2 m-3 border-2 border-black"
                {...register("quearytitle", {
                  required: true,
                  minLength: { value: 8, message: "min length is 8" },
                  maxLength: { value: 180, message: "max length is 180" },
                })}
              />
              {errors.quearytitle && (
                <span>
                  <font color="red">{errors.quearytitle.message}</font>
                </span>
              )}

              <textarea
                placeholder="Describe about your problem"
                className=" text-black w-[30vw] h-[28vh] rounded-md py-2 m-3 border-2 border-black"
                {...register("queary", { required: true })}
              ></textarea>
              {errors.queary && (
                <span>
                  <font color="red">{errors.queary.message}</font>
                </span>
              )}

              <button onClick={finalsubmit}
                className="border-2  p-2 m-3 rounded-md bg-slate-400 hover:bg-orange-500 border-black text-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
      
      
      
      
      

          
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = ((data) => {
  //   fetch("http://localhost:5000/api/queary/newqueary",{
  //     method:'POST',
    
  //     body:data
  //   }).then((result)=>{
  //     console.log(result);
  //   })
  //     console.log(data);
  //   })


  //   function finalsubmit(){
     
  //   }

    // const FormComponent = () => {
    //   const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     MobileNumber: '',
    //     queary: '',
    //     quearytitle: '',
    //   });}

      // Email

    // MobileNumber

    // Name

    // queary

    // quearytitle

    // axios({
    //   // Endpoint to send files
    //   url: "http://localhost:5000/api/queary/newqueary",
    //   method: "POST",
    //   data: Data,
    //   }).then((res) => {
    //     console.log(res);
    //   }).catch((err) => {});

    // console.log(data);
      


    if (!response.data.message) {
          Swal.fire({
            title: "Thank You ",
            text: " Your are Sucessfully Registered !",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "sorrry ",
            text: " user is already have an account please login",
            icon: "error",
          });
        }




        *********************userportel .ajs****************************
        import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

async function userPortal() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');
  useEffect(() => {
    const token = localStorage.getItem("Authtoken");
    if (!token) {
      Swal.fire({
        title: "Sorry",
        text: "You are not authorized to access this page. Please log in to your account.",
        icon: "error",
      }).then(() => {
        // Redirect to login after the alert is closed
        navigate("/");
      });
    }else{

      useEffect(() => {
        const fetchUserInfo = async () => {
          if (token) {
            try {
              const res = await axios.get('http://localhost:5000/api/user/profile', {
                headers: {
                  'Authorization': Authtoken,
                },
              });
              setUsername(res.data.username); // Assuming your user model has a 'name' field
            } catch (err) {
              console.error('Failed to fetch user info', err);
            }
          }}
        });

        fetchUserInfo();


        

        
    }

   
  }, [navigate]);
  

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("Authtoken");

    // Show confirmation alert
    Swal.fire({
      position: "center",
      icon: "success",
      text: "You have been logged out successfully.",
      showConfirmButton: true,
      timer: 1500,
    }).then(() => {
      // Redirect to login page
      navigate("/");
    });
  };
  return (

    <>

      <div className="text-center text-white h-[10vh] flex flex-row items-center justify-around">
        <div className="font-extrabold">
          {" "}
          <Link to="/">Q M S</Link>
        </div>
        <div className=" flex items-center">
         
          {/* <Link to="/Login"><button className="btn text-white btn-outline m-3 w-[100px] ">Login</button></Link> */}
//           <button
//             onClick={handleLogout}
//             className="btn text-white btn-outline m-3 w-[100px] ">Logout
//           </button>
//           <div className="avatar">
//             <div className="w-10 rounded-full">
//               <img src="/user.png" />
//             </div>
            
//           </div>
//         </div>
//       </div>

//       <div className="text-white text-center">
//       {username && <span className="navbar-user">Welcome, {username}</span>}
      

//       </div>
//     </>
//   );
// }

// export default userPortal;

    