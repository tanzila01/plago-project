import React from "react";
import { useSelector } from "react-redux";
import AdminActionButtons from "./AdminActionButtons"


const AdminHeader = () => {

  const { products } = useSelector((state) => state.products);
  const proLength = products.length;

  const { categories } = useSelector((state) => state.categories);
  const catLength = categories.length;

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
