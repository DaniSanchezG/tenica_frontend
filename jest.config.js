// module.exports = {
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
//     moduleNameMapper: {
//       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
//     },
//   };

module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    coverageDirectory: "coverage",
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
  };