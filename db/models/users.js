'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 256],
      isEmail: true,
    }
  },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    }, 
    bio: {
      type: DataTypes.TEXT
    }, 
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: ['id', 'username', 'email', 'hashedPassword']
      }
    }
  });
  Users.associate = function(models) {
    Users.hasMany(models.PetPreference, {
      foreignKey: 'userId',
      as: 'petPreferences'
    });

    Users.hasMany(models.UserSavedPets, {
      foreignKey: 'userId',
      as: 'userSavedPets'
    })
  };

//generate JWT token with safe information
Users.prototype.safeUserObject = function() {
  const { id, firstName, lastName, username, email } = this;
  return { id, firstName, lastName, username, email };
}

//validating password
Users.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword.toString());
};

Users.getCurrentUserById = async function (id) {
  return await Users.scope('currentUser').findByPk(id);
}

Users.login = async function({ credential, password }) {
  const { Op } = require('sequelize');
  const user = await Users.scope('loginUser').findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential
      }
    }
  });
  if (user && user.validatePassword(password)) {
    return await Users.scope('currentUser').findByPk(user.id);
  }
}

Users.signup = async function({ firstName, lastName, username, email, password }) {
  const hashedPassword = bcrypt.hashSync(password);
  const user = await Users.create({
    firstName,
    lastName,
    username,
    email,
    hashedPassword
  });
  return await Users.scope('currentUser').findByPk(user.id);
}

  return Users;
};

