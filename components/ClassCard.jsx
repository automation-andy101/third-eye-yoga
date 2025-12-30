import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ yogaClass }) => {
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${yogaClass.teacher_id}/view?project=${projectId}`;
    const imageSrc = yogaClass.teacher_id ?  imageUrl : "/images/no-image.jpg";

    return (
        <div className="bg-white shadow rounded-lg p-4 mt-4
                flex flex-col sm:flex-row
                items-start
                gap-4 sm:gap-10"
        >
            {/* Duration  */}
            <div className="flex flex-col space-y-3 shrink-0">
                <div>
                    <h4 className="text-lg font-semibold">{yogaClass.start_time}</h4>
                    <p className="text-sm text-gray-600 font-semibold text-gray-800">
                        {yogaClass.duration} min
                    </p>
                </div>

                <div className="w-20 h-20">
                    <Image
                        src={imageSrc}
                        alt={yogaClass.teacher_name}
                        className="w-full h-full object-cover rounded-full"
                        width={200}
                        height={200}
                    />
                </div>
            </div>
            
            {/* Class description  */}
            <div className="flex-1 max-w-lg sm:max-w-xl space-y-2">
                <h4 className="text-lg font-semibold">{yogaClass.title}</h4>
                <p className="text-sm font-semibold text-gray-800">
                    {yogaClass.teacher_name}
                </p>
                <p className="text-sm text-gray-600 line-clamp-4">
                    {yogaClass.description}
                </p>
            </div>

            {/* Location */}
            <div className="shrink-0 w-48 self-center sm:ml-6">
                <h4 className="text-sm font-semibold">{yogaClass.location}</h4>
            </div>

            {/* Book */}
            <div className="shrink-0 self-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded
                            w-32 text-center hover:bg-blue-700">
                    Book
                </button>
            </div>
        </div>
  )
}

export default RoomCard