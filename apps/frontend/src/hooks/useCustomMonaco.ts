import { useState, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";

export function useCustomMonaco(): typeof monaco | null {
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(null);
  const mountedRef = useRef(true);
  const loaderRef = useRef<Promise<typeof monaco> | null>(null);

  useEffect(() => {
    mountedRef.current = true;

    const existingInstance = loader.__getMonacoInstance?.();
    if (existingInstance) {
      setMonacoInstance(existingInstance);
      return;
    }

    if (!loaderRef.current) {
      loader.config({
        paths: {
          vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs",
        },
        "vs/nls": { availableLanguages: {} },
      });

      loaderRef.current = loader.init();
    }

    loaderRef.current
      ?.then((monacoApi) => {
        if (mountedRef.current) {
          setMonacoInstance(monacoApi);
        }
      })
      .catch((error) => {
        if (mountedRef.current && error?.type !== "cancelation") {
          console.error("Monaco initialization error:", error);
        }
      });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return monacoInstance;
}

export default useCustomMonaco;
