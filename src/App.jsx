import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Joonggo from './pages/Joonggo/Joonggo'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='joonggo' element={<Joonggo />}/>
      </Routes>

    </div>

  )
}

export default App
