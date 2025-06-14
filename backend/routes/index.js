var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var { User } = require('../bin/Database');


// Route to handle user signup
// This route handles user registration by accepting user details, validating them, hashing the password, and saving the user to the database.

router.post('/api/signup', async function (req, res) {
  try {
    // getting user data from request body
    const { data } = req.body;
    if (!data || !data.UserName || !data.Email || !data.Password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    if (data.Password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const hash = await bcrypt.hash(data.Password, 10);
    const existing_email = await User.findOne({ email: data.Email });
    if (existing_email) {
      return res.json({ error: 'Email already exists' });
    }
    const user = new User({
      name: data.UserName,
      email: data.Email,
      Password: hash,
      Profile: data.ProfileUrl || '', // Optional fallback for ProfileUrl
    });

    await user.save();
    res.status(200).json({ message: 'Account created successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// authentication the user
router.post('/api/Login', async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !data.Email || !data.Password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const user = await User.findOne({ email: data.Email });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(data.Password, user.Password);
    if (!isMatch) {
      return res.json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error', error: error.message });
  }
})


// getting user info
router.get('/api/user', async (req, res) => {
  const { Email } = req.query;
  if (!Email) {
    console.log('email no ', Email);
    return res.status(400).json({ message: 'Email is required' });
  }
  const User_info = await User.findOne({ email: Email });
  if (!User_info) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ message: User_info, status: 'success' });
})

// Form route to handle form submission
router.post('/api/Formdata/submit',async(req,res)=>{
  const{}=req.body
  try {
    // Handle form submission logic here
    // For example, save the form data to the database
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

module.exports = router;
