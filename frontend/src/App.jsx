import React from 'react';
import Home from './Components/Home';
import Login from './login/Login';
import Signup from './signup/signup';
import UserPortal from './login/userPortal';
import CheckQueary from './CheckQueary/checkQueary';
import RegisterQueary from './RegisterQueary/RegisterQueary';
import AdminLogin from './Admin/adminLogin'
import AdminPortal from './Admin/AdminPortal';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/CheckQueary",
    element: <CheckQueary/>,
  },
  {
    path: "/admin",
    element: <AdminLogin/>,
  },
  {
    path: "/admin/adminPortal",
    element: <AdminPortal/>,
  },
  {
    path: "/RegisterQueary",
    element: <RegisterQueary/>,
  },
  {
    path: "/user/userPortal",
    element: <UserPortal/>,
  },
 
]);



function App() {
  
  
  return (
   
    <div className=' h-screen'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <RouterProvider router={router} />
    </div>
   
  );
}

export default App
