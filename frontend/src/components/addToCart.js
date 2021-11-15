import React from 'react'

function AddToCart({product}) {
    console.log("product in cart", product)
    const addToCartHandler = () => {
        alert ("added")
        // console.log("data in button", data)
    }
    return (
        <div>
            <button onClick={addToCartHandler}>Buy</button>
        </div>
    )
}

export default AddToCart
