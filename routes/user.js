//USER SIGNUP LOGIN

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/user");

const { Router } = require("express");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    
    try {
        const payload = req.body;
        const user = await UserModel.findOne({ email: payload.email });
        if (user) {
            return res.send({ "msg": "Please login,user already exist" });
        } else {
            //encrypting password
            const hashPassword = await bcrypt.hashSync(payload.password, 8);
            payload.password = hashPassword;

            const newUser = new UserModel(payload);
            await newUser.save();

            return res.json({ "msg": "User registerd.", user: newUser });
        }
    } catch (error) {
        res.send({ "msg": error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    //console.log(process.env.JWT_SECRET_KEY)
    // try {
    //     const payload = req.body;
    //     const user = await UserModel.findOne({ email: payload.email });
    //     if (!user) {
    //         //password verification
    //         const isPasswordCorrect = await bcrypt.compareSync(
    //             payload.password,
    //             user.password
    //         );
    //         if (isPasswordCorrect) {
    //             //jwt generation
    //             //COMPLETE BELOW JWT PART
    //             const token = jwt.sign({userId: user[0]._id},'masai')
    //             // const token = await jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET_KEY)
    //             res.send({ "msg": "Login success", token });
    //         } else {
    //             res.send({ "msg": "Invalid credentials" });
    //         }
    //     }
    // } catch (error) {
    //     res.send(error.message);

    // }
    try{
        const {email,password} = req.body
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(result){
                    const token = jwt.sign({userId: user[0]._id},process.env.JWT_SECRET_KEY,{ expiresIn: 60 * 60 })
                    res.send({"msg":"Login Successful","token":token})
                }
                else {
                    res.send({"msg":"Wrong Credentials"})
                }
            })
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
});

module.exports = { userRouter }