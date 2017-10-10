'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  })
  Subjects.associate = model =>{
    Subjects.hasMany(model.Teachers, {foreignKey : "SubjectId"})
    Subjects.hasMany(model.School)
    Subjects.belongsToMany(model.Student, {through : 'School'})
    //Subjects.hasMany(model.Konjungsi, {foreignKey : "SubjectId"})
    //Subjects.hasMany(model.Student,)
    //Belom paham
  }
  return Subjects;
};