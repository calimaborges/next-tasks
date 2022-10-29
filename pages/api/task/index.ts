// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import saveTask from "../../../libs/tasks/save-task";
import { FrontendTask, Task } from "../../../libs/tasks/task";

type Data = {
  title: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FrontendTask>
) {
  if (req.method === "POST") {
    const task: Task = {
      title: req.body.title,
      created_at: new Date(),
      updated_at: new Date(),
      tags: [],
      order: 0,
    };
    await saveTask(task);
  }

  res.redirect(307, "/");
}
