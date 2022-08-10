import React from "react";

import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">admin dashboard page</div>
      </div>
    </div>
  );
}

export default Dashboard;
