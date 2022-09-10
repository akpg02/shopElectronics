import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import CategoryForm from "../../forms/category/category-form.component";
import { createSub, removeSub, fetchSubs } from "../../../store/sub/sub.action";
import { fetchCategories } from "../../../store/category/category.action";

import { selectCurrentCategory } from "../../../store/category/category.selector";
import { selectCurrentSub } from "../../../store/sub/sub.selector";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import LocalSearch from "../../forms/search/local-search.component";

function SubCreate() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { categories, isPending } = useSelector(selectCurrentCategory);
  const { subs } = useSelector(selectCurrentSub);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const loadCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  const loadSubs = useCallback(async () => {
    await dispatch(fetchSubs());
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, [loadCategories, loadSubs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createSub({ name, parent: category }));
    setName("");
    loadSubs();
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug}?`)) {
      await dispatch(removeSub(slug));
      loadSubs();
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              <h4 className="mb-4 mt-3">Create Subcategory</h4>
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
                    <option key={c._id} value={c._id}>
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
            <br />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          </div>

          {subs &&
            subs.filter(searched(keyword)).map((s) => (
              <div className="alert alert-secondary" key={s._id}>
                {s.name}
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-end"
                >
                  <AiOutlineDelete className="text-danger" />
                </span>{" "}
                <Link to={`/admin/sub/${s.slug}`}>
                  <span className="btn btn-sm float-end">
                    <AiOutlineEdit className="text-warning" />
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SubCreate;
