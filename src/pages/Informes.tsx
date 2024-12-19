import React from "react";
import { useForm } from "react-hook-form";

interface InformesType {
  fecha_inicio: string;
  fecha_fin: string;
}
export function Informes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformesType>();
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <h1>Informes</h1>
      <h2>Ingrese las fechas para generar el informe</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex  gap-4 w-full  text-white"
      >
        <div>
          <p>Fecha inicio</p>
          <input
            className="p-3"
            {...register("fecha_inicio", {
              required: "Campo obligatorio",
            })}
            type="date"
          />
          {errors.fecha_inicio && (
            <p className="text-red-500 text-sm">
              {errors.fecha_inicio.message}
            </p>
          )}
        </div>
        <div>
          <p>Fecha fin</p>
          <input
            className="p-3"
            type="date"
            {...register("fecha_fin", {
              required: "Campo obligatorio",
            })}
          />
          {errors.fecha_fin && (
            <p className="text-red-500 text-sm">{errors.fecha_fin.message}</p>
          )}
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="w-full p-4 bg-black text-white hover:bg-gray-800 rounded-xl py-3 px-10"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
