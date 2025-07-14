import avatar from "@assets/img/avatar.png";
import logo from "@assets/sql_collaborator_logo.png";
import {
  Bolt,
  Download,
  Globe,
  Link2,
  Lock,
  LucideShare2,
  Pen,
  Play,
  Plus,
  Save,
  Trash2,
  User2,
  View,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { Message } from "./components/Message";
import { Modal } from "./components/Modal/Modal";
import { Navbar } from "./components/Navbar";
import { PortalMenu } from "./components/PortalMenu";
import { Select } from "./components/Select";
import { SidebarLeft } from "./components/SidebarLeft";
import { SidebarRight } from "./components/SidebarRight";
import { CodeEditor } from "./editor/Editor";
import { useUI } from "./store";
import { createColorGenerator } from "./utils";

function App() {
  const username = "Juan Romero Collazos";
  const { openModal, closeModal, isModalOpen } = useUI();
  const [openToolsId, setOpenToolsId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [permission, setPermission] = useState("");
  const [databaseEngine, setDatabaseEngine] = useState("");
  const [role, setRole] = useState("");
  const [createSampleTables, setCreateSampleTables] = useState(true);
  const [enableCommonExtensions, setEnableCommonExtensions] = useState(false);
  const [createAdminUser, setCreateAdminUser] = useState(true);
  const [email, setEmail] = useState("");
  const [nameWorkspace, setNameWorkspace] = useState("");
  const [descriptionWorkspace, setDescriptionWorkspace] = useState("");
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

  const onLogin = () => {
    openModal("login");
  };

  const onLogout = () => {
    openModal("logout");
  };

  const closeTools = () => {
    setOpenToolsId(null);
    setAnchorEl(null);
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
        isOpen={isModalOpen("share")}
        onClose={() => closeModal("share")}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            className="btn-flat-primary"
            onClick={() => {
              addMessage(
                `Invitation sent to ${email} as ${
                  role === "V" ? "Viewer" : role === "E" ? "Editor" : "Admin"
                }`,
                "success"
              );
            }}
            disabled={
              !email ||
              !role ||
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
            }>
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
                          <button
                            key={`${collab.id}-edit`}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                            className="w-full text-left flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                            onClick={() => {
                              addMessage("Edit permissions clicked", "info");
                              closeTools();
                            }}>
                            <Pen className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            key={`${collab.id}-view`}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                            className="w-full text-left flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                            onClick={() => {
                              addMessage("View permissions clicked", "info");
                              closeTools();
                            }}>
                            <View className="w-4 h-4" />
                            <span>Viewer</span>
                          </button>
                          <hr className="border-gray-200 dark:border-gray-700" />
                          <button
                            key={`${collab.id}-remove`}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                            className="w-full text-left flex items-center space-x-2 p-2 hover:bg-red-100 dark:hover:bg-red-700 rounded-md text-red-600 dark:text-red-400 cursor-pointer"
                            onClick={() => {
                              console.log("Remove collaborator clicked");
                              openModal("deleteCollaborator");
                              closeTools();
                            }}>
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
      <Modal
        isOpen={isModalOpen("create")}
        onClose={() => closeModal("create")}
        icon={<Plus className="w-6 h-6" />}
        title="Create New Database"
        description="Configure your new database connection and settings."
        size="xl">
        <div className="flex flex-col items-center justify-between">
          <span className="w-full text-gray-700 dark:text-white font-bold">
            Basic Information
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mt-4">
            <label className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Workspace Name *
              </span>
              <input
                type="text"
                className="input"
                placeholder="Database Name"
              />
            </label>
            <label className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Database Name *
              </span>
              <Select
                options={[
                  { value: "mysql", label: "MySQL" },
                  { value: "postgres", label: "PostgreSQL" },
                  { value: "sqlite", label: "SQLite" },
                  { value: "mssql", label: "MSSQL" },
                ]}
                className="w-full"
                value={databaseEngine}
                onChange={(value) => setDatabaseEngine(value)}
                placeholder="Select a database"
              />
            </label>
            <label className="flex flex-col space-y-2 col-span-1 lg:col-span-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Description (Optional)
              </span>
              <textarea
                className="input resize-none"
                placeholder="Enter a brief description"
                rows={3}
              />
            </label>
          </div>
          <hr className="border-gray-300 my-4 w-full" />
          <span className="w-full text-gray-700 dark:text-white font-bold">
            Connection Settings
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mt-4">
            <label className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Host
              </span>
              <input type="text" className="input" placeholder="localhost" />
            </label>
            <label className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Port
              </span>
              <input type="text" className="input" placeholder="3306" />
            </label>
            <label className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Username
              </span>
              <input type="text" className="input" placeholder="root" />
            </label>
            <label className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Password
              </span>
              <input type="password" className="input" placeholder="********" />
            </label>
            <label className="flex flex-col space-y-2 col-span-1 lg:col-span-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                Database Name
              </span>
              <input type="text" className="input" placeholder="my_database" />
              <small className="text-gray-500 dark:text-gray-400">
                This will be the name of the database to create on the server.
              </small>
            </label>
          </div>
          <hr className="border-gray-300 my-4 w-full" />
          <span className="w-full text-gray-700 dark:text-white font-bold">
            Initial Setup
          </span>
          <div className="grid grid-cols-1 gap-4 w-full mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={createSampleTables}
                onChange={() => setCreateSampleTables((prev) => !prev)}
              />
              <span className="text-gray-600 dark:text-gray-400">
                Create sample tables (users, products, orders)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={enableCommonExtensions}
                onChange={() => setEnableCommonExtensions((prev) => !prev)}
              />
              <span className="text-gray-600 dark:text-gray-400">
                Enable common extensions (UUID, JSON functions)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={createAdminUser}
                onChange={() => setCreateAdminUser((prev) => !prev)}
              />
              <span className="text-gray-600 dark:text-gray-400">
                Create admin user for this database
              </span>
            </label>
          </div>
          <div className="mt-4 w-full flex justify-end">
            <button
              className="btn btn-outline mr-2"
              onClick={() => closeModal("create")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-primary"
              onClick={() => openModal("confirmCreateDatabase")}>
              <Plus className="w-5 h-5 ml-2" />
              <span>Create Database</span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen("login")}
        onClose={() => closeModal("login")}
        icon={<User2 className="w-6 h-6" />}
        title="Login"
        description="Please enter your credentials to access the SQL Collaborator."
        size="md">
        <div className="flex flex-col items-center justify-between">
          <button className="btn btn-outline w-full mb-4">
            <i className="bi bi-google"></i>
            <span>Login with Google</span>
          </button>
          <button className="btn btn-outline w-full mb-4">
            <i className="bi bi-github"></i>
            <span>Login with GitHub</span>
          </button>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-center mb-4">
            <span className="text-xs text-gray-500">
              Al continuar, aceptas nuestros{" "}
              <button
                onClick={() => openModal("terms&conditions")}
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800 cursor-pointer">
                Términos y Condiciones
              </button>
              .
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen("terms&conditions")}
        onClose={() => closeModal("terms&conditions")}
        icon={<Lock className="w-6 h-6" />}
        title="Terms & Conditions"
        description="Please review and accept our terms to continue using the platform."
        size="lg">
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Terms & Conditions</h2>
          <p className="text-sm text-gray-700 mb-4">
            By accessing and using this platform, you acknowledge and agree to
            be bound by the following terms and conditions. These terms govern
            your access, usage, and conduct within the application.
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
            <li>
              <strong>Usage:</strong> You agree to use this platform solely for
              lawful and authorized purposes.
            </li>
            <li>
              <strong>Data Responsibility:</strong> You are solely responsible
              for the accuracy and legality of the queries and data you interact
              with.
            </li>
            <li>
              <strong>Collaborative Environment:</strong> When sharing
              workspaces or collaborating, you agree to respect the intellectual
              property and data of other users.
            </li>
            <li>
              <strong>Privacy:</strong> We do not collect sensitive data unless
              explicitly authorized. Please ensure you do not upload private
              credentials or personal information without proper encryption.
            </li>
            <li>
              <strong>Modifications:</strong> These terms may be updated
              periodically. Continued use implies your acceptance of the latest
              version.
            </li>
          </ul>

          <p className="text-sm text-gray-700 mt-4">
            If you do not agree to these terms, you must discontinue using the
            platform.
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen("editWorkspace")}
        onClose={() => closeModal("editWorkspace")}
        icon={<Pen className="w-6 h-6" />}
        title="Edit Workspace"
        description="Modify the details of your SQL workspace."
        size="md">
        <div className="flex flex-col items-center justify-between">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-gray-600 dark:text-gray-400 font-semibold">
              Workspace Name *
            </span>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter workspace name"
              value={nameWorkspace}
              onChange={(e) => setNameWorkspace(e.target.value)}
            />
          </label>
          <label className="flex flex-col space-y-2 w-full mt-4">
            <span className="text-gray-600 dark:text-gray-400 font-semibold">
              Description (Optional)
            </span>
            <textarea
              className="input resize-none w-full"
              placeholder="Enter a brief description"
              rows={3}
              value={descriptionWorkspace}
              onChange={(e) => setDescriptionWorkspace(e.target.value)}
            />
          </label>
          <div className="mt-4 w-full flex justify-end">
            <button
              className="btn btn-outline mr-2"
              onClick={() => closeModal("editWorkspace")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-primary"
              onClick={() => {
                closeModal("editWorkspace");
                addMessage("Workspace updated successfully!", "success");
              }}
              disabled={!nameWorkspace.trim()}>
              <Save className="w-5 h-5 ml-2" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog
        isOpen={isModalOpen("exportSql")}
        onClose={() => closeModal("exportSql")}
        icon={<Download className="w-6 h-6" />}
        title="Export SQL"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to export the SQL? This action cannot be
            undone.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("exportSql")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-primary"
              onClick={() => {
                closeModal("exportSql");
                addMessage("SQL exported successfully!", "success");
              }}>
              <Download className="w-5 h-5 ml-2" />
              <span>Export SQL</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        isOpen={isModalOpen("deleteWorkspace")}
        onClose={() => closeModal("deleteWorkspace")}
        icon={<Trash2 className="w-6 h-6" />}
        title="Delete Workspace"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this workspace? This action cannot
            be undone.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("deleteWorkspace")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-danger"
              onClick={() => {
                closeModal("deleteWorkspace");
                addMessage("Workspace deleted successfully!", "success");
              }}>
              <Trash2 className="w-5 h-5 ml-2" />
              <span>Delete Workspace</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        isOpen={isModalOpen("deleteCollaborator")}
        onClose={() => closeModal("deleteCollaborator")}
        icon={<Trash2 className="w-6 h-6" />}
        title="Delete Collaborator"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to remove this collaborator? This action
            cannot be undone.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("deleteCollaborator")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-danger"
              onClick={() => {
                closeModal("deleteCollaborator");
                addMessage("Collaborator removed successfully!", "success");
              }}>
              <Trash2 className="w-5 h-5 ml-2" />
              <span>Remove Collaborator</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        isOpen={isModalOpen("logout")}
        onClose={() => closeModal("logout")}
        icon={<Lock className="w-6 h-6" />}
        title="Logout"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to log out? You will need to log in again to
            access your workspaces.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("logout")}>
              Cancel
            </button>
            <button className="btn btn-flat-primary" onClick={onLogin}>
              <Lock className="w-5 h-5 ml-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        isOpen={isModalOpen("confirmCreateDatabase")}
        onClose={() => closeModal("confirmCreateDatabase")}
        icon={<Plus className="w-6 h-6" />}
        title="Confirm Create Database"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Please review the database settings before proceeding.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("confirmCreateDatabase")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-primary"
              onClick={() => {
                closeModal("create");
                closeModal("confirmCreateDatabase");
                addMessage("Database created successfully!", "success");
              }}>
              <Plus className="w-5 h-5 ml-2" />
              <span>Confirm Create</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        isOpen={isModalOpen("confirmSaveQuery")}
        onClose={() => closeModal("confirmSaveQuery")}
        icon={<Save className="w-6 h-6" />}
        title="Confirm Save Query"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to save the current query? This will overwrite
            any unsaved changes.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("confirmSaveQuery")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-primary"
              onClick={() => {
                closeModal("confirmSaveQuery");
                addMessage("Query saved successfully!", "success");
              }}>
              <Save className="w-5 h-5 ml-2" />
              <span>Confirm Save</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        isOpen={isModalOpen("confirmStartWorkspace")}
        onClose={() => closeModal("confirmStartWorkspace")}
        icon={<Play className="w-6 h-6" />}
        title="Confirm Start Workspace"
        size="md">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to start the workspace? This will initialize
            the database and prepare it for use.
          </p>
          <hr className="border-gray-300 my-4 w-full" />
          <div className="w-full flex items-center justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => closeModal("confirmStartWorkspace")}>
              Cancel
            </button>
            <button
              className="btn btn-flat-primary"
              onClick={() => {
                closeModal("confirmStartWorkspace");
                addMessage("Workspace started successfully!", "success");
              }}>
              <Play className="w-5 h-5 ml-2" />
              <span>Confirm Start</span>
            </button>
          </div>
        </div>
      </ConfirmDialog>
      <Navbar
        isAuthenticated={false}
        onLogin={onLogin}
        onLogout={onLogout}
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
