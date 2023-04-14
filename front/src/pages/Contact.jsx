import React from 'react'
import Layout from '../components/Layout/Layout';
import {BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi';
import Contactus from '../Images/istockphoto-1274394138-612x612.jpg';


const Contact = () => {
  return (
    <Layout title="Contact us">
      <div className="row gx-5 contactus">
        <div className="col-md-6">
          <img src={Contactus} alt="contactus" style={{width: '100%'}}/>
        </div>

        <div className="col-md-4">
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            any query and info about prodduct feel free to call anytime we 24X7 Valiable
          </p>
          <p className='mt-3'>
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 56835456443
          </p>

          <p className="mt-3">
            <BiSupport /> : 1800-1800-0000 (tol free)
          </p>

        </div>
      </div>
    </Layout>
  )
}

export default Contact
