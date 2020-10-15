'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.hasMany(models.Ticket);
    }
  }
  User.init({
    id: {type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: ('98' + Math.floor(Math.random() * (999 - 100) + 100))},
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });
  return User;
};