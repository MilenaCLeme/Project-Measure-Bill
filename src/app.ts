import express from "express";
import { router } from "./routers/route";
import cors from "cors";

export class App {
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(cors())
    this.server.use(express.json({ limit: '10mb' }));
  }

  private router(){
    this.server.use(router);
  }
}