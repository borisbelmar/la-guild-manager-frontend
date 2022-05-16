import clsx from "clsx"

export default function HookFormSelect ({
  label,
  name,
  inputClassName,
  labelClassName,
  register,
  error,
  defaultValue,
  options
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={clsx('block text-sm font-medium text-gray-200 mb-1', labelClassName)}
        >
          {label}
        </label>
      )}
      <div>
        <select
          id={name}
          className={clsx(
            "mt-1 block w-full pl-3 pr-10 py-2 text-gray-800 border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md",
            inputClassName
          )}
          defaultValue={defaultValue || options[0]?.value}
          {...register(name)}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}
