const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Blog extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
    },
  },
  {
    hooks: {
      beforeCreate: async (newBlogData) => {
        newBlogData.password = await bcrypt.hash(newBlogData.password, 10);
        return newBlogData;
      },
      beforeUpdate: async (updatedBlogData) => {
        updatedBlogData.password = await bcrypt.hash(updatedBlogData.password, 10);
        return updatedBlogData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = User;
