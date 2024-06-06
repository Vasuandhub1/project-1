import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Registration from './pages/registration'
import Login from './pages/login'
import Home from './pages/home'
import { useSelector } from 'react-redux'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const data=useSelector((state)=>state.user.username)
  console.log(data)


  return (
    <BrowserRouter>
    
    {data!="Project"?<Routes>
      <Route path='/Home' element={<Home></Home>}></Route>
    </Routes>:<Routes>
      <Route path='/' element={<Registration></Registration>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
    </Routes>}
    </BrowserRouter>
  )
}

export default App
