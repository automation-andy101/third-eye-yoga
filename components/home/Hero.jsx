import Link from "next/link";

const Hero = () => (
  <section className="bg-gray-100 py-20 text-center">
    <h1 className="text-4xl font-semibold mb-4">Third Eye Yoga</h1>

    <p className="text-xl text-gray-700 mb-6">
      Flow with awareness.<br />Move with intention.
    </p>

    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
      Vinyasa-based yoga classes designed to help you reconnect
      with your body, breath, and inner clarity.
    </p>

    <Link
      href="/classes"
      data-testid="home-cta-view-classes"
      className="inline-block bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700"
    >
      View Class Schedule
    </Link>
  </section>
);

export default Hero;
