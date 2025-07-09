import express from "express";
import knex from "../database_client.js";
import { z } from "zod";

export const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  const querySchema = z.object({
    maxPrice: z.coerce.number().positive().optional(),
    availableReservations: z.enum(["true", "false"]).optional(),
    title: z.string().min(1).optional(),
    dateAfter: z.string().optional(),
    dateBefore: z.string().optional(),
    limit: z.coerce.number().int().positive().optional(),
    sortKey: z.enum(["when", "max_reservations", "price", "title", "id"]).optional(),
    sortDir: z.enum(["asc", "desc"]).optional(),
  });

  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
  } = parsed.data;

  try {
    let query = knex("Meal")
      .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
      .groupBy("Meal.id")
      .select("Meal.*")
      .count("Reservation.id as reservations_count");

    if (maxPrice) query.where("price", "<", maxPrice);
    if (title) query.where("title", "like", `%${title}%`);
    if (dateAfter) query.where("when", ">", dateAfter);
    if (dateBefore) query.where("when", "<", dateBefore);

    if (availableReservations === "true") {
      query.havingRaw("Meal.max_reservations > COUNT(Reservation.id)");
    }

    if (sortKey) {
      query.orderBy(sortKey, sortDir === "desc" ? "desc" : "asc");
    }

    if (limit) {
      query.limit(limit);
    }

    const meals = await query;
    const enrichedMeals = meals.map((meal) => ({
      ...meal,
      available_spots: meal.max_reservations - meal.reservations_count,
    }));

    res.json(enrichedMeals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

mealsRouter.get("/:id", async (req, res) => {
  try {
    const mealId = req.params.id;
    if (isNaN(mealId)) {
      return res.status(400).send({ error: "Invalid meal ID" });
    }

    const meal = await knex("Meal").where({ id: mealId }).first();
    if (!meal) {
      return res.status(404).send({ error: "Meal not found" });
    }

    const reservations = await knex("Reservation").where("meal_id", mealId);
    const available_spots = meal.max_reservations - reservations.length;

    return res.status(200).send({ ...meal, available_spots });
  } catch (error) {
    console.error("Error fetching meal by id:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
