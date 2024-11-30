import { setSearchTerm } from "../features/products/productsSlice";
import { useAppDispatch } from "../store";

// Search Bar Component
const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search products within the catalog..."
      onChange={handleSearchChange}
      className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  );
};

export default SearchBar;
