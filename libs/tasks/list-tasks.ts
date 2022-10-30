import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import { Task } from "./task";

export default async function listTasks(): Promise<Task[]> {
  const connection = await mongoConnect();
  try {
    return await mongoCollection(connection)
      .find({})
      .sort({ order: -1 })
      .toArray();
  } finally {
    await mongoDisconnect(connection);
  }
}
