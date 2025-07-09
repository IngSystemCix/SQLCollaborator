import { useState } from "react";
import { Send } from "lucide-react";
import "./Chat.module.css";
import { createColorGenerator } from "@/utils";
import { Card } from "../Card";

export const Chat = () => {
  const generateColorHSLA = createColorGenerator();

  const [expandedMessages, setExpandedMessages] = useState<{
    [id: number]: boolean;
  }>({});

  const toggleExpanded = (id: number) => {
    setExpandedMessages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isExpanded = (id: number) => !!expandedMessages[id];

  const messages = [
    {
      id: 1,
      user: "Alice",
      content: "Hello everyone! How's the project going?",
      timestamp: "2023-10-01T10:00:00Z",
      status: "active",
    },
    {
      id: 2,
      user: "Bob",
      content:
        "Hi Alice! We're making good progress. Just finished the database schema and now moving on to setting up the backend services and endpoints. We'll coordinate later to test everything.",
      timestamp: "2023-10-01T10:05:00Z",
      status: "active",
    },
    {
      id: 3,
      user: "Charlie",
      content: "Great! I can start working on the API integration now.",
      timestamp: "2023-10-01T10:10:00Z",
      status: "idle",
    },
  ];

  return (
    <div className="chat-container">
      <div className="w-full h-full overflow-y-scroll p-4 bg-gray-200 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <div>
                <div className="flex items-start space-x-2">
                  <div className="flex items-center gap-2 mr-4">
                    <div
                      style={generateColorHSLA(message.user).style}
                      className="w-8 h-8 rounded-lg flex items-center justify-center relative">
                      <span className="text-lg font-bold text-center">
                        {message.user
                          .split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          message.status === "active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {message.user}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Mensaje con truncado y ver más */}
                <div className="mt-1">
                  <p
                    className={`text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 ${
                      isExpanded(message.id) ? "" : "line-clamp-2"
                    }`}>
                    {message.content}
                  </p>
                  {message.content.length > 100 && (
                    <button
                      onClick={() => toggleExpanded(message.id)}
                      className="text-blue-500 dark:text-blue-400 text-xs mt-1 hover:underline cursor-pointer">
                      {isExpanded(message.id) ? "Ver menos" : "Ver más"}
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center space-x-2 p-4 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <textarea
          className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
          placeholder="Type your message here..."
          rows={1}></textarea>
        <button className="btn-flat-primary">
          <Send className="text-white w-5" />
        </button>
      </div>
    </div>
  );
};
