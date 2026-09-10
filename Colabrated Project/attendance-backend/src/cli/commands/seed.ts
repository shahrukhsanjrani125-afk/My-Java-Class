import { Command } from 'commander';
import { withDb } from '../utils/db-cli';
import { Institution } from '../../models/Institution';
import { User, UserRole } from '../../models/User';
import { Class } from '../../models/Class';
import { Student } from '../../models/Student';
import { Device } from '../../models/Device';
import { Enrollment } from '../../models/Enrollment';
import logger from '../../config/logger';
import crypto from 'crypto';
export async function seedCommand(options: { count: string }) {
  const studentCount = parseInt(options.count, 10) || 20;
  await withDb(async () => {
    logger.info('Seeding...');
    const inst = await Institution.findOneAndUpdate(
      { code: 'NAVTTC' },
      { name: 'NAVTTC', code: 'NAVTTC', timezone: 'Asia/Karachi', status: 'active' },
      { upsert: true, new: true }
    );
    const instructor = await User.findOneAndUpdate(
      { email: 'instructor@navttc.gov.pk' },
      { institutionId: inst._id, role: UserRole.INSTRUCTOR, name: 'Instructor', email: 'instructor@navttc.gov.pk', passwordHash: 'Temp@123', status: 'active' },
      { upsert: true, new: true }
    );
    const classes = [
      { name: 'Web Dev', code: 'WD101', room: 'Lab1' },
      { name: 'Data Sci', code: 'DS202', room: 'Lab2' }
    ];
    for (const clsData of classes) {
      const cls = await Class.findOneAndUpdate(
        { code: clsData.code },
        {
          institutionId: inst._id,
          name: clsData.name,
          code: clsData.code,
          instructorIds: [instructor._id],
          room: clsData.room,
          timezone: 'Asia/Karachi',
          schedule: { startTime: '09:00', endTime: '12:00', days: ['Mon','Wed','Fri'] },
          status: 'active'
        },
        { upsert: true, new: true }
      );
      for (let i = 1; i <= studentCount; i++) {
        const nic = `42101-${String(i).padStart(6,'0')}-${i%9+1}`;
        const student = await Student.findOneAndUpdate(
          { nicNumber: nic, institutionId: inst._id },
          { institutionId: inst._id, nicNumber: nic, name: `Student ${i}`, status: 'active' },
          { upsert: true, new: true }
        );
        const token = crypto.randomBytes(32).toString('hex');
        const hash = crypto.createHash('sha256').update(token).digest('hex');
        await Device.findOneAndUpdate(
          { studentId: student._id, status: 'active' },
          { institutionId: inst._id, studentId: student._id, deviceTokenHash: hash, status: 'active', registeredAt: new Date(), lastSeenAt: new Date() },
          { upsert: true, new: true }
        );
        await Enrollment.findOneAndUpdate(
          { classId: cls._id, studentId: student._id },
          { classId: cls._id, studentId: student._id, status: 'active', joinedAt: new Date() },
          { upsert: true, new: true }
        );
      }
      logger.info(`Seeded ${studentCount} students for ${cls.name}`);
    }
    logger.info('Seeding complete.');
  });
}
