module.exports = {
  apps: [
    {
      name: 'website',
      script: 'npm',
      args: ['cd', './build', '&&', 'node', 'bin/server.js'],
    },
  ],
}
