import express from "express";
import authRoute from "../routes/auth.routes.js"
import MessageRoute from "../routes/message.route.js"
import userRoute from "../routes/user.routes.js"

const router = express.Router()

router.use('/auth',authRoute)
router.use('/messages', MessageRoute)
router.use('/users', userRoute)

export default router