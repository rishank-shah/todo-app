module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sub_tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      todoId: {
        field: 'todo_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'todos',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      title: {
        field: 'title',
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        field: 'status',
        allowNull: false,
        type: Sequelize.ENUM('in_progress', 'on_hold', 'complete'),
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
    await queryInterface.dropTable('sub_tasks');
  },
};
