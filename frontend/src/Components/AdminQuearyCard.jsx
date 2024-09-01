import React, { useState } from "react";
import Swal from "sweetalert2";
import SendMail from "../api/api"
import axios from "axios";


function QuearyCard({ query, onStatusUpdate }) {
  const [statuspopupOpen, setstatusPopupOpen] = useState(false);
  const [emailpopupOpen, setemailPopupOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(query.status);
  const [btnaction, setbtnaction] = useState(false);
  const [newmail, setNewmail] = useState("");


  const DeleteQueary =()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this queary",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        // calling a delete api for delete the queary
        try {
          
          const response = await axios.delete(`https://queary-management-system-server.onrender.com/api/queary/queries/${query._id}`);
          console.log(response.data.message);
          // onDelete(query._id); // Update the UI to remove the deleted item
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }); 
          
      } catch (error) {
          console.error('There was an error deleting the query!', error);
      }
        
        
      }
    });
    // alert(query._id);
  }

  const handleStatusChange = async (event) => {
    event.preventDefault();
    try {
      await onStatusUpdate(query.ticketNumber, newStatus);
      setstatusPopupOpen(false);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Failed to update status.",
        showConfirmButton: true,
      });
    }
  };
  const handlesendemail = async (event) => {
    setbtnaction(true);
    const currstatus = query.status
    event.preventDefault();
    if(currstatus=="closed"){
      Swal.fire({
        position: "center",
        icon: "error",
        text: "sorry you do not send mail to closed tiket",
        showConfirmButton: false,
        timer: 1500,
      });
      setNewmail("")
      setemailPopupOpen(false);
    }else{
    const Usermail = query.email;
      const agentRespose =  `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333333;
              }
              .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #dddddd;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
                  color: #333333;
              }
              .content {
                  padding: 20px 0;
                  text-align: left;
              }
              .content h2 {
                  margin: 0;
                  font-size: 20px;
                  color: #333333;
              }
              .content p {
                  margin: 20px 0;
                  font-size: 16px;
                  line-height: 1.5;
              }
              .button {
                  display: inline-block;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  border-top: 1px solid #dddddd;
                  margin-top: 20px;
                  font-size: 12px;
                  color: #777777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Welcome to QMS!</h1>
              </div>
              <div class="content">
                  <h2>Agent Response </h2>
                  <p>Hi ${query.Name},</p>
                  <p>Your queary is :<strong>${query.title}</strong> <br> Description :${query.description} <br>Your tiket Number : ${query.ticketNumber}<br> Agent Reply: ${newmail}<br> Thank You .</p>
             
              </div>
              <div class="footer">
                  <p>© 2024 Q M S. All rights reserved.</p>
                  <p>If you have any questions, feel free to <a href="mailto:apnacollegework@gmail.com">contact us</a>.</p>
              </div>
          </div>
      </body>
      </html>
      `;
      
      const ttitle =`regarding your queary regarding ${query.title}`;
    await SendMail(ttitle,Usermail,agentRespose);
      // console.log(Usermail);
      // console.log(agentRespose);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Mail send successfully.",
        showConfirmButton: true,
        timer: 1500,
      });
      setemailPopupOpen(false);
      setbtnaction(false);
  };
}

  return (
    <>
      <div className="m-8 ">
        <div className="bg-white mx-auto h-[35vh] rounded-lg p-2 shadow-md max-w-3xl">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <div className="circle">
                <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
            </div>
            <div>
              <p className="text-m">
                Status: <span className="text-red-600">{query.status}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="card__content sm:w-[80%] w-[100%]">
              <div className="flex flex-row gap-5">
              <h3 className="text-sm  border-2 border-gray-300 p-1 rounded-md text-gray-600">Tiket Number : {query.ticketNumber}</h3>
              <h3 className="text-sm border-2 border-green-300 p-1 rounded-md text-gray-600">Mobile No : {query.MobileNumber}</h3> </div>
              <h3 className="text-xl font-bold">{query.title}</h3>
              <p className="text-sm">{query.description}</p>
              <p className="text-sm text-right mt-2">
                Created At: {new Date(query.createdAt).toLocaleString()}
              </p>

              {/* status and maill button for mobile */}

              <div className="w-[100%] mt-6  block sm:hidden ">
              <div className="flex justify-center  items-center">
                <button
                  onClick={() => setstatusPopupOpen(true)}
                  className="btn btn-xs m-4 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update Status
                </button>
                <button 
                onClick={() => setemailPopupOpen(true)}
                  className="btn btn-xs m-4 bg-green-500 text-white hover:bg-green-600"
                >
                  Reply on mail
                </button>

                <button onClick={() => DeleteQueary()}
                 className="ml-[10vw] "><img className="w-8" src="/delete.gif" alt="User Avatar" /></button></div>
              
            </div>

            </div>

            {/* // for laptop screen only status and mail button show */}
            <div className="w-[20%] hidden sm:block ">
              <div className="flex justify-center flex-col items-center">
                <button
                  onClick={() => setstatusPopupOpen(true)}
                  className="btn btn-xs m-3 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update Status
                </button>
                <button 
                onClick={() => setemailPopupOpen(true)}
                  className="btn btn-xs m-3 bg-green-500 text-white hover:bg-green-600"
                >
                  Reply on mail
                </button></div>

                <button onClick={() => DeleteQueary()}
                 className="ml-[9vw] "><img className="w-6" src="/delete.gif" alt="User Avatar" /></button>
              
            </div>
          </div>
        </div>
      </div>

      {/* status Popup */}
      {statuspopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <span
              className="absolute top-2 right-2 text-gray-500 text-lg cursor-pointer"
              onClick={() => setstatusPopupOpen(false)}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">Update Query Status</h2>
            <form onSubmit={handleStatusChange} className="flex flex-col">
              <label htmlFor="status" className="mb-2 text-gray-700">Select Status:</label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="open">Open</option>
                <option value="in-progress">in-progress</option>
                <option value="closed">Closed</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}



{/* Email Popup */}
{emailpopupOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <span
        className="absolute top-2 right-2 text-gray-500 text-lg cursor-pointer"
        onClick={() => setemailPopupOpen(false)}
      >
        &times;
      </span>
      <h2 className="text-xl font-semibold mb-4">Reply on email</h2>
      <form onSubmit={handlesendemail} className="flex flex-col">
        <label htmlFor="status" className="mb-2 text-gray-700">reply to customer</label>
        <textarea
          type="textarea"
          id="status"
          value={newmail}
          onChange={(e) => setNewmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter the reply">
          </textarea>
        
        <button disabled={btnaction}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {btnaction?"Please Wait":"Send Email"}
          
        </button>
      </form>
    </div>
  </div>
)}


    </>
  );
}

export default QuearyCard;
