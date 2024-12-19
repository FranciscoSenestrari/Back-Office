import React from "react";
import { useForm } from "react-hook-form";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  sku: string | null;
  activo: boolean;
  stock: number;
  umbralStockBajo: number;
  imagenes: any[];
  categoria: any | null;
  pedidos: any | null;
  marca: any | null;
  subcategoria: any | null;
  variante: any | null;
}

export function CargaProductos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Producto>();

  const onSubmit = (data: Producto) => {
    console.log(data);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-white text-2xl font-semibold mb-4">
        Carga de Productos
      </h1>
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-semibold mb-4">
          Carga de Productos
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-white font-medium mb-1"
            >
              Nombre
            </label>
            <input
              id="nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nombre && (
              <span className="text-red-500 text-sm">
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-white font-medium mb-1"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              {...register("descripcion")}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="precio"
              className="block text-white font-medium mb-1"
            >
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              id="precio"
              {...register("precio", { required: "El precio es obligatorio" })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.precio && (
              <span className="text-red-500 text-sm">
                {errors.precio.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="sku" className="block text-white font-medium mb-1">
              SKU
            </label>
            <input
              id="sku"
              {...register("sku")}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="activo"
              className="block text-white font-medium mb-1"
            >
              Activo
            </label>
            <input
              type="checkbox"
              id="activo"
              {...register("activo")}
              className="h-5 w-5 text-blue-500 rounded focus:ring-0"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-white font-medium mb-1"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              {...register("stock", { required: "El stock es obligatorio" })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.stock && (
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="umbralStockBajo"
              className="block text-white font-medium mb-1"
            >
              Umbral de Stock Bajo
            </label>
            <input
              type="number"
              id="umbralStockBajo"
              {...register("umbralStockBajo", {
                required: "El umbral de stock bajo es obligatorio",
              })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.umbralStockBajo && (
              <span className="text-red-500 text-sm">
                {errors.umbralStockBajo.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
