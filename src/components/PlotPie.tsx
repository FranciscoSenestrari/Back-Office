import React from "react";
import { informType } from "../pages/Informes";
import Plot from "react-plotly.js";

export default function PlotPie({ item }: { item: informType }) {
  const extraerFechas = () => {
    return [
      ...new Set(
        item.datos.pedidos.map(
          (pedido: any) => pedido.fechaCreacion.split("T")[0]
        )
      ),
    ];
  };

  const contarVentasPorFecha = () => {
    return item.datos.pedidos.reduce((acc: any, pedido: any) => {
      const fecha = pedido.fechaCreacion.split("T")[0];
      acc[fecha] = (acc[fecha] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const fechas = extraerFechas();
  const conteoPorFecha = contarVentasPorFecha();

  return (
    <div>
      {
        // @ts-ignore
        <Plot
          config={{
            responsive: true,
            displayModeBar: false,
            showAxisRangeEntryBoxes: true,
            setBackground: "transparent",
            autosizable: true,
          }}
          data={[
            {
              type: "pie",
              //@ts-ignore
              labels: fechas,
              values: fechas.map((fecha: any) => conteoPorFecha[fecha]),
              hole: 0.5,
            },
          ]}
        />
      }
    </div>
  );
}
