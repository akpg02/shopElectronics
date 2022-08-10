import { Route, Routes } from "react-router-dom";

import AdminRoute from "../../routes/protected/admin/admin-private-route.component";
import Dashboard from "../../components/admin/dashboard/dashboard.component";
import CategoryCreate from "../../components/admin/category/category-create.component";

const Admin = () => {
  return (
    <Routes>
      <Route path="" element={<AdminRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category/create" element={<CategoryCreate />} />
      </Route>
    </Routes>
  );
};

export default Admin;
