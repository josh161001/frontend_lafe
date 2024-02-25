const AgregarUsuario = () => {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2">
            Actualizar categoria en
            <span className="text-menta"> la App</span>
          </h1>
          <small className="text-gray-400">
            Para actualizar a los testimonios ingresa los siguientes datos
          </small>
          <form className="mt-4">
            <div className="mb-3">
              <label className="mb-2 block text-xs font-semibold">Nombre</label>
              <input
                name="name"
                type="text"
                placeholder="nombre..."
                // value={categoria.name}
                className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
                // onChange={categoriaState}
              />
            </div>

            <div className="mb-3 flex gap-2">
              <button
              // disabled={validarCategoria()}
              // className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
              //   validarCategoria() ? "bg-menta " : "bg-verde"
              // }`}
              >
                Actualizar categoria
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarUsuario;
