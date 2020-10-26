import React from 'react'
import { useQuery } from '@apollo/client'
import {ALL_AUTHORS} from '../queries'
import AuthorBirthYearComponent from './AuthorBirthYearComponent'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data ? result.data.allAuthors : []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* eslint-disable-next-line react/prop-types */}
      <AuthorBirthYearComponent setError={props.setError}/>
    </div>
  )
}

export default Authors
