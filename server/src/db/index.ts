import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { UserFactory } from '../models/user.js';
import { TicketFactory } from '../models/ticket.js';

// Load environment variables
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'kanban_db',
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || '5432'),
  logging: false
});

// Initialize models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define associations
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });

export { sequelize, User, Ticket }; 