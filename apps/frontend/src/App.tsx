import avatar from "@assets/img/avatar.png";
import logo from "@assets/sql_collaborator_logo.png";
import {
  Bolt,
  Globe,
  Link2,
  Lock,
  LucideShare2,
  Pen,
  Trash2,
  User2,
  View,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal/Modal";
import { Navbar } from "./components/Navbar";
import { PortalMenu } from "./components/PortalMenu";
import { useUI } from "./store";
import { createColorGenerator } from "./utils";
import { Message } from "./components/Message";
import { AnimatePresence } from "motion/react";
import { Select } from "./components/Select";
import { SidebarLeft } from "./components/SidebarLeft";
import { SidebarRight } from "./components/SidebarRight";
import { CodeEditor } from "./editor/Editor";

function App() {
  const username = "Juan Romero Collazos";
  const { isModalOpen, closeModal } = useUI();
  const [openToolsId, setOpenToolsId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [permission, setPermission] = useState("");
  const [role, setRole] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const generateColorHSLA = createColorGenerator();
  const link = "https://sql-collaborator.com/share/12345";

  const collaborators = [
    {
      id: "ZHNhZHcxMzMyMw",
      name: "Juan Romero",
      email: "juan.romero@example.com",
      joined: "2 days ago",
      role: "Editor",
      status: "online",
      avatar: avatar,
      roleIcon: <Pen className="w-4 h-4" />,
    },
    {
      id: "ZHNhZHcxMzMyNA",
      name: "Maria Lopez",
      email: "maria.lopez@example.com",
      joined: "1 week ago",
      role: "Viewer",
      status: "offline",
      avatar: avatar,
      roleIcon: <View className="w-4 h-4" />,
    },
    {
      id: "ZHNhZHcxMzMyNQ",
      name: "Carlos Perez",
      email: "carlos.perez@example.com",
      joined: "Today",
      role: "Admin",
      status: "busy",
      avatar: avatar,
      roleIcon: <Bolt className="w-4 h-4" />,
    },
    {
      id: "ZHNhZHcxMzMyNg",
      name: "Ana Torres",
      email: "ana.torres@example.com",
      joined: "3 days ago",
      role: "Editor",
      status: "online",
      avatar: avatar,
      roleIcon: <Pen className="w-4 h-4" />,
    },
  ];

  const [messages, setMessages] = useState<
    {
      id: string;
      text: string;
      type: "info" | "success" | "error" | "warning";
    }[]
  >([]);

  const addMessage = (
    text: string,
    type: "info" | "success" | "error" | "warning" = "info"
  ) => {
    const id = crypto.randomUUID();
    setMessages((prev) => [...prev, { id, text, type }]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleToggleTools = (id: string, el: HTMLButtonElement) => {
    if (openToolsId === id) {
      setOpenToolsId(null);
      setAnchorEl(null);
    } else {
      setOpenToolsId(id);
      setAnchorEl(el);
    }
  };

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

  const handleCopy = async () => {
    if (!inputRef.current) return;

    const text = inputRef.current.value;

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API no soportada");
      }

      await navigator.clipboard.writeText(text);
      addMessage("¡Enlace copiado correctamente!", "success");
    } catch (err) {
      console.warn("Fallo al usar clipboard.writeText, usando fallback:", err);

      // fallback con execCommand
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (success) {
        addMessage("¡Enlace copiado con fallback!", "success");
      } else {
        addMessage("Error al copiar el enlace.", "error");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="fixed top-4 right-4 space-y-2 z-999999">
        <AnimatePresence>
          {messages.map((msg) => (
            <Message
              key={msg.id}
              id={msg.id}
              text={msg.text}
              type={msg.type}
              showIcon
              showCloseButton
              autoDismiss
              dismissAfter={3000}
              onClose={() => removeMessage(msg.id)}
              animation={true}
              animationDuration={300}
              animationType="fade"
              animationDirection="right"
            />
          ))}
        </AnimatePresence>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        icon={<LucideShare2 className="w-6 h-6" />}
        title="Share Workspace"
        description="Invite collaborators to work together on this SQL workspace."
        size="xl">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-white font-bold">
            Share Link
          </span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <label
                htmlFor="share-toggle"
                className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="share-toggle"
                  className="sr-only peer"
                  checked={isPublic}
                  onChange={() => setIsPublic((prev) => !prev)}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full peer peer-checked:bg-gray-600 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </label>
              <span className="ml-3 text-sm text-gray-500 dark:text-white">
                {isPublic ? (
                  <span className="flex items-center space-x-1">
                    <Globe className="w-4 h-4 text-green-500" />
                    <span>Public</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <span>Private</span>
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2 mt-4">
          <input
            ref={inputRef}
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            placeholder="https://sql-collaborator.com/share/12345"
            value={link}
            readOnly
          />
          <button className="btn-flat" onClick={handleCopy}>
            <Link2 className="w-5 h-5" />
            <span>Copy</span>
          </button>
        </div>
        {isPublic && (
          <div className="mt-4 flex items-center justify-start space-x-2">
            <span className="text-gray-700 dark:text-white font-bold">
              Default permission for new visitors:
            </span>
            <Select
              options={[
                { value: "V", label: "Viewer" },
                { value: "E", label: "Editor" },
                { value: "A", label: "Admin" },
              ]}
              className="w-40!"
              value={permission}
              onChange={(value) => setPermission(value)}
              placeholder="Select role"
              isClearable
            />
          </div>
        )}
        <hr className="border-gray-300 my-4 dark:border-gray-700" />
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-white font-bold">
            Invite Collaborators
          </span>
        </div>
        <div className="flex items-center justify-between space-x-2 mt-4">
          <input
            type="email"
            className="input w-full"
            placeholder="Enter email address"
          />
          <Select
            options={[
              { value: "V", label: "Viewer" },
              { value: "E", label: "Editor" },
              { value: "A", label: "Admin" },
            ]}
            className="w-40!"
            value={role}
            onChange={(value) => setRole(value)}
            placeholder="Select role"
            isClearable
          />
          <button className="btn-flat-primary">
            <User2 className="w-5 h-5" />
            <span>Invite</span>
          </button>
        </div>
        <hr className="border-gray-300 my-4 dark:border-gray-700" />
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-white font-bold">
            Collaborators (0)
          </span>
        </div>
        <div className="w-full h-72 overflow-y-scroll mt-2 flex flex-col space-y-2 p-4">
          <div className="grid grid-cols-1 gap-2">
            {collaborators.map((collab, index) => (
              <Card key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div
                        style={generateColorHSLA(collab.name).style}
                        className="w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-center">
                          {collab.name
                            .split(" ")
                            .map((n) => n.charAt(0).toUpperCase())
                            .slice(0, 2)
                            .join("")}
                        </span>
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${getStatusColor(
                          collab.status
                        )}`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 dark:text-white font-bold">
                        {collab.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {collab.email}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Joined {collab.joined}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`${
                        collab.role === "Admin"
                          ? "tag-admin"
                          : collab.role === "Editor"
                          ? "tag-editor"
                          : "tag-viewer"
                      }`}>
                      {collab.roleIcon}
                      <span>{collab.role}</span>
                    </div>
                    <div className="relative">
                      <button
                        className="btn-flat"
                        onClick={(e) =>
                          handleToggleTools(collab.id, e.currentTarget)
                        }>
                        <Bolt className="w-5 h-5" />
                      </button>

                      {openToolsId === collab.id && (
                        <PortalMenu
                          anchorRef={anchorEl}
                          open={openToolsId === collab.id}>
                          <button className="w-full text-left flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                            <Pen className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button className="w-full text-left flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                            <View className="w-4 h-4" />
                            <span>Viewer</span>
                          </button>
                          <hr className="border-gray-200 dark:border-gray-700" />
                          <button className="w-full text-left flex items-center space-x-2 p-2 hover:bg-red-100 dark:hover:bg-red-700 rounded-md text-red-600 dark:text-red-400 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-red-500 dark:text-red-300" />
                            <span>Remove</span>
                          </button>
                        </PortalMenu>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-2 bg-blue-50 dark:bg-blue-900 p-4 rounded-md border border-blue-200 dark:border-blue-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            Permission Levels
          </span>
          <div className="flex items-center space-x-2">
            <View className="w-4 h-4 text-green-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>View</strong> - Can view the workspace and run queries.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Pen className="w-4 h-4 text-blue-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Edit</strong> - Can view, run queries, and edit the
              workspace.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Bolt className="w-4 h-4 text-yellow-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Admin</strong> - Full control over the workspace,
              including managing collaborators.
            </p>
          </div>
        </div>
      </Modal>
      <Navbar
        isAuthenticated={false}
        onLogin={() => console.log("Login clicked")}
        onLogout={() => console.log("Logout clicked")}
        onRegister={() => console.log("Register clicked")}
        userName={username}
        logoUrl={logo}
      />
      <div className="w-full h-full flex justify-between">
        <SidebarLeft />
        <CodeEditor />
        <SidebarRight />
      </div>
    </div>
  );
}

export default App;
