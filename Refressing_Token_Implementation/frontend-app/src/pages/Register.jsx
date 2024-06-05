import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';


function Register() {
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const registerUser = async ()=>{
    const URL = 'http://127.0.0.1:8000/api/register/user/'

    const data = {
      username:username, 
      email:email, 
      password:password
    }
    try{
      const response = await fetch(URL, {
        method:"POST", 
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if(!response.ok){
        throw Error("Network response was not OK!")
      }
      

    }
    catch(error){
      console.log("ERROR", error)
    }
  
  }

  return (
    <>
      <div className="container my-5 w-20 col-md-4">
        <h2>Register</h2>
        <form className='card p-4 shadow-sm my-4' onSubmit={registerUser}>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="username" placeholder="Username" 
            onChange={(e)=>{
              setUsername(e.target.value)
            }} 
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" placeholder="name@example.com" 
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="password" placeholder="Password"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary my-4">Register</button>
          <p>Already Have Account? <Link className='text-decoration-none' to={'/'}>Sign in</Link></p>
        </form>
      </div>
    </>
  )
}

export default Register