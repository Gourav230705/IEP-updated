import { useState } from 'react'
import './App.css'
import PublicNavbar from './components/PublicNavbar'
import HomePage from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PrivateNavbar from './components/PrivateNavbar'
import getUserFromStorage from './utils/getUserFromStorage'
import { useSelector } from 'react-redux'
import AddCategory from './components/AddCategory'
import CategoriesList from './components/CategoriesList'
import TransactionForm from './components/AddTransactions'
import Dashboard from './components/Dashboard'


function App() {
  const token = getUserFromStorage();
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
      {user?<PrivateNavbar/>:<PublicNavbar/>}
      <div className='mt-15'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/addCategories' element={<AddCategory/>}/>
        <Route path='/categories' element={<CategoriesList/>}/>
        <Route path='/add-transaction' element={<TransactionForm/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </div>
        
    </BrowserRouter>
  )
}

export default App
