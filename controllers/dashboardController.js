
const storage = require('sessionstorage');

const dashboardView = (req, res) => {
  res.render("dashboard", {
    user:storage.getItem('admin')
  });
};

module.exports = {
  dashboardView,
};