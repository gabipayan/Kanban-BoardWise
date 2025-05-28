"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const pgp = (0, pg_promise_1.default)();
if (!process.env.DB_USER) {
    console.error('Environment variables:', {
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        NODE_ENV: process.env.NODE_ENV
    });
    throw new Error('Database user not found in environment variables');
}
const config = {
    host: 'localhost',
    port: 5432,
    database: 'kanban_db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '', // Allow empty password
};
exports.db = pgp(config);
