import express from "express";
import knex from "../database_client.js";

// This router can be deleted once you add your own router
export const mealsRouter = express.Router();

mealsRouter.get("/:id?", async (req, res) => {
  try {
    let mealId = req.params.id;
    console.log("mealId", mealId);

    // Check if mealId exists and is not a number
    if (mealId && isNaN(mealId)) {
      return res.status(400).send({ error: "Invalid meal ID" });
    }

    if (mealId) {
      let meal = await knex.raw("SELECT * from Meal where id = ?", mealId);
      return res.send({ meals: meal[0] });
    }

    let data = await knex.raw("SELECT * from Meal");
    return res.send({ meals: data[0] });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

mealsRouter.post("/", async (req, res) => {
    try {
        const { title,  description, location, max_reservations, price } = req.body;
    
        if (!title || !description || !location || !max_reservations || !price) {
        return res.status(400).send({ error: "Missing required fields" });
        }
       // Format the current date and time for `when`
       const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
       // Format the current date for `created_date`
       const currentDate = new Date().toISOString().slice(0, 10);
        const [newMeal] = await knex.raw ("INSERT INTO Meal (title, description, location, max_reservations, price,`when`,created_date) VALUES (?,?,?,?,?,?,?)", [title, description, location, max_reservations, price, currentDateTime,currentDate]);
    
        return res.status(201).send({ meal: newMeal });
    } catch (error) {
        console.error("Error creating meal:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});

mealsRouter.put("/:id", async (req, res) => {
    try {
        const {  max_reservations, price } = req.body;
    
        if (!max_reservations || !price) {
        return res.status(400).send({ error: "Missing required fields" });
        }
       let mealId = req.params.id;
      
       const [newMeal] = await knex.raw ("UPDATE Meal  SET  max_reservations= ?, price=? where id = ?", [max_reservations, price, mealId]);
    
        return res.status(200).send({ meal: newMeal });
    } catch (error) {
        console.error("Error updating meal:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});

mealsRouter.delete("/:id", async (req, res) => {
    try {
        let mealId = req.params.id;
        console.log("mealId", mealId);
    
        if (mealId && isNaN(mealId)) {
          return res.status(400).send({ error: "Invalid meal ID" });
        }
    
        if (mealId) {
          let meal = await knex.raw("DELETE from Meal where id = ?", mealId);
          return res.send({ meals: meal[0] });
        }
    
      } catch (error) {
        console.error("Error fetching meals:", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
});