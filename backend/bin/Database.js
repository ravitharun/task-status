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

// Task Model
const Task = mongoose.Schema({
  TaskName: { type: String, required: true },
  TaskDescription: { type: String, required: true },
  EstimatedTime: { type: String, required: true },
  Status: { type: String, required: true },
  Type: { type: String, required: true },
  Assignee: { type: String, required: true },
  Schedule: { type: String, required: true },
  EndSchedule: { type: String, required: true },
  Priority: { type: String, required: true },

}, { timestamps: true })


const TeamSchema = new mongoose.Schema({
  Name: { type: String, default: "Jon Dev" },
  members: { type:String }, // an array of emails
  invitedBy: {
    type: String,
    default: "tr55@gmail.com"
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
const TaskModel = mongoose.model('Task', Task)
const Team = mongoose.model('TeamSchema', TeamSchema)

module.exports = { User, TaskModel, Team };
