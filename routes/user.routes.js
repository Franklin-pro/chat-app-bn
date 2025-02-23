import express from 'express'
import protectRoute from '../middleWare/protectRoute.js'
import { getUsersForSidebar } from '../controllers/user.controller.js'


const router = express.Router()

router.get('/',protectRoute,getUsersForSidebar)

export default router