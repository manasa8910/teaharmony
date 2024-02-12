import React from "react";

function CheckboxItem({ label, value, checked, onChange }) {
  const handleCheckboxClick = () => {
    // Scroll to a particular element when checkbox is clicked
    const element = document.getElementById("typeHeading"); // Replace "elementId" with the actual id of the element you want to scroll to
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth", // Add smooth scrolling effect
      });
    }
  };
  return (
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
      <div className="flex items-center ps-3">
        <input
          onClick={handleCheckboxClick}
          key={value}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label className="w-full py-3 ms-2  text-gray-900 dark:text-gray-300">
          {label}
        </label>
      </div>
    </li>
  );
}

export default CheckboxItem;
