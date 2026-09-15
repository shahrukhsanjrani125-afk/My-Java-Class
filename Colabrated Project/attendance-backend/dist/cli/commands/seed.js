"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCommand = seedCommand;
const db_cli_1 = require("../utils/db-cli");
const Institution_1 = require("../../models/Institution");
const User_1 = require("../../models/User");
const Class_1 = require("../../models/Class");
const Student_1 = require("../../models/Student");
const Device_1 = require("../../models/Device");
const Enrollment_1 = require("../../models/Enrollment");
const logger_1 = __importDefault(require("../../config/logger"));
const crypto_1 = __importDefault(require("crypto"));
async function seedCommand(options) {
    const studentCount = parseInt(options.count, 10) || 20;
    await (0, db_cli_1.withDb)(async () => {
        logger_1.default.info('Seeding...');
        const inst = await Institution_1.Institution.findOneAndUpdate({ code: 'NAVTTC' }, { name: 'NAVTTC', code: 'NAVTTC', timezone: 'Asia/Karachi', status: 'active' }, { upsert: true, new: true });
        const instructor = await User_1.User.findOneAndUpdate({ email: 'instructor@navttc.gov.pk' }, { institutionId: inst._id, role: User_1.UserRole.INSTRUCTOR, name: 'Instructor', email: 'instructor@navttc.gov.pk', passwordHash: 'Temp@123', status: 'active' }, { upsert: true, new: true });
        const classes = [
            { name: 'Web Dev', code: 'WD101', room: 'Lab1' },
            { name: 'Data Sci', code: 'DS202', room: 'Lab2' }
        ];
        for (const clsData of classes) {
            const cls = await Class_1.Class.findOneAndUpdate({ code: clsData.code }, {
                institutionId: inst._id,
                name: clsData.name,
                code: clsData.code,
                instructorIds: [instructor._id],
                room: clsData.room,
                timezone: 'Asia/Karachi',
                schedule: { startTime: '09:00', endTime: '12:00', days: ['Mon', 'Wed', 'Fri'] },
                status: 'active'
            }, { upsert: true, new: true });
            for (let i = 1; i <= studentCount; i++) {
                const nic = `42101-${String(i).padStart(6, '0')}-${i % 9 + 1}`;
                const student = await Student_1.Student.findOneAndUpdate({ nicNumber: nic, institutionId: inst._id }, { institutionId: inst._id, nicNumber: nic, name: `Student ${i}`, status: 'active' }, { upsert: true, new: true });
                const token = crypto_1.default.randomBytes(32).toString('hex');
                const hash = crypto_1.default.createHash('sha256').update(token).digest('hex');
                await Device_1.Device.findOneAndUpdate({ studentId: student._id, status: 'active' }, { institutionId: inst._id, studentId: student._id, deviceTokenHash: hash, status: 'active', registeredAt: new Date(), lastSeenAt: new Date() }, { upsert: true, new: true });
                await Enrollment_1.Enrollment.findOneAndUpdate({ classId: cls._id, studentId: student._id }, { classId: cls._id, studentId: student._id, status: 'active', joinedAt: new Date() }, { upsert: true, new: true });
            }
            logger_1.default.info(`Seeded ${studentCount} students for ${cls.name}`);
        }
        logger_1.default.info('Seeding complete.');
    });
}
