import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'
import SendMail from "../api/api"

function QuearyCard({ query, onStatusUpdate,onemailupdate }) {
  const [statuspopupOpen, setstatusPopupOpen] = useState(false);
  const [emailpopupOpen, setemailPopupOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(query.status);
  const [btnaction, setbtnaction] = useState(false);
  // const Usermail = query.email;
  const [newmail, setNewmail] = useState("");

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
      // const agentRespose = newmail;
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
      <div className="m-8">
        <div className="bg-white mx-auto h-[23vh] rounded-lg p-4 shadow-md max-w-4xl">
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
            <div className="card__content w-[80%]">
              <div className="flex flex-row gap-20">
              <h3 className="text-sm  border-2 border-gray-300 p-1 rounded-md text-gray-600">Tiket Number : {query.ticketNumber}</h3>
              <h3 className="text-sm border-2 border-green-300 p-1 rounded-md text-gray-600">Mobile No : {query.MobileNumber}</h3> </div>
              <h3 className="text-2xl font-bold">{query.title}</h3>
              <p className="text-m">{query.description}</p>
              <p className="text-m text-right mt-2">
                Created At: {new Date(query.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="w-[20%]">
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
                </button>
              </div>
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


{/* email Popup */}
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
