import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/authStyles.css';



const Register = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [answer, setAnswer]=useState('');
  const navigate=useNavigate();
  

  const handleSubmit=async(event)=>{
      event.preventDefault();

      try {
        const res= await axios.post("http://localhost:8080/api/v1/auth/register",{
            name,
            email,
            password,
            phone,
            address,
            answer
        })
        if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login');
        } else{
            toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
      }

  }

  return (
    <Layout title="Register -- Ecommer app">
    <div className="register form-container">
    <form onSubmit={handleSubmit}>
    <h4 className='title'>REGISTER FORM</h4>
     <div className="mb-3">
        <input type="text" className="form-control" id="exampleInputName" placeholder='Enter your Name'
         value={name} onChange={(e)=> setName(e.target.value)} required />
     </div>

     <div className="mb-3">
        <input type="Email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email'
         value={email} onChange={(e)=> setEmail(e.target.value)} required />
     </div>

     <div className="mb-3">
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' 
        value={password} onChange={(e) => setPassword(e.target.value)} required />
     </div>

     <div className="mb-3">
        <input type="text" className="form-control" id="exampleInputPhone" placeholder='Enter your Phone'
         value={phone} onChange={(e)=>setPhone(e.target.value)} required />
      
     </div>

     <div className="mb-3">
        <input type="text" className="form-control" id="exampleInputAddress" placeholder='Enter your Address'
         value={address} onChange={(e)=>setAddress(e.target.value)} required />
      
     </div>

     <div className="mb-3">
        <input type="text" className="form-control" id="exampleInputAnswer" placeholder='What is Your Favourite sports'
         value={answer} onChange={(e)=>setAnswer(e.target.value)} required />
      
     </div>
      <button type="submit" className="btn btn-primary">REGISTER</button>
    </form>

    </div>
    </Layout>
  )
}

export default Register
