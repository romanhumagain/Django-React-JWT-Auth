import React from 'react'
import { Link } from 'react-router-dom'

function Nav(props) {
  const handleLogout = async ()=>{
    const URL = 'http://127.0.0.1:8000/api/logout/user/'
    try{
      const response = await fetch(URL, {
        method:"POST", 
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
      })

      if(!response.ok){
        throw Error('Network response is not OK!')
      }
      props.setIsAuthenticated(false)
    
    }
    catch(error){
      console.log("ERROR", error)
    }
  }

  let menu;
  if(props.isAuthenticated){
    menu = (
    <Link to={'/'} className="nav-link mx-2" onClick={handleLogout}>Logout</Link>
    )
  }
  else{
    menu = (
      <div className='d-flex'>
              <Link to={"/"} className="nav-link mx-2" href="#">Login</Link>
              <Link to={"/register"} className="nav-link mx-2" href="#">Register</Link>
      </div>
    )
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          {
          props.isAuthenticated?
          <Link to={"/home"} className="navbar-brand" href="#">Home</Link>
          :
          <Link to={"/home"} className="navbar-brand" href="#">Home</Link>
          }
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ms-auto" role="search">
              {menu}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav