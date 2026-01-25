const offerings = [
  {
    title: "Vinyasa Flow",
    text: "Breath-led movement to build strength, flexibility, and balance."
  },
  {
    title: "Third Eye Focus",
    text: "Classes that invite awareness, intuition, and mindful attention."
  },
  {
    title: "Small Group Classes",
    text: "A calm, supportive space where every student is seen."
  }
];

const Offerings = () => (
  <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
    {offerings.map((item) => (
      <div key={item.title} className="bg-white p-6 rounded shadow-sm">
        <h3 className="text-lg font-medium mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.text}</p>
      </div>
    ))}
  </section>
);

export default Offerings;
