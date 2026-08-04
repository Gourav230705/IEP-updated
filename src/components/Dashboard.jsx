import React from 'react'
import TransactionList from './TransactionList'
import Overview from './Overview'

export default function Dashboard() {
  return (
    <div>
      
      <Overview/>
      <TransactionList/>
    </div>
  )
}
