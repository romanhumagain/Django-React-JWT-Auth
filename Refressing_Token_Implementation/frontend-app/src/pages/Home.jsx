import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';



const Home = () => {
  let [notes, setNotes] = useState([])
  const { user, authToken, logoutUser } = useContext(AuthContext)

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = async () => {
    const URL = 'http://127.0.0.1:8000/api/get-notes/'

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access)
        }
      })
      const data = await response.json()
      if (response.ok) {
        setNotes(data)
      }
      else if (response.statusText === "Unauthorized") {
        logoutUser()
      }
    }
    catch (error) {
      console.log("ERROR", error)
    }
  }
  return (
    <>
      <h1 className='my-4'>Welcome this is the home Page !</h1>
      <h2 className='fw-light'>You are a authenticated user in this system !</h2>
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <div key={index}>
            <li>{note.body}</li>
          </div>
        ))
      ) :
        (
          <p>No Notes Found !</p>
        )}
    </>
  );
};

export default Home;
