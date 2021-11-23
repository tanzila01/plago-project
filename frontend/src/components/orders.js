import React, {useEffect, useState} from 'react'
import {getAllCheckout} from '../redux/actions/checkout'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {Row, Col} from 'antd'
import './cart.css'

function Orders() {
    const dispatch = useDispatch()
    const[data, setData] = useState([])
    useEffect(() => {
        dispatch(getAllCheckout())
      }, [])
      const { checkout } = useSelector((state) => state.checkout);
      console.log("checkout", checkout)
      const check = checkout.map((product)=> product.ordered.map((prod) => prod.price))
      console.log("maps", check)
    //   const newCheck = check.map((prod) => prod)
    //   console.log("one map", newCheck)
    return (
        <div>    
                 <Row className="order">
                     <Link to="/admin/dashboard/orders/accepted">
                         <button className="order-btn">Accepted Orders</button>
                     </Link>
                     <Link to="/admin/dashboard/orders/declined">
                         <button className="order-btn">Accepted Orders</button>
                     </Link>
                 </Row>
                 <Row className="order-rows">
                    <Col span={3}>Image</Col>
                    <Col span={3}>Product</Col>
                    <Col span={2}>quantity</Col>
                    <Col span={2}>Price</Col>
                    <Col span={4}>Address</Col>
                    <Col span={3}>Phone</Col>
                    <Col span={3}>Email</Col>
                    <Col span={2}>Accept</Col>
                    <Col span={2}>Decline</Col>
                </Row>
                   {checkout.map((check) => {
                        return(
                            <>
                                {check.ordered.map((prod) =>{ 
                                return(
                                    <Row className="order-row">
                                        <Col span={3}>
                                            <img className="img" src={`/uploads/${prod.fileName}`}/>
                                        </Col>
                                        <Col span={3}>
                                            {prod.productName}<br/>
                                        </Col>
                                        <Col span={2}>
                                            {prod.quantity}
                                        </Col>
                                        <Col span={2}>
                                            {prod.price}
                                        </Col>
                                        <Col span={4}>{check.address}</Col>
                                        <Col span={3}>{check.phone}</Col>
                                        <Col span={3}>{check.email}</Col>
                                        <Col span={2}><button>accept</button></Col>
                                        <Col span={2}><button>decline</button></Col>
                                    </Row>
                                )})}
                            </>
                        )
                    })}
        </div>
    )
}

export default Orders
