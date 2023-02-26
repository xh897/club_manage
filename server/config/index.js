module.exports = {
  basic: {
    get name() {
      return "community";
    },
    get port() {
      return 3000;
    }
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'club_database',
  }
};