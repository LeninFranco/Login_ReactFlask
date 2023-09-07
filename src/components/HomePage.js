import React, { Fragment, useState, useEffect } from 'react'
import httpClient from "../httpClient"

export default function HomePage() {

  const [username, setUsername] = useState('');

  const checkLogin = async () => {
    try {
      const response = await httpClient.get('//localhost:5000/@me')
      setUsername(response.data.username);
    } catch (error) {
      window.location.href = '/'
    }
  }

  const handleLogOut = async () => {
    await httpClient.get('//localhost:5000/logout')
    window.location.href = '/';
  }

  useEffect(() => {
    checkLogin();
  }, [])

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h1>Bienvenido {username}</h1>
          <form onClick={handleLogOut} className='mb-3'>
            <button type='button' className='btn btn-primary w-100'>Logout</button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </Fragment>
  )
}
