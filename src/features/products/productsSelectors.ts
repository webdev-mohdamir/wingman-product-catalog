import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectProductsState = (state: RootState) => state.products;

export const selectAllProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.items
);

export const selectFilteredProducts = createSelector(
  selectProductsState,
  (productsState) => {
    const { items, searchTerm } = productsState;
    return items.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

export const selectProductStatus = createSelector(
  selectProductsState,
  (productsState) => productsState.status
);

export const selectSortedAndFilteredProducts = createSelector(
  selectProductsState,
  (productsState) => {
    const { items, searchTerm, sortOption } = productsState;

    // First, filter by search term
    const filteredProducts = items.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then sort based on the selected option
    return filteredProducts.sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-asc":
          return a.rating.rate - b.rating.rate;
        case "rating-desc":
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });
  }
);
