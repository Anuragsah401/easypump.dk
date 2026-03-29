import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import currentUser from "../../data/user";

export default function MessagesSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {currentUser.messages.filter((m) => m.unread).length} unread conversation
          {currentUser.messages.filter((m) => m.unread).length !== 1 && "s"}
        </p>
      </div>

      {/* Messages list */}
      {currentUser.messages.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
          {currentUser.messages.map((msg) => (
            <button
              key={msg.id}
              className="w-full flex items-start gap-3.5 p-4 hover:bg-gray-50/80 transition-colors text-left cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {msg.from.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm ${msg.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                  >
                    {msg.from}
                  </p>
                  <span className="text-[11px] text-gray-400 shrink-0">{msg.time}</span>
                </div>
                <p className="text-xs text-gray-400 mb-0.5">{msg.bike}</p>
                <p
                  className={`text-sm truncate ${msg.unread ? "text-gray-700 font-medium" : "text-gray-500"}`}
                >
                  {msg.lastMessage}
                </p>
              </div>

              {/* Unread dot */}
              {msg.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0 mt-2" />}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <HiOutlineChatBubbleLeftRight className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-1">No messages yet</h3>
          <p className="text-sm text-gray-500">Messages from buyers and sellers will appear here</p>
        </div>
      )}
    </div>
  );
}
