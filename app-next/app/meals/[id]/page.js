import MealDetail from "@/components/MealDetail/MealDetail";

export default function MealDetailPage({ params }) {
  return <MealDetail id={params.id} />;
}
