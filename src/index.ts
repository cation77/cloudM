import express,  { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// 1. 获取所有教师
app.get('/teachers', async (req: Request, res: Response) => {
  const teachers = await prisma.teacher.findMany({});
  res.json(teachers);
});

// 2. 创建新教师
app.post('/teacher', async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.teacher.create({
      data: { name },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Teacher already exists' });
  }
});


app.post('/tag', async (req: Request, res: Response) => {
  const { name } = req.body;
  const tag = await prisma.tag.create({
    data: {
      name,
    },
  });
  res.json(tag);
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});