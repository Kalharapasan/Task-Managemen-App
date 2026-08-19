require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Task = require("./models/Task");

const dummyTasks = [
  {
    title: "Setup MongoDB Database & Models",
    description: "Configure Mongoose schemas, connection logic, and model validation rules.",
    status: "Completed",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
  },
  {
    title: "Design Dashboard UI Mockups",
    description: "Create high-fidelity wireframes and modern responsive designs for the task manager dashboard.",
    status: "In Progress",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Build Task REST API Endpoints",
    description: "Develop CRUD API endpoints for tasks including creation, updating, status changes, and deletion.",
    status: "Completed",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 
  },
  {
    title: "Implement User Authentication",
    description: "Add user register/login routes, password hashing with bcrypt, and JWT middleware protection.",
    status: "Pending",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 
  },
  {
    title: "Fix Responsive Layout & Dark Mode",
    description: "Ensure smooth mobile layout adjustments and add seamless dark theme toggle.",
    status: "In Progress",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 
  },
  {
    title: "Write API Documentation & Tests",
    description: "Document REST API endpoints using Swagger/Postman and write backend unit tests.",
    status: "Pending",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
  },
  {
    title: "Deploy Application to Production",
    description: "Configure production environment variables, build scripts, and deploy server and frontend.",
    status: "Pending",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
  },
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing tasks
    await Task.deleteMany({});
    console.log("Existing tasks cleared.");

    // Insert dummy tasks
    const insertedTasks = await Task.insertMany(dummyTasks);
    console.log(`Successfully seeded ${insertedTasks.length} dummy tasks into the database!`);

    // Disconnect and exit
    await mongoose.disconnect();
    console.log("Database disconnected. Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
