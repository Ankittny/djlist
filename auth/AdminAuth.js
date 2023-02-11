const storage = require('sessionstorage');
//js
const AdminAuth = (req, res, next) => {
    if(storage.getItem('admin')){
      return next();
    } 
    res.redirect('/');
  }
  
 
  
  module.exports = {
    AdminAuth,
  };