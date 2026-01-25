import Link from "next/link";

const HomeCTA = () => {
  return (
    <section className="bg-indigo-50 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Ready to Practice?
        </h2>

        <p className="text-gray-700 text-lg mb-10">
          Join us on the mat and move with awareness, strength, and ease.
        </p>

        <Link
          href="/classes"
          className="
            inline-flex items-center justify-center
            rounded-full bg-indigo-600 px-8 py-4
            text-white text-lg font-medium
            hover:bg-indigo-700 transition
          "
        >
          View Class Schedule
        </Link>
      </div>
    </section>
  );
};

export default HomeCTA;
