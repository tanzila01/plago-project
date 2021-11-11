import React, {useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom";
import {Row, Col} from 'antd'
import 'antd/dist/antd.css';
import "./viewImageDescription.css"
import ImageZoom from './imageZoom';

function ViewImageDescription({product}) {
    //just pushed

    const[image, setImage] = useState("")
    const[products,setProducts] = useState({})

    const location = useLocation();
           
    useEffect(() => {
        setImage(location.state.product.image);
        setProducts(location.state.product)
      }, []);
    
    const imageHandler = (item) => {
        // alert("clicked")
        console.log("item", item)
        setImage(item)
    }

    // const location = useLocation();
    // console.log("location", location)
    // console.log("location state",location.state)
    // console.log("prod name", location.state.product.productName)
    // console.log("prod image", location.state.product.image)
    // const image = location.state.product.image;
    console.log("image", image)

    const prodFileName = location.state.product.fileName.map((file) => file.fileName);
    console.log("prodfilesnames", prodFileName)
    const oneFileName = prodFileName.map((file) => file)
    console.log("prods", products)
    

    return (
        <>
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
