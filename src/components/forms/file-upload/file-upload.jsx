import { useSelector, useDispatch } from "react-redux";
import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from "antd";
import {
  uploadToCloudinary,
  removeFromCloudinary,
  updateCloudinary,
} from "../../../store/product/product.action";
import { selectCurrentProduct } from "../../../store/product/product.selector";

const FileUpload = ({ values, setValues, isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const { product, isPending } = useSelector(selectCurrentProduct);

  const fileUploadAndResize = (e) => {
    // resize
    const items = e.target.files;

    if (items) {
      setIsLoading(true);
      for (let i = 0; i < items.length; i++) {
        Resizer.imageFileResizer(
          items[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            await dispatch(uploadToCloudinary(uri));
            setIsLoading(isPending);
          },
          "base64"
        );
      }
    }

    // send back to server to upload to cloudinary
    // set url to images[] in the parent component -- ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setIsLoading(true);
    dispatch(removeFromCloudinary(public_id));
    dispatch(updateCloudinary(public_id, product.images));
    setIsLoading(false);
  };

  return (
    <>
      {product.images &&
        product.images.map((image, i) => (
          <div key={image.public_id} className="d-inline-flex mx-2 my-2">
            <Badge
              count="X"
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={image.url} size={100} className="" shape="square" />
            </Badge>
          </div>
        ))}

      <div className="row">
        <label className="btn btn-outline-primary ">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
