import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
