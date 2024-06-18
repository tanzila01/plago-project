import React, {useEffect, useState} from 'react'
import Header from './Header'
import {useDispatch, useSelector} from 'react-redux';
import {getCart} from '../api/cart'
import {Row, Col} from 'antd'
import './cart.css'
import axios from 'axios'
import {findIndex, propEq, indexOf, clone, remove, update} from 'ramda'
import {getAllCart, editCartInc} from '../redux/actions/cart'
import { Link } from "react-router-dom";

function Cart() {
          const dispatch = useDispatch();

    const[data, setData] = useState([{
        fileName: "",
        price: 0,
        productName: "",
        quantity: 1
    }])

      useEffect(() => {
        getCart()
        .then((response) => {
            console.log("get cart resp", response)
            setData(response.data.cart)
        })
        // dispatch(getAllCart());
      }, [])

    const{cart} = useSelector(state => state.cart)
    console.log("cart", cart)

    const ids = data.map((prod) => prod._id)
      console.log("ids", ids)

      const decreaseQuantity = async(id, dat) => {
        const response = await axios.put(`/api/cart/${id}`, dat)
        const index = findIndex(propEq("_id", dat._id))(data)
        if(dat.quantity > 1){
            const newQ = dat.quantity - 1
        const newPrice = dat.price - dat.price/dat.quantity
        const newDat = {
            ...dat,
            quantity: newQ,
            price: newPrice
        }
        const newData = update(index, newDat, data )
        setData(newData)
        }else{
            setData(dat)
        }
        
      }
      
//       const increaseQuantity = async(id) => {
//         dispatch(editCartInc(id))
//    }

      const increaseQuantity = async(dat) => {
        const response = await axios.put('/api/cart', dat)
        const index = findIndex(propEq("_id", dat._id))(data)
        const newQ = dat.quantity + 1
        const newPrice = dat.price + dat.price/dat.quantity
        const newDat = {
            ...dat,
            quantity: newQ,
            price: newPrice
        }
        const newData = update(index, newDat, data )
        setData(newData)
    }

    const clearCartHandler = async() => {
        setData([])
        await axios.delete('/api/cart')
    }

      const removeHandler = async(id, dat) => {
        const index = indexOf(dat, data)
        const newData = remove(index, 1, data)
         setData(newData)
          await axios.delete(`/api/cart/${id}`)
      }
      const tPrice =  data.reduce(
        (sum, product) => sum + product.price/product.quantity * product.quantity,0)
      console.log("tprcie", tPrice)

    return (
        <div>
            <Header/>
            <div className="cart-div">
                <Row className="cart-rows">
                    <Col span={5}>Product</Col>
                    <Col span={5}>Name</Col>
                    <Col span={5}>Price</Col>
                    <Col span={5}>Quantity</Col>
                    <Col span={4}>Remove</Col>
                </Row>
                {data.map((dat) => 
                            {return(
                                <>
                                   <Row className="cart-row">
                                        <Col span={5}>
                                            <img className="img" src={`/uploads/${dat.fileName}`}/>
                                        </Col>
                                        <Col span={5}>{dat.productName}</Col>
                                        <Col span={5}>{dat.price}</Col>
                                        <Col span={5}>
                                           <button onClick={() => decreaseQuantity(dat._id, dat)}>-</button>
                                           {dat.quantity}
                                           <button onClick={() => increaseQuantity(dat)}>+</button>
                                        </Col>
                                        <Col sp={4}>
                                            <button onClick={() => removeHandler(dat._id, dat)}>Remove</button>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        )}
                <Row>
                    <Col offset={6} span={6}>
                          Total Price:
                           { data.reduce(
                              (sum, product) => sum + product.price/product.quantity * product.quantity,0)
                              }
                    </Col>
                    <Col><button onClick={clearCartHandler}>Clear Cart</button></Col>
                    <Col>
                        <Link 
                        to={{
                         pathname: "/user/dashboard/cart/checkout",
                         state: {tPrice, ids, data}
                       }}>
                            <button>Checkout</button>
                        </Link>
                        {/* <button totalPrice={data}>
                        <Link to="/user/dashboard/cart/checkout">checkout</Link> </button> */}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart
