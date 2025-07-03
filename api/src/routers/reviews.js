import express from "express";
import knex from "../database_client.js";
import { z } from "zod";

export const reviewsRouter = express.Router();

// GET all reviews
reviewsRouter.get("/", async (req, res) => {
  const reviews = await knex("Review").select("*");
  res.json(reviews);
});

// GET review by ID
reviewsRouter.get("/:id", async (req, res) => {
  const review = await knex("Review").where("id", req.params.id).first();
  if (!review) return res.status(404).send({ error: "Review not found" });
  res.json(review);
});

// GET all reviews for a specific meal
reviewsRouter.get("/meal/:meal_id", async (req, res) => {
  const reviews = await knex("Review").where("meal_id", req.params.meal_id);
  res.json(reviews);
});

// POST: Add a new review
reviewsRouter.post("/", async (req, res) => {
  const reviewSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    meal_id: z.coerce.number().int().positive(),
    stars: z.coerce.number().int().min(1).max(5),
    created_date: z.string(),
  });

  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const [id] = await knex("Review").insert(parsed.data);
  res.status(201).json({ id });
});

// PUT: Update an existing review
reviewsRouter.put("/:id", async (req, res) => {
  const updateSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    stars: z.coerce.number().int().min(1).max(5).optional(),
  });

  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const updated = await knex("Review")
    .where("id", req.params.id)
    .update(parsed.data);

  if (updated === 0) return res.status(404).send({ error: "Review not found" });

  const updatedReview = await knex("Review").where("id", req.params.id).first();
  res.json({ review: updatedReview });
});

// DELETE: Remove a review
reviewsRouter.delete("/:id", async (req, res) => {
  const deleted = await knex("Review").where("id", req.params.id).del();
  if (deleted === 0) return res.status(404).send({ error: "Review not found" });
  res.json({ deleted });
});
