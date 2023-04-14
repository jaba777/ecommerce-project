import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';




const ProductDetails = () => {
  const params = useParams();
  const [product,setProduct]=useState({});
  const [relateProducts,setRelateProducts] = useState([]);
  const {cart,setCart} = useCart();
  const navigate=useNavigate()
  //getProduct 

  const getProduct = async ()=>{
    try {
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`) 
      setProduct(data?.product)
      getSimilarProduct(data?.product?._id,data?.product?.category?._id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(params?.slug) getProduct()
  },[params?.slug]);


  //get similar product

  const getSimilarProduct= async (pid,cid)=>{
    try {
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
      setRelateProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="row container mt-4">
        <div className="col-md-6">
        <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} 
        className="card-img-top" 
        alt={product?.name} 
        height="300"
        width={"350px"}
        style={{objectFit: 'contain'}}
        />
        </div>
        <div className="col-md-6">
          <h1 className='text-center'>Product Details</h1>
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: {product?.price}</h6>
         <h6>Category: {product?.category?.name}</h6>
         <button className="btn btn-secondary ms-1" onClick={()=>{
                          setCart([...cart,product])
                          localStorage.setItem('cart',JSON.stringify([...cart,product]))
                          toast.success('Item Added to cart')
                        }}>ADD TO CART</button>
        </div>
      </div>
        <hr />
      <div className="row mt-4 container">
        <h6>Similar Products</h6>
        {relateProducts.length <1 && <p className='text-center'>No Similar Products Found</p>}
        { relateProducts?.map(p=>(
                <div className="card m-4" style={{width: "20rem"}} key={p._id}>
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}...</p>
                        <p className="card-text">${p.price}</p>
                      
                        <button className="btn btn-primary ms-1 mt-2" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className="btn btn-secondary ms-1 mt-2" onClick={()=>{
                          setCart([...cart,p])
                          localStorage.setItem('cart',JSON.stringify([...cart,p]))
                          toast.success('Item Added to cart')
                        }}>ADD TO CART</button>
                      
                    </div>
                </div>         
          ))}
      </div>
    </Layout>
  )
}

export default ProductDetails
