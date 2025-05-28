import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/index.js';

const router = Router();

// POST /login - Login a user
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log('Login attempt for username:', username);

  try {
    const user = await User.findOne({ where: { username } });
    console.log('Database query result:', user);
    
    if (!user) {
      console.log('No user found with username:', username);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const validPassword = await user.verifyPassword(password);
    console.log('Password validation result:', validPassword);
    
    if (!validPassword) {
      console.log('Invalid password for user:', username);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', username);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export { router as authRouter };
