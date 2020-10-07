import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const link = useField('text')
  const likes = useField('number')

  const resetFields = () => {
    title.reset()
    author.reset()
    link.reset()
    likes.reset()
  }
  /* const history = useHistory(); */

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.fieldProps.value,
      author: author.fieldProps.value,
      link: link.fieldProps.value,
      likes: likes.fieldProps.value,
    }
    dispatch(createBlog(newBlog))
    resetFields()
    //   history.push("/");
  }

  return (
    <form>
      <p>
        Title: <input {...title.fieldProps} />
      </p>
      <p>
        Author: <input {...author.fieldProps} />
      </p>
      <p>
        Link: <input {...link.fieldProps} />
      </p>
      <p>
        Likes: <input {...likes.fieldProps} />
      </p>
      <button type="submit" onClick={handleSubmit}>
        save
      </button>
    </form>
  )
}

export default BlogForm
