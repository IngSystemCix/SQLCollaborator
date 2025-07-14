import { User } from "lucide-react";
import "./SidebarRight.module.css";
import { Card } from "../Card";
import { createColorGenerator } from "@/utils";
import { Chat } from "../Chat";
import { useSidebar } from "@/store";
import { useEffect } from "react";

export const SidebarRight = () => {
  const generateColorHSLA = createColorGenerator();
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  const onlineUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      status: "active",
      lastActive: "2 minutes ago",
    },
    {
      id: 2,
      name: "Bob Smith",
      status: "active",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      name: "Charlie Brown",
      status: "idle",
      lastActive: "10 minutes ago",
    },
  ];

  useEffect(() => {
    if (!isSidebarOpen("collaborators")) {
      toggleSidebar("collaborators");
    }
  }, []);

  return (
    <>
      {isSidebarOpen("collaborators") && (
        <div className="sidebar-right">
          <div className="flex items-center justify-start h-16">
            <div className="flex items-center justify-center p-2 bg-green-200 rounded-lg border-2 border-green-600 dark:bg-green-100 dark:border-green-700">
              <User className="size-8 text-green-600 dark:text-green-700" />
            </div>
            <div className="flex flex-col items-start ml-2">
              <span className="text-lg font-semibold text-black dark:text-white ml-2">
                Collaboration
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                3 online
              </span>
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="w-full h-72 overflow-y-scroll flex flex-col gap-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-700">
            <div className="grid grid-cols-1 gap-2">
              {onlineUsers.map((user) => (
                <Card key={user.id}>
                  <div className="flex items-center justify-start space-x-4">
                    <div className="flex items-center gap-2">
                      <div
                        style={generateColorHSLA(user.name).style}
                        className="w-12 h-12 rounded-lg flex items-center justify-center relative">
                        <span className="text-lg font-bold text-center">
                          {user.name
                            .split(" ")
                            .map((n) => n.charAt(0).toUpperCase())
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            user.status === "active"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-black dark:text-white">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {user.lastActive}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex flex-col gap-2 p-2">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Comments
            </h3>
            <Chat />
          </div>
        </div>
      )}
    </>
  );
};
