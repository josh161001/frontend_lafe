import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuUsuariosDrop = ({ name, options }) => {
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
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
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

export default MenuUsuariosDrop;
