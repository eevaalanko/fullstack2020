import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK} from '../queries'

// eslint-disable-next-line react/prop-types
const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([''])

  console.log('published: ', published)

  // const result = useMutation(CREATE_BOOK)

  // console.log('result iiis: ', result)

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.log('error: ', error)
      setError(error.toString())
    },
  })

  // eslint-disable-next-line react/prop-types
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    if(!isNaN(published)){
      setPublished(Number(published))
    }
    createBook({ variables: { title, author, published, genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
