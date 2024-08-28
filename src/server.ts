import dotenv from 'dotenv';
import { App } from './app';

dotenv.config()

const PORT = parseInt(`${process.env.PORT || 3000}`)

new App().server.listen(PORT)