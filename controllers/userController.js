// controllers/userController.js
const userModel = require('../models/userModel');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assumes the user ID is stored in the request object after authentication
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email } = req.body;
    const updatedUser = await userModel.updateUser(userId, username, email);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const deletedUser = await userModel.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User profile deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};