import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import deleteTask from "../../../libs/tasks/delete-task";
import saveTask from "../../../libs/tasks/save-task";

type Data = {
  title: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await saveTask({ _id: req.query.id as string, title: req.body.title });
  } else if (req.method === "DELETE") {
    await deleteTask(new ObjectId(req.query.id as string));
  }

  res.redirect(307, "/");
}
