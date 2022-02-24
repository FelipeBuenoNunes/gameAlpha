module.exports = {
    apps: [
      {
        script: 'server.js',
        cwd: 'front/',
        name: 'Frontend',
        watch: true
      },
      {
        script: 'app.js',
        cwd: 'back/',
        name: 'Backend',
        watch: true
      }
    ]
  }