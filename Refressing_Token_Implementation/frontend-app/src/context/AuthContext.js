import {createContext, useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
  
  const[user, setUser] = useState(()=>localStorage.getItem('authToken')?jwtDecode(localStorage.getItem('authToken')):null)
  const[authToken, setAuthToken] = useState(()=>localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null)
  const[loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const loginUser = async (e)=>{
    e.preventDefault()
    const URL = "http://127.0.0.1:8000/api/token/"
  
    try{
      const response = await fetch(URL, {
        method : "POST",
        headers : {
          "Content-Type":"application/json",
        },
        body : JSON.stringify({username:e.target.username.value, password:e.target.password.value})
      });
  
      if(!response.ok){
        throw Error("Network response was not OK!");
      }
      const data = await response.json();
      setAuthToken(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authToken', JSON.stringify(data))
      navigate('/home');

        
    }
    catch(error){
      console.log("ERROR", error)
    }
  }

  const logoutUser = ()=>{
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem("authToken")
    navigate('/')
  }

  const updateToken = async ()=>{
    const URL = "http://127.0.0.1:8000/api/token/refresh/"

    try{
      const response = await fetch(URL, {
        method : "POST",
        headers : {
          "Content-Type":"application/json",
        },
        body : JSON.stringify({refresh : authToken.refresh})
      });
  
      if(response.status === 200){
        const data = await response.json();
        setAuthToken(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authToken', JSON.stringify(data))
      }
      else{
        logoutUser()
        throw Error("Network response was not OK!");
      } 
    }
    catch(error){
      console.log("ERROR", error)
    }
     if(loading){
      setLoading(false)
     }
  }

  const contextData = {
    loginUser: loginUser,
    logoutUser :logoutUser,
    user : user,
    authToken:authToken
  }
  
  useEffect(()=>{
    if(loading){
      updateToken()
    }

    let four_minutes = 1000 * 60 * 4
    let interval = setInterval(()=>{
      if(authToken){
        updateToken()
      }
    }, four_minutes)

    return ()=>clearInterval(interval)

  }, [authToken, loading])

  return(
    <AuthContext.Provider value={contextData} > 
      {loading?null:children}
    </AuthContext.Provider>
  )
}