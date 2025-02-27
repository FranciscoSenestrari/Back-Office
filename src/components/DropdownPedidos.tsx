import { useEffect, useRef, useState } from "react";
import { cambiarEstadoPedido } from "../handlers/handlers";
import toast from "react-hot-toast";

export function DropdownPedidos({
  options,
  estadoActual,
  idPedido,
}: {
  idPedido: number;
  options: string[];
  estadoActual: string;
}) {
  const [selected, setSelected] = useState(estadoActual);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = async (option: string) => {
    try {
      await cambiarEstadoPedido(option, idPedido);
      toast.success("Estado cambiado correctamente");
      setSelected(option);
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
      toast.error("Error al cambiar estado");
    }
  };
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
          {selected.replace("_", " ")}
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
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-600 rounded-none focus:bg-slate-500"
              >
                {option.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
