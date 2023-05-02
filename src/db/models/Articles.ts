import { DataTypes as Sequelize } from "sequelize";

const articlesModel = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  editorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updateAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
};

const articlesOptions = {
  timestamps: false,
  schema: "public",
  freezeTableName: true,
};

export const getModel = (seq) => {
  return seq.define("Articles", articlesModel, articlesOptions);
};
