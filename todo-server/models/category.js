const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      this.hasMany(models.Todos, {
        foreignKey: 'categoryId',
        as: 'categoryTodos',
      });
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        as: 'user',
      });
    }
  }
  Categories.init(
    {
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
      categoryName: {
        field: 'category_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        field: 'display_name',
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
      tableName: 'categories',
    },
  );
  return Categories;
};
