const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        as: 'user',
      });
      this.belongsTo(models.Categories, {
        foreignKey: 'categoryId',
        onDelete: 'cascade',
        as: 'category',
      });
      this.hasMany(models.SubTasks, {
        foreignKey: 'todoId',
        as: 'todoSubTasks',
      });
    }
  }
  Todos.init(
    {
      title: {
        field: 'title',
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      categoryId: {
        field: 'category_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      status: {
        field: 'status',
        allowNull: false,
        type: DataTypes.ENUM('in_progress', 'on_hold', 'complete'),
      },
      sequence: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,
      },
      bookmarked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      tableName: 'todos',
    },
  );
  return Todos;
};
