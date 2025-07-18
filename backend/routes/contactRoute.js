import express from 'express';
import { submitContactForm } from '../controllers/contactController.js'


const contactRouter = express.Router();

contactRouter.post('/message', submitContactForm, (req, res) => {
  res.send("Contact endpoint is live ✅ (expects POST)");
});

export default contactRouter;
