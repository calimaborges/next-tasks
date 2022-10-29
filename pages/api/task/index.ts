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
    await saveTask({ title: req.body.title });
  }

  res.redirect(307, "/");
}
