import React, { useState } from "react";
import Swal from "sweetalert2";



function QuearyCard({ query }) {


  


  return (
    <>
    <div className="m-8">
      <div className="bg-white mx-[30vw] h-[20vh] rounded-lg p-4 shadow-md">
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
          <p className=" text-m   ">
              Status: <span className="text-red-600">{query.status}</span>{" "}
            </p>
          </div>
        </div>
          <div className="flex flex-row ">

          <div className="card__content   w-[80%]">
            <h3 className="text-2xl font-bold ">{query.title}</h3>
            <h3 className="text-2xl font-bold ">{query._id}</h3>
            <p className="text-m">{query.description}</p>
            <p className="text-m text-right mt-2">
              Created At: {new Date(query.createdAt).toLocaleString()}
            </p>
          </div>

            <div className=" w-[20%]">
            <div className="flex justify-center flex-col items-center  ">
            <button
              className="btn btn-xs m-3">Update Status</button>
              <button
              className="btn btn-xs m-3">Reply on mail
            </button>
          </div>
            </div>

          </div>
          
          
        </div>
        
      </div>
    </>
  );
};

export default QuearyCard;
