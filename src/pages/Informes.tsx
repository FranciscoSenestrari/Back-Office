import React from "react";

export function Informes() {
  return (
    <div className="w-full">
      <div className="p-4">
        <h1>Informes</h1>
        <h2>Ingrese las fechas de los informes</h2>
        <div className="flex gap-4">
          <div>
            <p>Fecha inicio</p>
            <input type="date" name="" id="" />
          </div>
          <div>
            <p>Fecha fin</p>
            <input type="date" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
}
