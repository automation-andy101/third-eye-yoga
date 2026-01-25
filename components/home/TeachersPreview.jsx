import getAllTeachers from "@/app/actions/getAllTeachers";
import Image from "next/image";
import Link from "next/link";

const TeachersPreview = async () => {
  const teachers = await getAllTeachers();

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Meet Our Teachers
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Experienced, compassionate teachers guiding your practice with
          presence and care.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teachers.slice(0, 3).map((teacher) => {
            const imageSrc = teacher.image_id
              ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`
              : "/images/no-image.jpg";

            return (
              <div key={teacher.$id} className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full overflow-hidden shadow-sm">
                  <Image
                    src={imageSrc}
                    alt={teacher.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {teacher.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* <Link
          href="/teachers"
          className="inline-block mt-12 text-indigo-600 font-medium hover:underline"
        >
          Meet all teachers →
        </Link> */}
      </div>
    </section>
  );
};

export default TeachersPreview;
