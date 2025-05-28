"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_seeds_js_1 = require("./user-seeds.js");
const ticket_seeds_js_1 = require("./ticket-seeds.js");
const index_js_1 = require("../models/index.js");
const seedAll = async () => {
    try {
        await index_js_1.sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await (0, user_seeds_js_1.seedUsers)();
        console.log('\n----- USERS SEEDED -----\n');
        await (0, ticket_seeds_js_1.seedTickets)();
        console.log('\n----- TICKETS SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedAll();
