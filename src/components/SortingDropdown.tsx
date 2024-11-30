import { setSortOption } from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { SortOption } from "../types/product";

const SortDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.products.sortOption);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value as SortOption));
  };

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="p-2 border rounded-md mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-700"
    >
      <option value="">Sort By</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
      <option value="rating-desc">Rating: High to Low</option>
    </select>
  );
};

export default SortDropdown;
