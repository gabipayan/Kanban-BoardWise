"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_js_1 = require("../db/index.js");
const router = (0, express_1.Router)();
// POST /login - Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await index_js_1.db.one('SELECT * FROM users WHERE username = $1', [username]);
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
exports.default = router;
