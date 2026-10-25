import express from 'express';
import mongoose from 'mongoose';
import connectdb from './config/db.js';
import registerRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import mailRoutes from './routes/mail.routes.js';
const app = express();

const PORT = 5000;
app.use(express.json());

//mounting routes
app.use('/api/auth', registerRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/mails', mailRoutes);

connectdb();

app.get('/', (req, res) => {
  res.send('ColdMailer API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});