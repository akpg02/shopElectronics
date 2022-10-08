import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">
          <div className="col">Admin Dashboard</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
