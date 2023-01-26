import { compare, hash } from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import { tokenHelper, mailHelper } from '@/helpers';

export default function (sequelize) {
  class User extends Model {
    generateToken(expiresIn = '1h') {
      const data = { id: this.id, email: this.email };
      return tokenHelper.generateToken(data, expiresIn);
    }

    validatePassword(plainPassword) {
      return compare(plainPassword, this.password);
    }

    static associate(models) {
    }
  }
  
  User.init({
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    modelName: 'user',
    sequelize,
  });

  User.addHook('beforeSave', async (instance) => {
    if (instance.changed('password')) {
      // eslint-disable-next-line no-param-reassign
      instance.password = await hash(instance.password, 10);
    }
  });

  return User;
}
