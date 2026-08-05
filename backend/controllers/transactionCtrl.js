const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");




const transactionController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date,description } = req.body;
    if(!category || !type || !amount || !date || !description){
      throw new Error('Name, type, date, amount and description are required')
    }
    // create 
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });
    res.status(201).json(transaction);
    

  }),
  //!Lists
  getFilteredTransaction: asyncHandler(async (req, res) => {
    const {startDate, endDate, type, category} = req.query
    let filters = {user: req.user};
    if(startDate){
      filters.date = {...filters.date, $gte: new Date(startDate)}
    }
    if(endDate){
      filters.date = {...filters.date, $lte: new Date(endDate)}
    }
    if(type){
      filters.type = type;
    }
    if(category){
      if(category == 'All'){

      }else if(category=='Uncategorized'){
        filters.category = "Uncategorized"
      } else{
        filters.category = category;
      }
    }
        const transactions =  await Transaction.find(filters).sort({date: -1});

    res.json(transactions);
  }),

  //!update
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      (transaction.type = req.body.type || transaction.type),
        (transaction.category = req.body.category || transaction.category),
        (transaction.amount = req.body.amount || transaction.amount),
        (transaction.date = req.body.date || transaction.date),
        (transaction.description =
          req.body.description || transaction.description);
      //update
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),
  //! delete
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction removed" });
    }
  }),

  //! Analytics
  getAnalytics: asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user }).sort({ date: -1 });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryMap = {};
    const monthlyMap = {};

    transactions.forEach((t) => {
      const amt = Number(t.amount) || 0;
      const dateObj = new Date(t.date);
      const monthKey = isNaN(dateObj.getTime())
        ? "Unknown"
        : dateObj.toLocaleDateString("en-US", { month: "short", year: "numeric" });

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }

      if (t.type === "income") {
        totalIncome += amt;
        monthlyMap[monthKey].income += amt;
      } else {
        totalExpense += amt;
        monthlyMap[monthKey].expense += amt;

        const catName = t.category || "Uncategorized";
        categoryMap[catName] = (categoryMap[catName] || 0) + amt;
      }
    });

    const netBalance = totalIncome - totalExpense;

    const categoryExpenses = Object.keys(categoryMap).map((cat) => ({
      name: cat,
      value: categoryMap[cat],
    }));

    const monthlyData = Object.values(monthlyMap);
    const recentTransactions = transactions.slice(0, 5);

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryExpenses,
      monthlyExpenses: monthlyData.map((m) => ({ month: m.month, expense: m.expense })),
      monthlyIncomeVsExpense: monthlyData,
      recentTransactions,
    });
  }),
};

module.exports = transactionController;