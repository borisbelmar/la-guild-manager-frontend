import clsx from "clsx"

const buttonStyles = {
  solid: {
    amber: 'text-white bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 disabled:opacity-50',
  }
}

export default function Button({
  children,
  onClick,
  className,
  type,
  disabled
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
        buttonStyles.solid.amber,
        className
      )}
    >
      {children}
    </button>
  )
}