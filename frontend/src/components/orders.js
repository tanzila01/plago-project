import React, {useEffect, useState} from 'react'
import {getAllCheckout} from '../redux/actions/checkout'
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'antd'

function Orders() {
    const dispatch = useDispatch()
    const[data, setData] = useState([])
    useEffect(() => {
        dispatch(getAllCheckout())
      }, [])
      const { checkout } = useSelector((state) => state.checkout);
      console.log("checkout", checkout)
    return (
        <div>
            <Row>
                <Col span={22} offset={1}>
                   {checkout.map((check) => {
                        return(
                            <Row>
                                <Col>here</Col>
                            </Row>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default Orders
