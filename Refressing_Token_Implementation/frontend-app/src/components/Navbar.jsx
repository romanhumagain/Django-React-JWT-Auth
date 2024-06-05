import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Navbar() {
  const {user, logoutUser} = useContext(AuthContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <Link to={"/home"} className="navbar-brand">Home</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ms-auto" role="search">
                
              {user?
              (<Link to={"#"} className="nav-link mx-2" onClick={logoutUser} >Logout</Link>):
              (<div className='d-flex'>
                <Link to={"/"} className="nav-link mx-2" >Login</Link>
                <Link to={"/register"} className="nav-link mx-2" href="#">Register</Link>
              </div>)}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar