import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPedidos } from "../handlers/handlers";

export interface DataItem {
  id: number;
  activo: boolean;
  estado: string;
  cliente: number;
  producto: any[];
  total: number;
}

export function Pedidos() {
  const [dataQuery, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await getPedidos();
        setData(req.data);
      } catch (error) {
        toast.error("Error al obtener los datos");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>
      <h2>Obtener pedidos</h2>
      <button
        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        onClick={async () => {
          try {
            const req = await getPedidos();
            setData(req.data);
            toast.success("Datos actualizados");
          } catch (error) {
            toast.error("Error al obtener los datos");
          }
        }}
      >
        Obtener
      </button>
      <section>
        <div className="p-4">
          <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Activo</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Producto</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {dataQuery &&
                dataQuery.map((item, index) => (
                  <tr
                    key={item.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-700 text-white"
                        : "bg-gray-600 text-white"
                    }
                  >
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.activo ? "Sí" : "No"}</td>
                    <td className="p-3 capitalize">
                      {item.estado.replace("_", " ")}
                    </td>
                    <td className="p-3">{item.cliente}</td>
                    <td className="p-3">{item.producto.length}</td>
                    <td className="p-3">{item.total.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
