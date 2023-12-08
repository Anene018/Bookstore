// Import necessary modules
const { User } = require('../models/index') 

// Controller to create a user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create the user in the database
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Respond with the created user
    res.status(201).json({
      message: 'User created successfully',
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller function
module.exports = {
  createUser,
};
