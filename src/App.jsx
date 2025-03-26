import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Joonggo from './pages/Joonggo/Joonggo'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import NewPost from './pages/NewPost/NewPost'
import FindPassword from './pages/FindPassword/FindPassword'

function App() {

  //특정 페이지에서 navbar 숨기기
  const location = useLocation()
  const hideNavbar = ["/signUp", "/signIn", "/findPassword"]
  const showNavbar = !hideNavbar.includes(location.pathname)

  return (
    <div>
      {/* 특정 페이지에서 navbar 보여주거나 숨기기 */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/joonggo' element={<Joonggo />}/>
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/signUp' element={<SignUp />}/>
        <Route path='/findPassword' element={<FindPassword />}/>
        <Route path='/newPost' element={<NewPost />}/>
      </Routes>

    </div>

  )
}

export default App
