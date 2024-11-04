/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@router/(.*)$": "<rootDir>/src/router/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
  },
};
