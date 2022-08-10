import React from "react";

import UserNavigation from "../../../routes/navigation/user/user-navigation.component";

function Wishlist() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNavigation />
        </div>
        <div className="col">user wishlist page</div>
      </div>
    </div>
  );
}

export default Wishlist;
