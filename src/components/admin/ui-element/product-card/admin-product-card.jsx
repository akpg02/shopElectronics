import laptop from "../../../../assets/images/computer/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length > 0 ? images[0].url : laptop}
          alt={product.title}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 35)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
