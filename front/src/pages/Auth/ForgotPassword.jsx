import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';


const ForgotPassword = () => {

    const [email,setEmail]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [answer,setAnswer]=useState('');

    

    const navigate=useNavigate();



    const handleSubmit=async(event)=>{
        event.preventDefault();
  
        try {
            const res= await axios.post("http://localhost:8080/api/v1/auth/forgot-password",{
                email,
                newPassword,
                answer
            })
            if(res && res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            } else{
                toast.error(res.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
          }
  
    }



  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
       <div className="register form-container">
    <form onSubmit={handleSubmit}>
    <h4 className='title'>RESET PASSWORD</h4>
    

     <div className="mb-3">
        <input type="Email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email'
         value={email} onChange={(e)=> setEmail(e.target.value)} required />
     </div>

     <div className="mb-3">
        <input type="text" className="form-control" id="exampleInputAnswer" placeholder='Enter your Favourite Sport Name'
         value={answer} onChange={(e)=> setAnswer(e.target.value)} required />
     </div>

     <div className="mb-3">
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' 
        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
     </div>
    
       
        <button type="submit" className="btn btn-primary">RESET</button>
    </form>

    </div>
    </Layout>
  )
}

export default ForgotPassword
