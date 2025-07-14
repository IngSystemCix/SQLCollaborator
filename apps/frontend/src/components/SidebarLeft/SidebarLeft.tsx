import { useEffect, useState } from "react";
import "./SidebarLeft.module.css";
import Logo from "@assets/sql_collaborator_logo.png";
import { Select } from "../Select";
import { Codesandbox, Pen, Play, Plus, Trash2 } from "lucide-react";
import { Card } from "../Card";
import { useSidebar, useUI } from "@/store";
import { PortalMenu } from "../PortalMenu";

export const SidebarLeft = () => {
  const { openModal } = useUI();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openToolsId, setOpenToolsId] = useState<string | null>(null);
  const [engine, setEngine] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        anchorEl &&
        !anchorEl.contains(event.target as Node) &&
        openToolsId !== null
      ) {
        setOpenToolsId(null);
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl, openToolsId]);

  useEffect(() => {
    if (!isSidebarOpen("main")) {
      toggleSidebar("main");
    }
  }, []);

  return (
    <>
      {isSidebarOpen("main") && (
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
              <input
                type="text"
                className="input"
                placeholder="Enter your host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Port
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter your port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
              />
            </div>
            <button
              className="btn-flat-primary"
              onClick={() => alert("Connection settings saved!")}
              disabled={
                !engine.trim() ||
                !host.trim() ||
                !port.trim() ||
                !username.trim() ||
                !password.trim() ||
                !database.trim()
              }>
              <Play className="mr-2" />
              Connect
            </button>
            <button className="btn-outline" onClick={() => openModal("create")}>
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
                    <div
                      className="flex items-center gap-2 select-none"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setAnchorEl(e.currentTarget);
                        setOpenToolsId(String(conn.id));
                      }}>
                      <Codesandbox className="text-gray-500 dark:text-gray-400" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-black dark:text-white">
                          {conn.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conn.engine} - {conn.timeAgo}
                        </span>
                      </div>
                      <button
                        className="btn-flat ml-auto"
                        onClick={() => openModal("confirmStartWorkspace")}>
                        <Play className="w-4 h-4" />
                      </button>
                      {anchorEl && (
                        <PortalMenu anchorRef={anchorEl} open={!!anchorEl}>
                          <div className="flex flex-col space-y-1">
                            <button
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-full text-left flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                              onClick={() => {
                                setAnchorEl(null);
                                setOpenToolsId(null);
                                openModal("editWorkspace");
                              }}>
                              <Pen className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-full text-left flex items-center space-x-2 p-2 hover:bg-red-100 dark:hover:bg-red-700 rounded-md text-red-600 dark:text-red-400 cursor-pointer"
                              onClick={() => {
                                openModal("deleteWorkspace");
                                setAnchorEl(null);
                                setOpenToolsId(null);
                              }}>
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </PortalMenu>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
