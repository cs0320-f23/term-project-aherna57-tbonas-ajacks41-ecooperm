// This configuration file tells Jest (which we use
//  for unit testing) to use the ts-jest package for
//  TypeScript code.

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transform: { "^.+\\.m?js$": "babel-jest", "^.+\\.ts?$": "ts-jest" },
  transformIgnorePatterns: ["node_modules/(?!(superjson)/)"],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "cjs"],
};
