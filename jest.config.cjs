// This configuration file tells Jest (which we use
//  for unit testing) to use the ts-jest package for
//  TypeScript code.

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transform: { "^.+\\.mjs$": "ts-jest" },
  testMatch: [
    "**/src/components/__tests__jest/**/*.test.ts",
    "**/src/components/__tests__jest/**/*.test.tsx",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
