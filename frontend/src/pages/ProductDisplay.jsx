import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { IoIosSearch } from "react-icons/io";

import Item from "../components/Item";
import CheckboxItem from "../components/CheckboxItem";
import Banner from "../components/Banner";

function ProductDisplay({ type }) {
  const { all_product } = useContext(ShopContext);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const uniqueCategories = Array.from(
    new Set(
      all_product
        .filter((item) => {
          return type === item.type;
        })
        .map((item) => item.category)
    )
  );

  const applyPriceFilter = (item) => {
    if (selectedPriceFilter === "lowToHigh") {
      return item.price;
    } else if (selectedPriceFilter === "highToLow") {
      return -item.price;
    }
    return null;
  };

  const applyCategoryFilter = (item) => {
    if (selectedCategories.length === 0) return true; // No category filter applied
    return selectedCategories.includes(item.category);
  };

  const filteredProducts = all_product
    .filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter((item) => {
      if (selectedRating === null) return true; // No rating filter applied
      const averageRating =
        item.rating.reduce((acc, currValue) => acc + currValue, 0) /
        item.rating.length;
      return averageRating >= selectedRating;

      // if (selectedRating === 5) {
      //   return averageRating === 5;
      // } else {
      //   return (
      //     averageRating >= selectedRating &&
      //     averageRating < selectedRating + 0.5
      //   );
      // }
    })
    .filter(applyCategoryFilter)
    .sort((a, b) => {
      const priceA = applyPriceFilter(a);
      const priceB = applyPriceFilter(b);

      if (priceA === null || priceB === null) {
        return 0; // No price filter applied
      }

      return priceA - priceB;
    });

  const handleRatingChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedRating(
      selectedValue === "all" ? null : parseFloat(selectedValue)
    );
  };

  const handlePriceFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPriceFilter(selectedValue === "all" ? null : selectedValue);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      // If the category is already selected, remove it
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1);
    } else {
      // If the category is not selected, add it
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };
  const handleClearFilters = () => {
    setSearchInput("");
    setSelectedRating(null);
    setSelectedPriceFilter(null);
    setSelectedCategories([]);
  };

  return (
    <>
      <Banner type={type} />
      <div className=" font-extrabold text-gray-600 text-4xl h-[7vh] w-full my-3 flex items-center gap-8 ">
        <div className="min-w-max ml-4">
          {type === "Tea" ? "TEA" : "TEAWARE"} COLLECTIONS
        </div>
        <div className="border-b-2 w-full mr-8 border-gray-300"></div>
      </div>
      <div className="flex relative">
        {/* filter */}
        <div className="hidden bg-gray-100 h-[91.5vh] sticky top-16 left-2 min-w-[18vw] rounded-lg  lg:flex lg:flex-col gap-5 p-5 mx-3 font-bold ">
          {/* Clear Filters button */}
          <button
            onClick={handleClearFilters}
            className=" px-3 py-1 bg-gray-200  rounded-md"
          >
            Clear All Filters
          </button>

          {/* search */}
          <div className="flex border items-center gap-1 pl-1 py-1 rounded-md bg-white">
            <IoIosSearch className="text-gray-500" />

            <input
              className="text-gray-500 outline-none"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>

          {/* rating */}
          <div>
            <select
              id="filterByRating"
              value={
                selectedRating === null ? "all" : selectedRating.toString()
              }
              onChange={handleRatingChange}
              className="bg-gray-50 border border-gray-300  text-gray-900
               rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">Filter by Rating</option>
              <option value="5">5</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3.5">3.5+</option>
              <option value="3">3+</option>
            </select>
          </div>

          {/* price */}
          <div>
            <select
              id="filterByPrice"
              value={selectedPriceFilter === null ? "all" : selectedPriceFilter}
              onChange={handlePriceFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">Sort by Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* category */}
          <div>
            <h3 className="mb-2 text-lg text-gray-900 dark:text-white">
              Category
            </h3>
            <ul className=" text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600dark:text-white">
              {uniqueCategories.map((category) => (
                <CheckboxItem
                  key={category}
                  label={category}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* display */}
        <div className="mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts
            .filter((item) => {
              // Check if the item's type matches the current type prop
              return type === item.type;
            })
            .map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.img1}
                category={item.category}
                price={item.price}
                rating={
                  Math.round(
                    (item.rating.reduce(
                      (acc, currValue) => acc + currValue,
                      0
                    ) /
                      item.rating.length) *
                      100
                  ) / 100
                }
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductDisplay;
