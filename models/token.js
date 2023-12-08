const Sequelize = require('sequelize');
const Users = require('./user');
const models = require('.');

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token' ,{
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            trim: true
        },
        expires: {
            type: DataTypes.DATE,
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
        tokenType: {
            type: DataTypes.ENUM('refresh' , 'access'),
            allowNull: false
        }
    })
    
    Token.associate = (models) =>{
        Token.belongsTo(models.Users , {foreignKey:'userId' })
    }
    
    return Token;
}