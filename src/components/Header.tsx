import HeaderBar from "./HeaderBar";
import type { Category, Subcategory } from "@/lib/types";

export default function Header({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  return <HeaderBar categories={categories} subcategories={subcategories} />;
}
