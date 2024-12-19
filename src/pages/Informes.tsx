import React from "react";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import { informes } from "../handlers/handlers";
import toast from "react-hot-toast";

interface InformesType {
  fecha_inicio: string;
  fecha_fin: string;
}
interface ResponseType {
  fechaInicio: string;
  fechaFin: string;
  ventasTotales: number;
  numeroPedidos: number;
  productosMasVendidos: string;
}
export function Informes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformesType>();

  const onSubmit = async (data: InformesType) => {
    console.log(data);

    // Aquí simulas una query (puedes reemplazarlo por tu lógica de fetch o API call)

    try {
      const doc = new jsPDF();
      const mock = [
        {
          fechaInicio: "2024-12-12",
          fechaFin: "2024-12-18",
          ventasTotales: 0.0,
          numeroPedidos: 0,
          productosMasVendidos: "Camiseta Básica",
        },
      ];

      // Título
      doc.setFontSize(16);
      doc.text("Informe de Datos", 10, 10);

      // Fechas
      doc.setFontSize(12);
      doc.text(`Fecha de inicio: ${data.fecha_inicio}`, 10, 20);
      doc.text(`Fecha de fin: ${data.fecha_fin}`, 10, 30);

      // Resultados de la query
      doc.text("Resultados:", 10, 40);
      let y = 50; // posición inicial en Y
      mock.forEach((item: ResponseType) => {
        doc.text(
          `fecha inicio : ${item.fechaInicio}, Fecha fin: ${item.fechaFin}, numeroPedidos: ${item.numeroPedidos} ,productos mas vendidos: ${item.productosMasVendidos} Ventas totales: ${item.ventasTotales}  `,
          10,
          y
        );
        y += 10; // Incrementa la posición para la siguiente línea
      });

      // Descargar el PDF
      doc.save("informe.pdf");
      const req = await informes(data.fecha_inicio, data.fecha_fin);
    } catch (error) {
      toast.error("Error al generar el informe");
    }
  };

  return (
    <div className="w-full">
      <h1>Informes</h1>
      <h2>Ingrese las fechas para generar el informe</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 w-full text-white"
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
