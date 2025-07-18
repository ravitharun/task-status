const mongoose = require("mongoose");
console.log("🔍 require is:", typeof require);

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/TaskNet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  Password: { type: String, required: true },
  Profile: { type: String, default: '' },
}, { timestamps: true });

// Task schema
const Task = mongoose.Schema({
  TaskName: { type: String, required: true },
  TaskDescription: { type: String, required: true },
  EstimatedTime: { type: String, required: true },
  Status: { type: String, required: true },
  Type: { type: String, required: true },
  Assignee: { type: String, required: true },
  Add: { type: String },
  Schedule: { type: String, required: true },
  EndSchedule: { type: String, required: true },
  Priority: { type: String, required: true },
}, { timestamps: true });

// Team schema
const TeamSchema = new mongoose.Schema({
  Name: { type: String, default: "Jon Dev" },
  socketId: { type: String },
  members: { type: String },
  status: { type: String, default: 'offline' },
  invitedBy: { type: String, default: "tr55@gmail.com" },
  createdAt: { type: Date, default: Date.now },
});

// Issues schema
const issues = new mongoose.Schema({
  title: { type: String, required: true },
  project: { type: String, required: true },
  assignedTo: { type: String, required: true },
  status: { type: String, default: "Open" },
  description: { type: String, required: true },
  Add: { type: String },
  Name: { type: String, required: true },
}, { timestamps: true });

// Create models
const User = mongoose.model('User', userSchema);
const TaskModel = mongoose.model('Task', Task);
const Team = mongoose.model('Team', TeamSchema);
const Issues = mongoose.model('Issues', issues);

// ✅ CommonJS export
module.exports = { User, TaskModel, Team, Issues };
