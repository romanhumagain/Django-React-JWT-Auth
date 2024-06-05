import React, { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const {loginUser} = useContext(AuthContext)

  return (
    <>
      <div className="container my-5 w-20 col-md-3">
        <h2>Login</h2>
        <form className='card p-4 shadow-sm my-4' onSubmit={loginUser}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-primary my-3">Login</button>
          <button type="button" className="btn btn-outline-secondary my-3">Sign in with Google</button>
          <p>Create a new account? <Link className='text-decoration-none' to={'/register'}>Sign up</Link></p>
        </form>
      </div>
    </>
  );
}

export default Login;
