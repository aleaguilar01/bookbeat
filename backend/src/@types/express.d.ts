import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        spotifyToken:{
          access_token: string,
          refresh_token: string,
        }
      }
    }
  }
}