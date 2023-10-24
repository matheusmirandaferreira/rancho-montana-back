module.exports = {
  apps : [{
    script: 'server.js',
    name: 'rancho-montana',
    watch: '.',
    env: {
        APP_PORT: 21094,
        NODE_ENV: 'production',
        SECRET: '3067fa96b40b3ac74ab45a985dd4e629',
        APP_BASE_URL: 'https://ranchomontana-brt.com.br',
        DB_CONNECTION: 'postgres',
        DB_HOST: 'pgsql.ranchomontanadb.kinghost.net',
        DB_PORT: '',
        DB_DATABASE: 'ranchomontanadb',
        DB_USERNAME: 'ranchomontanadb',
        DB_PASSWORD: 'EyVwZq!k5aNCC7p',
        DB_MIGRATION_TABLE_NAME: 'migration_table'
    },
    env_production: {
        APP_PORT: 21094,
        NODE_ENV: 'production',
        SECRET: '3067fa96b40b3ac74ab45a985dd4e629',
        APP_BASE_URL: 'https://ranchomontana-brt.com.br',
        DB_CONNECTION: 'postgres',
        DB_HOST: 'pgsql.ranchomontanadb.kinghost.net',
        DB_PORT: '',
        DB_DATABASE: 'ranchomontanadb',
        DB_USERNAME: 'ranchomontanadb',
        DB_PASSWORD: 'EyVwZq!k5aNCC7p',
        DB_MIGRATION_TABLE_NAME: 'migration_table'
    }
  }],

  deploy : {
    production : {
      user : 'ranchomontana-brt',
      host : '187.1.139.15',
      ref  : 'origin/main',
      repo : 'git@github.com:matheusmirandaferreira/rancho-montana-back.git',
      path : '/home/ranchomontana-brt/apps_nodejs/pub_html',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
