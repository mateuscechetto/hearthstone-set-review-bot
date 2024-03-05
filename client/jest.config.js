const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const config = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ['<rootDir>'],
    coverageDirectory: '../coverage',
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$',
    transform: { '^.+\\.(t|j)s$': 'jest-preset-angular' },
    collectCoverageFrom: ['**/*.(t|j)s'],
    setupFilesAfterEnv: [
      "<rootDir>/src/setup.jest.ts"
    ],
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/"
    ],
    globals: {
      "ts-jest": {
          tsConfig: "<rootDir>/tsconfig.spec.json",
          stringifyContentPathRegex: "\\.html$"
      }
    },
};

module.exports = config;
