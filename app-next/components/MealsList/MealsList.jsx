"use client"
import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import styles from "./MealsList.module.css";

export const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/api/meals`)

            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched meals:", data);
                setMeals(data);
            })
            .catch((err) => console.error("Error fetching meals:", err));
    }, []);

    return (
        <div>
            <h2>Meals</h2>
            {meals.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.grid}>
                    {meals.map((meal) => (
                        <Meal key={meal.id} meal={meal} />
                    ))}
                </div>
            )}
        </div>
    );
};
