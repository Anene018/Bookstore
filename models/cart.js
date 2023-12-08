const Sequelize = require('sequelize');
const Users = require('./user');

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart' , {
        cartId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING
        }
    })
    Cart.associate = (models) =>{
        Cart.belongsTo(models.Users, { foreignKey: 'userId' }); 
    }
    return Cart;
}