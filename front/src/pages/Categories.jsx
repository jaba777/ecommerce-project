import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hook/useCategory'
import { Link } from 'react-router-dom'


const Categories = () => {

    const categories=useCategory();


  return (
    <Layout title={'All Categories'}>
      <div className="container">
        <div className="row category-Conteiner">
            {categories.map(c=> (
             <div className="col-md-3 category-box" key={c._id}>
                 
               <Link to={`/category/${c.slug}`}>{c.name}</Link>
                
             </div>
            ))}
           
        </div>
      </div>
    </Layout>
  )
}

export default Categories
