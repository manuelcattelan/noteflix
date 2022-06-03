
const config = {
    verbose: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    setupFiles: ["./setEnvVars.js"],
};
  
module.exports = config;
