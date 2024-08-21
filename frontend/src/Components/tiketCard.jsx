import React from "react";

function TiketCard({ query }) {
  return (
    <>
      <div className="bg-white  w-[50vw] h-[23vh] rounded-lg">
          <div className="flex justify-between items-center mr-5">
            <div className="flex p-2 gap-1">
              <div className="">
                <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
              </div>
            </div>
            <p className=" text-m   ">
              Status: <span className="text-red-600"><strong>{query.status}</strong></span>{" "}
            </p>
          </div>
          <div className=" card__content ml-5">
            <div>
            <h3 className="text-sm  text-gray-600">Tiket Number : {query.ticketNumber}</h3>

              <h3 className="text-2xl"><strong>{query.title}</strong></h3>
              <p className="text-m">{query.description}</p>
            </div>
            <p className="text-m text-right mr-5">
              Created At : {new Date(query.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      
    </>
  );
}

export default TiketCard;
