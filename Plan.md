start date --->Mon Jun 09 2025 15:04:03 GMT+0530 (India Standard Time)
-----------------------------------------------✔️------------------------------------------  
Day 1: Project Setup & Initial Planning✔️
• - Decide project scope and features.✔️  
• - Set up the project repository (GitHub).✔️
• - Initialize backend (Node.js + Express) and frontend (React) folders.✔️
• - Install essential dependencies (e.g., Express, Mongoose, React, Socket.IO).✔️
• - Set up MongoDB connection.✔️
-----------------------------------------------✔️-------------------------------------------
Day 2: User Authentication
• - Design New user schema (name, email, password).✔️
• - Design user schema (name, email, password).✔️
• - Implement user registration API.❌
• - Implement user login with JWT authentication.❌
• - Protect routes using JWT middleware.❌
-----------------------------------------------✔️------------------------------------------
Day 3: Board Management Backend
• - Design Board schema (name, description, createdBy, members).
• - Implement API to create a new board.
• - Implement API to fetch boards for a user.
• - Allow adding/removing members to/from boards.
-----------------------------------------------✔️------------------------------------------
Day 4: Frontend Board Components
• - Create React components for listing user boards.
• - Create UI for creating new boards.
• - Show board details and members.
• - Connect frontend with backend APIs for boards.
-----------------------------------------------✔️------------------------------------------
Day 5: Lists (Columns) & Cards Backend
• - Design List schema with reference to Board.
• - Design Card schema with reference to List and assigned user.
• - Create APIs for CRUD operations on lists and cards.
-----------------------------------------------✔️------------------------------------------
Day 6: Frontend Lists & Cards Components
• - Implement drag-and-drop UI for lists and cards (use react-beautiful-dnd).
• - Create UI for adding/editing lists and cards.
• - Connect frontend to backend APIs for lists and cards.
-----------------------------------------------✔️------------------------------------------
Day 7: Real-Time Collaboration with Socket.IO
• - Set up Socket.IO on backend and frontend.
• - Implement user joining board rooms for real-time updates.
• - Emit and listen for events when cards or lists change.
• - Update UI instantly upon receiving events.
-----------------------------------------------✔️------------------------------------------

Day 8: User Invitation via Email
• - Implement API to invite user by email to a board.
• - Check if user exists and add to board members.
• - Use Socket.IO to notify current board members in real-time when someone is added.
-----------------------------------------------✔️------------------------------------------
Day 9: Optional - Email Notifications
• - Set up Nodemailer to send invitation emails.
• - Send email when a user is invited to a board.
• - Test email sending and handling failures.
-----------------------------------------------✔️------------------------------------------
Day 10: Final Testing & Deployment
• - Test all APIs and frontend features thoroughly.
• - Fix bugs and optimize performance.
• - Deploy backend (Heroku, Render, or other).
• - Deploy frontend (Netlify, Vercel, or other).
• - Document setup and usage instructions.
