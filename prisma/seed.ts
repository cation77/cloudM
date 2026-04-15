import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { id: '1' }, update: {}, create: { id: '1', name: '安全生产' } }),
    prisma.tag.upsert({ where: { id: '2' }, update: {}, create: { id: '2', name: '职业健康' } }),
    prisma.tag.upsert({ where: { id: '3' }, update: {}, create: { id: '3', name: '消防培训' } }),
    prisma.tag.upsert({ where: { id: '4' }, update: {}, create: { id: '4', name: '管理培训' } }),
    prisma.tag.upsert({ where: { id: '5' }, update: {}, create: { id: '5', name: '入职培训' } }),
    prisma.tag.upsert({ where: { id: '6' }, update: {}, create: { id: '6', name: '技能提升' } }),
  ]);

  const companies = await Promise.all([
    prisma.company.upsert({ where: { id: '1' }, update: {}, create: { id: '1', name: '华创科技有限公司', contact: '张经理', phone: '13800001111', address: '北京市朝阳区建国路88号' } }),
    prisma.company.upsert({ where: { id: '2' }, update: {}, create: { id: '2', name: '恒达制造集团', contact: '李总', phone: '13800002222', address: '上海市浦东新区世纪大道100号' } }),
    prisma.company.upsert({ where: { id: '3' }, update: {}, create: { id: '3', name: '新锐软件科技', contact: '王总监', phone: '13800003333', address: '深圳市南山区科技园路66号' } }),
    prisma.company.upsert({ where: { id: '4' }, update: {}, create: { id: '4', name: '鼎盛物流有限公司', contact: '赵经理', phone: '13800004444', address: '广州市天河区天河路200号' } }),
  ]);

  await Promise.all([
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '1', tagId: '1' } }, update: {}, create: { companyId: '1', tagId: '1' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '1', tagId: '2' } }, update: {}, create: { companyId: '1', tagId: '2' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '2', tagId: '1' } }, update: {}, create: { companyId: '2', tagId: '1' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '2', tagId: '3' } }, update: {}, create: { companyId: '2', tagId: '3' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '3', tagId: '4' } }, update: {}, create: { companyId: '3', tagId: '4' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '3', tagId: '6' } }, update: {}, create: { companyId: '3', tagId: '6' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '4', tagId: '3' } }, update: {}, create: { companyId: '4', tagId: '3' } }),
    prisma.companyTag.upsert({ where: { companyId_tagId: { companyId: '4', tagId: '4' } }, update: {}, create: { companyId: '4', tagId: '4' } }),
  ]);

  const teachers = await Promise.all([
    prisma.teacher.upsert({ where: { id: '1' }, update: {}, create: { id: '1', name: '陈明华', specialty: '安全生产', phone: '13900001111', email: 'chenmh@example.com' } }),
    prisma.teacher.upsert({ where: { id: '2' }, update: {}, create: { id: '2', name: '刘晓燕', specialty: '职业健康', phone: '13900002222', email: 'liuxy@example.com' } }),
    prisma.teacher.upsert({ where: { id: '3' }, update: {}, create: { id: '3', name: '张伟强', specialty: '消防培训', phone: '13900003333', email: 'zhangwq@example.com' } }),
    prisma.teacher.upsert({ where: { id: '4' }, update: {}, create: { id: '4', name: '李秀英', specialty: '管理培训', phone: '13900004444', email: 'lixy@example.com' } }),
  ]);

  await Promise.all([
    prisma.teacherTag.upsert({ where: { teacherId_tagId: { teacherId: '1', tagId: '1' } }, update: {}, create: { teacherId: '1', tagId: '1' } }),
    prisma.teacherTag.upsert({ where: { teacherId_tagId: { teacherId: '1', tagId: '3' } }, update: {}, create: { teacherId: '1', tagId: '3' } }),
    prisma.teacherTag.upsert({ where: { teacherId_tagId: { teacherId: '2', tagId: '2' } }, update: {}, create: { teacherId: '2', tagId: '2' } }),
    prisma.teacherTag.upsert({ where: { teacherId_tagId: { teacherId: '3', tagId: '3' } }, update: {}, create: { teacherId: '3', tagId: '3' } }),
    prisma.teacherTag.upsert({ where: { teacherId_tagId: { teacherId: '4', tagId: '4' } }, update: {}, create: { teacherId: '4', tagId: '4' } }),
    prisma.teacherTag.upsert({ where: { teacherId_tagId: { teacherId: '4', tagId: '6' } }, update: {}, create: { teacherId: '4', tagId: '6' } }),
  ]);

  const trainings = await Promise.all([
    prisma.trainingRecord.upsert({ where: { id: '1' }, update: {}, create: { id: '1', companyId: '1', teacherId: '1', title: '2024年度安全生产培训', date: '2024-03-15', description: '企业全员安全生产知识培训' } }),
    prisma.trainingRecord.upsert({ where: { id: '2' }, update: {}, create: { id: '2', companyId: '1', teacherId: '2', title: '职业健康防护培训', date: '2024-04-20', description: '职业病防护与健康管理培训' } }),
    prisma.trainingRecord.upsert({ where: { id: '3' }, update: {}, create: { id: '3', companyId: '2', teacherId: '1', title: '新员工安全入职培训', date: '2024-05-10', description: '新入职员工安全知识培训' } }),
    prisma.trainingRecord.upsert({ where: { id: '4' }, update: {}, create: { id: '4', companyId: '2', teacherId: '3', title: '消防安全演练培训', date: '2024-06-18', description: '消防器材使用与应急疏散演练' } }),
    prisma.trainingRecord.upsert({ where: { id: '5' }, update: {}, create: { id: '5', companyId: '3', teacherId: '4', title: '中层管理能力提升培训', date: '2024-07-22', description: '中层管理人员领导力培训' } }),
    prisma.trainingRecord.upsert({ where: { id: '6' }, update: {}, create: { id: '6', companyId: '3', teacherId: '2', title: '办公环境健康培训', date: '2024-08-05', description: '办公室职业健康与人体工学培训' } }),
    prisma.trainingRecord.upsert({ where: { id: '7' }, update: {}, create: { id: '7', companyId: '4', teacherId: '3', title: '仓储消防安全培训', date: '2024-09-12', description: '仓储区域消防安全隐患与预防' } }),
    prisma.trainingRecord.upsert({ where: { id: '8' }, update: {}, create: { id: '8', companyId: '4', teacherId: '4', title: '团队管理培训', date: '2024-10-08', description: '团队建设与管理技能培训' } }),
  ]);

  await Promise.all([
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '1', tagId: '1' } }, update: {}, create: { trainingId: '1', tagId: '1' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '2', tagId: '2' } }, update: {}, create: { trainingId: '2', tagId: '2' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '3', tagId: '1' } }, update: {}, create: { trainingId: '3', tagId: '1' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '3', tagId: '5' } }, update: {}, create: { trainingId: '3', tagId: '5' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '4', tagId: '3' } }, update: {}, create: { trainingId: '4', tagId: '3' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '5', tagId: '4' } }, update: {}, create: { trainingId: '5', tagId: '4' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '5', tagId: '6' } }, update: {}, create: { trainingId: '5', tagId: '6' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '6', tagId: '2' } }, update: {}, create: { trainingId: '6', tagId: '2' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '7', tagId: '3' } }, update: {}, create: { trainingId: '7', tagId: '3' } }),
    prisma.trainingTag.upsert({ where: { trainingId_tagId: { trainingId: '8', tagId: '4' } }, update: {}, create: { trainingId: '8', tagId: '4' } }),
  ]);

  const documents = await Promise.all([
    prisma.document.create({ data: { id: '1', trainingId: '1', name: '安全生产培训大纲.pdf', type: 'PDF', size: '2.3MB', uploadDate: '2024-03-10' } }),
    prisma.document.create({ data: { id: '2', trainingId: '1', name: '安全培训签到表.xlsx', type: 'Excel', size: '156KB', uploadDate: '2024-03-15' } }),
    prisma.document.create({ data: { id: '3', trainingId: '1', name: '培训现场照片.zip', type: 'ZIP', size: '15.6MB', uploadDate: '2024-03-16' } }),
    prisma.document.create({ data: { id: '4', trainingId: '2', name: '职业健康培训课件.pptx', type: 'PPT', size: '5.1MB', uploadDate: '2024-04-18' } }),
    prisma.document.create({ data: { id: '5', trainingId: '2', name: '健康培训签到表.xlsx', type: 'Excel', size: '128KB', uploadDate: '2024-04-20' } }),
    prisma.document.create({ data: { id: '6', trainingId: '3', name: '新员工安全手册.pdf', type: 'PDF', size: '3.8MB', uploadDate: '2024-05-08' } }),
    prisma.document.create({ data: { id: '7', trainingId: '3', name: '入职培训签到表.xlsx', type: 'Excel', size: '98KB', uploadDate: '2024-05-10' } }),
    prisma.document.create({ data: { id: '8', trainingId: '4', name: '消防演练方案.pdf', type: 'PDF', size: '1.5MB', uploadDate: '2024-06-15' } }),
    prisma.document.create({ data: { id: '9', trainingId: '4', name: '演练记录表.docx', type: 'Word', size: '256KB', uploadDate: '2024-06-18' } }),
    prisma.document.create({ data: { id: '10', trainingId: '5', name: '管理培训课件.pptx', type: 'PPT', size: '8.2MB', uploadDate: '2024-07-20' } }),
    prisma.document.create({ data: { id: '11', trainingId: '5', name: '培训反馈表.xlsx', type: 'Excel', size: '180KB', uploadDate: '2024-07-22' } }),
    prisma.document.create({ data: { id: '12', trainingId: '6', name: '健康办公指南.pdf', type: 'PDF', size: '2.1MB', uploadDate: '2024-08-03' } }),
    prisma.document.create({ data: { id: '13', trainingId: '7', name: '仓储消防规范.pdf', type: 'PDF', size: '1.8MB', uploadDate: '2024-09-10' } }),
    prisma.document.create({ data: { id: '14', trainingId: '7', name: '演练照片.zip', type: 'ZIP', size: '22.3MB', uploadDate: '2024-09-12' } }),
    prisma.document.create({ data: { id: '15', trainingId: '8', name: '团队管理培训手册.pdf', type: 'PDF', size: '4.5MB', uploadDate: '2024-10-06' } }),
    prisma.document.create({ data: { id: '16', trainingId: '8', name: '培训签到表.xlsx', type: 'Excel', size: '145KB', uploadDate: '2024-10-08' } }),
  ]);

  await Promise.all([
    prisma.documentTag.create({ data: { documentId: '1', tagId: '1' } }),
    prisma.documentTag.create({ data: { documentId: '2', tagId: '1' } }),
    prisma.documentTag.create({ data: { documentId: '3', tagId: '1' } }),
    prisma.documentTag.create({ data: { documentId: '4', tagId: '2' } }),
    prisma.documentTag.create({ data: { documentId: '5', tagId: '2' } }),
    prisma.documentTag.create({ data: { documentId: '6', tagId: '1' } }),
    prisma.documentTag.create({ data: { documentId: '6', tagId: '5' } }),
    prisma.documentTag.create({ data: { documentId: '7', tagId: '5' } }),
    prisma.documentTag.create({ data: { documentId: '8', tagId: '3' } }),
    prisma.documentTag.create({ data: { documentId: '9', tagId: '3' } }),
    prisma.documentTag.create({ data: { documentId: '10', tagId: '4' } }),
    prisma.documentTag.create({ data: { documentId: '10', tagId: '6' } }),
    prisma.documentTag.create({ data: { documentId: '11', tagId: '4' } }),
    prisma.documentTag.create({ data: { documentId: '12', tagId: '2' } }),
    prisma.documentTag.create({ data: { documentId: '13', tagId: '3' } }),
    prisma.documentTag.create({ data: { documentId: '14', tagId: '3' } }),
    prisma.documentTag.create({ data: { documentId: '15', tagId: '4' } }),
    prisma.documentTag.create({ data: { documentId: '16', tagId: '4' } }),
  ]);

  console.log('Seed data inserted successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
