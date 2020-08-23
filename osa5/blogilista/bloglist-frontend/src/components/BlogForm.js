import React from "react";

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newLink,
  handleLinkChange,
  newLikes,
  handleLikesChange,
}) => (
  <form onSubmit={addBlog}>
    <p>
      Title: <input value={newTitle} onChange={handleTitleChange} />
    </p>
    <p>
      Author: <input value={newAuthor} onChange={handleAuthorChange} />
    </p>
    <p>
      Link: <input value={newLink} onChange={handleLinkChange} />
    </p>
    <p>
      Likes:{" "}
      <input type="number" value={newLikes} onChange={handleLikesChange} />
    </p>
    <button type="submit">save</button>
  </form>
);

export default BlogForm;
