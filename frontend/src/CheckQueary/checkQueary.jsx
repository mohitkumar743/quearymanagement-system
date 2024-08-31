import React, { useState,useEffect } from "react";
import Navbar from "../Components/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import TiketCard from "../Components/tiketCard";
function CheckQueary() {

  const [btnaction, setbtnaction] = useState(false);
  useEffect(()=>{
    
    document.title= "Queary Status|| QMS";
})
  const [tiketno, Settiketno] = useState("");
  const [Queries, setQueries] = useState([]);

  const handleChange = (e) => {
    Settiketno(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnaction(true);


    
    // console.log("Searching for ticket number:", tiketno);

    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/queary/findbytiket/${tiketno}`
        );
        console.log(response.data);
        if (response.data.length ==0) {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "no queary found",
            showConfirmButton: true,
          });
          
        }
        else{
          setQueries(response.data);

        }
        setbtnaction(false);

      } catch (err) {
        Swal.fire({
          title: "SomeThing Went Wrong",
          text: err.message,
          icon: "error"
        });
        setbtnaction(false);
       

        // console.error(err);
      }
    };

    fetchQueries();
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="h-[38vh] items-center flex flex-col border-b-orange-500">
          <h3 className="font-bold text-3xl mt-5 text-white">
            Check Status of Your Query
          </h3>
          <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-3 text-black">
                <input
                  className="w-[30vw] rounded-md py-2 m-3 border-2 border-black"
                  type="text"
                  name="usertiketnumber"
                  value={tiketno}
                  onChange={handleChange}
                  placeholder="Enter Your Ticket Number"
                />
                <button
                  className="border-2 h-[60px] p-1 m-3 rounded-md bg-slate-400 hover:bg-orange-500 border-black text-center"
                  type="submit"
                > {btnaction?"Please Wait":"Search"}
                  
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="  h-[10vh] flex flex-row items-center justify-around">
          {Queries.length > 0 ? (
              Queries.map((query) => (
                <TiketCard key={query._id} query={query} />
              ))
            ) : (
              <p className="text-white text-center"> {Queries?"":"No queries found for this ticket number."}</p>
            )}
          </div>
      
      </div>
      
    </>
  );
}

export default CheckQueary;
