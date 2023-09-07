import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import httpClient from "../httpClient"

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false);

  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await httpClient.post('//localhost:5000/login',
        {
          username,
          password
        }
      )
      window.location.href = '/home';
    } catch (error) {
      if (error.response.status === 401) {
        handleAlert();
        setUsername('');
        setPassword('');
      }
    }
  }

  return (
    <Fragment>
      {
        alert ? (
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div class="alert alert-danger">
                <strong>Incorrect User or Password</strong>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        ) : (
          <div className="row"></div>
        )
      }
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card border-primary">
            <div className="card-header"><h3>Login</h3></div>
            <div className="card-body">
              <form onSubmit={handleLogin} autoComplete='off'>
                <div className="mb-3">
                  <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' className="form-control" required autoFocus />
                </div>
                <div className="mb-3">
                  <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className="form-control" required />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </div>
                <div className="mb-3">
                  <Link className='card-link' to='/signup'>Sign-up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </Fragment>
  )
}
