import React,{useState} from 'react';
import { ErrorMessage, SuccessMessage } from "../helpers/message";
import { Loading } from "../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import {useSelector , useDispatch} from 'react-redux';
import {clearMessages} from '../redux/actions/messageAction';
import {createProduct} from '../redux/actions/productAction';



const AdminProductModal = () => {
     const {loading} = useSelector(state => state.loading)
     const {successMsg , errorMsg} = useSelector(state => state.messages)
     const {categories} = useSelector(state => state.categories)
     const disptach = useDispatch()
     const [clientErrorMsg , setClientErrorMsg] = useState('')

    const [productData, setProductData] = useState({
      productImage: [],
      productName: "",
      productDesc: "",
      productPrice: "",
      productCategory: ""
    });
    const {
        productImage,
        productName,
        productDesc,
        productPrice,
        productCategory
      } = productData;
    
    
      const handleMessages = (e) => {
             disptach(clearMessages())
             setClientErrorMsg('')
      };
    
      const handleProductImage = (e) => {
        setProductData({
          ...productData,
          [e.target.name]: e.target.files,
        });
        console.log("all files", e.target.files)
      };
    
      const handleProductChange = (e) => {
        setProductData({
          ...productData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleProductSubmit = (e) => {
        e.preventDefault();
        if (productImage === []) {
          setClientErrorMsg("Please Select an Image");
        } else if (
          isEmpty(productName) ||
          isEmpty(productPrice) ||
          isEmpty(productDesc)
        ) {
          setClientErrorMsg("All fields are required");
        } else if (isEmpty(productCategory)) {
          setClientErrorMsg("Please Select  Category");
        } else {
          let formData = new FormData();
          for (let i = 0 ; i < productImage.length ; i++) {
            formData.append("images", productImage[i]);
           }
          // formData.append("productImage", productImage);
          formData.append("productName", productName);
          formData.append("productDesc", productDesc);
          formData.append("productCategory", productCategory);
          formData.append("productPrice", productPrice);
          console.log("formdata", formData)
         
           disptach(createProduct(formData))
            setProductData({
              productImage: [],
              productName: "",
              productDesc: "",
              productPrice: "",
              productCategory: "",
            })
        }
      };
    
    return (

        <div id="addFoodModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleProductSubmit}>
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add Food</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body my-2">
                <div>{errorMsg !== '' ? ErrorMessage(errorMsg) : null}</div>
                <div>{clientErrorMsg !== '' ? ErrorMessage(clientErrorMsg) : null}</div>
                <div>
                  {successMsg !== '' ? SuccessMessage(successMsg) : null}
                </div>
                {loading !== false ? (
                  <div className="text-center"> {Loading()} </div>
                ) : (
                  <>
                    <div className="custom-file mb-2">
                      <input
                        type="file" multiple
                        className="custom-file-input"
                        name="productImage"
                        // defaulValue={productImage}
                        onChange={handleProductImage}
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        defaultValue={productName}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="productDesc"
                        defaultValue={productDesc}
                        onChange={handleProductChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productPrice"
                        defaultValue={productPrice}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="form-group col-md-6">
                        <label className="text-secondary">Category</label>
                        <select
                          className="form-select"
                          name="productCategory"
                          onChange={handleProductChange}
                        >
                          <option value="">Choose one...</option>
                          {categories &&
                            categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.category}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal" className="btn btn-secondary">
                  Close
                </button>
                <button type="submit" className="btn btn-warning text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default AdminProductModal


// import React,{useState} from 'react';
// import { ErrorMessage, SuccessMessage } from "../helpers/message";
// import { Loading } from "../helpers/loading";
// import isEmpty from "validator/lib/isEmpty";
// import {useSelector , useDispatch} from 'react-redux';
// import {clearMessages} from '../redux/actions/messageAction';
// import {createProduct} from '../redux/actions/productAction';



// const AdminProductModal = () => {
//      const {loading} = useSelector(state => state.loading)
//      const {successMsg , errorMsg} = useSelector(state => state.messages)
//      const {categories} = useSelector(state => state.categories)
//      const disptach = useDispatch()
//      const [clientErrorMsg , setClientErrorMsg] = useState('')

//     const [productData, setProductData] = useState({
//       productImage: [],
//       productName: "",
//       productDesc: "",
//       productPrice: "",
//       productCategory: ""
//     });

    
//     const {
//         productImage,
//         productName,
//         productDesc,
//         productPrice,
//         productCategory
//       } = productData;
    
    
//       const handleMessages = (e) => {
//              disptach(clearMessages())
//              setClientErrorMsg('')
//       };
    
//       const handleProductImage = (e) => {
//         console.log("data is: ", e)
//         setProductData({
//           ...productData,
//           [e.target.name]: e.target.files,
//         });
//         console.log("file event", e.target.files)
//       };
    
//       const handleProductChange = (e) => {
//         setProductData({
//           ...productData,
//           [e.target.name]: e.target.value,
//         });
//       };
    
//       const handleProductSubmit = (e) => {
//         e.preventDefault();
//         if (productImage === []) {
//           setClientErrorMsg("Please Select an Image");
//         } else if (
//           isEmpty(productName) ||
//           isEmpty(productPrice) ||
//           isEmpty(productDesc)
//         ) {
//           setClientErrorMsg("All fields are required");
//         } else if (isEmpty(productCategory)) {
//           setClientErrorMsg("Please Select  Category");
//         } else {
//           let formData = new FormData();
//           for (let i = 0 ; i < productImage.length ; i++) {
//             formData.append("productImage", productImage[i]);
//            }
//           // formData.append("productImage", productImage);
//           formData.append("productName", productName);
//           formData.append("productDesc", productDesc);
//           formData.append("productCategory", productCategory);
//           formData.append("productPrice", productPrice);
//           console.log("formdata", formData)
         
//           disptach(createProduct(productImage, ))
//             setProductData({
//               productImage: [],
//               productName: "",
//               productDesc: "",
//               productPrice: "",
//               productCategory: "",
//             })
//         }
//       };
    
//     return (

//         <div id="addFoodModal" className="modal" onClick={handleMessages}>
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//           <div className="modal-content">
//             <form onSubmit={handleProductSubmit}>
//               <div className="modal-header bg-warning text-white">
//                 <h5 className="modal-title">Add Food</h5>
//                 <button className="btn-close" data-bs-dismiss="modal"></button>
//               </div>
//               <div className="modal-body my-2">
//                 <div>{errorMsg !== '' ? ErrorMessage(errorMsg) : null}</div>
//                 <div>{clientErrorMsg !== '' ? ErrorMessage(clientErrorMsg) : null}</div>
//                 <div>
//                   {successMsg !== '' ? SuccessMessage(successMsg) : null}
//                 </div>
//                 {loading !== false ? (
//                   <div className="text-center"> {Loading()} </div>
//                 ) : (
//                   <>
//                     <div className="custom-file mb-2">
//                       <input
//                         type="file" multiple
//                         className="custom-file-input"
//                         name="productImage"
//                         // defaultValue={productImage}
//                         onChange={handleProductImage}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label className="text-secondary">Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="productName"
//                         defaultValue={productName}
//                         onChange={handleProductChange}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label className="text-secondary">Description</label>
//                       <textarea
//                         className="form-control"
//                         rows="3"
//                         name="productDesc"
//                         defaultValue={productDesc}
//                         onChange={handleProductChange}
//                       ></textarea>
//                     </div>
//                     <div className="form-group">
//                       <label className="text-secondary">Price</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="productPrice"
//                         defaultValue={productPrice}
//                         onChange={handleProductChange}
//                       />
//                     </div>
//                     <div className="form-group row">
//                       <div className="form-group col-md-6">
//                         <label className="text-secondary">Category</label>
//                         <select
//                           className="form-select"
//                           name="productCategory"
//                           onChange={handleProductChange}
//                         >
//                           <option value="">Choose one...</option>
//                           {categories &&
//                             categories.map((c) => (
//                               <option key={c._id} value={c._id}>
//                                 {c.category}
//                               </option>
//                             ))}
//                         </select>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button data-bs-dismiss="modal" className="btn btn-secondary">
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-warning text-white">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
// }

// export default AdminProductModal
