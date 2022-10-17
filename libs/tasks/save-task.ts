import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import { Task } from "./task";

export default async function saveTask(task: Task) {
  const connection = await mongoConnect();
  try {
    if (task._id) {
      const query = task._id ? { _id: task._id } : {};
      const update = { $set: task };
      return await mongoCollection(connection).updateOne(query, update);
    } else {
      return await mongoCollection(connection).insertOne(task);
    }
  } finally {
    await mongoDisconnect(connection);
  }
}
