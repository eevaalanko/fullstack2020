import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  console.log('graaah ', useSelector((state) => state))
  const message = useSelector((state) => state.notification.message)
  const errorMessage = useSelector((state) => state.notification.errorMessage)
  return (
    (message && <div className="infoText">{message}</div>) ||
    (errorMessage && <div className="error">{errorMessage}</div>) ||
    null
  )
}

export default Notification
