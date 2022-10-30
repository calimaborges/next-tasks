import type { NextApiRequest, NextApiResponse } from "next";
import Direction from "../../libs/tasks/direction";
import moveTask from "../../libs/tasks/move-task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  if (req.method === "POST") {
    moveTask(req.query.id as string, req.query.direction as Direction);
  }
  res.json({ ok: true });
}
