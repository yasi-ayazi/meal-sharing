import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import { mealsRouter } from "./routers/mealsRouter.js";
import { reservationsRouter } from "./routers/reservations.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();


app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get("/future-meals",async (req, res) => {
  const meals = await knex("Meal")
  .select("*")
  .where("when", ">", knex.fn.now());
    res.json(meals);
});

app.get("/past-meals",async (req, res) => {
  const meals = await knex("Meal")
  .select("*")
  .where("when", "<", knex.fn.now());
    res.json(meals);
});

app.get("/all-meals", async (req, res) => {
  const tables = await knex.select("*").from("Meal");
  res.json(tables);
});

app.get("/first-meal", async(req, res) => {
 const firstmeal= await knex("Meal")
  .select("*")
  .orderBy("id", "asc")
  .limit(1);
  if(firstmeal.length === 0) {
    return res.status(404).json({ message: "No meals found" });
  }
  res.json(firstmeal);
});

app.get("/last-meal",async (req, res) => {
  const lastmeal= await knex("Meal")
  .select("*")
  .orderBy("id", "desc")
  .limit(1);
  if(lastmeal.length === 0) {
    return res.status(404).json({ message: "No meals found" });
  }
  res.json(lastmeal);
});

// This nested router example can also be replaced with your own sub-router
// apiRouter.use("/mealsRouter", mealsRouter);
apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationsRouter);
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
