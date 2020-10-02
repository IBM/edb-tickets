'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.belongsTo(models.User, {foreignKey: { name: 'user_id', allowNull: false}});
      this.myAssociation2 = this.belongsTo(models.Assignee, {foreignKey: { name: 'assignee_id', allowNull: true}});
    }
  };
  Ticket.init({
    subject: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    state: {type: DataTypes.STRING, defaultValue: 'open'},
    category: {type: DataTypes.STRING, defaultValue: 'Other'},
    priority: {type: DataTypes.INTEGER, defaultValue: 4}
  }, {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
  });
  return Ticket;
};
