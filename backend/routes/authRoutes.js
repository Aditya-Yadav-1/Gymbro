const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const verifyuser = require('./Middleware/verifyuser');
const Admin = require('../Models/admin');
const JWT_SECRET = process.env.JWT_SECRET;

// Route 1 for making a new user using POST request. Doesn't require Login
router.post('/createAdmin' ,async (req, res)=>{

    try {
        let success = false;
        let admin = await Admin.findOne({email : req.body.email});
        if(admin){
            return res.status(400).json({success, error: "user already exists"});
        }

        var salt = await bcrypt.genSalt(10);
        var secpass = await bcrypt.hash(req.body.password, salt);

        req.body.password = secpass;
        admin = Admin(req.body);
        await admin.save();
        
        data = {
            Admin:{
                id: admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success , authtoken});

    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// Route 2 for loging in a user using POST request. Doesn't require Login
router.post('/login', async (req,res)=>{
    
    try {
        let success = false;
        let {email, password} = req.body

        let admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({success, error: "User doesn't exist. Signup"});
        }

        let passcheck = await bcrypt.compare(password, admin.password);
        if(!passcheck){
            return res.status(400).json({success, error: "Wrong Id or Password"});
        }

        data = {
            Admin:{
                id: admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
        
    } catch (error) {
        // console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
})

// Route 3 for getting  admin details after login using POST request.
router.post('/getAdmin', verifyuser, async (req,res)=>{
    const adminId = req.Admin.id;
    const admin = await Admin.findById(adminId).select('-password');
    res.send(admin);
})

module.exports = router;