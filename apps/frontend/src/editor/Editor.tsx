import { Tabs } from "@/components/Tabs";
import useCustomMonaco from "@/hooks/useCustomMonaco";
import Editor from "@monaco-editor/react";
import {
  ClockFading,
  GitFork,
  Grid2x2,
  Layers,
  Play,
  Save,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./Editor.module.css";
import { Schema } from "@/components/Schema";
import { Result } from "@/components/Result";
import { History } from "@/components/History";
import { Er } from "@/components/Er";
import { useUI } from "@/store";

export const CodeEditor = () => {
  const { openModal } = useUI();
  const monaco = useCustomMonaco();
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState("vs-light");
  const [_editor, setEditor] = useState<string | null>(
    "-- Write your SQL query here"
  );
  const [tabs, _setTabs] = useState([
    {
      id: "1",
      icon: <Grid2x2 className="w-4 h-4" />,
      label: "Schema",
      content: <Schema />,
    },
    {
      id: "2",
      icon: <GitFork className="w-4 h-4 rotate-180" />,
      label: "ER Diagram",
      content: <Er />,
    },
    {
      id: "3",
      icon: <Layers className="w-4 h-4" />,
      label: "Results",
      content: <Result results={[]} error={undefined} loading={false} />,
    },
    {
      id: "4",
      icon: <ClockFading className="w-4 h-4" />,
      label: "History",
      content: <History />,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };
  const initialized = useRef(false);

  useEffect(() => {
    if (!monaco || initialized.current) return;

    initialized.current = true;

    try {
      const isDark = document.documentElement.classList.contains("dark");
      const selectedTheme = isDark ? "dracula" : "vs-light";

      // Registrar lenguaje SQL (solo una vez)
      monaco.languages.register({ id: "sql" });

      monaco.languages.setMonarchTokensProvider("sql", {
        tokenizer: {
          root: [
            [
              /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|DELETE|CREATE|DROP|ALTER|JOIN|ON|GROUP BY|ORDER BY|LIMIT|OFFSET|AS|AND|OR|NOT|LIKE|IN|IS|EXISTS|BETWEEN|UNION|INTERSECT|EXCEPT|DISTINCT|CASE|WHEN|THEN|ELSE|END|NULL|TRUE|FALSE|CAST|CONVERT|COALESCE|IF|SET|BEGIN|COMMIT|ROLLBACK|TRANSACTION|LOCK|UNLOCK|INDEX|VIEW|TRIGGER|PROCEDURE|FUNCTION|SCHEMA|TABLE|COLUMN|DATABASE|USER|GRANT|REVOKE|PRIVILEGES|FOREIGN KEY|PRIMARY KEY|UNIQUE|CHECK|DEFAULT|AUTO_INCREMENT|SERIAL|BIGINT|INT|SMALLINT|TINYINT|FLOAT|DOUBLE|DECIMAL|CHAR|VARCHAR|TEXT|BLOB|DATE|TIME|DATETIME|TIMESTAMP|INTERVAL|YEAR|JSON|XML|ARRAY|ENUM|SET|BIT|POINT|LINESTRING|POLYGON|GEOMETRY|GEOGRAPHY|SPATIAL|WITH|WITHOUT|PARTITION|CLUSTER|REINDEX|ANALYZE|VACUUM|EXPLAIN|DESCRIBE|SHOW|USE|CONNECT|DISCONNECT|BACKUP|RESTORE|FLUSH|OPTIMIZE|REPAIR|TRUNCATE|RENAME)\b/i,
              "keyword",
            ],
            [/\b(NOW|COUNT|SUM|AVG|MIN|MAX|UPPER|LOWER)\b/i, "predefined"],
            [/"[^"]*"/, "string"],
            [/'[^']*'/, "string"],
            [/--.*/, "comment"],
            [/\b\d+(\.\d+)?\b/, "number"],
            [/[=<>!]+/, "operator"],
            [
              /\b(id|name|created_at|email|status|price|user_id|users|orders)\b/i,
              "identifier",
            ],
          ],
        },
      });

      monaco.languages.registerCompletionItemProvider("sql", {
        provideCompletionItems: (
          model: { getWordUntilPosition: (arg0: any) => any },
          position: { lineNumber: any }
        ) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const keywords = Array.from(
            new Set([
              "SELECT",
              "FROM",
              "WHERE",
              "INSERT",
              "INTO",
              "VALUES",
              "UPDATE",
              "DELETE",
              "CREATE",
              "DROP",
              "ALTER",
              "JOIN",
              "ON",
              "GROUP BY",
              "ORDER BY",
              "LIMIT",
              "OFFSET",
              "AS",
              "AND",
              "OR",
              "NOT",
              "LIKE",
              "IN",
              "IS",
              "EXISTS",
              "BETWEEN",
              "UNION",
              "INTERSECT",
              "EXCEPT",
              "DISTINCT",
              "CASE",
              "WHEN",
              "THEN",
              "ELSE",
              "END",
              "NULL",
              "TRUE",
              "FALSE",
              "CAST",
              "CONVERT",
              "COALESCE",
              "IF",
              "SET",
              "BEGIN",
              "COMMIT",
              "ROLLBACK",
              "TRANSACTION",
              "LOCK",
              "UNLOCK",
              "INDEX",
              "VIEW",
              "TRIGGER",
              "PROCEDURE",
              "FUNCTION",
              "SCHEMA",
              "TABLE",
              "COLUMN",
              "DATABASE",
              "USER",
              "GRANT",
              "REVOKE",
              "PRIVILEGES",
              "FOREIGN KEY",
              "PRIMARY KEY",
              "UNIQUE",
              "CHECK",
              "DEFAULT",
              "AUTO_INCREMENT",
              "SERIAL",
              "BIGINT",
              "INT",
              "SMALLINT",
              "TINYINT",
              "FLOAT",
              "DOUBLE",
              "DECIMAL",
              "CHAR",
              "VARCHAR",
              "TEXT",
              "BLOB",
              "DATE",
              "TIME",
              "DATETIME",
              "TIMESTAMP",
              "INTERVAL",
              "YEAR",
              "JSON",
              "XML",
              "ARRAY",
              "ENUM",
              "SET",
              "BIT",
              "POINT",
              "LINESTRING",
              "POLYGON",
              "GEOMETRY",
              "GEOGRAPHY",
              "SPATIAL",
              "WITH",
              "WITHOUT",
              "PARTITION",
              "CLUSTER",
              "REINDEX",
              "ANALYZE",
              "VACUUM",
              "EXPLAIN",
              "DESCRIBE",
              "SHOW",
              "USE",
              "CONNECT",
              "DISCONNECT",
              "BACKUP",
              "RESTORE",
              "FLUSH",
              "OPTIMIZE",
              "REPAIR",
              "TRUNCATE",
              "RENAME",
            ])
          );

          const functions = [
            "NOW()",
            "COUNT()",
            "SUM()",
            "AVG()",
            "MIN()",
            "MAX()",
            "UPPER()",
            "LOWER()",
            "CONCAT()",
            "SUBSTRING()",
            "TRIM()",
            "LENGTH()",
            "ROUND()",
            "DATE_FORMAT()",
            "STR_TO_DATE()",
            "IFNULL()",
            "COALESCE()",
            "CAST()",
            "CONVERT()",
            "JSON_EXTRACT()",
            "XML_PARSE()",
            "ARRAY_AGG()",
            "JSON_ARRAY()",
            "JSON_OBJECT()",
            "REGEXP_LIKE()",
            "REGEXP_REPLACE()",
            "REGEXP_SUBSTR()",
            "RANDOM()",
            "UUID()",
            "CURRENT_DATE()",
            "CURRENT_TIME()",
            "CURRENT_TIMESTAMP()",
            "EXTRACT()",
            "DATE_ADD()",
            "DATE_SUB()",
            "DATEDIFF()",
            "TIMESTAMPDIFF()",
            "FORMAT()",
          ];

          const tables = [
            { label: "users", columns: ["id", "name", "email", "created_at"] },
            { label: "orders", columns: ["id", "user_id", "price", "status"] },
          ];

          return {
            suggestions: [
              ...keywords.map((k) => ({
                label: k,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: k + " ",
                range,
              })),
              ...functions.map((fn) => ({
                label: fn,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: fn,
                range,
              })),
              ...tables.map((t) => ({
                label: t.label,
                kind: monaco.languages.CompletionItemKind.Struct,
                insertText: t.label,
                detail: "table",
                range,
              })),
              ...tables.flatMap((t) =>
                t.columns.map((col) => ({
                  label: col,
                  kind: monaco.languages.CompletionItemKind.Field,
                  insertText: col,
                  detail: `column of ${t.label}`,
                  range,
                }))
              ),
            ],
          };
        },
      });

      // Registrar tema oscuro personalizado
      if (isDark) {
        monaco.editor.defineTheme("dracula", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "6272a4" },
            { token: "keyword", foreground: "ff79c6" },
            { token: "predefined", foreground: "8be9fd" },
            { token: "string", foreground: "f1fa8c" },
            { token: "number", foreground: "bd93f9" },
            { token: "operator", foreground: "ffb86c" },
            { token: "identifier", foreground: "50fa7b" },
          ],
          colors: {
            "editor.background": "#282a36",
            "editor.foreground": "#f8f8f2",
            "editor.lineHighlightBackground": "#44475a55",
            "editorCursor.foreground": "#f8f8f0",
            "editor.selectionBackground": "#44475a88",
          },
        });
      }

      setTheme(selectedTheme);
      setReady(true);
    } catch (err) {
      console.error("Error configuring Monaco:", err);
    }
  }, [monaco]);

  // Detect theme changes and update Monaco theme accordingly
  useEffect(() => {
    if (!monaco) return;
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const selectedTheme = isDark ? "dracula" : "vs-light";
      setTheme(selectedTheme);
      monaco.editor.setTheme(selectedTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [monaco]);

  return (
    <div className="editor-container">
      <div className="w-full h-full flex flex-col items-center justify-between">
        <div className="flex items-center justify-between w-full h-16 p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="aspect-square rounded-full bg-red-400 w-3 h-3 inline-block" />
              <span className="aspect-square rounded-full bg-yellow-400 w-3 h-3 inline-block ml-2" />
              <span className="aspect-square rounded-full bg-green-400 w-3 h-3 inline-block ml-2" />
            </div>
            <h1 className="text-xl font-semibold text-black dark:text-white">
              SQL Editor
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="btn-outline"
              onClick={() => openModal("confirmSaveQuery")}>
              <Save className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Save
              </span>
            </button>
            <button
              className="btn-flat-primary"
              onClick={() => {
                setActiveTabId("3");
              }}>
              <Play className="w-4 h-4 text-white" />
              <span className="text-sm">Run Query</span>
            </button>
          </div>
        </div>
        {ready && (
          <Editor
            key={theme}
            height="100%"
            language="sql"
            defaultValue="-- Write your SQL query here"
            theme={theme}
            onMount={(editor) => {
              setEditor(editor.getValue());
              editor.onDidChangeModelContent(() => {
                setEditor(editor.getValue());
              });
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 18,
              lineNumbers: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
              renderLineHighlight: "all",
            }}
          />
        )}
      </div>
      <div className="w-full h-full">
        <Tabs
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={handleTabChange}
          className="h-full"
        />
        <div className="tab-content h-full">
          {tabs.map((tab) =>
            tab.id === activeTabId ? (
              <div key={tab.id} className="h-full">
                {tab.content}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
