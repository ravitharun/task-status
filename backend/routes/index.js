var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var { User, TaskModel, Team, Issues } = require('../bin/Database');
const nodemailer = require("nodemailer");
const http = require("http");
const jwt = require("jsonwebtoken");

const app = require("../app"); // Basic Express app
const server = http.createServer(app);
const { Server } = require("socket.io");
const { log } = require('console');
const SECRET_KEY = process.env.SECRET_KEY;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

require('dotenv').config();
// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. Create middleware function
const logger = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('authHeader,', authHeader)
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1]; // Bearer <token>
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.userId = decoded.userId; // attach userId to request
    next();
  });
};





// Route to handle user signup
// This route handles user registration by accepting user details, validating them, hashing the password, and saving the user to the database. (New user )
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
    res.status(200).json({ message: " Account created successfully!" });
    // Emit the new user data to all clients
    io.emit("TotalTeam", { TotalTeam: user });
    // and also new feature like sending email to the user created
    const message = {
      from: "tr565003@gmail.com",
      to: data.Email,
      subject: "Welcome to TaskNest!",
      text: `Hello ${data.UserName},\n\nThank you for signing up for TaskNest! We're excited to have you on board.\n\nBest regards,\nThe TaskNest Team`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to TaskNest, ${data.UserName}!</h2>
        <p>Thank you for signing up! We're excited to have you on board.</p
        <p>Click the button below to log in and start managing your tasks:</p>
        <a href="http://localhost:5173/login" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color:
  #fff; text-decoration: none; border-radius: 5px;">Log In</a>
        <p>Best regards,<br/>The TaskNest Team</p>
      </div>
    `,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// authentication the user
router.post('/api/Login', async (req, res) => {

  try {
    const { data } = req.body;
    console.log(data)
    if (!data || !data.Email || !data.Password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const user = await User.findOne({ email: data.Email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(data.Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: token,
    });


  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error', error: error.message });
  }
})


router.get('/protected', (req, res) => {
  try {

  } catch (error) {
    res.json({ message: error })
  }
})
// getting user info
router.get('/api/user/', async (req, res) => {
  const { Email } = req.query;
  console.log('Email', Email);

  if (!Email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const User_info = await User.find({ email: Email });
  console.log("User_info", User_info);

  if (!User_info) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ message: User_info, status: 'success' });
})

// Form route to handle form submission
// router.post('/api/Formdata/submit', logger, async (req, res) => {
//   const { } = req.body
//   try {
//     // Handle form submission logic here
//     // For example, save the form data to the database
//     res.status(200).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// })




// Storing the from data and adding the web socket
// POST route: Save task and emit via Socket.IO
router.post("/task/api/Data", async (req, res) => {
  const { data } = req.body;
  console.log(data, 'data')
  if (!data) return res.status(400).json({ message: "No data" });
  const CreatedBy = await User.findOne({ email: data.Add })
  console.log(CreatedBy)
  try {
    const task_Adding = new TaskModel({
      TaskName: data.TaskName,
      TaskDescription: data.TaskDescription,
      EstimatedTime: data.EstimatedTime,
      Status: data.Status,
      Type: data.Type,
      Assignee: data.Assignee,
      Schedule: data.Schedule,
      Add: CreatedBy.name,
      EndSchedule: data.EndSchedule,
      Priority: data.Priority,
    });

    await task_Adding.save();
    console.log('task_Adding', task_Adding)
    // ✅ Emit actual task data to all clients
    io.emit("Taskadded", {
      message: "✅ New task added!  by Your Team Member " + CreatedBy.name,
      data: task_Adding, // the saved task object
    });


    res.status(201).json({ message: task_Adding }); // respond to client
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
    console.log(tasks,"tasks");
    
    res.status(200).json({ message: tasks });
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
    io.emit("taskDeleted", { message: "Task deleted  by Your Team Member" });

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
      io.emit("CheckUSerTeam", { message: `${name} is already part of the team — invited by ${invitedBy}.` });
      return res.status(400).json({ message: "User is already part of a team" });
    }

    // Store the user in the Team collection
    const Store_team = new Team({
      Name: name,
      members: email,
      invitedBy: invitedBy
    });

    await Store_team.save();

    io.emit("AcceptInvite", { message: `${name} is now part of the team! Invited by ${invitedBy}.` });

  } catch (error) {
    console.error("❌ Error saving team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 
router.get("/api/Task/Member", async (req, res) => {
  try {
    // console.log('logger', logger)
    const data = await Team.find({});
    io.emit('TotalTeam', { TotalTeam: data });
    res.json({ message: "Emitted TotalTeam", data });
  } catch (error) {
    res.json({ message: error });
  }
});

// remove team member
router.delete('/api/Task/Member/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    if (!memberId) {
      return res.status(400).json({ message: 'Member ID is required' });
    }
    const remove = await Team.findByIdAndDelete(memberId);
    io.emit('RemoveTeamMember', { message: `Team member with ID ${memberId} has been removed` });

    // Emit the updated team list to all clients

    res.status(200).json({ message: memberId })

  } catch (error) {
    console.log(error, 'error')
  }
})



// adding the issues
router.post('/api/issues', async (req, res) => {

  const { newIssue, userEmail } = req.body;
  if (!newIssue.title || !newIssue.description || !newIssue.project || !newIssue.assignedTo) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const userfind = await User.findOne({ email: userEmail });

  const issue = new Issues({
    title: newIssue.title,
    project: newIssue.project,
    assignedTo: newIssue.assignedTo,
    status: newIssue.status || "Open",
    description: newIssue.description,
    Add: userEmail, // Store the email of the user who created the issue
    Name: userfind.name
  });
  await issue.save()
  io.emit("issueAdded", {
    message: " New Issue added!  by Your Team Member  " + userfind.name,
    newIssue,
    userEmail,
  });


})



// get all issues
router.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issues.find({});
    res.status(200).json({ message: issues });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch issues", error: error.message });
  }
});





// editing the issues
router.get('/api/issues/edit/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }
  let Issues_Data = await Issues.findById({ _id: id });
  if (!Issues_Data) {
    return res.status(404).json({ message: 'Issue not found' });
  }
  res.json({ message: Issues_Data });
})



// Backend: Update issue by ID
router.put("/api/issues/edit/:id", async (req, res) => {
  try {


    const updatedIssue = await Issues.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    // req.body.userEmail
    const User_name = await User.findOne({ email: req.body.userEmail });

    io.emit("issueUpdated", {
      message: `Issue updated successfully by Your Team Member ${User_name.name}`,
    });

    res.status(200).json({ message: "Issue updated successfully", data: updatedIssue });
  } catch (error) {
    console.error("Error in PUT /edit/:id:", error);
    res.status(500).json({ message: "Error updating issue", error: error.message });
  }
});


router.delete('/api/report/delete/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }
  try {
    const deletedIssue = await Issues.findByIdAndDelete(id);
    if (!deletedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    io.emit("issueDeleted", { message: "Issue deleted successfully By Your Team Member" });
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ message: "Failed to delete issue", error: error.message });
  }
});

server.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
module.exports = router;
