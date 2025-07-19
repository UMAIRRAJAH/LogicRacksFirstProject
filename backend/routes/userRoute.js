import express from 'express';


import { loginUser,adminLogin,registerUser } from '../controllers/userController.js';
import { verifyUser } from '../middleware/verifyUser.js';

const userRouter=express.Router();
userRouter.post('/register',verifyUser,registerUser);
userRouter.post('/login',verifyUser,loginUser);
userRouter.post('/admin',verifyUser,adminLogin);

export default userRouter;