import React from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS, ME} from '../queries'

const  Recommended = (props) => {
  const user = useQuery(ME)

  console.log('me me me     ', user)

  const genre = user.data && user.data.me ?  user.data.me.favoriteGenre : null
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
      <h2>Recommendations</h2>
      <p>Books in your favourite pattern <b>{genre}</b></p>
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
    </div>
  )
}

export default Recommended