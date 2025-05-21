import express from "express";
import knex from "../database_client.js";

export const reservationsRouter = express.Router();

reservationsRouter.get("/:id?", async (req, res) => {
  try {
    let reservationsId = req.params.id;
    console.log("mealId", reservationsId);

    if (reservationsId && isNaN(reservationsId)) {
      return res.status(400).send({ error: "Invalid reservations ID" });
    }

    if (reservationsId) {
      let reservation = await knex.raw("SELECT * from Reservation where id = ?", reservationsId);
      return res.send({ reservations: reservation[0] });
    }

    let data = await knex.raw("SELECT * from Reservation");
    return res.send({ reservations: data[0] });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

reservationsRouter.post("/", async (req, res) => {
    try {
        const {mealId, number_of_guests, contact_phonenumber, contact_name, contact_email,created_date} = req.body;

      
        let insertQuary= `
        INSERT INTO Reservation 
        ( number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email)
        VALUES(?, ?, ?, ?, ?, ?);
        `
        if (!number_of_guests || !contact_phonenumber || !contact_name || !contact_email || !mealId || !created_date) {
        return res.status(400).send({ error: "Missing required fields" });
        }
     
       
        const [newMeal] = await knex.raw (insertQuary , [number_of_guests, mealId, created_date, contact_phonenumber, contact_name, contact_email]);
        return res.status(201).send({ reservation: newMeal });
    } catch (error) {
        console.error("Error creating meal:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});

reservationsRouter.put("/:id", async (req, res) => {
    try {
        const {  contact_name, contact_email } = req.body;
    
        if (!contact_name || !contact_email) {
        return res.status(400).send({ error: "Missing required fields" });
        }
       let reservationsId = req.params.id;
      
       const [newReservation] = await knex.raw ("UPDATE Reservation  SET  contact_name= ?, contact_email=? where id = ?", [contact_name, contact_email, reservationsId]);
    
        return res.status(200).send({ reservation: newReservation });
    } catch (error) {
        console.error("Error updating reservation:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});

reservationsRouter.delete("/:id", async (req, res) => {
    try {
        let reservationsId = req.params.id;
        console.log("mealId", reservationsId);
    
        if (reservationsId && isNaN(reservationsId)) {
          return res.status(400).send({ error: "Invalid reservations ID" });
        }
    
        if (reservationsId) {
          let reservation = await knex.raw("DELETE from Reservation where id = ?", reservationsId);
          return res.send({ reservations: reservation[0] });
        }
    
      } catch (error) {
        console.error("Error fetching reservations:", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
});