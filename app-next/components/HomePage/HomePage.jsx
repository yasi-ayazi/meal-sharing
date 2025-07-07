"use client";
import { MealsList } from "../MealsList/MealsList";
import Link from "next/link";

const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Meal Sharing!</h1>
      <p>Find delicious meals shared by others.</p>

      
      <MealsList limit={10} />

      <div style={{ marginTop: "2rem" }}>
        <Link href="/meals">
          <button>See all meals</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
