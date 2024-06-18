import React, {useEffect, useState} from 'react'
import {getAccepted} from '../redux/actions/orders'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {Row, Col} from 'antd'
import './cart.css'
import axios from 'axios'
 
    

function AcceptedOrders() {
    const dispatch = useDispatch()
    const[data, setData] = useState([])
    useEffect(async() => {
        // dispatch(getAccepted())
        const response = await axios.get('/api/orders')
        console.log("response", response.data.checkout)
        const newData = response.data.checkout
        console.log("new", newData)
        setData(newData)
      }, [])
    //   const { orders } = useSelector((state) => state.orders);
    //   console.log("orders",orders)
    console.log("setdata", data)

    return (
        <div>    

        <Row className="order-rows">
           <Col span={3}>Image</Col>
           <Col span={3}>Product</Col>
           <Col span={3}>quantity</Col>
           <Col span={3}>Price</Col>
           <Col span={4}>Address</Col>
           <Col span={4}>Phone</Col>
           <Col span={4}>Email</Col>
       </Row>
          {data.map((check) => {
              console.log("check.price", check)
               return(
                   <>
                         <Row className="order-row">
                               <Col span={3}>
                                   <img className="img" src={`/uploads/${check.fileName}`}/>
                               </Col>
                               <Col span={3}>
                                   {check.productName}<br/>
                               </Col>
                               <Col span={3}>
                                   {check.quantity}
                               </Col>
                               <Col span={3}>
                                   {check.price}
                               </Col>
                               <Col span={4}>{check.address}</Col>
                               <Col span={4}>{check.phone}</Col>
                               <Col span={4}>{check.email}</Col>
                           </Row>
                   </>
               )
           })}
</div>
    )
}

export default AcceptedOrders
