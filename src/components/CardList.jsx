// CardList.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {

  // --- Pagination State ---
  const limit = 10;
  const [offset, setOffset] = useState(0);

  // The full working dataset (may be filtered)
  const [products, setProducts] = useState(data.slice(0, limit));

  // This is the dataset after applying a search filter
  const [filteredData, setFilteredData] = useState(data);

  // --- Pagination Handler (combined previous + next) ---
  const handlePaginate = (direction) => {
    if (direction === "next") {
      // Prevent going past the end
      if (offset + limit >= filteredData.length) return;
      setOffset(offset + limit);
    } else {
      // Prevent going before 0
      if (offset === 0) return;
      setOffset(offset - limit);
    }
  };

  // --- Search Filter Handler ---
  const filterTags = (searchTerm) => {
    if (!searchTerm) {
      // Empty search → reset
      setFilteredData(data);
      setOffset(0);
      setProducts(data.slice(0, limit));
      return;
    }

    const filtered = data.filter((product) =>
      product.tags.some((tag) =>
        tag.title.toLowerCase().includes(searchTerm)
      )
    );

    setFilteredData(filtered);
    setOffset(0); // reset page
    setProducts(filtered.slice(0, limit)); // first page
  };

  // --- Update visible products whenever offset or filteredData changes ---
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  return (
    <div className="cf pa2">

      {/* SEARCH BAR */}
      <Search handleSearch={filterTags} />

      {/* CARDS */}
      <div className="mt2 mb2">
        {products.length === 0 ? (
          <p>No matching products.</p>
        ) : (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      <div className="flex items-center justify-center pa4">
        <Button
  text="Previous"
  handleClick={() => handlePaginate("prev")}
  disabled={offset === 0}
/>

<Button
  text="Next"
  handleClick={() => handlePaginate("next")}
  disabled={offset + limit >= filteredData.length}
/>

      </div>
    </div>
  );
};

export default CardList;
