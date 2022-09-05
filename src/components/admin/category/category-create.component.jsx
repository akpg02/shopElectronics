import React, { useState } from "react";
import { useDispatch } from "react-redux";

import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import { createCategory } from "../../../store/category/category.action";

function CategoryCreate() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCategory({ name }));
    setName("");
  };

  const categoryForm = () => (
    <div className="container">
      <h4 className="mb-4 mt-3">Create category</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary mt-3">Save</button>
      </form>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">{categoryForm()}</div>
      </div>
    </div>
  );
}

export default CategoryCreate;
