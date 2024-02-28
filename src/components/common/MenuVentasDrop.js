import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuVentasDrop = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="">
      <button
        type="button"
        className={`flex items-center w-full p-2 text-white transition duration-75 rounded-lg group hover:bg-secundario `}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>

        <span className="flex-1 pr-28 whitespace-nowrap">{name}</span>
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
                } p-2 transition duration-75 rounded-lg pl-11 group hover:bg-secundario text-sm text-white`
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

export default MenuVentasDrop;
