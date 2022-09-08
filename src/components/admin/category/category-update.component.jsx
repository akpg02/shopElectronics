import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import CategoryForm from "../../forms/category/category-form.component";
import {
  updateCategory,
  fetchCategory,
} from "../../../store/category/category.action";
import { selectCurrentCategory } from "../../../store/category/category.selector";

function CategoryUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { category, isPending } = useSelector(selectCurrentCategory);
  const { slug } = useParams();

  useEffect(() => {
    const fetchSelectedCategory = async () => {
      await dispatch(fetchCategory(slug));
    };
    fetchSelectedCategory();
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug && category) {
      setName(category?.name);
    }
  }, [category, category?.name, slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateCategory(slug, { name }));
    navigate("/admin/category");
    setName("");
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
              <h4 className="mb-4 mt-3">Update category</h4>
            )}
            <CategoryForm
              name={name}
              setName={setName}
              handleSubmit={handleSubmit}
            />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;
