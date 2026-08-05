import React from "react";

export default function FinancialInsights({ data }) {
  if (!data) return null;

  const {
    thisMonthIncome = 0,
    thisMonthExpense = 0,
    thisMonthSavings = 0,
    highestCategory = { name: "N/A", amount: 0 },
    totalTransactions = 0,
    avgDailySpending = 0,
  } = data;

  const currentMonthName = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        💡 Financial Insights ({currentMonthName})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* This Month Income */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">This Month Income</p>
          <p className="text-xl font-bold text-emerald-700 mt-1">₹{thisMonthIncome.toLocaleString()}</p>
        </div>

        {/* This Month Expense */}
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-rose-600 uppercase tracking-wider">This Month Expense</p>
          <p className="text-xl font-bold text-rose-700 mt-1">₹{thisMonthExpense.toLocaleString()}</p>
        </div>

        {/* This Month Savings */}
        <div className={`p-4 rounded-lg text-center border ${thisMonthSavings >= 0 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
          <p className="text-xs font-medium uppercase tracking-wider">This Month Savings</p>
          <p className="text-xl font-bold mt-1">₹{thisMonthSavings.toLocaleString()}</p>
        </div>

        {/* Highest Spending Category */}
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">Highest Spending Category</p>
          <p className="text-base font-bold text-purple-700 mt-1 truncate" title={`${highestCategory.name}: ₹${highestCategory.amount.toLocaleString()}`}>
            {highestCategory.name} ({`₹${highestCategory.amount.toLocaleString()}`})
          </p>
        </div>

        {/* Total Transactions */}
        <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-sky-600 uppercase tracking-wider">Total Transactions</p>
          <p className="text-xl font-bold text-sky-700 mt-1">{totalTransactions}</p>
        </div>

        {/* Avg Daily Spending */}
        <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-teal-600 uppercase tracking-wider">Avg Daily Spending</p>
          <p className="text-xl font-bold text-teal-700 mt-1">₹{avgDailySpending.toLocaleString()}/day</p>
        </div>
      </div>
    </div>
  );
}
