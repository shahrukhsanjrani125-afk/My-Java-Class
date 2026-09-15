#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const start_1 = require("./commands/start");
const create_admin_1 = require("./commands/create-admin");
const seed_1 = require("./commands/seed");
const migrate_1 = require("./commands/migrate");
commander_1.program.name('attendance-cli').description('Attendance CLI').version('1.0.0');
commander_1.program.command('start').description('Start server').option('-p, --port <port>').action(start_1.startCommand);
commander_1.program.command('create-admin').description('Create admin')
    .requiredOption('-e, --email <email>').requiredOption('-p, --password <password>').option('-n, --name <name>', 'Super Admin')
    .action(create_admin_1.createAdminCommand);
commander_1.program.command('seed').description('Seed data').option('-c, --count <count>', '20').action(seed_1.seedCommand);
commander_1.program.command('migrate').description('Run migrations').action(migrate_1.migrateCommand);
commander_1.program.parse(process.argv);
if (!process.argv.slice(2).length)
    commander_1.program.outputHelp();
