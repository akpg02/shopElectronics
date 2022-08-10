import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import { selectCurrentUser } from "../../../store/auth/auth.selector";
import {
  createCategory,
} from "../../../store/category/category.action";

function CategoryCreate() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setIsLoading(false);
        setName("");
        toast.success(`${res.data.name} successfully created.`);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data);
        }
      });
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
