module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      title: {
        field: 'title',
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      categoryId: {
        field: 'category_id',
        type: Sequelize.INTEGER.UNSIGNED,
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
        type: Sequelize.ENUM('in_progress', 'on_hold', 'complete'),
      },
      sequence: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      bookmarked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('todos');
  },
};
