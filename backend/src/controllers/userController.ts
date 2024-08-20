import { Request, Response } from "express";

import { prisma } from '../lib/prismaClient'

import jwt from 'jsonwebtoken';

interface IAuthRequest {
    email: string,
    profile_picture: string,
    name: string
};

export const userAuth = async (req: Request, res: Response) => {
  const data: IAuthRequest = req.body;

  // validate the inputs
  if (!data.email) {
    return res.status(400).send("No email provided")
  }

  let user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: data.email,
        provider: 'GOOGLE',
        profilePicture: data.profile_picture
      }
    })
  }

  // once created or found create jwt token to send to frontend

  const token = jwt.sign({email: user.email}, 'my secret password', {expiresIn: '1w'})

  
  // generate a token -> in our middleware to validate that the user is able to use our app
  res.send({token: token})
}