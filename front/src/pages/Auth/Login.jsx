import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import '../../styles/authStyles.css';
import {useNavigate, useLocation} from 'react-router-dom';
import toast from 'react-hot-toast';
import {useAuth} from '../../context/auth';



const Login = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const location = useLocation();
   

    const auth=useAuth();


    const handleSubmit=async(event)=>{
        event.preventDefault();
  
        try {
            const res= await axios.post("http://localhost:8080/api/v1/auth/login",{
                email,
                password,
            })
            if(res && res.data.success){
                toast.success(res.data.message);
                auth.setAuth({
                    ...auth.auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate( location.state || '/');
            } else{
                toast.error(res.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
          }
  
    }
  



  return (
    <Layout>
      <div className="register form-container">
    <form onSubmit={handleSubmit}>
    <h4 className='title'>LOGIN FORM</h4>
    

     <div className="mb-3">
        <input type="Email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email'
         value={email} onChange={(e)=> setEmail(e.target.value)} required />
     </div>

     <div className="mb-3">
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' 
        value={password} onChange={(e) => setPassword(e.target.value)} required />
     </div>
    
        <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
        </div>
       
        <button type="submit" className="btn btn-primary">LOGIN</button>
    </form>

    </div>
    </Layout>
  )
}

export default Login
