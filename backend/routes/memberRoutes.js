const express = require('express');
const verifyuser = require('./Middleware/verifyuser');
const { body, validationResult } = require("express-validator");
const Member = require('../Models/member');
const Admin = require('../Models/admin');
const router = express.Router();

// Route 1: Create new Member using POST request. 
router.post('/addMember', verifyuser, async (req,res)=>{
    try {
        let success = false;

        const member = Member(req.body);
        const already_existing_member = await Member.findOne({phone_no: member.phone_no});
        if(already_existing_member){
            return res.status(400).json({success, error: "Member already exists" });
        }

        member.admin = req.Admin.id;
        await member.save();
        
        let adminId = req.Admin.id;
        await Admin.updateOne(
            {_id : adminId},
            {$push: {MemberList: member}}
        )

        success = true;
        res.json({success, message:"Member Added Successfully"});
    } catch (error) {
        // console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Get all members of tokenised Admin using GET request
router.get('/getmembers', verifyuser, async (req,res)=>{
    
    try {
        let adminId = req.Admin.id;
        const admin = await Admin.findById(adminId);
        const members = await Member.find({
            _id : {$in : admin.MemberList}
        })
        res.send(members);
    } catch (error) {
        // console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
})

//Route 3: Delete Member from database using DELETE request.
router.delete("/deleteMember/:id", verifyuser, async (req, res)=>{
    try {
        const member = await Member.findById(req.params.id);
        const adminId = req.Admin.id;
        let success = false;

        if(!member){
            return res.status(404).json({success, error: "Member doesn't exist"});
        }

        if(member.admin.toString() !== req.Admin.id){
            return res.status(401).send({success, error: "Not allowed"});
        }

        await Admin.updateOne( // remove from Admin cluster
            { _id: adminId }, 
            { $pull: { MemberList: req.params.id } }
        );
        await Member.findByIdAndDelete(req.params.id); // remove from Member cluster
        success = true;
        res.json({ success, message: "Member Deleted Successfully" });
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//Route 4: Update Member (date) from database using PUT request.
router.put('/updateMember/:id', verifyuser, async (req, res)=>{
    try {
        let member = await Member.findById(req.params.id);
        let success = false;

        if (!member) {
        return res.status(404).json({success, error:"Note doesn't exist"});
        }

        if (member.admin.toString() !== req.Admin.id) {
        return res.status(401).json({success, error:"Access Denied"});
        }

        const {name, phone_no, email, fee_paid_date} = req.body;

        if(name){
            await Member.findByIdAndUpdate({_id : req.params.id}, {name}, {new: true})
        }
        if(phone_no){
            await Member.findByIdAndUpdate({_id : req.params.id}, {phone_no}, {new: true})
        }
        if(email){
            await Member.findByIdAndUpdate({_id : req.params.id}, {email}, {new: true})
        }
        if(fee_paid_date){
            await Member.findByIdAndUpdate({_id : req.params.id}, {fee_paid_date}, {new: true})
        }
        success = true;
        res.json({success, message: "Member Updated Successfully"});
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router