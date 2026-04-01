import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhoto, HiOutlineXMark, HiOutlinePlus } from "react-icons/hi2";

const bikeTypes = [
  "City Bike",
  "Mountain Bike",
  "Road Bike",
  "E-Bike",
  "Hybrid",
  "Cargo Bike",
  "Kids Bike",
  "Other",
];
const conditions = ["New", "Like New", "Good", "Fair"];
const sizes = ["XS", "S", "M", "L", "XL", "One Size"];
const cities = ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Frederiksberg", "Esbjerg", "Other"];

export default function CreateListingPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    condition: "",
    year: "",
    size: "",
    color: "",
    price: "",
    location: "",
    description: "",
  });
  const [specs, setSpecs] = useState([""]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 6)); // Max 6 images
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, value) => {
    setSpecs((prev) => prev.map((spec, i) => (i === index ? value : spec)));
  };

  const addSpec = () => {
    if (specs.length < 10) {
      setSpecs((prev) => [...prev, ""]);
    }
  };

  const removeSpec = (index) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Title is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (images.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real app, upload images and save listing to database
    console.log("Listing created:", {
      ...formData,
      specs: specs.filter((s) => s.trim()),
      images: images.map((img) => img.file.name),
    });

    // Redirect to user home page
    navigate("/user/1");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50/60">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Sell Your Bike</h1>
          <p className="mt-2 text-gray-500">Fill in the details below to create your listing</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
            <p className="text-sm text-gray-500 mb-4">
              Add up to 6 photos. The first photo will be the cover image.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                >
                  <img
                    src={img.preview}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiOutlineXMark className="w-4 h-4 text-white" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}

              {images.length < 6 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <HiOutlinePhoto className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-400 mt-1">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {errors.images && <p className="mt-2 text-sm text-red-500">{errors.images}</p>}
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Listing Title *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Trek Domane SL 6 2024"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? "border-red-300" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Trek, Giant, Specialized"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.brand ? "border-red-300" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                />
                {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.type ? "border-red-300" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white`}
                >
                  <option value="">Select type</option>
                  {bikeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.condition ? "border-red-300" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white`}
                >
                  <option value="">Select condition</option>
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-500">{errors.condition}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2023"
                  min="1990"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                >
                  <option value="">Select size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g. Matte Black"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Price & Location */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Price & Location</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price (DKK) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                      errors.price ? "border-red-300" : "border-gray-200"
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    kr
                  </span>
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.location ? "border-red-300" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white`}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tell buyers about your bike *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your bike's features, any modifications, reason for selling, etc."
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.description ? "border-red-300" : "border-gray-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
                <p className="text-sm text-gray-500">Optional but helps buyers</p>
              </div>
              <button
                type="button"
                onClick={addSpec}
                disabled={specs.length >= 10}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlinePlus className="w-4 h-4" />
                Add Spec
              </button>
            </div>

            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecChange(index, e.target.value)}
                    placeholder="e.g. Shimano Ultegra groupset"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  />
                  {specs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <HiOutlineXMark className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Listing..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
