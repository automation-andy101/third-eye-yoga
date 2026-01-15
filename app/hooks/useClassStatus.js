export function useClassStatus(yogaClass) {
  const now = new Date();
  const start = new Date(yogaClass.start_at);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + yogaClass.duration);

  const isFinished = end < now;
  const isOngoing = start <= now && end > now;
  const isUpcoming = start > now;

  const isFullyBooked =
    !isFinished && yogaClass.booked_count >= yogaClass.capacity;

  const isDisabled =
    isFinished || isFullyBooked || !yogaClass.is_active;

  const buttonLabel =
    !yogaClass.is_active
      ? "Cancelled"
      : isFinished
      ? "Finished"
      : isFullyBooked
      ? "Fully booked"
      : "Book now";

  let statusLabel;
  let statusClasses;

  if (!yogaClass.is_active) {
    statusLabel = "Cancelled";
    statusClasses = "bg-red-100 text-red-700";
  } else if (isFinished) {
    statusLabel = "Completed";
    statusClasses = "bg-gray-700 text-white";
  } else if (isOngoing) {
    statusLabel = "Live";
    statusClasses = "bg-red-600 text-white";
  } else {
    statusLabel = "Scheduled";
    statusClasses = "bg-green-100 text-green-700";
  }

  return {
    isFinished,
    isOngoing,
    isUpcoming,
    isFullyBooked,
    isDisabled,
    buttonLabel,
    statusLabel,
    statusClasses,
  };
}
