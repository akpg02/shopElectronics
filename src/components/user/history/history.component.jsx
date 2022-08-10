import React from "react";

import UserNavigation from "../../../routes/navigation/user/user-navigation.component";

function History() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNavigation />
        </div>
        <div className="col">user history page</div>
      </div>
    </div>
  );
}

export default History;
