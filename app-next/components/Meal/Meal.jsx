"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Meal.module.css";
import imageMap from "@/utils/imageMap";
import api from "@/utils/api";

const Meal = ({ meal }) => {
  const [spots, setSpots] = useState(meal.available_spots);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch(api(`/meals/${meal.id}`));
        const data = await res.json();
        setSpots(data.available_spots);
      } catch (err) {
        console.error("Failed to fetch spots:", err);
      }
    };

    fetchSpots();
    const interval = setInterval(fetchSpots, 5000);
    return () => clearInterval(interval);
  }, [meal.id]);

  return (
    <Link href={`/meals/${meal.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img
          src={imageMap[meal.title] || "/pics/default.jpg"}
          alt={meal.title}
          className={styles.image}
        />
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <p>Price: {meal.price} DKK</p>
        <p>Available spots: {spots}</p>
      </div>
    </Link>
  );
};

export default Meal;
