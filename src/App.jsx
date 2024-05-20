import { useState } from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import CreateUser from './createorder'
import UpdateUser from './UpdateUser'
import Settings from './settings'
import Login from './login'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={< Login/>}></Route>
      <Route path='/home' element={<Users />}></Route>
      <Route path='/settings/:id' element={<Settings />}></Route>
      <Route path='/create' element={<CreateUser />}></Route>
      <Route path='/update/:id' element={<UpdateUser />}></Route>

    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
