var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var { User, TaskModel, Team } = require('../bin/Database');
const nodemailer = require("nodemailer");
require('dotenv').config();
const http = require("http");
const app = require("../app"); // Basic Express app
const server = http.createServer(app);
const { Server } = require("socket.io");
const SECRET_KEY = process.env.SECRET_KEY;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    return res.status(400).json({ message: 'Email is required' });
  }
  const User_info = await User.findOne({ email: Email });
  if (!User_info) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ message: User_info, status: 'success' });
})

// Form route to handle form submission
router.post('/api/Formdata/submit', async (req, res) => {
  const { } = req.body
  try {
    // Handle form submission logic here
    // For example, save the form data to the database
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})



// Storing the from data and adding the web socket
// POST route: Save task and emit via Socket.IO
router.post("/task/api/Data", async (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ message: "No data" });

  try {
    const task_Adding = new TaskModel({
      TaskName: data.TaskName,
      TaskDescription: data.TaskDescription,
      EstimatedTime: data.EstimatedTime,
      Status: data.Status,
      Type: data.Type,
      Assignee: data.Assignee,
      Schedule: data.Schedule,
      EndSchedule: data.EndSchedule,
      Priority: data.Priority,
    });

    await task_Adding.save();

    // ✅ Emit actual task data to all clients
    io.emit("Taskadded", {
      message: "✅ New task added!",
      data: task_Adding, // the saved task object
    });


    res.status(201).json(task_Adding); // respond to client
  } catch (error) {
    console.error("❌ Error saving task:", error);
    res.status(500).json({ message: "Failed to save task", error: error.message });
  }
});



// get all task Information 
// GET route: Return all tasks cleanly
router.get('/TaskAll/api', async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json({ message: tasks }); // ✅ return as array
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
});

// deleting the task 
router.get("/api/task/Remove", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    io.emit("taskDeleted", { message: "Task deleted by Tharun" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// edit the task implementation 
router.put("/api/Task/edit", async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.json({ message: "The id Is Null" })
    }
    const GetData_Id = await TaskModel.find({ _id: id })
    res.json({ message: GetData_Id })
  }
  catch (err) {

  }
})


// send requesting through email 
router.post("/api/taskadd/email", async (req, res) => {
  const { Email, decryptedEmail } = req.body;
  console.log({ user_email: Email, decryptedEmail: decryptedEmail })
  if (!Email) {
    return res.status(404).json({ message: "Email No't got" })
  }
  const FindUser = await User.findOne({ email: Email })
  if (!FindUser) {

    return res.json({ message: 'No user found !' })



  }
  // here email part sending
  const inviteUrl = `http://192.168.238.17:3000/accept-invite?email=${Email}&invited=${decryptedEmail}`;


  const message = {
    from: "tr565003@gmail.com",
    to: FindUser.email,
    subject: "🎉 You're Invited to Join the TaskNest Team!",

    // Plain text fallback for email clients that do not support HTML
    text: `Hello ${FindUser.name || "there"},\n\nYou've been invited to join the TaskNest team.\nClick the link below to get started:\nhttps://your-frontend-url.com/login\n\nWelcome aboard!`,

    // HTML content for modern email clients
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>👋 Hello ${FindUser.name || "there"},</h2>
      <p>You’ve been invited to join <strong>TaskNest</strong>, your new project and task management tool.</p>
      <p>Click the button below to get started:</p>
<a href="${inviteUrl}">
  Accept Invitation
</a>

      <p style="margin-top: 20px;">If you didn’t request this, you can safely ignore this email.</p>
      <p>Cheers,<br/>The TaskNest Team</p>
    </div>
  `,
    // AMP4Email content (optional, for clients that support AMP)
    amp: `
    <!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <h2>👋 You're Invited to TaskNest!</h2>
        <p>Click below to join the team and start collaborating:</p>
        <p>
  
<a href="https://beamish-biscotti-b8559d.netlify.app/accept-invite?email=${FindUser.email}">
  Accept Invitation
</a>



 

        </p>
        <p>Here's a fun gif for you:</p>
        <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"></amp-anim>
      </body>
    </html>
  `
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error("Email error:", error);
    } else {
      return res.status(200).json({ message: 'Email sent:'.toUpperCase() })
    }
  });

})

// email
router.get('/accept-invite', async (req, res) => {
  try {
    const email = req.query.email;
    const invitedBy = req.query.invited;

    // Find the user by email
    const GetUser = await User.findOne({ email });
    if (!GetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const name = GetUser.name;

    // Check if user is already part of a team
    const isAlreadyInTeam = await Team.findOne({ members: email });
    if (isAlreadyInTeam) {
      io.emit("CheckUSerTeam", { message: `Your Team member Is already Exits ${name}` });
      return res.status(400).json({ message: "User is already part of a team" });
    }

    // Store the user in the Team collection
    const Store_team = new Team({
      Name: name,
      members: email,
      invitedBy: invitedBy
    });

    await Store_team.save();

    io.emit("AcceptInvite", { message: `Your Team member accepted ${name}` });

  } catch (error) {
    console.error("❌ Error saving team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 
router.get("/api/Task/Member", async (req, res) => {
  try {

    const data = await Team.find({});
    io.emit('TotalTeam', { TotalTeam: data });
    res.json({ message: "Emitted TotalTeam", data });
  } catch (error) {
    res.json({ message: error });
  }
});


server.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
module.exports = router;
