import { informType } from "../pages/Informes";
import DropDown from "./DropDown";
export default function InformeTable({ informe }: { informe: informType[] }) {
  if (!informe) return <p></p>;

  return (
    <section className="relative">
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
                <div className="text-white">
                  <h4 className="text-white font-bold">Detalles :</h4>
                  <p>Cantidad de pedidos: {item.datos.pedidosTotales}</p>
                  <p>Total de lo vendido :{item.datos.ventasTotales}</p>
                </div>
                <table className="w-full text-white border-collapse">
                  <thead>
                    <tr>
                      {Object.keys(item.datos.pedidos[0]).map((value, i) => (
                        <td key={i} className="border p-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.datos.pedidos.map((pedido: any, i: number) => (
                      <tr key={i} className="border">
                        {Object.values(pedido).map((valor, j) => (
                          <td key={j} className="border p-2">
                            {typeof valor === "object" && valor !== null ? (
                              //@ts-ignore
                              <DropDown options={valor} />
                            ) : (
                              `${valor}`
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr>
                    {Object.keys(item.datos[0]).map((i) => {
                      return (
                        <td key={i} className="border p-2">
                          {i}
                        </td>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {item.datos.map((data: any, i: number) => (
                    <tr key={i} className="border">
                      {Object.values(data).map((valor, j) => (
                        <td key={j} className="border p-2">
                          {`${valor}`}
                        </td>
                      ))}
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
