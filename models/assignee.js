'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Assignee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.belongsTo(models.User, {foreignKey: { name: 'user_id', allowNull: false}});
      this.myAssociation2 = this.hasMany(models.Ticket);
    }
  }
  Assignee.init({
    dept: DataTypes.STRING,
    manager: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Assignee',
    underscored: true,
  });
  return Assignee;
};
