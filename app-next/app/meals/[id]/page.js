"use client";
import MealDetail from "@/components/MealDetail/MealDetail";
import { useParams } from "next/navigation";

export default function MealDetailPage() {
  const { id } = useParams();
  return <MealDetail id={id} />;
}
