const Sequelize = require('sequelize');
const Book = require('./book')
const Cart = require('./cart')
const Token = require('./token')
const History = require('./tracker')

// Define the User model
module.exports = (sequelize, DataTypes) => {
    async function hashPassword (user) {
        user.password = await bcrypt.hash(user.password , 10)
    }

    // Define the User model
    const Users = sequelize.define('Users', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fullname: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: [8],
            msg: "Password must be more than 8 characters"
          },
          max: {
            args: [20],
            msg: "Password must be less than 20 characters"
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'reader',
        validate: {
          isIn: [['reader', 'author', 'admin']]
        },
      },
      wishList: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        unique: true
      },
      bankName: {
        type: DataTypes.STRING
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          await hashPassword(user)
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            await hashPassword(user)
          }
        }
      }
    });
    
    //Relationships
    Users.associate = (models) => {
      Users.hasMany( models.Cart , { foreignKey: 'userId', onDelete: 'CASCADE' })
      Users.hasMany( models.Book , { foreignKey: 'userId', onDelete: 'CASCADE' })
      Users.hasMany( models.History , { foreignKey: 'userId', onDelete: 'CASCADE' })
      Users.hasMany( models.Token , { foreignKey: 'userId', onDelete: 'CASCADE' })
  } 

    //Static method
    Users.comparePassword = async (userPassword, hashedPassword) => {
      try {
        const isMatch = await bcrypt.compare(userPassword, hashedPassword)
        return isMatch
      } catch (error) {
        throw new Error("Wrong password")
      }
    }
    
    return Users;
};
