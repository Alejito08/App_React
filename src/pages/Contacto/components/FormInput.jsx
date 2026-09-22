import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  { label, name, type = "text", required = false, placeholder = "", error = "", ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-200">
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        className="w-full bg-white text-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400"
        {...rest}
      />
    </div>
  );
});

export default FormInput;