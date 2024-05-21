import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { taskSchema } from '@/src/components/tasks/data/schema';

const getTasks = async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(app)/examples/tasks/data/tasks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
};

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const tasks = await getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load tasks' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
