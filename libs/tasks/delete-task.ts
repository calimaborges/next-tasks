import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";

export default async function deleteTask(taskId: ObjectId) {
  const connection = await mongoConnect();
  try {
    const query = { _id: taskId };
    return await mongoCollection(connection).deleteOne(query);
  } finally {
    await mongoDisconnect(connection);
  }
}
