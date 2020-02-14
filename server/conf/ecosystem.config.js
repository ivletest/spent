module.exports = {
  apps : [{
    name: 'spent-api',
    script: './api/api.index.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: false,
    watch: true,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:ivletest/spent.git',
      path : '/server',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
