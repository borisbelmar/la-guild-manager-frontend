import clsx from "clsx"

export default function HookFormCheckbox ({
  label,
  name,
  inputClassName,
  labelClassName,
  register
}) {
  return (
    <div className="flex items-center">
      <input
        id={name}
        type="checkbox"
        className={clsx("h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded", inputClassName)}
        {...register(name)}
      />
      {label && (
        <label
          htmlFor={name}
          className={clsx("ml-2 block text-sm text-gray-50", labelClassName)}
        >
          {label}
        </label>
      )}
    </div>
  )
}
