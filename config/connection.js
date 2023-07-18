const Sequelize = require('sequelize');
require('dotenv').config({ path: require('find-config')('.env') });

let sequelize;

if (process.env.RDS_HOSTNAME) {
  sequelize = new Sequelize(process.env.RDS_DB_NAME, 
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,
    {
      host: process.env.RDS_HOSTNAME,
      port: 3306,
      logging: console.log,
      maxConcurrentQueries: 100,
      dialect: 'mysql',
      dialectOptions: {
          ssl:'Amazon RDS'
      },
      pool: { maxConnections: 5, maxIdleTime: 30},
      language: 'en'
    }
    );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
