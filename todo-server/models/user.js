const { Model } = require('sequelize');
const { createPasswordHash, comparePasswordHash } = require('../utils/password');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Categories, {
        foreignKey: 'userId',
        as: 'userCategories',
      });
      this.hasMany(models.Todos, {
        foreignKey: 'userId',
        as: 'userTodos',
      });
      this.hasMany(models.SubTasks, {
        foreignKey: 'userId',
        as: 'userSubTasks',
      });
    }

    static async isPasswordMatching(email, password) {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return {
          user,
          isMatch: false,
        };
      }

      const isMatch = await comparePasswordHash(password, user.password);

      return {
        user,
        isMatch,
      };
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            // eslint-disable-next-line no-param-reassign
            user.password = await createPasswordHash(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            // eslint-disable-next-line no-param-reassign
            user.password = await createPasswordHash(user.password);
          }
        },
      },
    },
  );
  return Users;
};
