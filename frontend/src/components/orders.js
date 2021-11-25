import React, {useEffect, useState} from 'react'
import {getAllCheckout, acceptOrder, rejectOrder} from '../redux/actions/checkout'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {Row, Col} from 'antd'
import './cart.css'
import axios from 'axios'
import {remove, indexOf} from 'ramda'
 
function Orders() {
    const dispatch = useDispatch()
    const[data, setData] = useState([])
    useEffect(() => {
        dispatch(getAllCheckout())
      }, [])
      const { checkout } = useSelector((state) => state.checkout);
      console.log("checkout", checkout)
    //   const check = checkout.map((product)=> product.ordered.map((prod) => prod.price))

      const acceptHandler = (check) => {
        // const index = indexOf(check, checkout)
        // const newData = remove(index, 1, checkout)
        //  setData(newData)
          const id = check._id
       dispatch(acceptOrder(id, check))
      }
      const declineHandler = async(check) =>{
          dispatch(rejectOrder(check))
        // const response = await axios.put('/api/checkout', check)
      }

    return (
        <div>    
                 <Row className="order">
                     <Link to="/admin/dashboard/orders/accepted">
                         <button className="order-btn">Accepted Orders</button>
                     </Link>
                     <Link to="/admin/dashboard/orders/declined">
                         <button className="order-btn">Declined Orders</button>
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
                                    <Row className="order-row" key={check._id}>
                                        <Col span={3}>
                                            <img className="img" src={`/uploads/${check.fileName}`}/>
                                        </Col>
                                        <Col span={3}>
                                            {check.productName}<br/>
                                        </Col>
                                        <Col span={2}>
                                            {check.quantity}
                                        </Col>
                                        <Col span={2}>
                                            {check.price}
                                        </Col>
                                        <Col span={4}>{check.address}</Col>
                                        <Col span={3}>{check.phone}</Col>
                                        <Col span={3}>{check.email}</Col>
                                        <Col span={2}><button onClick={() => acceptHandler(check)}>accept</button></Col>
                                        <Col span={2}><button onClick={() => declineHandler(check)}>decline</button></Col>
                                    </Row>
                            </>
                        )
                    })}
        </div>
    )
}

export default Orders
