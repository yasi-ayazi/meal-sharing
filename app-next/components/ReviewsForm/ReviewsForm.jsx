"use client";
import { useState } from "react";
import styles from "./ReviewsForm.module.css";
import api from "@/utils/api";

export default function ReviewsForm({ mealId }) {
  const [review, setReview] = useState("");
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(api("/reviews"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Review",
          meal_id: mealId,
          stars: 5,
          description: review,
          created_date: new Date().toISOString().slice(0, 10),
        }),


      });

      if (!res.ok) throw new Error("Failed");
      setMessage("Review submitted successfully.");
      setReview("");
    } catch (err) {
      setMessage("Failed to submit review.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>Leave a review</h4>
      <textarea className={styles.textarea}
        placeholder="Write your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
      {message && <p>{message}</p>}
    </form>
  );
}
