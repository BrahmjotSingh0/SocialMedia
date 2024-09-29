
function AddPost() {
  return (
    <div className="main-content">
      <h1 className="page-name">Add Post</h1>
        <form>
            <div className="form-group">
            <label>Title:</label>
            <input type="text" required />
            </div>
            <div className="form-group">
                <label>Upload Image</label>
                <input type="file" required />
            </div>
            <button type="submit" className="btn">
            Add Post
            </button>
        </form>
    </div>
  );
}

export default AddPost;
