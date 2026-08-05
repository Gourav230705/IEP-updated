import React from "react";
import { useQuery } from "@tanstack/react-query";
import { listTransactionsAPI } from "../services/transaction/transactionServices";

function getUserFromStorage() {
  const token = JSON.parse(localStorage.getItem("userInfo") || null);
  return token?.username;
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}



export default function Overview() {
  
  const username = getUserFromStorage(); 
  const capitalizedName = capitalizeFirstLetter(username);
  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  //! calculate total income, expense and balance
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = (totals?.income || 0) - (totals?.expense || 0);

  return (
    <div className="w-full px-6 py-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{capitalizedName || "User"} Expenses!!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Income</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{totals?.income?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Expenditure</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{totals?.expense?.toLocaleString() || 0}
          </p>
        </div>
        <div className={`p-6 rounded-lg shadow-md ${balance >= 0 ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}>
          <h3 className="text-xl font-semibold">Net Balance</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{balance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
