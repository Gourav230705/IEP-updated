import React from 'react'
import { Link } from 'react-router-dom'


export default function PublicNavbar() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand me-3">iExpenseTracker</Link>
          <form className="d-flex">
            <Link to="/login" className="btn btn-outline-success me-3" type="button">Login</Link>
            <Link to="/register" className="btn btn-sm btn-outline-secondary" type="button">SignUp</Link>
          </form>
        </div>
      </nav>
    </div>
  )
}
