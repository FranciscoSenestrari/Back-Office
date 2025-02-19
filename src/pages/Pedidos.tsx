import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cambiarEstadoPedido, getPedidos } from "../handlers/handlers";
import { DropdownPedidos } from "../components/DropdownPedidos";
import DropDown from "../components/DropDown";

export interface DataItem {
  id: number;
  activo: boolean;
  estado: string;
  fechaCreacion: string;
  clienteId: number;
  productos?: {
    id: number;
    productoId: number;
    nombreProducto: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
}

export function Pedidos() {
  const [dataQuery, setData] = useState<DataItem[]>([]);

  const estados = ["En_proceso", "Enviado", "Completado"];
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
    <div className="w-full ">
      <h1>Pedidos</h1>

      <div className="p-6 bg-gray-900 min-h-screen  relative z-0">
        <h1 className="text-2xl font-bold text-white mb-4">Lista de Pedidos</h1>
        <button
          className="text-white my-4"
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
          Actualizar
        </button>
        <div className="overflow-x-auto ">
          <table className="w-full  table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Fecha Creacion</th>
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
                    <td className="p-3">{item.fechaCreacion.split("T")[0]}</td>
                    <td className="p-3 capitalize">
                      <DropdownPedidos
                        idPedido={item.id}
                        estadoActual={item.estado}
                        options={estados}
                      />
                    </td>
                    <td className="p-3">{item.clienteId}</td>
                    <td className="p-3">
                      {
                        //@ts-ignore
                        <DropDown options={item.productos} />
                      }
                    </td>
                    <td className="p-3">{item.total.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
