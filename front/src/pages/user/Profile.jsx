import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';



const Profile = () => {

    const {auth,setAuth}=useAuth();

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');


    //get user data

    useEffect(()=>{
        const {email,name,phone,address}=auth?.user;
        setEmail(email);
        setName(name);
        setPhone(phone);
        setAddress(address);
        
    },[auth?.user])


    const handleSubmit=async(event)=>{
        event.preventDefault();
  
        try {
          const {data}= await axios.put("http://localhost:8080/api/v1/auth/profile",{
              name,
              email,
              password,
              phone,
              address,
          })

          if(data?.error){
            toast.error(data?.error)
          } else{
            setAuth({...auth, user: data?.updatedUser})
            let ls = localStorage.getItem('auth');
            ls=JSON.parse(ls);
            ls.user=data.updatedUser;
            localStorage.setItem("auth",JSON.stringify(ls));
            toast.success("Profile Updated Successfully")
          }

        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
  
    }


  return (
    <Layout title={'Your Profile'}>

        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>Your Profile</h1>
                    <div className="register form-container">
                        <form onSubmit={handleSubmit}>
                            <h4 className='title'>USER PROFILE</h4>
                            <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputName" placeholder='Enter your Name'
                                     value={name} onChange={(e)=> setName(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <input type="Email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email'
                                 value={email} onChange={(e)=> setEmail(e.target.value)} required disabled />
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

                           
                                <button type="submit" className="btn btn-primary">UPDATE</button>
                        </form>

                </div>
                </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Profile
