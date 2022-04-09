import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Dashboard from './Dashboard'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


let codeParams = new URLSearchParams(window.location.search).get('code')


const App = () => {

  const [code,setCode] = useState(codeParams)

  // setCode(codeParams)

  const logout = () => {
    setCode(null)
  }

  return (
    <>
      <Router>
        {code ? <Dashboard logout={logout} code={code} /> : <Login />}
      </Router>
    </>
  )
}

export default App
