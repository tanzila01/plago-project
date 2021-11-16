import React, {useEffect, useState} from 'react'
import Header from './Header'
import {getCart} from '../api/cart'
import {Row, Col} from 'antd'
import './cart.css'

function Cart() {
    const[data, setData] = useState([])
      useEffect(() => {
        getCart()
        .then((response) => {
            console.log("get cart resp", response)
            setData(response.data.cart)
        })
      }, [])
      console.log("set data", data)
    return (
        <div>
            <Header/>
            <div className="cart-div">
                <Row className="cart-rows">
                    <Col span={6}>Product</Col>
                    <Col span={6}>Name</Col>
                    <Col span={6}>Price</Col>
                    <Col span={6}>Quantity</Col>
                </Row>
                {data.map((dat) => {
                    <ul>
                        <li>{dat.price}</li>
                       
                    </ul>
                })}
                {data.map((dat) => 
                            {return(
                                <>
                                   <Row className="cart-row">
                                        <Col span={6}>
                                            <img className="img" src={`/uploads/${dat.fileName}`}/>
                                        </Col>
                                        <Col span={6}>{dat.productName}</Col>
                                        <Col span={6}>{dat.price}</Col>
                                        <Col span={6}>{dat.quantity}</Col>
                                    </Row>
                                </>
                            )}
                        )}
                <Row>
                    <Col span={6}>here</Col>
                    <Col span={6}>here</Col>
                    <Col span={6}>here</Col>
                    <Col span={6}>here</Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart
