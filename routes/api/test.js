import express from "express";
import { getTestConnection } from "../../controllers/test.js";

const router = express.Router();

router.get('/', getTestConnection);

export default router;