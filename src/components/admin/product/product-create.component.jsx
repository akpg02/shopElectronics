import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import { createProduct } from "../../../store/product/product.action";
import { fetchCategories } from "../../../store/category/category.action";
import { fetchCategorySubs } from "../../../store/sub/sub.action";
import { selectCurrentProduct } from "../../../store/product/product.selector";
import { selectCurrentCategory } from "../../../store/category/category.selector";
import { selectCurrentSub } from "../../../store/sub/sub.selector";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import LocalSearch from "../../forms/search/local-search.component";
import ProductForm from "./product-form.component";

const initialFormValues = {
  title: "Macbook Pro 2021",
  description: "This is the best Apple product",
  price: "4500",
  category: "",
  subs: [],
  shipping: "",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};
function ProductCreate() {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialFormValues);
  const { product, isPending } = useSelector(selectCurrentProduct);
  const { categories, category } = useSelector(selectCurrentCategory);
  const { subs } = useSelector(selectCurrentSub);
  const [keyword, setKeyword] = useState("");
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      await dispatch(fetchCategories());
    };
    loadCategories();
  }, [dispatch]);

  const resetFormFields = () => {
    setValues(initialFormValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    await dispatch(fetchCategorySubs(e.target.value));
    setShowSub(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct(values));
    console.log("in handle submit: values: ", values);
    resetFormFields();
    setShowSub(false);
    //window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col-md-10">
          <h4>Product create</h4>
          <hr />
          {JSON.stringify(values.subs)}
          <ProductForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            categories={categories}
            category={category}
            subOptions={subs}
            showSub={showSub}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
