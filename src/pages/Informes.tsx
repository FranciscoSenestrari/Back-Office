import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import {
  productosMasVendidos,
  pedidosXfecha,
  productoMasRecaudo,
} from "../handlers/handlers";
import toast from "react-hot-toast";
import InformeChecked from "../components/InformeChecked";
import DownloadSVG from "../assets/DownloadSvg";

interface InformesType {
  fecha_inicio?: string;
  fecha_fin?: string;
}
type informType = {
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
            informes.push({ titulo: "Informe de pedidos", datos: data })
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
    let y = 10;
    doc.text("Informes Geraldine", 10, y);
    y += 10;
    doc.text(`Fecha del reporte:${fechaHoy.toLocaleDateString()}`, 10, y);
    doc.setFontSize(12);
    y += 10;
    informe!.forEach(({ titulo, datos }) => {
      doc.text(titulo, 10, y);
      y += 10;
      if (Array.isArray(datos)) {
        datos.forEach((item, index) => {
          doc.text(`${index + 1}. ${item.nombre}:`, 10, y);
          y += 6;
          if (item.cantidadVendida) {
            doc.text(`Cantidad vendida: ${item.cantidadVendida}`, 15, y);
            y += 6;
          }
          if (item.totalVendido) {
            doc.text(`Total recaudado: $${item.totalVendido}`, 15, y);
            y += 6;
          }
          if (item.precioPorUnidad) {
            doc.text(`Precio por unidad: $${item.precioPorUnidad}`, 15, y);
            y += 6;
          }
          // if (item) {
          //   // Definir las columnas de la tabla
          //   const columns = [
          //     "Pedido ID",
          //     "Cliente ID",
          //     "Estado",
          //     "Fecha de Creación",
          //     "Producto ID",
          //     "Nombre Producto",
          //     "Cantidad",
          //     "Precio Unitario",
          //     "Subtotal",
          //   ];
          //   doc.text("Reporte de Pedidos", 14, 20);
          //   doc.table(2, 2, item, columns, { autoSize: true, fontSize: 12 });

          //   const rows: any = [];

          //   // Iterar sobre los pedidos y agregar los productos
          //   // item.data.forEach((pedido) => {
          //   //   pedido.productos.forEach((producto) => {
          //   //     rows.push({
          //   //       pedidoId: pedido.id,
          //   //       clienteId: pedido.clienteId,
          //   //       estado: pedido.estado,
          //   //       fechaCreacion: pedido.fechaCreacion,
          //   //       productoId: producto.productoId,
          //   //       nombreProducto: producto.nombreProducto,
          //   //       cantidad: producto.cantidad,
          //   //       precioUnitario: producto.precioUnitario,
          //   //       subtotal: producto.subtotal,
          //   //     });
          //   //   });
          //   // });

          //   // // Insertar la tabla con todos los pedidos y productos
          //   // doc.table(10, 10, item, columns, { autoSize: true });
          // }
          y += 4;
        });
      } else {
        doc.text(`Detalles: ${JSON.stringify(datos, null, 2)}`, 10, y);
        y += 10;
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
          ></InformeChecked>
          <InformeChecked
            title="Lista de productos que generaron más ingresos"
            checked={ingresosChecked}
            setChecked={setIngresosChecked}
          ></InformeChecked>
          <div className="mt-4 w-full justify-end flex">
            <button
              className="p-4  text-white rounded"
              onClick={generarInforme}
            >
              Generar Informe
            </button>
            <button
              className="p-4  text-white rounded"
              onClick={descargarInforme}
            >
              <DownloadSVG width={20} height={20} stroke="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
