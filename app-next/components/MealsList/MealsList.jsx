"use client";

import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import styles from "./MealsList.module.css";
import api from "@/utils/api";
import SearchControls from "../SearchControls/SearchControls";

export const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [sortDir, setSortDir] = useState("asc");
  const [hasSearched, setHasSearched] = useState(false);

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
    if (hasSearched || !searchTerm.trim()) {
      fetchMeals(searchTerm);
    }
  }, [sortKey, sortDir]);

  const handleSearch = () => {
    setHasSearched(true);
    fetchMeals(searchTerm);
  };

  let content;
  if (meals.length === 0) {
    content = <p>Loading...</p>;
  } else {
    const mealsToDisplay = limit ? meals.slice(0, limit) : meals;
    content = (
      <div className={styles.grid}>
        {mealsToDisplay.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Meals</h2>
      <SearchControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortDir={sortDir}
        setSortDir={setSortDir}
      />
      {content}
    </div>
  );
};
