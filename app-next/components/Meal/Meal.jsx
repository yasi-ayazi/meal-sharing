import Link from "next/link";
import styles from "./Meal.module.css";

const Meal = ({ meal }) => {
  return (
    <Link href={`/meals/${meal.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <p>Price: {meal.price} DKK</p>
      </div>
    </Link>
  );
};

export default Meal;
