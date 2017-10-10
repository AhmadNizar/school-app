'use strict';
module.exports = (sequelize, DataTypes) => {
  var School = sequelize.define('School', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER
  })

  School.associate = model =>{
    //School.hasMany(model.Subjects)
    School.belongsTo(model.Subjects)
    //School.hasMany(model.Student)
    School.belongsTo(model.Student)
  }
  return School;
};