import express from "express";
import knex from "../database_client.js";

export const reservationsRouter = express.Router();

reservationsRouter.get("/:id?", async (req, res) => {
  try {
    const reservationsId = req.params.id;

    if (reservationsId) {
      if (isNaN(reservationsId)) {
        return res.status(400).send({ error: "Invalid reservations ID" });
      }

      const reservation = await knex("Reservation")
        .where({ id: reservationsId })
        .first();

      if (!reservationsId) {
        return res.status(404).send({ error: "Reservation not found" });
      }
      return res.status(200).send({ reservation });
    }

    const reservations = await knex("Reservation").select("*");
    return res.status(200).send({ reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

reservationsRouter.post("/", async (req, res) => {
  try {
    const {
      mealId,
      number_of_guests,
      contact_phonenumber,
      contact_name,
      contact_email,
      created_date,
    } = req.body;

    if (
      !number_of_guests ||
      !contact_phonenumber ||
      !contact_name ||
      !contact_email ||
      !mealId ||
      !created_date
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const [newReservationId] = await knex("Reservation").insert({
      number_of_guests,
      meal_id: mealId,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    });

    const newReservation = await knex("Reservation")
      .where({ id: newReservationId })
      .first();

    return res.status(201).send({ reservation: newReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

reservationsRouter.put("/:id", async (req, res) => {
  try {
    const reservationsId = req.params.id;
    const { contact_name, contact_email } = req.body;

    if (!contact_name || !contact_email) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const updatedRows = await knex("Reservation")
      .where({ id: reservationsId })
      .update({ contact_name, contact_email });
    if (updatedRows === 0) {
      return res.status(404).send({ error: "Reservation not found" });
    }

    const updatedReservation = await knex("Reservation")
      .where({ id: reservationsId })
      .first();

    return res.status(200).send({ reservation: updatedReservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

reservationsRouter.delete("/:id", async (req, res) => {
  try {
    const reservationsId = req.params.id;
    console.log("mealId", reservationsId);

    if (isNaN(reservationsId)) {
      return res.status(400).send({ error: "Invalid reservations ID" });
    }

    const deletedRows = await knex("Reservation")
      .where({ id: reservationsId })
      .del();
    if (deletedRows === 0) {
      return res.status(404).send({ error: "Reservation not found" });
    }
    return res
      .status(200)
      .send({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
