import clsx from "clsx"

export default function HookFormInput ({
  label,
  name,
  type,
  autoComplete,
  inputClassName,
  labelClassName,
  register,
  error
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
        <input
          id={name}
          type={type}
          autoComplete={autoComplete}
          className={clsx(
            'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-700',
            inputClassName
          )}
          {...register(name)}
        />
      </div>
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}
