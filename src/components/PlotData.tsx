import Plot from "react-plotly.js";

export default function PlotBar({ item }: { item: any }) {
  const x: any[] = [];
  const y: any[] = [];
  item.datos.forEach((item: any) => {
    const [xValue, yValue] = Object.values(item);
    x.push(xValue);
    y.push(yValue);
  });

  return (
    <div className="w-full box-content overflow-hidden bg-transparent">
      {
        //@ts-ignore
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
              x: y,
              y: x,
              type: "scatter",
              mode: "lines",
              marker: {
                color: "rgb(158,202,225)",
                opacity: 0.6,
                line: {
                  color: "rgb(8,48,107)",
                  width: 6,
                },
              },
            },
            {
              type: "bar",
              x: y,
              y: x,

              marker: {
                color: "rgba(58,200,225,.5)",
                opacity: 0.6,
              },
              boxmean: true,
            },
          ]}
          layout={{
            width: "100%",
            height: "100%",
            colorway: "rgba(255,255 ,255,.5)",
          }}
        />
      }
    </div>
  );
}
