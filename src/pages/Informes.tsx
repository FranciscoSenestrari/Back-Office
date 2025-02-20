import React, { useState } from "react";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  productosMasVendidos,
  pedidosXfecha,
  productoMasRecaudo,
} from "../handlers/handlers";
import toast from "react-hot-toast";
import InformeChecked from "../components/InformeChecked";
import DownloadSVG from "../assets/DownloadSvg";
import { Line } from "react-chartjs-2";
import InformeTable from "../components/InformeTable";

interface InformesType {
  fecha_inicio?: string;
  fecha_fin?: string;
}
export type informType = {
  titulo: string;
  datos: any;
};
export function Informes() {
  const [pedidosChecked, setPedidosChecked] = useState(false);
  const [productosChecked, setProductosChecked] = useState(false);
  const [ingresosChecked, setIngresosChecked] = useState(false);
  const [informe, setInfome] = useState<informType[]>();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<InformesType>();

  async function generarInforme() {
    const informes: { titulo: string; datos: any }[] = [];
    const promises: Promise<any>[] = []; // Cambié Promise<void>[] a Promise<any>[]

    if (pedidosChecked) {
      promises.push(
        pedidosXfecha(getValues("fecha_inicio")!, getValues("fecha_fin")!)
          .then((data) =>
            informes.push({ titulo: "Informe de pedidos", datos: data.data })
          )
          .catch(() => toast.error("Error al generar el informe de pedidos"))
      );
    }

    if (productosChecked) {
      promises.push(
        productoMasRecaudo()
          .then((data) =>
            informes.push({
              titulo: "Informe de productos más vendidos",
              datos: data.data,
            })
          )
          .catch(() =>
            toast.error("Error al generar el informe de productos más vendidos")
          )
      );
    }

    if (ingresosChecked) {
      promises.push(
        productosMasVendidos()
          .then((data: any) =>
            informes.push({
              titulo: "Informe de productos con más ingresos",
              datos: data.data,
            })
          )
          .catch(() =>
            toast.error(
              "Error al generar el informe de productos con más ingresos"
            )
          )
      );
    }

    await Promise.all(promises);

    if (informes.length > 0) {
      console.log(informes);
      setInfome(informes);
      toast.success("Informes generados correctamente");
    } else {
      toast.error("Seleccione al menos un informe para generar");
    }
  }
  function descargarInforme() {
    const fechaHoy = new Date(Date.now());
    const doc = new jsPDF();
    doc.setFontSize(16);

    doc.text("Informes Geraldine", 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha del reporte: ${fechaHoy.toLocaleDateString()}`, 10, 20);

    informe?.forEach((informe, index) => {
      let y = 30;

      if (index !== 0) doc.addPage(); // Agrega nueva página solo si no es el primer informe

      doc.setFontSize(16);
      doc.text(informe.titulo, 10, y);
      y += 10;

      doc.setFontSize(14);

      if (informe.titulo === "Informe de pedidos") {
        doc.text(`Pedidos totales: ${informe.datos.pedidosTotales}`, 10, y);
        y += 10;
        doc.text(`Ventas Totales: ${informe.datos.ventasTotales}`, 10, y);
        y += 10;

        informe.datos.pedidos.forEach((pedido: any) => {
          if (y > 280) {
            // Salto de página si es necesario
            doc.addPage();
            y = 20;
          }
          doc.text(`Pedido ID: ${pedido.id}`, 10, y);
          y += 6;
          doc.text(`Cliente ID: ${pedido.clienteId}`, 15, y);
          y += 6;
          doc.text(`Fecha de creación: ${pedido.fechaCreacion}`, 15, y);
          y += 6;
          doc.text(`Productos:`, 10, y);
          y += 6;

          pedido.productos.forEach((producto: any) => {
            if (y > 280) {
              doc.addPage();
              y = 20;
            }
            doc.text(
              `${producto.productoId}: ${producto.nombreProducto}`,
              20,
              y
            );
            y += 6;
            doc.text(`Cantidad: ${producto.cantidad}`, 20, y);
            y += 6;
            doc.text(`Precio Unitario: ${producto.precioUnitario}`, 20, y);
            y += 6;
            doc.text(`Subtotal: ${producto.subtotal}`, 20, y);
            y += 6;
          });

          y += 10;
        });
      }

      if (informe.titulo === "Informe de productos más vendidos") {
        informe.datos.forEach((producto: any) => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(`Nombre: ${producto.nombre}`, 10, y);
          y += 6;
          doc.text(`Cantidad Vendida: ${producto.cantidadVendida}`, 20, y);
          y += 6;
          doc.text(`Precio Unitario: ${producto.precioPorUnidad}`, 20, y);
          y += 6;
          doc.text(`Total Recaudado: ${producto.totalVendido}`, 20, y);
          y += 6;
        });
      }

      if (informe.titulo === "Informe de productos con más ingresos") {
        informe.datos.forEach((producto: any) => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(`Nombre: ${producto.nombre}`, 10, y);
          y += 6;
          doc.text(`Cantidad Vendida : ${producto.cantidadVendida}`, 10, y);
          y += 6;
        });
      }
    });

    doc.save("Informe.pdf");
    toast.success("PDF generado correctamente");
  }

  return (
    <div className="w-full">
      <h1>Informes</h1>
      <div className="p-6 bg-gray-900 min-h-screen">
        <h2 className="text-yellow-50">
          Ingrese las fechas para generar el informe
        </h2>
        <div className="flex gap-4 flex-col text-white">
          <InformeChecked
            title="Pedidos por fecha"
            checked={pedidosChecked}
            setChecked={setPedidosChecked}
          >
            <div className="overflow-x-auto flex">
              <div className="flex gap-4 w-full text-white">
                <div>
                  <p>Fecha inicio</p>
                  <input
                    className="p-3"
                    {...register("fecha_inicio", {
                      required: pedidosChecked ? "Campo obligatorio" : false,
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
                      required: pedidosChecked ? "Campo obligatorio" : false,
                    })}
                  />
                  {errors.fecha_fin && (
                    <p className="text-red-500 text-sm">
                      {errors.fecha_fin.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </InformeChecked>
          <InformeChecked
            title="Productos más vendidos"
            checked={productosChecked}
            setChecked={setProductosChecked}
          />
          <InformeChecked
            title="Lista de productos que generaron más ingresos"
            checked={ingresosChecked}
            setChecked={setIngresosChecked}
          />
          <div className="mt-4 w-full justify-end flex">
            <button
              className="p-4  text-white rounded"
              onClick={generarInforme}
            >
              Generar Informe
            </button>
            <button
              disabled={!informe}
              className={
                !informe
                  ? "p-4bg-gray-400 text-gray-600 cursor-not-allowed opacity-50 py-2 px-4 rounded"
                  : "p-4  text-white rounded"
              }
              onClick={descargarInforme}
            >
              <DownloadSVG width={20} height={20} stroke="white" />
            </button>
          </div>
        </div>
        <InformeTable informe={informe!} />
      </div>
    </div>
  );
}
