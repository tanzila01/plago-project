import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteProducts} from '../redux/actions/productAction';
import { getLocalStorage } from '../helpers/localStorage';
import {addCart} from '../redux/actions/cart'


const Card = ({product}) => {    
     // const openNewPage = () => {
    //     window.open('http://localhost:3000/admin/dashboard/image', "_blank")
    // }
    const dispatch = useDispatch()
    const[role, setRole] = useState(false)
    useEffect(() => {
      let storage = getLocalStorage();
      if(storage.role === 1){
        setRole(true)
      }
    })

    const buyHandler = (data) => {
      alert("item added to cart")
      console.log("data of btn", data)
      // addToCart(data)
      // .then((response) => {
      //   console.log("cart response", response)
      // })
      dispatch(addCart(data))
    }

    return (
        <div className="col-md-4 my-3">
             <div className="card">
             <Link 
             to={{
              pathname: "/image",
              state: {product}
            }}
          > 
          
              <img
              className="img-thumbnail"
               src={`/uploads/${product.image}`} 
               alt="product"
              />
            </Link>
          <div className="card-body text-center">
              <h5>{product.productName}</h5>
              <hr />
              <h6 className="mb-3">
         <span className="text-secondary mr-2">
       {
           product.productPrice.toLocaleString('en-US' , {
                style: 'currency',
                currency: 'USD'
           })
       }
         </span>
              </h6>
              <p> {product.productDesc.length > 60 ? (product.productDesc.substring(0,60) + "....") : (product.productDesc.substring(0,60))}</p>
              {role ? (
                <>
                  <Link to={`/admin/edit/product/${product._id}`} type="button" className="btn btn-secondary btn-sm mr-1 my-1" style={{marginRight: '8px'}}>
                    <i className="far fa-edit pr-1"></i> Edit
                  </Link>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProducts(product._id))}>
                        <i className="far fa-trash-alt pr-1"></i> Delete
                  </button>
                </>
              ) : <button onClick={() => buyHandler(product)}>buy</button>}
          </div>
             </div>
        </div> 
    )
}

export default Card