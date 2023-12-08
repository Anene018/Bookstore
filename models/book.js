const Sequelize = require('sequelize');
const Users = require('./user');
const Review = require('./review');
const models = require('.');

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,  
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull : false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING
        },
        averageRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        numberOfReview: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: true})
    // Define model associations if any
    Book.associate = (models) => {
        Book.hasMany( models.Review , { foreignKey: 'bookId', onDelete: 'CASCADE' })
        Book.belongsTo(models.Users ,{foreignKey:'userId'})
    }
  
    return Book;
    
}