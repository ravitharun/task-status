# 🚀 Project Management App

A robust and collaborative **MERN Stack**-based project management platform that empowers teams to create, track, and manage tasks efficiently with real-time updates, smart notifications, and visual insights.

---

## 📌 Features

- ✅ **Add & Manage Projects** – Create projects with title, description, tech stack, and timelines.
- 🟢 **Status & Priority Filtering** – Mark projects as Completed (green) or Pending (red), and filter by priority.
- 📊 **Progress Tracking** – Visual indicators with progress bars.
- 📩 **Email-Based Task Assignment** – Assign tasks via email and share work details using integrated forms.
- 🔔 **Smart Alerts** – Get instant toast or modal alerts using React-Toastify and SweetAlert2.
- 🔐 **JWT Authentication** – Secure user login with token-based sessions.
- 🔍 **Real-time Issue Reporting** – Report bugs or raise issues instantly using WebSocket-based updates.
- 📅 **Task Calendar View** – View tasks by date, including deadlines and important milestones.
- 📨 **Email Notification System** – Keep team members informed on status and due date updates.
- 📈 **Analytics Dashboard** – Visual insights on project metrics.

---

## 🛠️ Tech Stack

| Frontend          | Backend       | Database   | Others                             |
|------------------|---------------|------------|------------------------------------|
| React.js          | Node.js       | MongoDB    | Express.js, Tailwind CSS           |
| React Router DOM  | Mongoose      | -          | React Toastify, SweetAlert2, AOS   |

---

## 📁 Folder Structure

<p>
  <strong>📂 Project Folder Structure</strong><br/>
  <img width="115" height="677" alt="Project Folder Structure" src="https://github.com/user-attachments/assets/4cf13fd3-251d-48f6-a6b6-86d18af244a4" />
</p>

<p>
  This folder structure illustrates how the app is organized for scalability and modularity, separating logic for components, routes, services, and assets.
</p>

---

## 📷 Screenshots

<p>
  <strong>1. Send Invite to Project Group</strong><br/>
  <img width="1066" height="506" alt="Sending email to join in the Project Group" src="https://github.com/user-attachments/assets/93bb3f3e-b4d5-4157-b802-d11cf3218e30" />
</p>

<p>
  <strong>2. Task Page Overview</strong><br/>
  <img width="1363" height="647" alt="Task Page Overview" src="https://github.com/user-attachments/assets/15745b6d-b59a-4579-a674-402bae905c20" />
</p>

<p>
  <strong>3. Task Creation Form</strong><br/>
  <img width="826" height="644" alt="Task Creation Form" src="https://github.com/user-attachments/assets/9772a1e4-79ef-4bcd-8557-b9cb107163ce" />
</p>

<p>
  <strong>4. Calendar View with Task Deadlines</strong><br/>
  <img width="1366" height="650" alt="Calendar View with Task Deadlines" src="https://github.com/user-attachments/assets/a45b172c-907d-49a8-a64e-34ab4644c05a" />
</p>

<p>
  <strong>5. Project Summary Dashboard</strong><br/>
  <img width="1366" height="721" alt="Project Tasks Summary" src="https://github.com/user-attachments/assets/a58374f7-7d8b-42c9-b13a-d992f980ae5f" />
</p>

<p>
  <strong>6. Real-time Issues & Reports Page</strong><br/>
  <img width="1363" height="648" alt="Real-time Issues & Reports" src="https://github.com/user-attachments/assets/67de198a-18ce-49f2-a238-3c4d81d893e0" />
</p>

<p>
  <strong>7. Login Page with Role-Based Access & JWT Authentication</strong><br/>
  <img width="385" height="509" alt="Login Page" src="https://github.com/user-attachments/assets/57531935-12b2-4073-bc33-d8941823c5d1" />
</p>

<p>
  <strong>🔐 Firebase Google Authentication</strong><br/>
  <img width="452" height="90" alt="Firebase Google Authentication" src="https://github.com/user-attachments/assets/c84d6aa0-d306-457d-aa6f-e1073e7c99d5" />
</p>

<p>
  Integrated Firebase Google Sign-In in both the <strong>Sign In</strong> and <strong>Sign Up</strong> pages for a seamless and secure login experience.
</p>

---

## 🔮 Upcoming Features

- 🕒 **Live Time Display** – Real-time clock to improve time-based tracking.
- 📤 **Export Reports/CSV** – Export project and task reports.
- 📱 **Mobile-Friendly UI** – Fully responsive design for smaller screens.
- 🔍 **Search & Sorting Features** – Filter tasks/projects with search and sort controls.
- 🗂️ **Category-Based Grouping** – Organize tasks/projects by teams, departments, or tags.
- 📎 **File Attachments for Tasks** – Add documents/resources to individual tasks.
- 🗒️ **Note Taking Feature** – Add important notes like meeting reminders or task deadlines.
- 📨 **Due Date Email Notifications** – Auto-reminders sent via email on approaching deadlines.

---

## 📌 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/project-management-app.git
cd project-management-app

# Install frontend dependencies
cd client
npm install
npm start

# Install backend dependencies
cd ../server
npm install
npm run dev
