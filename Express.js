const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Crack:Crack@crackit.sqvqpyt.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    uname : String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);


// Admin Schema
const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const Admin = mongoose.model("Admin", AdminSchema);



app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ uname, email, password });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully!" });
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ success: true, message: "Login Successful" });
    } else {
        res.json({ success: false, message: "Invalid Credentials" });
    }
});

// Admin Registration
app.post("/admin/register", async (req, res) => {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin Registered Successfully!" });
});

// Admin Login
app.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    
    if (admin) {
        res.json({ success: true, message: "Admin Login Successful" });
    } else {
        res.json({ success: false, message: "Invalid Admin Credentials" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

