const CategoryForm = ({ handleSubmit, setName, name }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary mt-3">Save</button>
      </form>
    </>
  );
};

export default CategoryForm;
