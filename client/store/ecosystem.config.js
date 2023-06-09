module.exports = {
  apps: [{
    script: 'npm start',

  }],
  deploy: {
    production: {
      user: 'root',
      host: '185.237.204.173',
      ref: 'origin/main/client',
      repo: 'https://github.com/Alfabravo228/music_platform.git',
      path: '/home/root',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options': 'ForwardAgent=yes'
    }
  }
};
