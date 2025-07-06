"use client";

import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import styles from "./MealsList.module.css";
import api from "@/utils/api";

export const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [sortDir, setSortDir] = useState("asc");

  // Accept optional search argument
  const fetchMeals = async (search = "") => {
    try {
      let url = `/meals?sortKey=${sortKey}&sortDir=${sortDir}`;
      if (search.trim()) {
        url += `&title=${encodeURIComponent(search)}`;
      }
      const result = await fetch(api(url));
      const jsonResult = await result.json();
      if (Array.isArray(jsonResult)) {
        setMeals(jsonResult);
      } else {
        setMeals([]);
      }
    } catch (err) {
      setMeals([]);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [sortKey, sortDir]);


  const handleSearch = () => {
    fetchMeals(searchTerm);
  };

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
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <label>Sort by:</label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="price">Price</option>
          <option value="max_reservations">Max Reservations</option>
        </select>

        <label>Direction:</label>
        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {content}
    </div>
  );
};