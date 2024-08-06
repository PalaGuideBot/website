module.exports = {
  apps: [
    {
      name: 'website',
      script: 'bin/server.js',
      cwd: './build',
      exec_mode: 'cluster',
      instances: 1,
      autorestart: true,
    },
  ],
}
