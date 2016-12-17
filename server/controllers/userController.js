var User = require('../models/userModel.js');
var config = require('../../config.js');
var http = require('http');

module.exports = {
  addUser: function(userObj) {
    return new Promise(function(resolve, reject) {
      User.register(new User({'username': userObj.username}), userObj.password, function(err, newUser) {
        if(err) {
          reject(err);
        }else {
          resolve(newUser);
        }
      });
    });
  },

  enrollPhoto: function(userId, userPhoto) {
    return new Promise(function(resolve, reject) {
      let options = {
        method: 'POST',
        host: 'api.kairos.com',
        path: '/enroll',
        headers: {
          'Content-Type': 'application/json',
          'app_id': config.kairos.id,
          'app_key': config.kairos.key
        }
      };
      let data = {
        'image': userPhoto,
        'subject_id': userId,
        'gallery_name': 'users'
      };
      let req = http.request(options, function(res) {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      });
      req.write(JSON.stringify(data));
      req.on('error', err => reject(err));
      req.end();
    });
  },

  retrieveUser: function(userId) {
    return new Promise(function(resolve, reject) {
      User.findOne({'_id': userId}, function(err, user) {
        if(err) {
          reject(err);
        }else {
          resolve(user);
        }
      });
    });
  },

  recognizePhoto: function(userPhoto) {
    return new Promise(function(resolve, reject) {
      let options = {
        method: 'POST',
        host: 'api.kairos.com',
        path: '/recognize',
        headers: {
          'Content-Type': 'application/json',
          'app_id': config.kairos.id,
          'app_key': config.kairos.key
        }
      };
      let data = {
        'image': userPhoto,
        'gallery_name': 'users'
      };
      let req = http.request(options, function(res) {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve(JSON.parse(body)) ;
        });
      });
      req.write(JSON.stringify(data));
      req.on('error', err => reject(err));
      req.end();
    });
  },

  updateUserInDb: function(user, userId) {
    return User.update({'_id': userId}, user)
    .exec()
    .then(function(resp) {
      return resp;
    });
  },

  changePassword: function(user, userId) {
    //find User
    //setPassword()
    //save
  },

  deleteUser: function(userId) {
    return User.remove(
      {'_id': userId}
      )
    .exec()
    .then(function(resp) {
      return resp;
    });
  }

};
