'use strict';

const helperFullName = require('../helper/fullname')

module.exports = (sequelize, DataTypes) => {
  var Teachers = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId : DataTypes.INTEGER
  })

  Teachers.associate = model =>{
    Teachers.belongsTo(model.Subjects)
  }
  Teachers.prototype.fullname = function() {
    // body...
    return helperFullName(this.first_name, this.last_name)
  };
  
  return Teachers;
};