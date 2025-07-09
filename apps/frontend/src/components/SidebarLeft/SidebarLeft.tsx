import { useState } from "react";
import "./SidebarLeft.module.css";
import Logo from "@assets/sql_collaborator_logo.png";
import { Select } from "../Select";
import { Codesandbox, Play, Plus } from "lucide-react";
import { Card } from "../Card";

export const SidebarLeft = () => {
  const [engine, setEngine] = useState("");

  const savedConnections = [
    {
      id: 1,
      name: "Connection 1",
      engine: "MySQL",
      timeAgo: "2h ago",
    },
    {
      id: 2,
      name: "Local Dev",
      engine: "PostgreSQL",
      timeAgo: "5h ago",
    },
    {
      id: 3,
      name: "Test DB",
      engine: "SQLite",
      timeAgo: "1d ago",
    },
    {
      id: 4,
      name: "Production DB",
      engine: "SQL Server",
      timeAgo: "3d ago",
    },
  ];

  return (
    <div className="sidebar-left">
      <div className="flex items-center justify-start h-16">
        <img src={Logo} alt="SQL Collaborator Logo" className="size-12" />
        <div className="flex flex-col items-start ml-2">
          <span className="text-lg font-semibold text-black dark:text-white ml-2">
            Database
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            Connection settings
          </span>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            SQL Engine
          </label>
          <Select
            value={engine}
            onChange={setEngine}
            className="w-full!"
            options={[
              { value: "mysql", label: "MySQL" },
              { value: "postgresql", label: "PostgreSQL" },
              { value: "sqlite", label: "SQLite" },
              { value: "sqlserver", label: "SQL Server" },
            ]}
            placeholder="Select a database engine"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Host
          </label>
          <input type="text" className="input" placeholder="Enter your host" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Port
          </label>
          <input type="text" className="input" placeholder="Enter your port" />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Database Name
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter your database name"
          />
        </div>
        <button
          className="btn-flat-primary"
          onClick={() => alert("Connection settings saved!")}>
          <Play className="mr-2" />
          Connect
        </button>
        <button
          className="btn-outline"
          onClick={() => alert("Connection settings cleared!")}>
          <Plus className="mr-2" />
          Create
        </button>
      </div>
      <hr className="border-gray-200 dark:border-gray-700 my-4" />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          Saved Workspaces
        </h3>
        <div className="w-full h-56 flex flex-col space-y-4 overflow-y-scroll bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-700 p-2">
          <div className="grid grid-cols-1 gap-2">
            {savedConnections.map((conn) => (
              <Card key={conn.id}>
                <div className="flex items-center gap-2">
                  <Codesandbox className="text-gray-500 dark:text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black dark:text-white">
                      {conn.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conn.engine} - {conn.timeAgo}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
