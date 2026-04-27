import CategoryCard from "@/components/modules/categories/categoryCard";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types";

export const dynamic = "force-dynamic";

export default async function CategoryPage() {
  const result = await categoryService.getCategories();

  // API structure: result.data.data = actual array
  const categories: Category[] = result?.data?.data || [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
