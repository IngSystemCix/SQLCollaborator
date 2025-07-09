// apps/frontend/jest.config.ts
import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/store$": "<rootDir>/src/store",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
