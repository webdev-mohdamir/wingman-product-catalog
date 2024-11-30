import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import DarkModeToggle from "./components/DarkModeToggel";
import SortDropdown from "./components/SortingDropdown";

// Main App Component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
            <DarkModeToggle />
          </div>

          <div className="flex justify-end mb-2 gap-4">
            <SearchBar />
            <SortDropdown />
          </div>
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
