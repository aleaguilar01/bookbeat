import { Request, Response } from "express";

import { prisma } from "../lib/prismaClient";

import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";

interface IAuthRequest {
  email: string;
  profile_picture: string;
  name: string;
}

export interface IJwtPayload extends JwtPayload {
  email: string;
  userId: string;
}

const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET: string = process.env.SPOTIFY_CLIENT_SECRET || '';
const REDIRECT_URI: string = 'http://localhost:5173/login';

const AUTH_URL: string = 'https://accounts.spotify.com/authorize';
const TOKEN_URL: string = 'https://accounts.spotify.com/api/token';
const API_BASE_URL: string = 'https://api.spotify.com/v1/';

export const userAuth = async (req: Request, res: Response) => {
  const { error, code } = req.query;

  if (error) {
    return res.json({ error });
  }

  if (code) {
    const reqBody = {
      code: code as string,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    };

    try {
      // Make a POST request to the Spotify token endpoint to exchange the authorization code for an access token
      const response = await axios.post(TOKEN_URL, new URLSearchParams(reqBody).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Extract token information from the response
      const tokenInfo = response.data;

      const {data} = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + tokenInfo.access_token
        }
      })

      // validate the inputs
      if (!data.email) {
        return res.status(400).send("No email provided");
      }

      let user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      console.log(user);
      

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: data.email,
            provider: "GOOGLE",
            // providerId: data.id
          },
        });
      }
      
      const token = jwt.sign(
        { email: user.email, userId: user.id, spotifyToken: tokenInfo },
        process.env.JWT_SIGN!,
        { expiresIn: "1w" }
      );
    
      // generate a token -> in our middleware to validate that the user is able to use our app
      return res.send({ user: {email: user.email, token: token, name: data.display_name, spotifyToken: tokenInfo} });

    

    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve access token'});
    }
  }

  return res.status(400).json({ error: "No code provided" })


  // const data: IAuthRequest = req.body;
  // // once created or found create jwt token to send to frontend

  
};
