import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'

// eslint-disable-next-line react/prop-types
const AuthorBirthYearComponent = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [editAuthor, result] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('error: ', error)
      setError(error.toString())
    },
  })

  console.log('resulltottototo  ', result)
  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      setError('name not found')
    }
  }, [result.editAuthor]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    console.log('update author...', name, ' born: ', born)
    editAuthor({ variables: { name, born } })
    setName('')
    setBorn(0)
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYearComponent
