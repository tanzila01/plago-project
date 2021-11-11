import React, {useEffect, useState}  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import axios from "axios";
import { getCatProduct } from '../redux/actions/productAction';

const AdminBody = () => {

    const dispatch = useDispatch();

    const[isProduct, setIsProduct] = useState(false)
    const[prodcutId, setProductId] = useState("")

    const{catProducts} = useSelector(state => state.catProducts)
    
    let {products} = useSelector(state => state.products)
    // console.log("products admin body", products)
    const prodFileName = products.map((product) => product.fileName.map((file) => file.fileName))
    // console.log("fileNames array", prodFileName)
    const oneFileName = prodFileName.map((file) => file[0])
    // console.log("one filename", oneFileName)
    const updatedProducts = products.map((product, index) => {
        return {
            ...product,
            image: oneFileName[index]  
        }
    })
    console.log("updatedProducts", updatedProducts)

    const { categories } = useSelector((state) => state.categories);

    const getCatProducts = (catId) =>{
        dispatch(getCatProduct(catId))
    }

    const catIdHandler = (event) => {
        const catId = event.target.value
        getCatProducts (catId)
        setProductId(catId)
        setIsProduct(true)
    }

    const showAllProducts = () => {
        setIsProduct(false)
    }


    return (
        <div className="container">
             <div className="row pb-3">
             <select onChange={catIdHandler}>
                       <option>Select a category</option>
                        {categories.map((cat) => 
                            {return(
                                <>
                                   <option key={cat._id} value={cat._id}>{cat.category}</option>
                                </>
                            )}
                        )}
                    </select>

           {isProduct ? (
               <>
                  <button onClick={showAllProducts}>All products</button>
                   {/* {
                    catProducts.map( product=> (
                            <Card key={product._id} product={product} updatedProducts={updatedProducts} />
                        ))
                    } */}
                    {updatedProducts.filter(product => product.productCategory._id === prodcutId).map(prods => (
                        <>
                           <Card key={prods._id} product={prods} />
                        </>
                    ))}

               </>
           ) : (
               <>
                   {
                    updatedProducts.map( product=> (
                            <Card key={product._id} product={product}/>
                        ))
                    }
               </>
           )}             

            {/* filter products
                    {products.filter(product => product.productCategory._id === productId).map(prods => (
                        <>
                           <Card key={prods._id} product={prods} />
                        </>
                    ))} */}
         
         

                  </div>
             </div>
    )
}

export default AdminBody