import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState, SortOption } from "../../types/product";
import { RootState } from "../../store";
import { fetchProducts } from "../../services/api";

// Async thunk for fetching products
export const loadProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("products/loadProducts", async () => {
  return await fetchProducts();
});

// Initial state with strong typing
const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  searchTerm: "",
  sortOption: "price-asc",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchTerm, setSortOption } = productsSlice.actions;
export default productsSlice.reducer;
