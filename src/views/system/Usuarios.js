import React from "react";
import MenuHamburguesa from "../../components/layout/system/MenuHamburguesa";
import TablaUsuarios from "../../components/layout/system/TablaUsuarios";

const Usuarios = () => {
  return (
    <>
      <MenuHamburguesa />

      <div className="sm:ml-64">
        <div className="p-4 rounded-lg mt-12 sm:mt-12">
          <div className="flex  items-center mb-4">
            <h2 className="text-2xl p-4 font-semibold  text-gray-900 ">
              Usuarios <span className="text-principal"> la FÉ</span>
            </h2>
          </div>
          <TablaUsuarios />
        </div>
      </div>
    </>
  );
};

export default Usuarios;
