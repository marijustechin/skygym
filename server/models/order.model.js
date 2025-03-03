const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
    sequelize.define('order_item', {
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
};
