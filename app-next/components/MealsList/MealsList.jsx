 "use client"
import { useEffect, useState } from "react";

export const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api/meals";

    useEffect(() => {
        fetch(apiUrl+"/api/meals")
            .then((res) => res.json())
            .then((data) => setMeals(data))
            .catch((err) => console.error("Error fetching meals:", err));
    }, []);

    return (
        <div>
            <h2>Meals</h2>
            {meals.length === 0 ? (
                <p>Loading...</p>
            ) : (
                meals.map((meal) => (
                    <div key={meal.id}>
                        <p><strong>{meal.title}</strong></p>
                        <p>{meal.description}</p>
                        <p>Price: {meal.price} DKK</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};
