import Image from "next/image";
import Link from "next/link";

const AdminClassCard = ({ yogaClass }) => {
    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g. "18:00"
    }

    function formatTimeEnd(dateString, durationMinutes) {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + durationMinutes);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g. "19:30"
    }

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${yogaClass.teacher.image_id}/view?project=${projectId}`;
    const imageSrc = yogaClass.teacher.image_id
                ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${yogaClass.teacher.image_id}/view?project=${projectId}`
                : "/images/no-image.jpg";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex gap-4">
            <input type="hidden" name="class_id" value={yogaClass.$id} />

            {/* Teacher image */}
            <div className="mt-5 w-24 h-24 overflow-hidden rounded-full">
                <Image
                    src={imageSrc}
                    alt={yogaClass.teacher.name || "Teacher"}
                    width={150}           // actual image resolution
                    height={150}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {yogaClass.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            with {yogaClass.teacher.name}
                        </p>
                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            yogaClass.is_active
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                        {yogaClass.is_active ? "Cancelled" : "Scheduled"}
                    </span>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-1 text-sm text-gray-600">
                    <p>🗓 {new Date(yogaClass.start_at).toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                    <p>
                        🕒 {formatTime(yogaClass.start_at)} – {formatTimeEnd(yogaClass.start_at, yogaClass.duration)}
                    </p>
                    <p>👥 {yogaClass.booked_count} / {yogaClass.capacity} booked</p>
                </div>


                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link
                        href={`/admin/classes/${yogaClass.$id}/edit`}
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
