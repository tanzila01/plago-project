import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../redux/actions/productAction";
import { getCategories } from "../redux/actions/categoryAction";
import AdminHeader from "./AdminHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminEditProduct = ({ match, history }) => {
  const productId = match.params.productId;

  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const[productNames, setProductNames] = useState([]) 

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    getproductName()
    if (!product) {
      dispatch(editProduct(productId));
      dispatch(getCategories());
    } else {
      setProductImage(product.fileName);
      setProductName(product.productName);
      setProductPrice(product.productPrice);
      setProductDesc(product.productDesc);
      setProductCategory(product.productCategory);
    }
  }, [dispatch, productId, product]);

	const handleImageUpload = e => {
		const image = e.target.files[0];
		setProductImage(image);
	};

  const getproductName = async () =>{
      const {data: getName} =  await axios.get('/api/product')
      console.log("my data", getName.products.length)
      // console.log( getName.products.map((name) => name.productName))
      // setProductNames( getName.products.map((name) => name.productName))
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productCategory", productCategory);
    formData.append("productPrice", productPrice);
    const config = {
      headers: {
				'Content-Type': 'multipart/form-data',
			},
    };

    await axios
    .put(`/api/product/${productId}`, formData, config)
      .then((res) => {
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        console.log("eror", err);
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <Link to="/admin/dashboard">
              <span className="fas fa-arrow-left">Go Back</span>
            </Link>
            <div>
              <br />
              <div className="modal-content">
                <form onSubmit={handleProductSubmit}>
                  <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title">Update Food</h5>
                  </div>
                  <div className="modal-body my-2">
                    <>
                      <label className="btn btn-dark mr-4">
                        Choose file
                        <input
                          type="file"
                          name="productImage"
                          accept="images/*"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </label>
                      {productImage && productImage.name ? (
                        <span className="badge bg-secondary">
                          {productImage.name}
                        </span>
                      ) : productImage ? (
                        <img
                          className="img-thumbnail"
                          style={{
                            width: "120px",
                            height: "80px",
                          }}
                          src={`/uploads/${productImage}`}
                          alt="product"
                        />
                      ) : null}

                      <div className="form-group">
                        <label className="text-secondary">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="productDesc"
                          value={productDesc}
                          onChange={(e) => setProductDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productPrice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="form-group col-md-6">
                          <label className="text-secondary">Category</label>
                          <select
                            className="form-select"
                            name="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
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
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-warning text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;
