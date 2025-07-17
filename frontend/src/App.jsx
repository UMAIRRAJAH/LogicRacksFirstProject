import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import Delivery from './pages/Delivery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Verify from './pages/Verify'
import Profile from './components/Profile'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >
      <ToastContainer position="top-right" autoClose={3000} />
    <Navbar />
    <SearchBar/>


      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path="/profile" element={<Profile />} />

        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
   <Route path="/product/:productId" element={<Product />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/verify' element={<Verify/>}/>

          <Route path="/delivery" element={<Delivery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App