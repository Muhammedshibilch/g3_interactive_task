
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Users from './pages/Users'
import Adduser from './pages/Adduser'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/add/user' element={<Adduser/>}/>
    </Routes>
    </>
  )
}

export default App
