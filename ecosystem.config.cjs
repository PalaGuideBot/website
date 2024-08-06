module.exports = {
  apps: [
    {
      name: 'website',
      script: 'bin/server.js',
      cwd: './build',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
    },
  ],
}
