import express from "express";
import cors from "cors";
import { sendMailRouter } from "./router/sendMailRouter.js";
import { receiveMailRouter } from "./router/receiveMailRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mail", sendMailRouter, receiveMailRouter);

app.use("*", (req, res) => res.sendStatus(404));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
