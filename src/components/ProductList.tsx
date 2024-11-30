import { useEffect, useState, useMemo } from "react";
import {
  selectSortedAndFilteredProducts,
  selectProductStatus,
} from "../features/products/productsSelectors";
import { useAppDispatch, useAppSelector } from "../store";
import { loadProducts } from "../features/products/productsSlice";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

// Product List Component
const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectProductStatus);
  const allProducts = useAppSelector((state) => state.products.items);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const sortedAndFilteredProducts = useAppSelector(
    selectSortedAndFilteredProducts
  );

  // Load products only once when component mounts and products are empty
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, allProducts.length]);

  // Reset page when sorted/filtered products change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortedAndFilteredProducts]);

  // Memoize pagination calculation
  const paginatedProducts = useMemo(
    () =>
      sortedAndFilteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [sortedAndFilteredProducts, currentPage, itemsPerPage]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        totalItems={sortedAndFilteredProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductList;
