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
    // <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
    //     <div className="flex gap-4">
    //         <input type="hidden" name="class_id" value={yogaClass.$id} />

    //         {/* Teacher image */}
    //         <div className="mt-5 w-32 h-32 overflow-hidden rounded-full">
    //             <Image
    //                 src={imageSrc}
    //                 alt={yogaClass.teacher.name || "Teacher"}
    //                 width={150}
    //                 height={150}
    //                 className="object-cover w-full h-full"
    //             />
    //         </div>

    //         <div className="flex-1">
    //             {/* Header */}
    //             <div className="flex items-start justify-between">
    //                 <div>
    //                     <h3 className="text-lg font-semibold text-gray-900">
    //                         {yogaClass.title}
    //                     </h3>
    //                     <p className="text-sm text-gray-500">
    //                         with {yogaClass.teacher.name}
    //                     </p>
    //                 </div>

    //                 <span
    //                     className={`rounded-full px-3 py-1 text-xs font-medium ${
    //                         yogaClass.is_active
    //                         ? "bg-green-100 text-green-700"
    //                         : "bg-red-100 text-red-700"
    //                     }`}
    //                 >
    //                     {yogaClass.is_active ? "Scheduled" : "Cancelled"}
    //                 </span>
    //             </div>

    //             {/* Description in center */}
    //             {yogaClass.description && (
    //                 <p className="my-4 text-center text-gray-700 text-sm">
    //                     {yogaClass.description}
    //                 </p>
    //             )}

    //             {/* Details */}
    //             <div className="mt-5 space-y-1 text-sm text-gray-600">
    //                 <p>🗓 {new Date(yogaClass.start_at).toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'short' })}</p>
    //                 <p>
    //                     🕒 {formatTime(yogaClass.start_at)} – {formatTimeEnd(yogaClass.start_at, yogaClass.duration)}
    //                 </p>
    //                 <p>👥 {yogaClass.capacity - yogaClass.booked_count} spots remaining ({yogaClass.booked_count} booked)</p>

    //             </div>


    //             {/* Actions */}
    //             <div className="flex justify-end gap-3">
    //                 <Link
    //                     href={`/admin/classes/${yogaClass.$id}/edit`}
    //                     className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
    //                 >
    //                     Edit
    //                 </Link>

    //                 <button
    //                     className="inline-flex items-center rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    //                 >
    //                     Delete
    //                 </button>
    //             </div>

    //         </div>
    //     </div>
    // </div>

    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex items-start gap-6">
            {/* COLUMN 1: Teacher image */}
            <div className="mt-2 w-32 h-32 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                    src={imageSrc}
                    alt={yogaClass.teacher.name || "Teacher"}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* COLUMN 2: Title + teacher + details */}
            <div className="flex-1 min-w-[220px]">
                <h3 className="text-lg font-semibold text-gray-900">
                    {yogaClass.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                    with {yogaClass.teacher.name}
                </p>

                <div className="space-y-1 text-sm text-gray-600">
                    <p>
                        🗓{" "}
                        {new Date(yogaClass.start_at).toLocaleDateString("en-GB", {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                        })}
                    </p>
                    <p>
                        🕒 {formatTime(yogaClass.start_at)} –{" "}
                        {formatTimeEnd(yogaClass.start_at, yogaClass.duration)}
                    </p>
                    <p>
                    👥 {yogaClass.capacity - yogaClass.booked_count} spots remaining (
                        {yogaClass.booked_count} booked)
                    </p>
                </div>
            </div>

            {/* COLUMN 3: Description */}
            <div className="flex-1 max-w-md px-2 mt-3">
                {yogaClass.description && (
                    <>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Description
                        </p>

                        <p className="text-sm text-gray-700 leading-relaxed">
                            {yogaClass.description}
                        </p>
                    </>
                )}
            </div>

            {/* COLUMN 4: Status + actions */}
            <div className="flex flex-col items-end min-w-[160px] h-full">
                <span
                    className={`mb-4 rounded-full px-3 py-1 text-xs font-medium ${
                    yogaClass.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                    {yogaClass.is_active ? "Scheduled" : "Cancelled"}
                </span>

                <div className="mt-16 flex gap-3">
                    <Link
                        href={`/admin/classes/${yogaClass.$id}/edit`}
                        className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Edit
                    </Link>

                    <button className="inline-flex items-center rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminClassCard;
