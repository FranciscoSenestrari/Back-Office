import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { cargarProductos } from "../../handlers/handlers";
import { useNavigate } from "react-router";

export interface ProductoCarga {
  id?: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  sku: string | null;
  stock: number;
  activo: boolean;
  umbralStockBajo: number;
  categoriaId: number | null;
  imagenes?: any[];
  pedidos?: any | null;
  marcaId: number;
  subcategoriaId: number;
  varianteId: number | null;
}

export function CargaProductos() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      defaultValues = {
        activo: true,
      },
    },
  } = useForm<ProductoCarga>();

  const onSubmit = async (data: ProductoCarga) => {
    try {
      console.log(data);
      await cargarProductos({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        sku: data.sku,
        stock: data.stock,
        activo: true,
        umbralStockBajo: data.umbralStockBajo,
        categoriaId: data.categoriaId,
        pedidos: data.pedidos,
        marcaId: data.marcaId,
        subcategoriaId: data.subcategoriaId,
        varianteId: data.varianteId,
      });
      toast.success("Producto cargado correctamente");
      navigate("/productos");
    } catch (error) {
      toast.error("Error al cargar producto");
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
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

          <div className="hidden">
            <label
              htmlFor="activo"
              className="block text-white font-medium mb-1"
            >
              Activo
            </label>
            <input
              type="checkbox"
              id="activo"
              checked={true}
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
          <div>
            <label
              htmlFor="marcaId"
              className="block text-white font-medium mb-1"
            >
              MarcaId
            </label>
            <input
              type="number"
              id="marcaId"
              {...register("marcaId", {
                required: "Marca Id es obligatorio",
              })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.marcaId && (
              <span className="text-red-500 text-sm">
                {errors.marcaId.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="marcaId"
              className="block text-white font-medium mb-1"
            >
              VarianteID
            </label>
            <input
              type="number"
              id="varianteID"
              {...register("varianteId", {
                required: "variante Id es obligatorio",
              })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.varianteId && (
              <span className="text-red-500 text-sm">
                {errors.varianteId.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="Categoriaid"
              className="block text-white font-medium mb-1"
            >
              Categoria ID
            </label>
            <input
              type="number"
              id="marcaId"
              {...register("categoriaId", {
                required: "Categoria Id es obligatorio",
              })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoriaId && (
              <span className="text-red-500 text-sm">
                {errors.categoriaId.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="subcatgoriaId"
              className="block text-white font-medium mb-1"
            >
              Subcategoria ID
            </label>
            <input
              type="number"
              id="subcatgoriaId"
              {...register("subcategoriaId", {
                required: "Subcategoria Id es obligatorio",
              })}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subcategoriaId && (
              <span className="text-red-500 text-sm">
                {errors.subcategoriaId.message}
              </span>
            )}
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
