import React,{useState,useEffect,useCallback} from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {Checkbox,Radio} from 'antd' 
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';



const HomePage = () => {
  const navigate = useNavigate();
  const {cart,setCart} = useCart();
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(true)


  //getTOtal count

  const getTotal = async () => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count');
      setTotal(data?.total);
      
    } catch (error) {
      console.log(error);

    }
  }



  //get all category

  const getAllCategory= async()=>{
    
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    getAllCategory();
    getTotal();
  },[])



  //get products

  const getAllProducts= async () => {
    try {
      setLoading(true);
      const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  // load more

  const Loadmore=async () =>{
    try {
      setLoading(true);
      const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(page === 1) return;
    Loadmore();
  },[page]);

  const handleFilter =(value,id) =>{
    let all = [...checked];

    if(value){
      all.push(id);
    } else{
      all=all.filter(e=> e!== id)
    }

    setChecked(all);

  }


  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts();
  },[checked.length,radio.length])


  //get filtered product

  const filterProduct=async()=>{
    
    try {
      const {data}=await axios.post('http://localhost:8080/api/v1/product/product-filters',{checked,radio});
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  //const callback=useCallback(()=>{
    // filterProduct()
  //})

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[filterProduct,checked.length,radio.length])
 


  return (
    <Layout title="All Products - Best offers">
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e=> setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={()=> window.location.reload()}>RESET FILTERS</button>
          </div>

        </div>
        <div className="col-md-9 offest-1">
          
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
            {products.length!==0 ? (
              products?.map(p=>(
                <div className="card m-2" style={{width: "18rem"}} key={p._id}>
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}...</p>
                        <p className="card-text">GEL {p.price}</p>
                        <button className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className="btn btn-secondary ms-1" onClick={()=> {
                          setCart([...cart,p]);
                          localStorage.setItem('cart',JSON.stringify([...cart,p]))
                          toast.success('Item Added to cart')
                        }}>ADD TO CART</button>
                    </div>
                </div>         
          ))
            ) : <p>product not found</p>}
         
          </div>
          <div className='m-2 p-2'>
            {products && products.length < total && (
              <button className="btn btn-warning"
               onClick={(e) => {
                 e.preventDefault();
                 setPage(page + 1);
               }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
