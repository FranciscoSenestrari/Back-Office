import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProductos } from "../../handlers/handlers";
import { useNavigate, useNavigation } from "react-router";
import DownloadSVG from "../../assets/DownloadSvg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export interface Producto {
  id?: number;
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
export function Productos() {
  const [data, setData] = useState<Producto[]>();
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await getProductos();
        console.log(req.data);
        setData(req.data);
      } catch (error) {
        toast.error("Error al obtener los datos");
      }
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  function descargarListaProducto() {
    const doc = new jsPDF();
    const table = document.getElementById(
      "listaProductos"
    ) as HTMLTableElement | null;

    if (!table) {
      console.error("No se encontró el elemento con ID 'listaProductos'");
      return;
    }

    // Extraer los datos de la tabla
    const headers: string[] = [];
    const data: string[][] = [];

    // Obtener los encabezados
    const headerElements = table.querySelectorAll("thead tr th");

    headerElements.forEach((th) => headers.push((th as HTMLElement).innerText));

    // Obtener los datos de la tabla
    const rowElements = table.querySelectorAll("tbody tr");
    rowElements.forEach((row) => {
      const rowData: string[] = [];
      row.querySelectorAll("td").forEach((td) => rowData.push(td.innerText));
      data.push(rowData);
    });

    doc.text("Lista de Productos", 10, 10);

    // Generar la tabla en el PDF con autoTable
    autoTable(doc, {
      head: [headers], // Encabezados
      body: data, // Datos de la tabla
      startY: 30, // Margen superior
      margin: { left: 10, right: 10 }, // Márgenes laterales
      styles: { fontSize: 10, cellPadding: 2 }, // Ajustes de estilo
    });

    // Guardar el PDF
    doc.save("lista_productos.pdf");
  }

  return (
    <div className="w-full">
      <h1>Productos</h1>
      <div className="p-6 bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-4">
          Lista de Productos
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="text-white my-4 "
            onClick={() => {
              descargarListaProducto();
            }}
          >
            <DownloadSVG width={20} height={20} stroke="white" />
          </button>
          <button
            className="text-white my-4"
            onClick={() => {
              navigate("/productos/cargar");
            }}
          >
            Agregar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table
            id="listaProductos"
            className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg"
          >
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">SKU</th>
                <th className="p-3 text-left">Activo</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Umbral Stock Bajo</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((producto, index) => (
                  <tr
                    key={producto.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-700 text-white"
                        : "bg-gray-600 text-white"
                    }
                  >
                    <td className="p-3">{producto.id}</td>
                    <td className="p-3 capitalize">{producto.nombre}</td>
                    <td className="p-3">
                      {producto.descripcion ? producto.descripcion : "N/A"}
                    </td>
                    <td className="p-3">${producto.precio.toFixed(2)}</td>
                    <td className="p-3">
                      {producto.sku ? producto.sku : "N/A"}
                    </td>
                    <td className="p-3">{producto.activo ? "Sí" : "No"}</td>
                    <td className="p-3">{producto.stock}</td>
                    <td className="p-3">{producto.umbralStockBajo}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
