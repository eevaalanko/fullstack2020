import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {useApolloClient, useSubscription} from '@apollo/client'
import Recommended from './components/Recommended'
import {BOOK_ADDED} from './queries'

// eslint-disable-next-line react/prop-types
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}
const App = () => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {

      console.log(subscriptionData)
      window.alert(`A new book: ${subscriptionData.data.bookAdded.title} was added.`)
    }
  })
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
      </div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <Recommended show={page === 'recommended'} setError={notify} />
    </div>
  )
}

export default App
