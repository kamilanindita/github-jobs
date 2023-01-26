export const up = (queryInterface, Sequelize) => queryInterface.createTable('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(30),
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING(50),
    unique: true,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  role: {
    allowNull: false,
    type: Sequelize.STRING(10),
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

export const down = (queryInterface) => queryInterface.dropTable('users');
