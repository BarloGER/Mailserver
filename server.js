import express from "express";
import cors from "cors";
import { mailRouter } from "./router/mailRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mail", mailRouter);

app.use("*", (req, res) => res.sendStatus(404));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
