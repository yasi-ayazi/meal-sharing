"use client";
import { MealsList } from "../MealsList/MealsList";
import Link from "next/link";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Meal Sharing!</h1>
      <p className={styles.description}>Find delicious meals shared by others.</p>

      <MealsList limit={8} />

      <div className={styles.linkWrapper}>
        <Link href="/meals">
          <button className={styles.button}>See all meals</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
