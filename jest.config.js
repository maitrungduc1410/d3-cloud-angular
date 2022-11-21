
const { defaults } = require('jest-preset-angular/presets');

// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'], 
  collectCoverage: false,
  coverageReporters: ['lcov', 'text'],
  coverageProvider: 'v8', 
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',    
    '<rootDir>/jest-global-mocks.ts'    
  ], 
  cacheDirectory: '.jest-cache',
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  roots: [
    '<rootDir>/projects/angular-d3-cloud/src/',
    '<rootDir>/projects/example/src/'
  ],
  moduleNameMapper: {
    '^angular-d3-cloud$': '<rootDir>/dist/angular-d3-cloud'
  },
  globals: {
    'ts-jest': {
      ...defaults.globals['ts-jest'],  
      isolatedModules: true
    }
  },
  verbose: true,
  watchman: false,
  resetModules: true,
  restoreMocks: true
};