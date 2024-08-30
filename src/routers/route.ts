import { Router } from "express";
import { measureController } from "../controllers/measureController";
import schemaValidator from "../middleware/schemaValidator";

const router: Router = Router();

router.post('/upload', schemaValidator('/auth/upload'), measureController.update)

router.patch('/confirm', schemaValidator('/auth/confirm'), measureController.confirm)

router.get('/:customer_code/list', measureController.list)

export { router };