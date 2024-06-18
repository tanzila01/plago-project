import React, {useState, useEffect} from 'react'
import { useLocation} from "react-router-dom";
import {Row, Col} from 'antd'
import 'antd/dist/antd.css';
import "./viewImageDescription.css"
import ImageZoom from './imageZoom';
import Header from './Header';

function ViewImageDescription({product}) {

    const[image, setImage] = useState("")
    const[products,setProducts] = useState({})

    const location = useLocation();
           
    useEffect(() => {
        setImage(location.state.product.image);
        setProducts(location.state.product)
      }, []);
    
    const imageHandler = (item) => {
        setImage(item)
    }

    const prodFileName = location.state.product.fileName.map((file) => file.fileName);
    const oneFileName = prodFileName.map((file) => file)
    
    return (
        <>
        <Header/>
            <Row>
                <Col span={10} className="col1">
                    <div className="images">
                        <img className="img-display hover-zoom" src={`/uploads/${image}`}/>
                        {/* <ImageZoom image={image}/> */}
                    </div>
                    <div className="img-div">
                        {prodFileName.map((item, index) => (
                                <img className="thumb-img" key={index} onClick={() => imageHandler(item)}
                                   src={`/uploads/${item}`}
                                className="img-size"
                                />   
                        ))}
                    </div>
                </Col>
                <Col span={14} className="col2">
                    <>
                    <div className="name">{products.productName}</div>
                    <div className="desc">{products.productDesc}</div>
                    <div className="price"> <h4 style={{color: "white"}}>Price</h4>
                        {products.productPrice}</div>
                    </>
                </Col>
            </Row>
        </>
    )
}

export default ViewImageDescription
