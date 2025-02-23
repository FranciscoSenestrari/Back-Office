import React, { useState } from "react";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  productoMasRecaudo,
  pedidosXfecha,
  productosMasVendidosFecha,
} from "../handlers/handlers";
import toast from "react-hot-toast";
import InformeChecked from "../components/InformeChecked";
import InformeTable from "../components/InformeTable";
import DownloadSVG from "../assets/DownloadSvg";

interface InformesType {
  fecha_inicio?: string;
  fecha_fin?: string;
  fecha_inicioProducto?: string;
  fecha_finProducto?: string;
  fecha_inicioIngresos?: string;
  fecha_finIngresos?: string;
}
export type informType = {
  titulo: string;
  rangoFechas?: {
    fecha_inicio: string;
    fecha_fin: string;
  };
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
    const promises: Promise<any>[] = [];

    if (pedidosChecked) {
      promises.push(
        pedidosXfecha(getValues("fecha_inicio")!, getValues("fecha_fin")!)
          .then((data) =>
            informes.push({
              titulo: "Informe de pedidos",
              datos: data.data,
            })
          )
          .catch(() => toast.error("Error al generar el informe de pedidos"))
      );
    }

    if (productosChecked) {
      promises.push(
        productosMasVendidosFecha(
          getValues("fecha_inicioProducto")!,
          getValues("fecha_finProducto")!
        )
          .then((data: any) =>
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
        productoMasRecaudo(
          getValues("fecha_inicioIngresos")!,
          getValues("fecha_finIngresos")!
        )
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

      if (index !== 0) doc.addPage();

      doc.setFontSize(16);
      doc.text(informe.titulo, 5, y);
      y += 10;

      doc.setFontSize(14);

      if (informe.titulo === "Informe de pedidos") {
        doc.text(`Pedidos totales: ${informe.datos.pedidosTotales}`, 5, y);
        y += 10;
        doc.text(`Ventas Totales: ${informe.datos.ventasTotales}`, 5, y);
        y += 10;

        // Construimos el cuerpo de la tabla con todos los pedidos
        const body = informe.datos.pedidos.map((pedido: any) => [
          pedido.id,
          pedido.clienteId,
          pedido.fechaCreacion.split("T")[0],
          pedido.estado,
          pedido.productos
            .map(
              (p: any) =>
                `- ${p.cantidad}x ${p.nombreProducto} ($${p.subtotal})`
            )
            .join("\n"),
          pedido.total,
        ]);

        autoTable(doc, {
          head: [
            [
              "ID",
              "Cliente ID",
              "Fecha de creación",
              "Estado",
              "Productos",
              "Total",
            ],
          ],
          body,
          startY: y,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
          margin: { top: 10 },
          alternateRowStyles: { fillColor: [230, 230, 250] },
        });
      }

      if (informe.titulo === "Informe de productos más vendidos") {
        const formattedData = informe.datos.map((item: any) => [
          item.nombre,
          item.cantidadVendida,
        ]);

        if (y > 280) {
          doc.addPage();
          y = 20;
        }

        autoTable(doc, {
          head: [["Nombre", "Cantidad Vendida"]],
          body: formattedData,
          startY: y,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
          alternateRowStyles: { fillColor: [230, 230, 250] },
        });
      }

      if (informe.titulo === "Informe de productos con más ingresos") {
        //el que mas recaudo
        const formattedData = informe.datos.map((item: any) => [
          item.nombre,
          item.precioPorUnidad,
          item.cantidadVendida,
          item.totalVendido,
        ]);

        if (y > 280) {
          doc.addPage();
          y = 20;
        }

        autoTable(doc, {
          head: [
            [
              "Nombre",
              "Precio Por Unidad",
              "Cantidad Vendida",
              "Total Vendidos",
            ],
          ],
          body: formattedData,
          startY: y,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
          alternateRowStyles: { fillColor: [230, 230, 250] },
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
          >
            <div className="overflow-x-auto flex">
              <div className="flex gap-4 w-full text-white">
                <div>
                  <p>Fecha inicio</p>
                  <input
                    className="p-3"
                    {...register("fecha_inicioProducto", {
                      required: productosChecked ? "Campo obligatorio" : false,
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
                    {...register("fecha_finProducto", {
                      required: productosChecked ? "Campo obligatorio" : false,
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
            title="Lista de productos que generaron más ingresos"
            checked={ingresosChecked}
            setChecked={setIngresosChecked}
          >
            <div className="flex gap-4 w-full text-white">
              <div>
                <p>Fecha inicio</p>
                <input
                  className="p-3"
                  {...register("fecha_inicioIngresos", {
                    required: productosChecked ? "Campo obligatorio" : false,
                  })}
                  type="date"
                />
              </div>
              <div>
                <p>Fecha fin</p>
                <input
                  className="p-3"
                  type="date"
                  {...register("fecha_finIngresos", {
                    required: productosChecked ? "Campo obligatorio" : false,
                  })}
                />
              </div>
            </div>
          </InformeChecked>
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
