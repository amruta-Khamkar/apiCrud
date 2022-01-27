const express = require('express');
const fs = require('fs');
const router = express.Router();
const mongoose = require('mongoose');
const connectDb=require('../config/db')
const {getEmp,postEmp,delEmp,updateEmp,login}= require('../controller/empController')
connectDb();
const empModel=require('../db/empSchema')
const { body, validationResult,check} = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";

const autenticateToken=async(req, res, next) =>{
    const authHeader = await req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]
    console.log(token+"/////////")
    if (token== null) {
        res.json({ "err": 1, "msg": "Token is null" })
    }
    else {
       
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token is incorrect" })
            }
            else {
                console.log("match")
                next();
            }
        })
    }
}
router.get('/getemp', autenticateToken,async(req, res) => {
    res.send(await getEmp())
    console.log("hie")
})

router.post("/login",body('email').isEmail().normalizeEmail(),  check('password', 'The password must be 5+ chars long and contain a number')
.not()
.isIn(['123', 'password', 'god'])
.withMessage('Do not use a common word as the password')
.isLength({ min: 5 })
.matches(/\d/),(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let payload = {
        uid: email
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
    login(email, password)
    res.send({ "err": 0, "msg": "Login Success", "token": token })
})


router.post('/postemp' ,autenticateToken, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0] );
    }
    postEmp(req.body)
    res.send("added")
})
router.delete('/delemp/:id', autenticateToken,(req, res) => {
    const id=req.params.id;
    delEmp(id)
    res.send("deleted")
})
router.put('/updateemp/:id',autenticateToken, (req, res) => {
   const id=req.params.id;
 updateEmp(id,req.body)
 res.send("updated")
})

module.exports = router;