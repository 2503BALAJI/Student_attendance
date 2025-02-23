import Navbar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
	    <Routes>
        <Route path="" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>    
    </>
  )
}

export default App
