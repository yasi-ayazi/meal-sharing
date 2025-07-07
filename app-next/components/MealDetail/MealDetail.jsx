"use client";
import { useEffect, useState } from "react";
import styles from "./MealDetail.module.css";
import api from "@/utils/api";
import ReservationForm from "../ReservationForm/ReservationForm";
import ReviewsForm from "../ReviewsForm/ReviewsForm";
import imageMap from "@/utils/imageMap";

export default function MealDetail({ id }) {
  const [meal, setMeal] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchMeal = async () => {
    try {
      const res = await fetch(api(`/meals/${id}`));
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const json = await res.json();
      setMeal(json);
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMeal();
    }
  }, [id]);

  if (notFound) return <p>Meal not found.</p>;
  if (!meal) return <p>Loading meal...</p>;

  return (
    <div className={styles.container}>
      <img
        src={imageMap[meal.title] || "/pics/default.jpg"}
        alt={meal.title}
        className={styles.image}
      />
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Location: {meal.location}</p>
      <p>When: {new Date(meal.when).toLocaleString()}</p>
      <p>Max Reservations: {meal.max_reservations}</p>
      <p>Price: {meal.price} DKK</p>

      {meal.available_reservations > 0 ? (
        <ReservationForm mealId={meal.id} />
      ) : (
        <p>No reservations available</p>
      )}

      <ReviewsForm mealId={meal.id} />
    </div>
  );
}
