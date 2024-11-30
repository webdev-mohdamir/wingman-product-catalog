import { Product } from "../types/product";

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div
    className="border rounded-lg p-6 flex flex-col items-center 
  bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white 
  transform transition-transform hover:scale-105"
  >
    <img
      src={product.image}
      alt={product.title}
      className="w-48 h-48 object-contain mb-4 rounded-lg border dark:border-gray-600"
    />
    <h3 className="text-lg font-bold mb-2 text-center text-gray-800 dark:text-white">
      {product.title}
    </h3>
    <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
      ${product.price.toFixed(2)}
    </p>
    <div
      className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 
    bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md mb-3"
    >
      <span>Rating: {product.rating.rate}/5</span>
      <span className="ml-2 text-gray-500 dark:text-gray-300">
        ({product.rating.count} reviews)
      </span>
    </div>
  </div>
);

export default ProductCard;
