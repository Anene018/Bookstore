const Sequelize = require('sequelize');
const Book = require('./book');
const models = require('.');

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review' ,{
        reviewId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ratings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: 1,
              max: 5
            }
          }
          ,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Book',
                key: 'bookId'
            }
        }
    } , { 
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields:['userId' , 'bookId']
            }
        ]
    })

   Review.associate = (models) => {
        Review.belongsTo(models.Book , {foreignKey:'bookId'})
   }
    
    
    Review.calculateAverageRatingAndCountReviews = async function (bookId) {
        try {
            const result = await this.findAll({
                attributes: [
                    Sequelize.fn('AVG' , Sequelize.col('ratings') , 'averageRating'),
                    Sequelize.fn('COUNT' , Sequelize.col('reviewId') , 'numberOfReview')
                ],
                where: {
                    bookId: bookId
                },
                raw: true
            })
    
            if (result.length > 0) {
                const { averageRating , numberOfReview } = result[0]
                try {
                    await Book.update({
                        averageRating: averageRating || 0,
                        numberOfReview: numberOfReview || 0
                    },
                    {
                        where: {
                            bookId: bookId
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            } else {
                throw new BadRequestError('No review for this book')
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return Review;
}