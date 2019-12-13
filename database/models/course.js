'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE
    },
    {}
  );
  Course.associate = function(models) {
    // associations can be defined here
  };
  return Course;
};
