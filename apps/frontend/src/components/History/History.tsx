import { Calendar, ClockFading, Play, Timer } from "lucide-react";
import { Card } from "../Card";
import { JSX } from "react";

/**
 * Aplica color a palabras reservadas SQL dentro del query.
 */
const highlightSQL = (query: string): JSX.Element => {
  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT",
    "INTO",
    "VALUES",
    "UPDATE",
    "SET",
    "DELETE",
    "CREATE",
    "TABLE",
    "DROP",
    "AND",
    "OR",
    "NOT",
    "NULL",
    "JOIN",
    "ON",
    "AS",
    "IN",
    "IS",
    "LIKE",
    "BETWEEN",
    "ORDER",
    "BY",
    "GROUP",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "DISTINCT",
    "INTERVAL",
    "NOW",
  ];

  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

  const tokens = query.split(regex);

  return (
    <>
      {tokens.map((token, index) => {
        const isKeyword = keywords.includes(token.toUpperCase());
        return (
          <span
            key={index}
            className={
              isKeyword ? "text-blue-600 font-semibold dark:text-blue-400" : ""
            }>
            {token}
          </span>
        );
      })}
    </>
  );
};

export const History = () => {
  const history = [
    {
      query: "SELECT * FROM users WHERE age > 30",
      timestamp: "2023-10-01 12:34:56",
      duration: "120ms",
    },
    {
      query: "INSERT INTO orders (user_id, product_id) VALUES (1, 2)",
      timestamp: "2023-10-01 12:35:10",
      duration: "150ms",
    },
    {
      query:
        "UPDATE products SET price = price * 1.1 WHERE category = 'electronics'",
      timestamp: "2023-10-01 12:36:00",
      duration: "200ms",
    },
    {
      query:
        "DELETE FROM sessions WHERE last_access < NOW() - INTERVAL '30 days'",
      timestamp: "2023-10-01 12:37:15",
      duration: "180ms",
    },
  ];

  return (
    <div className="flex flex-col h-[25.6rem] p-4 overflow-hidden bg-white dark:bg-gray-800">
      {history.length > 0 ? (
        <div className="flex flex-col h-full overflow-y-auto p-4">
          <div className="w-full grid grid-cols-1 gap-4">
            {history.map((item, index) => (
              <Card key={index}>
                <div className="flex items-start justify-between space-x-4">
                  <div className="w-full flex flex-col space-y-2">
                    <div className="font-mono text-sm p-4 bg-gray-100 rounded-t-lg dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {highlightSQL(item.query)}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-4 px-4 pb-2">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-400">{item.timestamp}</span>
                      </span>
                      <span className="flex items-center">
                        <Timer className="w-4 h-4 text-gray-400" />
                        <span className="ml-1">{item.duration}</span>
                      </span>
                    </div>
                  </div>
                  <button className="btn-flat-primary mt-4 mr-4">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <ClockFading className="w-8 h-8 text-gray-400 mb-2 dark:text-gray-200" />
          <p className="text-gray-500">No history available.</p>
        </div>
      )}
    </div>
  );
};
