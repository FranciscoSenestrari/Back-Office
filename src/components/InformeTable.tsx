import React from "react";
import { informType } from "../pages/Informes";

export default function InformeTable(informe: informType[]) {
  return (
    <section>
      <h2 className="text-yellow-50">
        {(informe?.length ?? 0) > 0
          ? "Informes generados"
          : "No hay informes disponibles"}
      </h2>

      {(informe?.length ?? 0) > 0 &&
        (informe ?? []).map((item, index) => (
          <div key={index} className="mb-4 overflow-x-auto">
            <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
            {item.titulo === "Informe de pedidos" ? (
              <>
                <h4 className="text-white font-bold">Detalles del pedido:</h4>
                <p>{item.datos.pedidosTotales}</p>
                <p>{item.datos.ventasTotales}</p>
                <table className="w-full text-white border-collapse">
                  <thead>
                    <tr>
                      {Object.keys(item.datos).map((key, i) => (
                        <td key={i} className="border p-2">
                          {key}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(item.datos).map(([key, value], i) => (
                      <tr key={i}>
                        <td className="border p-2">{key}</td>
                        <td className="border p-2">{JSON.stringify(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : item.titulo == "" ? (
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr>
                    {Object.keys(item.datos).map((key, i) => (
                      <td key={i} className="border p-2">
                        {key}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(item.datos).map(([key, value], i) => (
                    <tr key={i}>
                      <td className="border p-2">{key}</td>
                      <td className="border p-2">{JSON.stringify(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr>
                    {Object.keys(item.datos).map((key, i) => (
                      <td key={i} className="border p-2">
                        {key}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(item.datos).map(([key, value], i) => (
                    <tr key={i}>
                      <td className="border p-2">{key}</td>
                      <td className="border p-2">{JSON.stringify(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
    </section>
  );
}
