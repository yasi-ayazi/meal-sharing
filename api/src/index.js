import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get("/future-meals", (req, res) => {
  res.send("future-meals");
});

app.get("/past-meals", (req, res) => {
  res.send("past-meals");
});

app.get("/all-meals", (req, res) => {
  res.send("all-meals");
});

app.get("/first-meal", (req, res) => {
  res.send("first-meal");
});

app.get("/last-meal", (req, res) => {
  res.send("last-meal");
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
