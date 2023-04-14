import React from 'react'
import Layout from '../components/Layout/Layout';
import AnoutUs from '../Images/about-us.jpg';

const About = () => {
  return (
    <Layout title="About us - Ecommer app">
     <div className="row contactus">
        <div className="col-md-6">
          <img src={AnoutUs} alt="contactus" style={{width: '100%'}}/>
        </div>

        <div className="col-md-4">
          <h1 className='text-center'>ჩვენს შესახებ</h1>

          <p className='text-justify mt-2'>
          კონტინუმი გახლავთ ონლაინ მაღაზია, სადაც თქვენ შეგიძლიათ ყველაზე დაბალ ფასად შეიძინოთ უკაბელო ყურსასმენები,
           ჭკვიანი საათები, სმარტფონისთვის განკუთვნილი სხვადასხვა აქსესუარები და საინტერესო მოწყობილობები,
            რომლებიც ეტაპობრივად შემოთავაზებული იქნება ჩვენს საიტსა და გვერდზე.
          </p>

        </div>
      </div>
    </Layout>
  )
}

export default About
