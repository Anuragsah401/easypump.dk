import { useState } from "react";
import { HiOutlineXMark, HiOutlinePaperAirplane } from "react-icons/hi2";

export default function ContactSellerModal({ bike, onClose, onSend }) {
  const [message, setMessage] = useState(
    `Hi, I'm interested in your ${bike.name}. Is it still available?`,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Contact Seller</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HiOutlineXMark className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Bike preview */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
              <img
                src={bike.images[0]}
                alt={bike.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{bike.name}</p>
                <p className="text-lg font-bold text-blue-600">
                  {bike.price.toLocaleString("da-DK")} kr
                </p>
              </div>
            </div>

            {/* Seller info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {bike.seller.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sending to {bike.seller.name}</p>
                <p className="text-xs text-gray-400">
                  ⭐ {bike.seller.rating} · Usually responds within 1 hour
                </p>
              </div>
            </div>

            {/* Message form */}
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                placeholder="Write your message to the seller..."
                required
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
