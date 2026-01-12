const EmptyState = ({
  title = "Nothing here yet",
  description = "There’s no data to display right now.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
