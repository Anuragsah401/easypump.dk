import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const heroButtons = [
  {
    to: "/buy",
    label: "I want to Buy a refurbished bike",
    variant: "primary", // blue
    requiresAuth: false,
  },
  {
    to: "/sell",
    label: "I want to Sell my bike",
    variant: "secondary", // white/outline
    requiresAuth: true,
    authAction: "sell",
  },
  {
    to: "/air",
    label: "Where can I get air for my bike",
    variant: "success", // green
    requiresAuth: false,
  },
  {
    to: "/repair",
    label: "I only want to repair my bike",
    variant: "warning", // yellow
    requiresAuth: false,
  },
];

const variantStyles = {
  primary: "bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-xl",
  secondary:
    "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg",
  success:
    "bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600 hover:shadow-xl",
  warning:
    "bg-yellow-500 text-white shadow-lg shadow-yellow-500/25 hover:bg-yellow-600 hover:shadow-xl",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-xl px-6 py-3.5 lg:px-8 lg:py-4 text-md md:text-base lg:text-lg font-semibold hover:-translate-y-1 transform transition-all";

export default function Hero() {
  const navigate = useNavigate();
  const { isLoggedIn, setRedirectAfterLogin } = useAuth();

  const handleButtonClick = (e, button) => {
    if (button.requiresAuth && !isLoggedIn) {
      e.preventDefault();
      // Store redirect info and go to login
      setRedirectAfterLogin({
        action: button.authAction,
        returnUrl: button.to,
      });
      navigate("/signin");
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gray-50/60">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-12">
        {/* Buttons / boxes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {heroButtons.map((button) => {
            const { to, label, variant } = button;
            const className = `${baseStyles} ${variantStyles[variant]}`;

            return (
              <Link
                key={to}
                to={to}
                onClick={(e) => handleButtonClick(e, button)}
                className={className}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Main hero text */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.08] mt-10">
          We help you sell or buy safely and securely
          <br />
          <span className="text-gray-400">all in one place</span>
        </h1>
      </div>
    </section>
  );
}
