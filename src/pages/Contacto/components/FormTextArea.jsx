import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea(
  { label, name, required = false, placeholder = "", error = "", ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-200">
        {label} {required && "*"}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={6}
        ref={ref}
        className="w-full bg-white text-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3
          placeholder:text-slate-400
          shadow-sm
          transition-all duration-200
          resize-y
          focus:outline-none
          focus:border-emerald-500
          focus:ring-2 focus:ring-emerald-500"
        {...rest}
      />
    </div>
  );
});

export default FormTextArea;