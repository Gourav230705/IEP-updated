const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const transactionController = require("../controllers/transactionCtrl");
const transactionRouter = express.Router();
//add
transactionRouter.post("/api/v1/transaction/create",isAuthenticated ,transactionController.create);
// list
transactionRouter.get("/api/v1/transaction/lists",isAuthenticated, transactionController.getFilteredTransaction);
// analytics
transactionRouter.get("/api/v1/transaction/analytics", isAuthenticated, transactionController.getAnalytics);
// update
transactionRouter.put("/api/v1/transaction/update/:id",isAuthenticated, transactionController.update);
transactionRouter.put("/api/v1/transaction/delete/:id",isAuthenticated, transactionController.delete);

module.exports = transactionRouter;
