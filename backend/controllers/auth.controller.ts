import {Request, Response } from "express";
// import * as AuthService from "../services/auth.services.ts";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 
//  Sign up Logic 

export const register = async (req:Request, res:Response)=>{
    const {name,email,password,role} = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

const hashedPassword = await bcrypt.hash(password,10);
const user=await prisma.user.create({
    data:{name, email, password: hashedPassword, role},

});
res.status(201).json({user});

};


//Login Logic 
export const login = async (req:Request,res:Response) => {
    const{email,password}=req.body;

    const user= await prisma.user.findUnique({where:{email}});
if(!user||!user.pasword)
{
    return res.status(401).json({message:"Invalid Credentials"});
}



  const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch)
        {
            return res.status(401).json({message:"Wrong Password "})
};
const token = jwt.sign({
    userId:user.id,role:user.role},
    process.env.JWT_SECRET, {
        expiresIn:"7d"
    }
});



