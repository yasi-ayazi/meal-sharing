import MealsList from "@/components/MealsList/MealsList";

export default function MealsPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Meals</h1>
      <MealsList showAll />
    </div>
  );
}
