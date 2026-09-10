#!/usr/bin/env node
import { program } from 'commander';
import { startCommand } from './commands/start';
import { createAdminCommand } from './commands/create-admin';
import { seedCommand } from './commands/seed';
import { migrateCommand } from './commands/migrate';
program.name('attendance-cli').description('Attendance CLI').version('1.0.0');
program.command('start').description('Start server').option('-p, --port <port>').action(startCommand);
program.command('create-admin').description('Create admin')
  .requiredOption('-e, --email <email>').requiredOption('-p, --password <password>').option('-n, --name <name>', 'Super Admin')
  .action(createAdminCommand);
program.command('seed').description('Seed data').option('-c, --count <count>', '20').action(seedCommand);
program.command('migrate').description('Run migrations').action(migrateCommand);
program.parse(process.argv);
if (!process.argv.slice(2).length) program.outputHelp();
