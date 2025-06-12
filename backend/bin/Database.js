// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/TaskNet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Database connected successfully');
})
.catch((err) => {
  console.error('❌ Database connection error:', err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
        required: true,
        unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Profile: {
    type: String,
    default: '', // optional fallback
  },
}, { timestamps: true });

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = { User };
