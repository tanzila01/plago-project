import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// import { API_URL as url } from '../constants'
import {deleteProducts} from '../redux/actions/productAction';

const Card = ({product}) => {
    
     // const openNewPage = () => {
    //     window.open('http://localhost:3000/admin/dashboard/image', "_blank")
    // }
    // this is card

    console.log("products in card", product)

    const dispatch = useDispatch()
    return (
        <div className="col-md-4 my-3">
             <div className="card">
             <Link 
             to={{
              pathname: "/admin/dashboard/image",
              state: {product}
            }}
          > 
          
              <img
            //   onClick={openNewPage}
              className="img-thumbnail"
            //    src={'uploads/1636206802603.jpg'} 
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
              <Link to={`/admin/edit/product/${product._id}`} type="button" className="btn btn-secondary btn-sm mr-1 my-1" style={{marginRight: '8px'}}>
                    <i className="far fa-edit pr-1"></i> Edit
              </Link>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProducts(product._id))}>
                    <i className="far fa-trash-alt pr-1"></i> Delete
              </button>
          </div>
             </div>
        </div> 
    )
}

export default Card