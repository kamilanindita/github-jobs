'use strict';
import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    type: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    company: {
      type: DataTypes.STRING
    },
    company_url: {
      type: DataTypes.STRING
    },
    company_logo: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    how_to_apply:{
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'job',
  });
  return Job;
};