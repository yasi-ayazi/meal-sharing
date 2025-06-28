"use client"
import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import styles from "./MealsList.module.css";
import api from "@/utils/api";

export const MealsList = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const result = await fetch(api("/meals"));
            const jsonResult = await result.json();
            setMeals(jsonResult);
        }
        fetchMeals();
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
