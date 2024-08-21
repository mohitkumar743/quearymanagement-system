import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'



function Home() {
  useEffect(()=>{
    
    document.title= "Home || QMS";
})
  return (
    <>
    <Navbar/>
    <div className='text-white flex justify-center h-[70vh] '>
        <div className=' font-extrabold flex flex-col  justify-center items-center '>
        <h1 className='text-8xl text-amber-600'>QMS</h1>
        <h3 className='text-5xl font-light mb-3'>Your Ultimate Query Solver </h3>
        <p className=' w-[30vw] text-center font-light'>Ready to experience top-notch query resolution?<br></br>Regiser now to get started </p>

        <div className='flex flex-row '>
        <Link to="/RegisterQueary"><button className='btn m-3 hover:bg-amber-600 hover:text-black text-white bg-slate-600 shadow-md'>Register Your Queary</button></Link>
        <Link to="/CheckQueary"><button className='btn m-3 hover:bg-amber-600 hover:text-black text-white bg-slate-600 shadow-md'>Check Status OF Your Queary</button></Link></div></div>
    </div>
   
    
    </>
  )
}

export default Home