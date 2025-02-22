import express from 'express';
import { getMessages, sendMessage } from '../controllers/sendMessage.controller.js';
import protectRoute from '../middleWare/protectRoute.js';

const router = express.Router();

router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id",protectRoute,getMessages);

export default router;