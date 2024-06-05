import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const URL = 'http://127.0.0.1:8000/api/login-user/';
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const response_data = await response.json();
      console.log(response_data)

      if (!response.ok) {
        throw new Error("Network response is not OK!");
      }

      props.setIsAuth(true)

      navigate("/home")

    } catch (error) {
      console.log("ERROR OCCUR", error);
    }
  };

  return (
    <>
      <div className="container my-5 w-20 col-md-3">
        <h2>Login</h2>
        <form className='card p-4 shadow-sm my-4' onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
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
