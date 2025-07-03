import { notFound } from "next/navigation";
import MealDetail from "@/components/MealDetail/MealDetail";
import api from "@/utils/api";

export default async function MealDetailPage({ params }) {
  const { id } = params;

  const res = await fetch(api(`/meals/${id}`));

  if (!res.ok) {
    return notFound();
  }

  const meal = await res.json();

  return <MealDetail meal={meal} />;
}

export async function generateStaticParams() {
  const res = await fetch(api("/meals"));
  const meals = await res.json();

  if (!Array.isArray(meals)) {
    return [];
  }

  return meals.map((meal) => ({
    id: meal.id.toString(),
  }));
}
