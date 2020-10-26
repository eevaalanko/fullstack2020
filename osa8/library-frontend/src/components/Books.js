import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS, ALL_GENRES} from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const genres = useQuery(ALL_GENRES)
  const genreOptions = genres && genres.data && genres.data.allGenres ?
    genres.data.allGenres.map((g) => ({ value: g, label: g }))
    : [{value: null, label:null}]
  const [selectedGenre, setSelectedGenre] = useState({value: '', label: null})
  const genre = selectedGenre.value
  const result = useQuery(ALL_BOOKS, {
    variables: {genre},
    pollInterval: 5000
  })

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data && result.data.allBooks || []
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author && b.author.name ? b.author.name: '' }</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>In genre {selectedGenre.value}</h2>
      <Select
        onChange={setSelectedGenre}
        options={genreOptions}
      />
    </div>
  )
}

export default Books
