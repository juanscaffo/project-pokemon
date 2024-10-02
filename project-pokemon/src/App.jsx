import './App.css'

import NavBar from './Components/NavBar'
import Abilities from './Page/Abilities'
import Favorites from './Page/Favorites'
import Home from './Page/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
        <>
        <div id= "root">
          <NavBar/>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/abilities/:id' element = {<Abilities/>} />
            <Route path='/favorites' element = {<Favorites/>} />
          
          </Routes>
          
          

        </div>
        </>
)
}

export default App
