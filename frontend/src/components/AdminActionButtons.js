import React, {useEffect, useState} from "react";
import { getLocalStorage } from "../helpers/localStorage";
import { Link } from "react-router-dom";
 
const AdminActionButtons = ({proLength, catLength}) => {

  const[role, setRole] = useState(false)
  useEffect(() => {
    let storage = getLocalStorage();
    if(storage.role === 1){
      setRole(true)
    }
  })
  
  return (
    <div>
      <div className="bg-dark my-2">
        <div className="container">
          <div className="row pb-3">

    {role ? (
        <>
         <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-info w-100"
                data-bs-toggle="modal"
                data-bs-target="#addCategoryModal"
              >
                <i className="fas fa-plus"> Add Category </i>
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-warning w-100"
                data-bs-toggle="modal"
                data-bs-target="#addFoodModal"
              >
                <i className="fas fa-plus"> Add Food- {proLength}</i>
              </button>
            </div>
        </>
    ) : (
      <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-warning w-100"
                data-bs-toggle="modal"
                data-bs-target="#addFoodModal"
              >
                <Link to="/user/dashboard/cart">Your Cart</Link>
              </button>
            </div>
    )}

            <div className="col-md-4 my-1">
              <button className="btn btn-outline-success w-100" 
                 data-bs-toggle="modal"
                data-bs-target="#viewCategoryModal">
                <i className="fas fa-money-check-alt"> View Category {catLength}</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActionButtons;
