const Sequelize = require('sequelize');
const Users = require('./user');

module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History' , {
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    },{ timestamps : true });
    
    History.associate = (models) =>{
        History.belongsTo(models.Users , {foreignKey:'userId'})
    }
    
    return History;
}