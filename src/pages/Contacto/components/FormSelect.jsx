import { forwardRef } from "react";

const FormSelect = forwardRef(function FormSelect(
  { label, name, options = [], required = false, error = "", ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-200">
        {label} {required && "*"}
      </label>
      <select
        id={name}
        name={name}
        ref={ref}
        className="w-full bg-white text-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        {...rest}
      >
        <option value="">Selecciona una opción</option>
        {options.map((option, index) => {
          const isObject = typeof option === "object" && option !== null;
          const val = isObject ? option.value || option.id || option.nombre : option;
          const lbl = isObject ? option.label || option.nombre || option.value : option;

          return (
            <option key={isObject ? val || index : option} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default FormSelect;