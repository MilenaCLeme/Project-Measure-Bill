import dotenv from 'dotenv';

dotenv.config()

export const PORT: number = parseInt(`${process.env.PORT || 3000}`);
export const GEMINI_API_KEY: string = `${process.env.GEMINI_API_KEY || ''}`; 
export const MODEL_GEMINI: string = `${process.env.MODEL_GEMINI || ''}`
export const HOST_BACKEND: string = `${process.env.HOST_BACKEND || ''}`
