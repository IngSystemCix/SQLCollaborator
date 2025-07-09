import { ResultProps } from "./Result.types";
import "./Result.module.css";
import { Layers } from "lucide-react";

export const Result = ({ results, error, loading }: ResultProps) => {
  return (
    <div className="result-container">
      <div className="w-full h-full overflow-y-scroll">
        {loading && <div className="loading">Loading results...</div>}

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && results?.length > 0 && (
          <div className="results">
            <table className="result-table">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td key={j}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && results?.length === 0 && (
          <div className="no-results">
            <Layers className="size-16 text-gray-400 dark:text-gray-500" />
            <strong>No results found.</strong>
          </div>
        )}
      </div>
    </div>
  );
};
