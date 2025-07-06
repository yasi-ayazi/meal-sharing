import Link from "next/link";
import styles from "./Meal.module.css";
import imageMap from "@/utils/imageMap";


const Meal = ({ meal }) => {
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
      </div>
    </Link>
  );
};

export default Meal;
