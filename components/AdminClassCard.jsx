import Image from "next/image";
import Link from "next/link";

const AdminClassCard = ({ yogaClass }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">
        {/* Teacher image */}
        {yogaClass.teacherImage && (
          <Image
            src={yogaClass.teacherImage}
            alt={yogaClass.teacherName}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        )}

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {yogaClass.name}
              </h3>
              <p className="text-sm text-gray-500">
                with {yogaClass.teacherName}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                yogaClass.isCancelled
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {yogaClass.isCancelled ? "Cancelled" : "Scheduled"}
            </span>
          </div>

          {/* Details */}
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>🗓 {yogaClass.date}</p>
            <p>🕒 {yogaClass.start} – {yogaClass.end}</p>
            <p>👥 {yogaClass.booked} / {yogaClass.capacity} booked</p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-4">
            <Link
              href={`/admin/classes/${yogaClass.id}/edit`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Edit
            </Link>

            <button className="text-sm font-medium text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClassCard;
