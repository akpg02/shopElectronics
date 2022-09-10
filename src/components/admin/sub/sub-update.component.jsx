import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import CategoryForm from "../../forms/category/category-form.component";
import { fetchSub, removeSub, updateSub } from "../../../store/sub/sub.action";
import { fetchCategories } from "../../../store/category/category.action";

import { selectCurrentCategory } from "../../../store/category/category.selector";
import { selectCurrentSub } from "../../../store/sub/sub.selector";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import LocalSearch from "../../forms/search/local-search.component";

function SubUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { categories, isPending } = useSelector(selectCurrentCategory);
  const { sub } = useSelector(selectCurrentSub);
  const [category, setCategory] = useState("");
  const { slug } = useParams();

  const loadCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  const loadSub = useCallback(async () => {
    await dispatch(fetchSub(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, [loadCategories, loadSub]);

  useEffect(() => {
    if (sub) {
      setCategory(sub);
      setName(sub.name);
    }
  }, [sub]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateSub(slug, { name, parent: category }));
    setName("");
    navigate("/admin/sub");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">
          <div className="container">
            {isPending ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="mb-4 mt-3">Update Subcategory</h4>
            )}

            <div className="form-group">
              <label htmlFor="">Parent Category</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select a category</option>
                {categories &&
                  categories.length > 0 &&
                  categories.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === category.parent}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
