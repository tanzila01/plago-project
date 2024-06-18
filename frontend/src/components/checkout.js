import React, {useEffect, useState} from 'react'
import './checkout.css'
import { useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'antd';
import {getCart} from '../api/cart'
import Header from './Header';
import  {addCheckout} from '../redux/actions/checkout';


function Checkout() {
    const dispatch = useDispatch()
    const[product, setProduct] = useState([])
    useEffect(() => {
        getCart()
        .then((response) => {
            console.log("get cart resp", response.data.cart)
            setProduct(response.data.cart)
        })
      }, [])
      const proLength = product.length

    const[checkoutData,setCheckoutData] = useState({
        address: "", 
        phone: null,
        emails: "",
    })
    const[input, setInput] = useState(false)
    const[inputPhone, setInputPhone] = useState(false)
    const[inputEmail, setInputEmail] = useState(false)

    const location = useLocation();
    const price = location.state.tPrice
    const id = location.state.ids
    console.log("second arg",location.state.ids)
    console.log("3 arg",location.state.data)
    const allData = location.state.data

    console.log("All data", allData)
    const[data, setData] = useState({
        address: "address here", 
        phone: "000000",
        emails: "abc@gmail.com",
        total: price,
        ids: allData
    })
    // const {checkouts} = useSelector(state => state.checkout)
    // console.log("useselector checkout", checkouts)
    const addressEditHandler = () => {
        setInput(true)
    }

    const phoneEditHandler = () => {
        setInputPhone(true)
    }
    const emailEditHandler = () => {
        setInputEmail(true)
    }

    const changeHandler = (e) => {
        const newAddress = e.target.value
        // console.log("event", e.target.value)
        // console.log("adress", newAddress)
        setCheckoutData({
            ...checkoutData,
            [e.target.name]: e.target.value
        })
    }
    console.log("data",data)

    const saveHandler = () => {
        setInput(false)
        setData({
            ...data,
            address: checkoutData.address,
        })
    }
    const savePhoneHandler = () => {
        setInputPhone(false)
        setData({
            ...data,
            phone: checkoutData.phone,
        })
    }
    const saveEmailHandler = () => {
        setInputEmail(false)
        setData({
            ...data,
            emails: checkoutData.emails
        })
    }


    const cancelHandler = () => {
        setInput(false)
        setInputEmail(false)
        setInputPhone(false)
        setCheckoutData(data)
    }

    const checkoutHandler = () => {
        console.log("clicked")
        alert("your order has been placed");
        dispatch(addCheckout(data))
    }
    

    return (
        <div>
            <Header/>
            <Row>
                <Col className="check-col" span={8} offset={8}>
                    <Row className="check-row check-rows">CheckOut</Row>
                    <Row className="check-row">
                        {input ? (
                            <>
                            <input name="address" placeholder="address" onChange={changeHandler} value={checkoutData.address}></input>
                            <button onClick={saveHandler}>save</button>
                            <button onClick={cancelHandler}>cancel</button>
                            </>
                        ) : (
                            <>
                            <Col span={20}><p>{data.address}</p></Col>
                            <Col span={4}><button onClick={addressEditHandler}>edit</button></Col>
                            </>
                        )}                       
                    </Row>
                    <Row className="check-row">
                        {inputPhone ? (
                            <>
                            <input type="number" name="phone" placeholder="phone" onChange={changeHandler} value={checkoutData.phone}></input>
                            <button onClick={savePhoneHandler}>save</button>
                            <button onClick={cancelHandler}>cancel</button>
                            </>
                        ) : (
                            <>
                            <Col span={20}><p>{data.phone}</p></Col>
                            <Col span={4}><button onClick={phoneEditHandler}>edit</button></Col>
                            </>
                        )}
                    </Row>
                    <Row className="check-row">
                        {inputEmail ? (
                            <>
                            <input name="emails" placeholder="email" onChange={changeHandler} value={checkoutData.email}></input>
                            <button onClick={saveEmailHandler}>save</button>
                            <button onClick={cancelHandler}>cancel</button>
                            </>
                        ) : (
                            <>
                            <Col span={20}><p>{data.emails}</p></Col>
                            <Col span={4}><button onClick={emailEditHandler}>edit</button></Col>
                            </>
                        )}
                    </Row>
                    <Row className="summary">Order Summary:</Row>
                    <Row className="voucher">
                       <Col span={18} >Subtotal({proLength}-Items)</Col>
                       <Col span={6}>{price}Rs</Col>
                    </Row>
                    <Row className="voucher">Shipping</Row>
                    <Row className="voucher">Voucher Code</Row>
                    <Row className="voucher">
                       <Col span={18}>Total</Col>
                       <Col span={6}>{price}Rs</Col>
                    </Row>
                    <Row className="check-row check-rows">
                        <button onClick={checkoutHandler} className="check-rows">Buy</button>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}

export default Checkout
