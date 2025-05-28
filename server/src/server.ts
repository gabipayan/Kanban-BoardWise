import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth-routes.js';
import { ticketRouter } from './routes/api/ticket-routes.js';
import { userRouter } from './routes/api/user-routes.js';
import { authenticateToken } from './middleware/auth.js';
import { sequelize } from './db/index.js';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/tickets', authenticateToken, ticketRouter);
app.use('/api/users', authenticateToken, userRouter);

// Initialize database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
