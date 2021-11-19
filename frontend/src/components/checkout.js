import React, {useEffect, useState} from 'react'
import { useLocation} from "react-router-dom";


function Checkout({data}) {
    // const[cartData,setCartData] = useState({})

    const location = useLocation();
    console.log("total price", location.state)

    // useEffect(() => {
    //     setCartData(location.state.Totaldata)
    //   }, []);
    //   console.log("setCArtData", setCartData)
    return (
        <div>
            checkout component
        </div>
    )
}

export default Checkout
