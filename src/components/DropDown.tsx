import React, { useEffect, useRef, useState } from "react";

export default function DropDown({ options }: { options: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className=" inline-block text-left " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center items-center w-60  border-slate-600 shadow-sm px-4 py-2 bg-slate-700 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-gray-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="w-full text-left overflow-hidden flex-1">
          {options[0].nombreProducto}
        </span>
        <svg
          className={`ml-2.5 -mr-1.5 h-5 w-5 transition-transform duration-150 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="z-50  w-56  absolute shadow-lg  focus:outline-none bg-slate-700"
          role="menu"
        >
          <div className=" text-white">
            {options.map((option) => (
              <button className=" cursor-default block w-full text-left px-4 py-2 text-sm hover:bg-slate-600 rounded-none focus:bg-slate-500">
                <span className="mx-4 flex justify-between">
                  <p> {option.nombreProducto}</p>

                  <div className="flex flex-col">
                    <p className="text-xs">
                      Precio Unitario {option.precioUnitario}
                    </p>
                    <p className="text-xs"> Cantidad {option.cantidad}</p>
                  </div>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
