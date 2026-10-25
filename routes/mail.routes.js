import express from "express";
import {generateColdEmails} from "../services/mail.service.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {getMyEmails, getEmailById, deleteEmail, sendMail} from "../controller/mail.controller.js";
import {updateEmail} from "../controller/mail.controller.js";

const router = express.Router();

router.post('/generate', authMiddleware, generateColdEmails);
router.get('/', authMiddleware, getMyEmails);
router.get('/:id', authMiddleware, getEmailById);
router.put('/:id', authMiddleware, updateEmail);
router.delete('/:id', authMiddleware, deleteEmail);
router.post('/send', authMiddleware, sendMail);

export default router;