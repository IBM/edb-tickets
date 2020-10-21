/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
  }
  Ticket.init({
    subject: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    state: {type: DataTypes.STRING, defaultValue: 'open'},
    category: {type: DataTypes.STRING, defaultValue: 'Other'},
    priority: {type: DataTypes.INTEGER, defaultValue: 4},
  }, {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
  });
  return Ticket;
};
