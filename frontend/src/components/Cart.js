import React, {useEffect, useState} from 'react'
import Header from './Header'
import {getCart} from '../api/cart'
import {Row, Col} from 'antd'
import './cart.css'
import axios from 'axios'

function Cart() {
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
      }, [])

      const decreaseQuantity = async(id, dat) => {
        console.log("id in dec", id)
        console.log("dat in dec", dat)
        const response = await axios.put(`/api/cart/${id}`, dat)
        // const response = await axios.put('/api/cart/count', id)
        console.log("quant resp quantity",response.data.cartId)
        // setData(response.data.cartId)
      }
      const increaseQuantity = async(id) => {
        console.log("id in dec", id)
        const response = await axios.put('/api/cart', id)
        // console.log("quant resp",response)
        console.log("quant resp quantity",response.data.cartId)
        setData([...data,
            response.data.cartId])
    }
      console.log("set data", data)
      const removeHandler = async(id) => {
          await axios.delete(`/api/cart/${id}`)
      }
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
                                            <button onClick={() => removeHandler(dat._id)}>Remove</button>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        )}
                <Row>
                    <Col offset={6} span={6}>
                          Total Price
                           { data.reduce(
                              (sum, product) => sum + product.quantity * product.price,0)
                              }
                    </Col>
                    <Col><button>Checkout</button></Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart
