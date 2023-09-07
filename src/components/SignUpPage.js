import React, { useState, Fragment } from 'react';
import httpClient from "../httpClient";

export default function SignUpPage() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);

    const handleAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await httpClient.post("//localhost:5000/signup",
                {
                    username,
                    email,
                    password
                }
            );
            window.location.href = '/';
        } catch (error) {
            if (error.response.status === 409) {
                handleAlert();
                setEmail('');
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
                            <div className="alert alert-danger">
                                <strong>User or Email already exists</strong>
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
                        <div className="card-header"><h3>Sign-Up</h3></div>
                        <div className="card-body">
                            <form onSubmit={handleSignUp} autoComplete='off'>
                                <div className="mb-3">
                                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' className="form-control" required autoFocus />
                                </div>
                                <div className="mb-3">
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='E-Mail' className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100">Register</button>
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
