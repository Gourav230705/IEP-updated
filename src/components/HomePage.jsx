import React from 'react'

export default function HomePage() {
  return (
    <div>
      <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: '100vh',
        background: 'linear-gradient(to right, #56cc9d, #3f86ed)',
        color: 'white',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        padding: '20px'
      }}
    >
      <h1 className="fw-bold display-5 mb-3">
        Track Your Expenses Effortlessly
      </h1>
      <p className="lead mb-5">
        Manage your finances with a modern solution designed for you.
      </p>

      <div className="d-flex justify-content-center gap-5 mb-5 flex-wrap">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-cash-stack fs-1 mb-2"></i>
          <p className="mb-0">Efficient Tracking</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-funnel fs-1 mb-2"></i>
          <p className="mb-0">Transactions Filtering</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-bar-chart-line fs-1 mb-2"></i>
          <p className="mb-0">Insightful Reports</p>
        </div>
      </div>

      <button className="btn btn-light text-success fw-semibold px-4 py-2 rounded-pill shadow">
        Get Started
      </button>
    </div>
    </div>
  )
}
