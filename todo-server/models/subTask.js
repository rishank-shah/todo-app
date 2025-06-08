const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubTasks extends Model {
    static associate(models) {
      this.belongsTo(models.Todos, {
        foreignKey: 'todoId',
        onDelete: 'cascade',
        as: 'todo',
      });
    }
  }
  SubTasks.init(
    {
      todoId: {
        field: 'todo_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'todo',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      title: {
        field: 'title',
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        field: 'status',
        allowNull: false,
        type: DataTypes.ENUM('in_progress', 'on_hold', 'complete'),
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
      tableName: 'sub_tasks',
    },
  );
  return SubTasks;
};
