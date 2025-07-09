import { Table } from "lucide-react";

type Attribute = {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  autoIncrement?: boolean;
  foreignKey?: boolean;
};

export const Schema = () => {
  const schemas: {
    name: string;
    countColumns: number;
    attributes: Attribute[];
  }[] = [
    {
      name: "users",
      countColumns: 4,
      attributes: [
        {
          name: "id",
          type: "int",
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
          foreignKey: false,
        },
        {
          name: "name",
          type: "varchar(255)",
          nullable: false,
          primaryKey: false,
          foreignKey: false,
        },
        {
          name: "email",
          type: "varchar(255)",
          nullable: false,
          primaryKey: false,
          foreignKey: false,
        },
        {
          name: "created_at",
          type: "timestamp",
          nullable: false,
          primaryKey: false,
          foreignKey: false,
        },
      ],
    },
    {
      name: "orders",
      countColumns: 3,
      attributes: [
        {
          name: "id",
          type: "int",
          nullable: false,
          primaryKey: true,
          foreignKey: false,
          autoIncrement: true,
        },
        {
          name: "user_id",
          type: "int",
          nullable: false,
          primaryKey: false,
          foreignKey: true,
        },
        {
          name: "price",
          type: "decimal(10,2)",
          nullable: false,
          primaryKey: false,
          foreignKey: false,
        },
        {
          name: "created_at",
          type: "timestamp",
          nullable: false,
          primaryKey: false,
          foreignKey: false,
        },
      ],
    },
    {
      name: "order_items",
      countColumns: 4,
      attributes: [
        {
          name: "id",
          type: "int",
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
          foreignKey: false,
        },
        {
          name: "order_id",
          type: "int",
          nullable: false,
          primaryKey: false,
          foreignKey: true,
        },
        {
          name: "product_id",
          type: "int",
          nullable: false,
          primaryKey: false,
          foreignKey: true,
        },
        {
          name: "quantity",
          type: "int",
          nullable: false,
          primaryKey: false,
          foreignKey: false,
        },
      ],
    },
  ];
  return (
    <div className="w-full h-[25.8rem] flex flex-col items-start justify-start space-y-2 p-4 bg-white dark:bg-gray-800 overflow-hidden overflow-y-scroll">
      <div className="w-full h-full">
        {schemas.map((schema) => (
          <details key={schema.name} open className="w-full mb-4">
            <summary className="text-lg font-semibold flex items-center justify-between gap-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded aspect-square">
                  <Table />
                </span>
                {schema.name}
              </div>
              <span className="text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                {schema.countColumns} column{schema.countColumns > 1 ? "s" : ""}
              </span>
            </summary>
            <div className="ml-4 mt-4">
              {schema.attributes.map((attr) => (
                <div
                  key={attr.name}
                  className="w-full flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-full flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          attr.primaryKey ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                      <span className="font-medium">{attr.name}</span>
                    </div>
                    <div className="w-full flex items-center justify-end gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-mono
                        ${
                          attr.type.startsWith("int") ||
                          attr.type.startsWith("bigint") ||
                          attr.type.startsWith("smallint")
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : attr.type.startsWith("varchar") ||
                              attr.type.startsWith("char")
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : attr.type.startsWith("text")
                            ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100"
                            : attr.type.startsWith("timestamp") ||
                              attr.type.startsWith("datetime") ||
                              attr.type.startsWith("date")
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : attr.type.startsWith("decimal") ||
                              attr.type.startsWith("numeric") ||
                              attr.type.startsWith("float") ||
                              attr.type.startsWith("double")
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : attr.type.startsWith("boolean") ||
                              attr.type === "bool"
                            ? "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                            : attr.type.startsWith("json")
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            : attr.type.startsWith("blob") ||
                              attr.type.startsWith("binary")
                            ? "bg-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        }
                      `}>
                        {attr.type}
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-end gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-mono ${
                          attr.nullable
                            ? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                        }`}>
                        {attr.nullable ? "NULL" : "NOT NULL"}
                      </span>
                      {attr.primaryKey && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-mono">
                          PK
                        </span>
                      )}
                      {attr.foreignKey && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-xs font-mono">
                          FK
                        </span>
                      )}
                      {attr.autoIncrement && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs font-mono">
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
