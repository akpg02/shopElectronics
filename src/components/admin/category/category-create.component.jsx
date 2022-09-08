import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import CategoryForm from "../../forms/category/category-form.component";
import {
  createCategory,
  fetchCategories,
  removeCategory,
} from "../../../store/category/category.action";
import { selectCurrentCategory } from "../../../store/category/category.selector";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import LocalSearch from "../../forms/search/local-search.component";

function CategoryCreate() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { categories, isPending } = useSelector(selectCurrentCategory);
  const [keyword, setKeyword] = useState("");

  const loadCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCategory({ name }));
    loadCategories();
    setName("");
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug}?`)) {
      await dispatch(removeCategory(slug));
      loadCategories();
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
              <h4 className="mb-4 mt-3">Create category</h4>
            )}
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
            />
            <br />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          </div>

          {categories &&
            categories.filter(searched(keyword)).map((cat) => (
              <div className="alert alert-secondary" key={cat._id}>
                {cat.name}
                <span
                  onClick={() => handleRemove(cat.slug)}
                  className="btn btn-sm float-end"
                >
                  <AiOutlineDelete className="text-danger" />
                </span>{" "}
                <Link to={`/admin/category/${cat.slug}`}>
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

export default CategoryCreate;
