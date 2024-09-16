import React,{ useState,useEffect} from "react";
import Navbar from "../Components/navbar";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import SendMail from "../api/api"

function RegisterQueary() {
  useEffect(()=>{
    
    document.title= "Query Register || QMS";
})

const [btnaction, setbtnaction] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    MobileNumber: '',
    email: '',
    title: '',
    description: ''
});


const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    setbtnaction(true);

    axios.post('https://queary-management-system-server.onrender.com/api/queary/newqueary', formData)
        .then(async (response )=> {
          const ticketNumber = response.data.ticketNumber;
          const Usermail = formData.email;
          const agentRespose =  `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Query Registration Confirmation</title>
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
                      <h2>Query Registration Confirmation</h2>
                      <p>Hi ${formData.Name},</p>
                      <p>Your Query is Registered Sucessfully.<br> Your Query is :<strong>${formData.title}</strong> <br> Description:  ${formData.description} <br>Your tiket Number : ${ticketNumber}<br> please Check Status of your Query.<br> Thank You .</p>
                     <a href="https://querysolution.vercel.app/CheckQueary" class="button">Check status</a>
                  </div>
                  <div class="footer">
                      <p>© 2024 Q M S. All rights reserved.</p>
                      <p>If you have any questions, feel free to <a href="mailto:apnacollegework@gmail.com">contact us</a>.</p>
                  </div>
              </div>
          </body>
          </html>
          `;
          // const agentRespose = `Hello ${formData.Name}. Your Queary is Registered Sucessfully.Your tiket Number : ${ticketNumber} please Check Status of your Queary. Thank You . `;
          const ttitle =`Query submited sucessfully `;
        await SendMail(ttitle,Usermail,agentRespose);
        //   console.log(Usermail);
        //   console.log(agentRespose);
          setbtnaction(false);


          Swal.fire({
            title: " Your Query  Sucessfully Registered !",
            text: ` Our Agent get in touch with you Shortly . Your ticket number is ${ticketNumber}`,
            icon: "success"
          });
            setFormData({
              Name: '',
              MobileNumber: '',
                email: '',
                title: '',
                description: ''
            });

            navigate('/CheckQueary');

          
        })
        .catch(error => {
            console.error('There was an error saving the data!', error);
        });
};
    
  

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center ">
        <div className="h-[80vh] w-[50vw]  items-center flex flex-col  border-b-orange-500">
          <h3 className=" font-bold sm:text-3xl text-sm mt-5 text-white">
            Registration Your QUERY
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col   mt-3  text-black">
            <input className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                type="text"
                name="Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                type="text"
                name="MobileNumber"
                value={formData.mobileno}
                onChange={handleChange}
                placeholder="Mobile No"
            />
            <input className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea className=" sm:w-[30vw] w-[80vw] rounded-md py-2  m-3 border-2 border-black"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button disabled={btnaction}
             className=" border-2  h-[60px] p-1 m-3 rounded-md bg-slate-400 hover:bg-orange-500 border-black text-center" type="submit">{btnaction?"Please Wait":" Register"}</button>
            </div>
        </form>
          
        </div>
      </div>
    </>
  );
}

export default RegisterQueary;
