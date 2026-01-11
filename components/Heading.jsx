const Heading = ({ title, subtitle = "" }) => {
  return (
    <section className="bg-white mb-5 shadow px-4 py-4">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </section>
  );
};

export default Heading;
