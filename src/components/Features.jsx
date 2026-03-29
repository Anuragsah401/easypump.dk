import {
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineMapPin,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineMagnifyingGlass className="w-6 h-6" />,
    title: "Smart Search",
    description:
      "Find bikes by brand, model, size, price, and location. Our advanced filters make it effortless.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-6 h-6" />,
    title: "Secure Payments",
    description:
      "Integrated payments with buyer protection. Transactions are safe, fast, and transparent.",
  },
  {
    icon: <HiOutlineBolt className="w-6 h-6" />,
    title: "Instant Listings",
    description:
      "Snap a few photos, add details, and your bike is live in under a minute. It's that easy.",
  },
  {
    icon: <HiOutlineMapPin className="w-6 h-6" />,
    title: "Local Meetups",
    description:
      "Browse bikes near you and arrange safe, local meetups. No long-distance shipping hassles.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-500 tracking-wide uppercase mb-3">
            Why EasyPump
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Everything you need to buy&nbsp;&amp;&nbsp;sell bikes
          </h2>
          <p className="mt-4 text-gray-500">
            A seamless experience from listing to riding — we've thought of every detail so you
            don't have to.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-100 bg-gray-50/50 p-6 hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-5 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
