import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavigation from "../../../routes/navigation/admin/admin-navigation.component";
import {
  fetchProductsByCount,
  removeProduct,
} from "../../../store/product/product.action";
import { selectCurrentProduct } from "../../../store/product/product.selector";
import AdminProductCard from "../ui-element/product-card/admin-product-card";

function Products() {
  const dispatch = useDispatch();
  const { products, isPending } = useSelector(selectCurrentProduct);

  const fetchProducts = useCallback(async () => {
    await dispatch(fetchProductsByCount(100));
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [dispatch, fetchProducts]);

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await dispatch(removeProduct(slug));
      fetchProducts();
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">
          {isPending ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="col">
            <div className="row">
              {products.map((p) => (
                <div className="col-md-3 pb-3" key={p._id}>
                  <AdminProductCard product={p} handleRemove={handleRemove} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
