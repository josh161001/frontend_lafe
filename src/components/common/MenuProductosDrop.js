import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuProductosDrop = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="">
      <button
        type="button"
        className={`flex items-center w-full p-2  text-white transition duration-75 rounded-lg group hover:bg-secundario `}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>

        <span className="flex-1 pr-24 whitespace-nowrap">{name}</span>
        <svg
          className={`w-3 h-3 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul className={`${isOpen ? "block" : "hidden"} py-2 space-y-2`}>
        {options.map((option, index) => (
          <li key={index}>
            <NavLink
              to={option.to}
              className={({ isActive }) =>
                `flex items-center w-full ${
                  isActive ? "bg-secundario" : ""
                } p-2 transition duration-75 rounded-lg pl-11 group hover:bg-secundario text-white`
              }
            >
              {option.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuProductosDrop;
