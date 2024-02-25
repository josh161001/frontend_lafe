import React from "react";
import MenuHamburguesa from "../../components/layout/system/MenuHamburguesa";

const Categorias = () => {
  return (
    <>
      <MenuHamburguesa />

      <div className="sm:ml-64">
        <div className="p-4 rounded-lg mt-12 sm:mt-12">
          <div className="flex  items-center mb-4">
            <h2 className="text-2xl p-4 font-semibold  text-gray-900 ">
              Categorias <span className="text-principal">Lafé</span>
            </h2>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <h1>Categorias</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categorias;
