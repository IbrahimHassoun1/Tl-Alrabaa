import React from 'react'
React
import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart/Cart.jsx';
import Navbar from "./components/Navbar/Navbar.jsx"
import { MyProvider } from './context/Context';
import AdminPage from './pages/Admin/AdminPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <MyProvider>
        <Router>

          <ToastContainer/>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/admin' element={<AdminPage/>}></Route>
          </Routes>
          
        </Router>
    </MyProvider>
    
   
  )
}

export default App
