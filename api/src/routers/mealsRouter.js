import express from "express";
import knex from "../database_client.js";

// This router can be deleted once you add your own router
export const mealsRouter = express.Router();

mealsRouter.get("/:id?", async (req, res) => {
  try {
    const mealId = req.params.id;

    if (mealId) {
      if (isNaN(mealId)) {
        return res.status(400).send({ error: "Invalid meal ID" });
      }

      const meal = await knex("Meal").where({ id: mealId }).first();

      if (!meal) {
        return res.status(404).send({ error: "Meal not found" });
      }

      return res.status(200).send({ meal });
    }

    const meals = await knex("Meal").select("*");

    return res.status(200).send({ meals });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

mealsRouter.post("/", async (req, res) => {
  try {
    const { title, description, location, max_reservations, price } = req.body;

    if (!title || !description || !location || !max_reservations || !price) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    // Format the current date and time for `when`
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    // Format the current date for `created_date`
    const currentDate = new Date().toISOString().slice(0, 10);
    const [newMealId] = await knex("Meal").insert({
      title,
      description,
      location,
      max_reservations,
      price,
      when: currentDateTime,
      created_date: currentDate,
    });

    const newMeal = await knex("Meal").where({ id: newMealId }).first();
    return res.status(201).send({ meal: newMeal });
  } catch (error) {
    console.error("Error creating meal:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

mealsRouter.put("/:id", async (req, res) => {
  try {
    const mealId = req.params.id;
    const { max_reservations, price } = req.body;

    if (!max_reservations || !price) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const updatedRows = await knex("Meal")
      .where({ id: mealId })
      .update({ max_reservations, price });
    if (updatedRows === 0) {
      return res.status(404).send({ error: "Meal not found" });
    }
    const updatedMeal = await knex("Meal").where({ id: mealId }).first();

    return res.status(200).send({ meal: updatedMeal });
  } catch (error) {
    console.error("Error updating meal:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

mealsRouter.delete("/:id", async (req, res) => {
  try {
    const mealId = req.params.id;

    if (isNaN(mealId)) {
      return res.status(400).send({ error: "Invalid meal ID" });
    }
    const deletedRows = await knex("Meal").where({ id: mealId }).del();
    if (deletedRows === 0) {
      return res.status(404).send({ error: "Meal not found" });
    }
    return res.status(200).send({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meals:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
