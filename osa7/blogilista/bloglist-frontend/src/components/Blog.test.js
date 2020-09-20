/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const noop = () => null

const blog = {
  id: 'foo',
  title: 'best blog',
  author: 'B Blogger',
  likes: 1000,
  url: 'someurl',
  user: {}
}


test('renders content', () => {
  const component = render(
    <Blog blog={blog} addLike={noop} removeBlog={noop} />
  )
  expect(component.container).toHaveTextContent(
    'best blog'
  )
})

test.only('renders author and title',() => {
  const component = render(
    <Blog blog={blog} addLike={noop} removeBlog={noop} />
  )
  expect(component.container).toHaveTextContent(
    blog.title
  )
  expect(component.container).toHaveTextContent(
    blog.author
  )
  const blogInfo = component.container.querySelector('#blog-info')
  expect(blogInfo).toHaveStyle('display: none')
})

test('renders author and title',() => {
  const component = render(
    <Blog blog={blog} addLike={noop} removeBlog={noop} />
  )
  const blogInfo = component.container.querySelector('#blog-info')
  expect(blogInfo).toHaveStyle('display: none')

  const button = component.getByText('show')
  fireEvent.click(button)
  expect(blogInfo).not.toHaveStyle('display: none')
})

test('clicking the add like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} removeBlog={noop} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
