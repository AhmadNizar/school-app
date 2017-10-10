'use strict';
const helperFullName = require('../helper/fullname')

module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  })
  Student.associate = model =>{
    Student.hasMany(model.School)
    Student.belongsToMany(model.Subjects, {through :'School'})
  }
  Student.prototype.fullname = function() {
    return helperFullName(this.first_name+' '+this.last_name)
  };
  
  return Student;
};