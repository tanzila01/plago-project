import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminActionButtons from "./AdminActionButtons"

const AdminHeader = ({oneFileName}) => {
//  console.log('onefile in header',  oneFileName)
  // const[proLength, setProLength] = useState(0)

  // useEffect(() => {
  //   getproLength()
  // },[]);

  const { products } = useSelector((state) => state.products);
  // console.log("products from header", products)
  // console.log("pro cat id", products.productCategory._id)
  const proLength = products.length;
  console.log("product length", proLength)

  const { categories } = useSelector((state) => state.categories);
  console.log("cats", categories)
  const catLength = categories.length;
  console.log("cat length", catLength)


  // const getproLength = async () =>{
  //   const {data: getName} =  await axios.get('/api/product')
  //   console.log("my data", getName.products.length)
  //   setProLength(getName.products.length)
  // }

  return (
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <i className="fas fa-home"> Dashboard</i>
              {/* <button onClick={getproductName}>ProLength</button> */}
            </h1>
          </div>
          <AdminActionButtons proLength={proLength} catLength={catLength}/>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
