function modelRelations(sequelize) {
  const { user, user_secret, token, order, order_item } = sequelize.models;

  // useris
  user.hasOne(user_secret, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  user.hasOne(token, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  user.hasMany(order, { foreignKey: 'user_id', onDelete: 'CASCADE' });

  user_secret.belongsTo(user, { foreignKey: 'user_id' });
  token.belongsTo(user, { foreignKey: 'user_id' });

  order_item.hasMany(order, { foreignKey: 'item_id', onDelete: 'CASCADE' });

  order.belongsTo(user, { foreignKey: 'user_id' });
  order.belongsTo(order_item, { foreignKey: 'item_id' });
}

module.exports = { modelRelations };
