module.exports = {
  apps: [
    {
      script: "server.js",
      cwd: "frontend/",
      name: "Frontend",
      watch: true,
    },
    {
      script: "app.js",
      cwd: "backend/",
      name: "Backend",
      watch: true,
    },
  ],
};
