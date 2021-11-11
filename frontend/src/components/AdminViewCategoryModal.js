import React, {useState} from "react";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import {deleteCategories} from '../redux/actions/categoryAction';
import {Table} from "react-bootstrap";
import  axios from 'axios';
import {getCookie} from '../helpers/cookies';

const AdminViewCategoryModal = () => {
  let token = getCookie()
  const [changeName, setChangeName] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch()

const handleChangeName = (e, dataID) =>{
        e.preventDefault()
    setChangeName(true)
   
}

const handleClsoe = (e, dataID) =>{
  e.preventDefault()
setChangeName(false)

}
 
const handleEditCategory = async (e, dataId) => {
  e.preventDefault()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  await axios
  .put(`/api/category`, {categoryName, dataId}, config)
    .then((res) => {
       window.location.reload()
       setChangeName(false)
    })
    .catch((err) => {
      console.log("eror", err);
    });
}


  return (
    <div id="viewCategoryModal" className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <div className="modal-header bg-success text-white">
              <h5 className="modal-title">View Category</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body my-2">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((cat) => (
                  <tr>
                    {/* <td>{cat._id}</td> */}
                   {changeName === false ?  <td>{cat.category}</td>  :  <td style={{display: 'flex'}}> <input
                          type="text"
                          className="form-control"
                          style={{width: "200px"}}
                          name="category"
                          defaultValue={cat.category}
                         onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <button type="button" style={{marginLeft: '10px', marginRight: '5px'}} className="btn btn-success btn-sm" onClick={(e) =>  handleClsoe(e, cat._id)}>
                    <i className="fas fa-times pr-1"></i>
              </button>
                        <button type="button" className="btn btn-info btn-sm">
                    <i className="fas fa-check pr-1" onClick={(e) => handleEditCategory(e, cat._id)}></i>
              </button>
                        </td>
                        }
                    <td><button type="button" className="btn btn-success btn-sm" onClick={(e) =>  handleChangeName(e, cat._id)}>
                    <i className="far fa-edit pr-1"></i>
              </button></td>
                    <td><button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(deleteCategories(cat._id))}>
                    <i className="far fa-trash-alt pr-1"></i>
              </button></td>
                  </tr>
                ))}
            </tbody>
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewCategoryModal;
