"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = void 0;
const ticket_js_1 = require("../models/ticket.js");
const user_js_1 = require("../models/user.js");
// GET /tickets
const getAllTickets = async (_req, res) => {
    try {
        const tickets = await ticket_js_1.Ticket.findAll({
            include: [
                {
                    model: user_js_1.User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllTickets = getAllTickets;
// GET /tickets/:id
const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await ticket_js_1.Ticket.findByPk(id, {
            include: [
                {
                    model: user_js_1.User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        if (ticket) {
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTicketById = getTicketById;
// POST /tickets
const createTicket = async (req, res) => {
    const { name, status, description, assignedUserId } = req.body;
    try {
        const newTicket = await ticket_js_1.Ticket.create({ name, status, description, assignedUserId });
        res.status(201).json(newTicket);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createTicket = createTicket;
// PUT /tickets/:id
const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        const ticket = await ticket_js_1.Ticket.findByPk(id);
        if (ticket) {
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            ticket.assignedUserId = assignedUserId;
            await ticket.save();
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateTicket = updateTicket;
// DELETE /tickets/:id
const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await ticket_js_1.Ticket.findByPk(id);
        if (ticket) {
            await ticket.destroy();
            res.json({ message: 'Ticket deleted' });
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteTicket = deleteTicket;
