const dummy = (blogs) => {
  console.log('blogs: ', blogs)
  return 1
}

const totalLikes = (blogs) => {
  console.log('blogs: ', blogs)
  return blogs.length === 0
    ? 0
    : blogs.reduce((amount, blog) => amount + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  console.log('blogs: ', blogs)
  return blogs.length === 0
    ? null
    : blogs.reduce((prev, current) => (+prev.likes > +current.likes) ? prev : current)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
