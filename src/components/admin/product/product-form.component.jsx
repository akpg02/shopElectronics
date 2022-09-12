import { Select } from "antd";
const { Option } = Select;

const ProductForm = ({
  handleChange,
  handleSubmit,
  values,
  categories,
  handleCategoryChange,
  setValues,
  showSub,
  subOptions,
}) => {
  const {
    title,
    description,
    subs,
    price,
    shipping,
    quantity,
    images,
    colors,
    color,
    brand,
    brands,
  } = values;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Color</label>
          <select name="color" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Brand</label>
          <select name="brand" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="">Parent Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Select a category</option>
            {categories &&
              categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <br />
        {showSub && (
          <div>
            <label>Subcategories</label>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              value={subs}
              placeholder="Please select"
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions &&
                subOptions.length &&
                subOptions.map((s) => (
                  <Option value={s._id} key={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
        <br />
        <button className="btn btn-outline-info">Save</button>
      </form>
    </>
  );
};

export default ProductForm;
