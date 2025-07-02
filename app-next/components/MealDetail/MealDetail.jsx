"use client";
import { useEffect, useState } from "react";
import styles from "./MealDetail.module.css";
import api from "@/utils/api";
import ReservationForm from "../ReservationForm/ReservationForm";
import ReviewsForm from "../ReviewsForm/ReviewsForm";

export default function MealDetail({ id }) {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(api(`/meals/${id}`));
      const json = await res.json();
      setMeal(json);
    }
    fetchMeal();
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Max Reservations: {meal.max_reservations}</p>
      <p>Price: {meal.price} DKK</p>

      {meal.available_reservations > 0 ? (
        <ReservationForm mealId={id} />
      ) : (
        <p>No reservations available</p>
      )}

      <ReviewsForm mealId={id} />
    </div>
  );
}
