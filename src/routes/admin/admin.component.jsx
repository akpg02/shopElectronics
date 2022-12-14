import { Route, Routes } from "react-router-dom";

import AdminRoute from "../../routes/protected/admin/admin-private-route.component";
import Dashboard from "../../components/admin/dashboard/dashboard.component";
import CategoryCreate from "../../components/admin/category/category-create.component";
import CategoryUpdate from "../../components/admin/category/category-update.component";
import SubCreate from "../../components/admin/sub/sub-create.component";
import SubUpdate from "../../components/admin/sub/sub-update.component";
import ProductCreate from "../../components/admin/product/product-create.component";
import Products from "../../components/admin/products/products.component";
const Admin = () => {
  return (
    <Routes>
      <Route path="" element={<AdminRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category" element={<CategoryCreate />} />
        <Route path="category/:slug" element={<CategoryUpdate />} />
        <Route path="sub" element={<SubCreate />} />
        <Route path="sub/:slug" element={<SubUpdate />} />
        <Route path="product" element={<ProductCreate />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default Admin;
