import { informType } from "../pages/Informes";
import DropDown from "./DropDown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function InformeTable({ informe }: { informe: informType[] }) {
  if (!informe || informe.length === 0)
    return <p className="text-white">No hay informes disponibles</p>;

  const handleDownloadPDF = (title: string, data: any[]) => {
    if (!data || data.length === 0) return;

    const doc = new jsPDF();
    doc.text(title, 14, 10);

    const headers = Object.keys(data[0] ?? {}); // Extrae encabezados de la primera fila
    const rows = data.map((row) =>
      headers.map((key) =>
        typeof row[key] === "object" ? "Ver detalles" : row[key]
      )
    );

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
    });

    doc.save(`${title}.pdf`);
  };

  return (
    <section className="relative p-4">
      <h2 className="text-yellow-50 text-xl font-semibold mb-4">
        Informes generados
      </h2>

      {informe.map((item, index) => {
        const datos = Array.isArray(item.datos)
          ? item.datos
          : item.datos?.pedidos || [];
        const headers = datos.length > 0 ? Object.keys(datos[0]) : [];

        return (
          <div
            key={index}
            className="mb-8 overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>

            {item.titulo === "Informe de pedidos" && (
              <div className="text-white mb-4">
                <h4 className="text-lg font-semibold">Detalles:</h4>
                <p>
                  Cantidad de pedidos:
                  <span className="font-bold">{item.datos.pedidosTotales}</span>
                </p>
                <p>
                  Total de lo vendido:
                  <span className="font-bold">{item.datos.ventasTotales}</span>
                </p>
              </div>
            )}

            {headers.length > 0 ? (
              <>
                <table className="w-full text-white border border-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-gray-700">
                    <tr>
                      {headers.map((value, i) => (
                        <th
                          key={i}
                          className="p-3 border border-gray-600 text-left"
                        >
                          {value}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((row: any, i: any) => (
                      <tr
                        key={i}
                        className="border border-gray-700 hover:bg-gray-600 transition"
                      >
                        {headers.map((key, j) => (
                          <td key={j} className="p-3 border border-gray-600">
                            {typeof row[key] === "object" ? (
                              <DropDown options={row[key]} />
                            ) : (
                              `${row[key]}`
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => handleDownloadPDF(item.titulo, datos)}
                  className="mb-4 my-6 px-4 py-2 justify-end text-white rounded-lg transition"
                >
                  Descargar PDF
                </button>
              </>
            ) : (
              <p className="text-white">No hay datos disponibles.</p>
            )}
          </div>
        );
      })}
    </section>
  );
}
