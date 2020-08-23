import React from 'react'
import PropTypes from 'prop-types'

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
      Likes:{' '}
      <input type="number" value={newLikes} onChange={handleLikesChange} />
    </p>
    <button type="submit">save</button>
  </form>
)
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  newAuthor: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  newLink: PropTypes.string.isRequired,
  handleLinkChange: PropTypes.func.isRequired,
  newLikes: PropTypes.number.isRequired,
  handleLikesChange: PropTypes.func.isRequired,
}

export default BlogForm
