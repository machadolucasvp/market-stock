module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '',
  database: 'market_stock',
  port: '5432',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
