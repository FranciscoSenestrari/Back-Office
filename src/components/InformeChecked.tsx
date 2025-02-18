import React, { Dispatch, SetStateAction, PropsWithChildren } from "react";

export default function InformeChecked({
  title,
  checked,
  setChecked,
  children,
}: {
  title: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren) {
  return (
    <div className="w-2/3 sm:w-full p-4 shadow-xl">
      <div className="flex gap-4 justify-between items-center">
        <h2 className="font-bold text-xl">{title}</h2>
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
      <div
        className={`transition-opacity ${
          checked
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        }`}
        aria-hidden={!checked}
      >
        {children}
      </div>
    </div>
  );
}
