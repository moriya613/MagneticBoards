import Router from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed",asyncHandler(
    async (req,res) => {
        const itemCount = await UserModel.countDocuments();
        if(itemCount > 0 ){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed Is Done");
    }
))

router.get("/",asyncHandler(async (req,res) => {
  console.log("inside get all users")
  const users = await UserModel.find();
  res.send(users);
}))

router.post("/login", asyncHandler(
    async (req, res) => {
      console.log("inside login");

      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
  
       if(user) {
        res.send(generateTokenResponse(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("אמייל או סיסמא לא תקינים");
       }
  
    }
  ))

  router.post("/remove", asyncHandler(
    async (req, res) => {
      console.log("remove-user");
      const {email} = req.body;
      try{
        await UserModel.deleteOne({email});
        res.status(200).json({ message: 'User removed successfully' });
        console.log(`User with email '${email}' removed successfully.`);

      } catch(err) {
          res.status(HTTP_BAD_REQUEST).send("Error while removing user");
          console.error('Error while removing user:', err);
      }
      
    }));

  router.post('/register', asyncHandler(
    
    async (req, res) => {
      console.log("inside register");
     

        const {name, email, password, address, schoolName, schoolCode, grade , charactter, role} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
          console.log("user exist");
            res.status(HTTP_BAD_REQUEST)
            .send ('משתמש קיים , אנא התחבר');
            return;
        }

        if(role=="teacher"){
          const user = await UserModel.findOne({schoolCode, role:"admin"});
          if(!user){
            console.log("school code not exist");
            res.status(HTTP_BAD_REQUEST)
            .send ('קוד מוסד לא קיים במערכת');
            return;
          }

        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser:User = {
            id:'',
            name,
            email:email.toLowerCase(),
            password: encryptedPassword,
            address,
            role:role,
            schoolCode:schoolCode,
            schoolName:schoolName,
            grade:grade,
            charactter:charactter,
            isSuperAdmin:false
        }

        console.log("creating a user")
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
  ))
  
    const generateTokenResponse = (user : User) => {
      const token = jwt.sign({
        id:user.id, email:user.email, isAdmin: user.isSuperAdmin
      },process.env.JWT_SECRET!,{
        expiresIn:"30d"
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        schoolName: user.schoolName,
        schoolCode: user.schoolCode,
        grade: user.grade,
        character: user.charactter,
        role: user.role,
        isSuperAdmin: user.isSuperAdmin,
        token: token
      };
    }


export default router;

