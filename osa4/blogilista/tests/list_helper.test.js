const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const testBlogs = [{ id: '1', likes: 5 }]
    expect(listHelper.totalLikes(testBlogs)).toEqual(testBlogs[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const testBlogs = [{ id: '1', likes: 22 }, { id: '2', likes: 3 }, { id: '3', likes: 6 }]
    expect(listHelper.totalLikes(testBlogs)).toEqual(31)
  })
})


describe('favourite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('when list has only one blog is that one blog', () => {
    const testBlogs = [{ id: '1', likes: 5 }]
    expect(listHelper.favoriteBlog(testBlogs)).toEqual(testBlogs[0])
  })

  test('returns the blog with most likes', () => {
    const testBlogs = [{ id: '1', likes: 22 }, { id: '2', likes: 3 }, { id: '3', likes: 6 }]
    expect(listHelper.favoriteBlog(testBlogs)).toEqual(testBlogs[0])
  })
})
