import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineBuildingStorefront } from "react-icons/hi2";

export default function SignUpShopPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    cvrNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // Primary address
    address: "",
    city: "",
    postalCode: "",
  });

  const [additionalLocations, setAdditionalLocations] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocationChange = (index, field, value) => {
    setAdditionalLocations((prev) =>
      prev.map((loc, i) => (i === index ? { ...loc, [field]: value } : loc)),
    );
  };

  const addLocation = () => {
    setAdditionalLocations((prev) => [...prev, { address: "", city: "", postalCode: "" }]);
  };

  const removeLocation = (index) => {
    setAdditionalLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.cvrNumber.trim()) {
      newErrors.cvrNumber = "CVR number is required";
    } else if (!/^\d{8}$/.test(formData.cvrNumber.replace(/\s/g, ""))) {
      newErrors.cvrNumber = "CVR number must be 8 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would send data to your API here
      console.log("Form submitted:", { ...formData, additionalLocations });
      navigate("/user/1");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50/60">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 mb-4">
            <HiOutlineBuildingStorefront className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Register your Bike Shop
          </h1>
          <p className="mt-2 text-gray-500">
            Join EasyPump and reach thousands of bike enthusiasts in Denmark
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your bike shop name"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.companyName ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    CVR Number *
                  </label>
                  <input
                    type="text"
                    name="cvrNumber"
                    value={formData.cvrNumber}
                    onChange={handleChange}
                    placeholder="12345678"
                    maxLength={8}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.cvrNumber ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.cvrNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvrNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+45 12 34 56 78"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Primary Location */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Primary Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street name and number"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.address ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Copenhagen"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.city ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="1000"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.postalCode ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Locations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Additional Locations</h2>
                <button
                  type="button"
                  onClick={addLocation}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Add Location
                </button>
              </div>

              {additionalLocations.length === 0 ? (
                <p className="text-sm text-gray-400 italic">
                  No additional locations added. Click "Add Location" if you have multiple shops.
                </p>
              ) : (
                <div className="space-y-4">
                  {additionalLocations.map((loc, index) => (
                    <div
                      key={index}
                      className="relative p-4 rounded-xl border border-gray-200 bg-gray-50/50"
                    >
                      <button
                        type="button"
                        onClick={() => removeLocation(index)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove location"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>

                      <p className="text-xs font-medium text-gray-500 mb-3">Location {index + 2}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={loc.address}
                            onChange={(e) => handleLocationChange(index, "address", e.target.value)}
                            placeholder="Street Address"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          value={loc.city}
                          onChange={(e) => handleLocationChange(index, "city", e.target.value)}
                          placeholder="City"
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm"
                        />
                        <input
                          type="text"
                          value={loc.postalCode}
                          onChange={(e) =>
                            handleLocationChange(index, "postalCode", e.target.value)
                          }
                          placeholder="Postal Code"
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Credentials */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Credentials</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="shop@example.com"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? "border-red-300" : "border-gray-200"
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.password ? "border-red-300" : "border-gray-200"
                      } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.confirmPassword ? "border-red-300" : "border-gray-200"
                      } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-500 text-white font-semibold shadow-lg shadow-green-500/25 hover:bg-green-600 hover:shadow-xl transition-all"
            >
              Create Bike Shop Account
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-green-600 hover:text-green-700">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
