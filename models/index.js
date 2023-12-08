const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json'); // Adjust the path accordingly

const sequelize = new Sequelize(config.development);
const models = {};

// Load models dynamically from the same directory
fs.readdirSync(__dirname).forEach(file => {
  if (file === 'index.js' || !file.endsWith('.js')) return;

  const model = require(path.join(__dirname, file))(sequelize, Sequelize);
  models[model.name] = model;
});

// Associate models if needed
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  ...models,
};
