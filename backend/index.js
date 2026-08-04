const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");

const app = express();

// ✅ NON-SRV connection string (fixed)
mongoose.connect(
  "mongodb://gouravyadav23:12345@ac-pzhr5gf-shard-00-00.nen0c2j.mongodb.net:27017,ac-pzhr5gf-shard-00-01.nen0c2j.mongodb.net:27017,ac-pzhr5gf-shard-00-02.nen0c2j.mongodb.net:27017/expenseTracker?ssl=true&replicaSet=atlas-daytog-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("DB Connected"))
.catch((e) => console.log(" DB Error:", e.message));

const corsOptions = {
  origin: ['http://localhost:5173']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});