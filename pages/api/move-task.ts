import type { NextApiRequest, NextApiResponse } from "next";
import moveTask from "../../libs/tasks/move-task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  if (req.method === "POST") {
    moveTask(req.query.from as string, req.query.to as string);
  }
  res.json({ ok: true });
}
