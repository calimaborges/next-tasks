// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import deleteTask from "../../../libs/tasks/delete-task";
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
      _id: new ObjectId(req.query.id as string),
      title: req.body.title,
      created_at: new Date(),
      updated_at: new Date(),
      tags: [],
      order: 0,
    };
    await saveTask(task);
  } else if (req.method === "DELETE") {
    await deleteTask(new ObjectId(req.query.id as string));
  }

  res.redirect(307, "/");
}
