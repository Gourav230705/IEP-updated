import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Overview from './Overview'
import { getAnalyticsAPI } from '../services/transaction/transactionServices'
import ExpenseCategoryPieChart from './charts/ExpenseCategoryPieChart'
import MonthlyExpenseBarChart from './charts/MonthlyExpenseBarChart'
import IncomeVsExpenseLineChart from './charts/IncomeVsExpenseLineChart'

export default function Dashboard() {
  const { data: analyticsData, isLoading, isError } = useQuery({
    queryKey: ['transaction-analytics'],
    queryFn: getAnalyticsAPI,
  })

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Overview />

      <div className="px-6 mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Insights</h2>

        {isLoading ? (
          <div className="text-center py-10 text-gray-600 font-semibold">Loading analytics...</div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500 font-semibold">Failed to load analytics data</div>
        ) : (
          <>
            {/* Charts Vertical Stack */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              <ExpenseCategoryPieChart data={analyticsData?.categoryExpenses} />
              <MonthlyExpenseBarChart data={analyticsData?.monthlyExpenses} />
              <IncomeVsExpenseLineChart data={analyticsData?.monthlyIncomeVsExpense} />
            </div>

            {/* Latest 5 Transactions Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest 5 Transactions</h3>
              {analyticsData?.recentTransactions?.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent transactions found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <ul className="divide-y divide-gray-200">
                    {analyticsData?.recentTransactions?.map((transaction) => (
                      <li key={transaction._id} className="py-3 flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-600">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                          <span
                            className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.type === 'income'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.type?.toUpperCase()}
                          </span>
                          <span className="ml-2 font-semibold text-gray-800">
                            {transaction.category?.name || transaction.category || 'Uncategorized'} - ₹
                            {transaction.amount?.toLocaleString()}
                          </span>
                          {transaction.description && (
                            <span className="ml-2 text-xs text-gray-500 italic">
                              ({transaction.description})
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
