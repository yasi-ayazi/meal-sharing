"use client";
import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import styles from "./MealsList.module.css";
import api from "@/utils/api";

export const MealsList = () => {
    const [meals, setMeals] = useState([]);

    const fetchMeals = async () => {
        const result = await fetch(api("/meals"));
        const jsonResult = await result.json();
        setMeals(jsonResult);
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    let content;
    if (meals.length === 0) {
        content = <p>Loading...</p>;
    } else {
        content = (
            <div className={styles.grid}>
                {meals.map((meal) => (
                    <Meal key={meal.id} meal={meal} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <h2>Meals</h2>
            {content}
        </div>
    );
};
