import styles from "./Meal.module.css";

const Meal = ({ meal }) => {
  return (
    <div className={styles.card}>
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>Price: {meal.price} DKK</p>
    </div>
  );
};

export default Meal;